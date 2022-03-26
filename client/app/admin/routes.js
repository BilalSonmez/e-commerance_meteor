import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

const routesAuth = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  //triggersEnter: [MustSignIn, IsAdmin],
});

routesAuth.route('/dashboard', {
  name: 'admin.dashboard',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPagesDashboard', link: 'admin.dashboard' });
  }
});

routesAuth.route('/product', {
  name: 'admin.product',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPagesProduct', link: 'admin.product' });
  }
});

routesAuth.route('/product/add', {
  name: 'admin.product.add',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPagesProductAdd', link: 'admin.product' });
  }
});

routesAuth.route('/product/edit/:_id', {
  name: 'admin.product.edit',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPagesProductEdit', link: 'admin.product' });
  }
});

routesAuth.route('/category', {
  name: 'admin.category',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPagesCategory', link: 'admin.category' });
  }
});

routesAuth.route('/category/add', {
  name: 'admin.category.add',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPagesCategoryAdd', link: 'admin.category' });
  }
});

routesAuth.route('/category/edit/:_id', {
  name: 'admin.category.edit',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPagesCategoryEdit', link: 'admin.category' });
  }
});