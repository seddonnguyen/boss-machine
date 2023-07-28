const ideasRouter = require('express').Router();
const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

module.exports = ideasRouter;

ideasRouter.param('ideaId', (req, res, next, ideaId) => {

    const idea = getFromDatabaseById('ideas', ideaId)
    if(idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send(`Idea ID Not Found: ${ideaId}`);
    }
});

ideasRouter.get('/', (req, res, next) => {
   res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', (req, res, next) => {
    try {
        const idea = addToDatabase('ideas', req.body);
        res.status(201).send(idea);
    } catch (err) {
        res.status(err.status).send(err.message)
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})

ideasRouter.put('/:ideaId', (req, res, next) => {
   try {
       const updatedIdea = updateInstanceInDatabase('ideas', req.body);
       req.idea = updatedIdea;
       res.send(updatedIdea);
   } catch (err) {
       res.status(err.status).send(err.message);
   }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const isSuccessful= deleteFromDatabasebyId('minions', req.minion.id);
    if(isSuccessful) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});