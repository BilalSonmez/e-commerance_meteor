import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.delete',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    let currentCategory = Category.findOne({_id: _id});
    let subCategoryVar = null;

    if (currentCategory.subCategory != null) {
      subCategoryVar = currentCategory.subCategory;
    }

    Category.update({subCategory: _id}, {
      $set:{
        subCategory: subCategoryVar
      }
    });

    Products.update({category: _id}, {
      $set:{
        category: subCategoryVar
      }
    });


    Category.remove({ _id: _id });
  }
});