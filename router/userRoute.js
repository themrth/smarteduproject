const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Lütfen İsminizi Giriniz!'),
        body('email').not().isEmpty().withMessage('Lütfen Email Giriniz!')
        .custom((userEmail) => {
            return User.findOne({email: userEmail }).$where.then(user => {
                if(user) {
                    return Promise.reject('Bu Email zaten kullanılıyor!')
                }
            })
        }),
        body('password').not().isEmpty().withMessage('Lütfen Şifenizi Giriniz!')
    ]
    ,authController.createUser);
router.route('/login').post(authController.logInUser);
router.route('/logout').get(authController.logOutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUser);

module.exports = router;
