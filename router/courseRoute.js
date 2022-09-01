const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.route('/').get(courseController.getAllCourse);
router.route('/').post(roleMiddleware(["Öğretmen", "Admin"]), courseController.createCourse);
router.route('/:slug').get(courseController.getCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);


module.exports = router;
