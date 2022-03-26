import SimpleSchema from 'simpl-schema';

Category = new Mongo.Collection('category');

CategorySchema = new SimpleSchema({
    title: String,
    subCategory: {
        type: SimpleSchema.RegEx.Id,
        defaultValue: null,
        optional: true
    }
});

Category.attachSchema(CategorySchema);
Category.softRemovable();
Category.autoDates();
Category.lastEditUser();
Category.createdUser();