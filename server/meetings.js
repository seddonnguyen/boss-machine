const meetingsRouter = require('express').Router();
const {
    addToDatabase,
    getAllFromDatabase,
    deleteAllFromDatabase,
    createMeeting
} = require('./db');

module.exports = meetingsRouter;

meetingsRouter.get('/', function (req, res, next) {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', function (req, res, next) {
    try {
        const minion = addToDatabase('meetings', createMeeting());
        res.status(201).send(minion);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
});

meetingsRouter.delete('/', (req, res, next) => {
    const isSuccessful = deleteAllFromDatabase('meetings');
    if(isSuccessful) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});