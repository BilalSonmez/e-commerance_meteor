import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPagesProduct.onCreated(function() {
    this.state = new ReactiveDict(null, {
        category: [],
        product: []
    });
});



Template.publicPagesProduct.onRendered(function() {
    const self = this;
    const _id = FlowRouter.getParam("_id");

    this.autorun(function () {
        AppUtil.refreshTokens.get('products');

        Meteor.call('category.list', {}, function (error, result) {
            if (error) {
                ErrorHandler.show(error)
                return;
            }
            let state_category = [];
            result.category.forEach(function(element, index) {
                if (element.subCategory === null) {
                    state_category.push(element);
                }
            });
            state_category.forEach(function(element, index) {
                state_category[index].subCategory = result.category.filter(x => x.subCategory === element._id);
            });
            self.state.set('category', state_category);
        });
        
        Meteor.call('product.list', {}, function (error, result) {
            if (error) {
                ErrorHandler.show(error)
                return;
            }

            if (_id) {
                console.log(result.products.filter(e => e.category === _id));
                self.state.set('product', result.products.filter(e => e.category === _id));
            } else {
                self.state.set('product', result.products);
            }
        });
    });
});