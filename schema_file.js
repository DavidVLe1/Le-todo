var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var somethingSchema = new Schema ({
    something_field: {type: String, required: true, unique: true, index: 1}
}, {collection: 'todo'});
exports.somethingSchema = somethingSchema;