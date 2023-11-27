// route class for todo application

const express = require('express');
const router = express.Router();
const homeController = require('../controller/homecontroller');
router.get('/',homeController.home)
router.post('/habit',homeController.habit) //controller for creating habit
// router.post('/habitStatus',homeController.habitStatus) // controller for changing the status
router.post('/delete/:id', homeController.delete);
router.get('/delete/:id', homeController.delete);


router.get('/habitStatus', homeController.habitStatus);
router.post('/habitStatus', homeController.habitStatus);


console.log('router is loaded');
module.exports = router;
