const Schema = require('mongoose').Schema;


let schema_obj = {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  color_id: {
    type: Number,
    required: true,
    unique: true
  },
};


let colorSchema = new Schema(schema_obj, {strict: true});

module.exports = colorSchema;
