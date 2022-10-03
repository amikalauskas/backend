const { Schema, model, Types } = require('mongoose');
const yup = require('yup');

const activitySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  }, {
  timestamps: true,
});


const activityValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Activity.title must be a string')
    .required('Activity.title is required'),
  description: yup
    .string().typeError('Activity.description must be a string')
    .required('Activity.description is required'),
  categoryId: yup
  .string().typeError('Activity.categoryId must be a string')
  .test(
    'is-mongo-object-id',
    'Activity.categoryId must be valid MongoDB object Id',
    Types.ObjectId.isValid
  )
  .required('Activity.categoryId is required'),
  img: yup
    .string().typeError('Activity.img must be a string')
    .required('Activity.img is required'),
 });

const activityUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Activity.title must be a string'),
  description: yup.string().typeError('Activity.description must be a string'),
  categoryId: yup.string().typeError('Activity.categoryId must be a string')
  .test(
    'is-mongo-object-id',
    'Activity.categoryId must be valid MongoDB object Id',
    Types.ObjectId.isValid
  ),
  img: yup.string().typeError('Activity.img must be a string'),
  });

activitySchema.statics.validate = (activityData) => activityValidationSchema.validateSync(activityData);

activitySchema.statics.validateUpdate = (activityData) => activityUpdateValidationSchema.validateSync(activityData);

const ActivityModel = model('Activity', activitySchema);

module.exports = ActivityModel;