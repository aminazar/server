const Schema = require('mongoose').Schema;

let schema_obj = {
  color_id: {
    type: Schema.Types.ObjectId,
    required: true,
    // unique: true,
    ref: 'Color'
  },
  images: [{
    url: {
      type: String,
      required: true,
      trim: true,
    }
  }],
};


let ProductColorSchema = new Schema(schema_obj, {strict: true});

module.exports = ProductColorSchema;
