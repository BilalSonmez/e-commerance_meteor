import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.adminPagesCategory.onCreated(function() {
    this.state = new ReactiveDict(null, {
        category: []
    });
});

Template.adminPagesCategory.onRendered(function() {
    const self = this;


    this.autorun(function () {
        AppUtil.refreshTokens.get('category');
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
    });
});

Template.adminPagesCategory.events({ 
    'click .brd-category-edit': function(event, template) {
        FlowRouter.go("admin.category.edit", {_id: this._id});
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
                Meteor.call('category.delete', { _id: this._id }, function (error, result) {
                    if (error) {
                      ErrorHandler.show(error)
                      return;
                    }
              
                    AppUtil.refreshTokens.set('category', Random.id());
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