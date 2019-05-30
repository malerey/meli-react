/**
 *  @fileOverview Routes
 *  @author       Maria Elena Rey
 *  @module       User router
 *  @requires     express
 *  @requires     express.Router()
 *  @requires     controllers/userController.js
*/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
  next();
});

/**
 * User list route
 *
 * @name GET form
 * @path {GET} /user/list
 * @response {html} Renders user list
 */

router.get('/list', userController.getList);

/**
 * Add new user route.
 *
 * @name POST addUser
 * @path {POST} /user
 * @body {string} name
 * @body {string} lastname
 * @body {string} phone
 * @body {string} email
 * @response {string} "success"
 */

router.post('/', userController.addUser);


/**
 * Remove user route.
 *
 * @name DELETE removeUser
 * @path {DELETE} /user/remove/:id
 * @params {string} id 
 * @response {string} "Success"
 */

router.delete('/remove/:id', userController.removeUser);


/**
 * Edit user route.
 *
 * @name POST editUser
 * @path {POST} /user/edit/:id
 * @params {string} id 
 * @response {string} "Success"
 */

router.put('/edit/:id', userController.editUser)


module.exports = router;