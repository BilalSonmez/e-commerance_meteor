import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.adminPagesProduct.onCreated(function() {
    this.state = new ReactiveDict(null, {
        category: [],
        product: []
    });
});

Template.adminPagesProduct.onRendered(function() {
    const self = this;
    console.log("test");

    this.autorun(function () {
        AppUtil.refreshTokens.get('category');
        AppUtil.refreshTokens.get('products');
        Meteor.call('category.list', {}, function (error, result) {
            if (error) {
                ErrorHandler.show(error)
                return;
            }
            result.category.forEach(function(value, index) {
                if (value.subCategory != null)
                    result.category[index].subCategory = result.category.find((element) => element._id == value.subCategory);
            });
            self.state.set('category', result.category);
        });

        Meteor.call('product.list', {}, function (error, result) {
            if (error) {
                ErrorHandler.show(error)
                return;
            }
            result.products.forEach(function(value, index) {
                if (value.category != null)
                    result.products[index].category = self.state.get('category').find((element) => element._id == value.category);
            });
            console.log(result.products);
            self.state.set('product', result.products);
        });
    });
});

Template.adminPagesProduct.events({ 
    'click .brd-category-edit': function(event, template) {
        FlowRouter.go("admin.product.edit", {_id: this._id});
    },
    'click .brd-category-remove': function(event, template) {
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                Meteor.call('product.delete', { _id: this._id }, function (error, result) {
                    if (error) {
                      ErrorHandler.show(error)
                      return;
                    }
              
                    AppUtil.refreshTokens.set('product', Random.id());
                    document.location.reload(true);
                });
            // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            } else if (result.dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your category file is safe :)',
                    'error'
                );
            }
        });
    },
});