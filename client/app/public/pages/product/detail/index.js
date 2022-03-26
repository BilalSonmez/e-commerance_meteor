import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPagesProductDetail.onCreated(function() {
    this.state = new ReactiveDict(null, {
        data: {}
    });
});



Template.publicPagesProductDetail.onRendered(function() {
    const self = this;
    const _id = FlowRouter.getParam("_id");

    this.autorun(function () {
        AppUtil.refreshTokens.get('products');

        Meteor.call('product.show', {_id: _id}, function (error, result) {
            if (error) {
                ErrorHandler.show(error)
                return;
            }
            console.log(result);
            self.state.set('data', result);
        });
    });
});