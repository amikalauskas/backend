const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const ActivityModel = require('../models/activity-model');

const createActivityNotFoundError = (activityId) => createNotFoundError(`Activity with id '${activityId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;

  try {
    const activityDocuments = joinBy === 'categoryId'
      ? await ActivityModel.find().populate('categoryId')
      : await ActivityModel.find();

    res.status(200).json(activityDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const activityId = req.params.id;
  const { joinBy } = req.query;

  try {
    const foundActivity = joinBy === 'categoryId'
      ? await ActivityModel.findById(activityId).populate('categoryId')
      : await ActivityModel.findById(activityId);
    if (foundActivity === null) throw createActivityNotFoundError(activityId);

    res.status(200).json(foundActivity);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newActivityData = req.body;

  try {
    ActivityModel.validate(newActivityData);

    const newActivity = await ActivityModel.create(newActivityData)

    res.status(201).json(newActivity)

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const activityId = req.params.id;
  const { title, description, categoryId, img,} = req.body;
  const newActivityData = { title, description, categoryId, img,};

  try {
    ActivityModel.validate(newActivityData);

    const updatedActivity = await ActivityModel.findByIdAndUpdate(
      activityId,
      newActivityData,
      { new: true, runValidators: true }
    );

    if (updatedActivity === null) throw createActivityNotFoundError(activityId);

    res.status(200).json(updatedActivity)

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const activityId = req.params.id;
  const { title, description, categoryId, img,} = req.body;
  const newActivityData = removeEmptyProps({ title, description, categoryId, img,});

  try {
    ActivityModel.validateUpdate(newActivityData);

    const updatedActivity = await ActivityModel.findByIdAndUpdate(
      activityId,
      newActivityData,
      { new: true }
    );

    if (updatedActivity === null) throw createActivityNotFoundError(activityId);

    res.status(200).json(updatedActivity)

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const activityId = req.params.id;

  try {
    const deletedActivity = await ActivityModel.findByIdAndDelete(activityId);
    if (deletedActivity === null) createActivityNotFoundError(activityId);

    res.status(200).json(deletedActivity);
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
