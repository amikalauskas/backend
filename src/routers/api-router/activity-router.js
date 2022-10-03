const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/activity-controller');

const activityRouter = Router();

activityRouter.get('/', fetchAll);

activityRouter.get('/:id', fetch);

activityRouter.post('/', create);

activityRouter.put('/:id', replace);

activityRouter.patch('/:id', update);

activityRouter.delete('/:id', remove);

module.exports = activityRouter;
