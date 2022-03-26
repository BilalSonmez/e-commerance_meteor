Template.adminPagesProductAdd.onCreated(function() {
    this.image_area = '<div class="row image-area my-2"><div class="col-8"><input class="form-control image-area-input" type="text" name="images[]"></div><div class="col-4"><button class="btn btn-warning brd-Remove-Image">Remove</button></div></div>';
    this.state = new ReactiveDict(null, {
        category: []
    });
});

Template.adminPagesProductAdd.onRendered(function() {
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

Template.adminPagesProductAdd.events({
    'click #addImage': function (event, template) {
        let images_area = document.getElementsByClassName("images-area")[0];
        let image_area = template.image_area;
        images_area.insertAdjacentHTML('beforeend', image_area);
    },
    'click .brd-Remove-Image': function (event, template) {
        event.target.parentElement.parentElement.remove();
        //console.log(event);
    },
    'submit #productAdd': function(event, template) { 
        event.preventDefault();
        let image_areas_doms = document.querySelectorAll("#productAdd .image-area-input");
        let image_area = [];
        for (i = 0; i < image_areas_doms.length; i++) {
            image_area.push(image_areas_doms[i].value);
        }
        let title = event.target.title.value;
        let category = event.target.category.value;
        const obj = {
            product: {
              title: title,
              category: category,
              images: image_area
            }
        };

        Meteor.call('product.create', obj, function (error, result) {

            if (error) {
              console.log(error);
              return;
            }
      
            event.target.reset();
            document.location.reload(true);
        });
    } 
});