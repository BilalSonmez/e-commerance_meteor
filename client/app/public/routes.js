import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
    name: 'public.home',
    action: function (params, queryParams) {
        this.render('publicLayoutDefault', { page: 'publicPagesHome', link: 'public.home' });
    }
});

FlowRouter.route('/about', {
    name: 'public.about',
    action: function (params, queryParams) {
        this.render('publicLayoutDefault', { page: 'publicPagesAbout', link: 'public.about' });
    }
});

FlowRouter.route('/product', {
    name: 'public.product',
    action: function (params, queryParams) {
        this.render('publicLayoutDefault', { page: 'publicPagesProduct', link: 'public.product' });
    }
});

FlowRouter.route('/product/:_id', {
    name: 'public.product',
    action: function (params, queryParams) {
        this.render('publicLayoutDefault', { page: 'publicPagesProduct', link: 'public.product' });
    }
});

FlowRouter.route('/product/detail/:_id', {
    name: 'public.product.detail',
    action: function (params, queryParams) {
        this.render('publicLayoutDefault', { page: 'publicPagesProductDetail', link: 'public.product' });
    }
});