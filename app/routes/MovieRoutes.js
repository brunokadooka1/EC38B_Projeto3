const router = require('express').Router();
const MovieController = require('../controllers/MovieContoller');

//Middleware
const verifyAdmin = require('../helpers/verify-admin');

router.post('/create', verifyAdmin, MovieController.create);
router.get('/', MovieController.getAll);
router.get('/:id', MovieController.getMovieById);
router.get('/:name', MovieController.getMovieByName);

module.exports = router;