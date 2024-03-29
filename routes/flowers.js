/* /api/flower */
const express = require('express');
const router = express.Router();
const { getFlowerById, updateFlowerById, searchFlowers, createUpdateFlowerTracker } = require('../controllers/flowers')
const { isAuthorized } = require('../services/authorizationMiddleware')



router.post('/search', searchFlowers);
router.post('/tracker',isAuthorized,  createUpdateFlowerTracker);

router.post('/update/:id', updateFlowerById);

router.get('/:id', getFlowerById);

module.exports = router