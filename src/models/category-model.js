const { Schema, model } = require('mongoose');
const yup = require('yup');

const categorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  }, {
  timestamps: true
});

const categoryValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Category.title must be a string')
    .required('Category.title is required'),
 });

const categoryUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Category.title must be a string'),
  });

categorySchema.statics.validate = (categoryData) => categoryValidationSchema.validateSync(categoryData)
categorySchema.statics.validateUpdate = (categoryData) => categoryUpdateValidationSchema.validateSync(categoryData)

const CategoryModel = model('Category', categorySchema);

module.exports = CategoryModel;