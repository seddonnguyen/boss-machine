const minionsRouter = require('express').Router();
const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

module.exports = minionsRouter;

minionsRouter.param('minionId', (req, res, next, minionId) => {

    const minion = getFromDatabaseById('minions', minionId)
    if(minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send(`Minion ID Not Found: ${minionId}`);
    }
});

minionsRouter.get('/', function (req, res, next) {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    try {
        const minion = addToDatabase('minions', req.body);
        res.status(201).send(minion);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});


minionsRouter.put('/:minionId', (req, res, next) => {
    try {
        const updatedMinion = updateInstanceInDatabase('minions', req.body);
        req.minion = updatedMinion;
        res.send(updatedMinion);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const isSuccessful = deleteFromDatabasebyId('minions', req.minion.id);
    if(isSuccessful) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
   const works = getAllFromDatabase('work');
   const minionWorks = works.filter(work => work.minionId === req.minion.id);
   res.send(minionWorks);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    try {
        const work = addToDatabase('work', req.body);
        res.status(201).send(work);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
});

minionsRouter.param('workId', (req, res, next, workId) => {
    const work = getFromDatabaseById('work', workId);
    if(work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    try {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const isSuccessful = deleteFromDatabasebyId('work', req.work.id);
    if(isSuccessful) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});