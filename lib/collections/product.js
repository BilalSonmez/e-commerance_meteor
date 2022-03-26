import SimpleSchema from 'simpl-schema';

Products = new Mongo.Collection('product');

ProductsSchema = new SimpleSchema({
    title: String,
    category: SimpleSchema.RegEx.Id,
    images: {
        type: Array
    },
    "images.$": String
});

Products.attachSchema(ProductsSchema);
Products.softRemovable();
Products.autoDates();
Products.lastEditUser();
Products.createdUser();