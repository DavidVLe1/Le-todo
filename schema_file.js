var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var nameSchema = new Schema ({
    something_field: {type: String, required: true, unique: true, index: 1}
}, {collection: 'names'});
exports.nameSchema = nameSchema;