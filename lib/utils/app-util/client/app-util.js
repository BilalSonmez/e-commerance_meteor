AppUtil = {
  temp: new ReactiveDict(null, {}),
  refreshTokens: new ReactiveDict(null, {})
};

Template.registerHelper('appUtil', function () {
  return AppUtil;
});

Template.registerHelper('categories', function() {
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