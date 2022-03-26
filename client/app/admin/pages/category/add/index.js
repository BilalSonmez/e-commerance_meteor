Template.adminPagesCategoryAdd.onCreated(function() {
    this.state = new ReactiveDict(null, {
        category: []
    });
});

Template.adminPagesCategoryAdd.onRendered(function() {
    const self = this;

    this.autorun(function () {
        AppUtil.refreshTokens.get('category');
        Meteor.call('category.list', {}, function (error, result) {
            if (error) {
                ErrorHandler.show(error)
                return;
            }
            self.state.set('category', result.category);
        });
    });
});

Template.adminPagesCategoryAdd.events({ 
    'submit #categoryAdd': function(event, template) { 
        event.preventDefault();
        let title = event.target.title.value
        let category = event.target.subCategory.value == "null" ? null : event.target.subCategory.value; 
        const obj = {
            category: {
              title: title,
              subCategory: category
            }
        };

        Meteor.call('category.create', obj, function (error, result) {

            if (error) {
              console.log(error);
              return;
            }
      
            event.target.reset();
            document.location.reload(true);
        });
    } 
});