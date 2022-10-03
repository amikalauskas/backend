const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const ActivityRouter = require('./activity-router');

const apiRouter = Router();

apiRouter.use('/activity', ActivityRouter);
apiRouter.use('/categories', categoriesRouter);

module.exports = apiRouter;
