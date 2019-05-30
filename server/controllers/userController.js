/**
 *  @fileOverview Controllers for user information.
 *  @author       Maria Elena Rey
 *  @module       userController
 *  @requires     services/userService.js
 *  @requires     commons/validations.js
*/

const self = {};
const userService = require('../services/userService');
const VALIDATIONS = require('../commons/validations');


/**
 * Returns current user list
 * @module getList
 * @function
 * @param {Object} req - Empty
 * @param {Object} res - JSON - Current user list 
 * @param {Function} next - Express next middleware function
 * @return {Object} Current list of users
 * @static
 */

self.getList = (req, res, next) => {
  userService.getUsers().then(users => {
    return res.json(users);
  })
    .catch((err) => {
      err.code = 500;
      err.message = 'No pudimos cargar los usuarios.';
      next(err)
    });
};

/**
 * Validates user data, then adds user to existing file and returns updated list
 * @module addUser
 * @function
 * @param {Object} req - Object with new user containing name, lastname, email and phone as keys
 * @param {Object} res - JSON - Current user list 
 * @param {Function} next - Express next middleware function
 * @static
 */

self.addUser = (req, res, next) => {
  if (!VALIDATIONS.VALID_NAME.test(req.body.name)
    || !VALIDATIONS.VALID_NAME.test(req.body.lastname)
    || !VALIDATIONS.VALID_EMAIL.test(req.body.email)
    || !VALIDATIONS.VALID_PHONE.test(req.body.phone)) {
      res.render('error', {error: 
        { name: 'validation_error', 
        message: 'Chequee que los datos enviados cumplan los requerimientos' }})
      return;
  }
  else {
    userService.addUser(req.body).then((usersAdded) => {
     res.send(usersAdded);
    })
      .catch((err) => {
        err.code = 500;
        err.message = 'No pudimos agregar el usuario';
        next(err)
      });
  };
};

/**
 * Removes single user, then returns updated user list
 * @module removeUser
 * @function
 * @param {Object} req - Needs user ID as params 
 * @param {Object} res - JSON - Current user list 
 * @param {Function} next - Express next middleware function
 * @static
 */


self.removeUser = (req, res, next) => {
  userService.removeUser(req.params.id).then((newUsers) => {
    res.send(newUsers);
  })
    .catch((err) => {
      err.code = 500;
      err.message = 'No pudimos borrar al usuario';
      next(err)
    });
};

/**
 * Validates info, if ok edits single user, then returns updated user list
 * @module removeUser
 * @function
 * @param {Object} req - Object with user info containing name, lastname, email and phone as keys
 * @param {Object} res - JSON - Updated user list
 * @param {Function} next - Express next middleware function
 * @static
 */

self.editUser = (req, res, next) => {
  if (!VALIDATIONS.VALID_NAME.test(req.body.name)
    || !VALIDATIONS.VALID_NAME.test(req.body.lastname)
    || !VALIDATIONS.VALID_EMAIL.test(req.body.email)
    || !VALIDATIONS.VALID_PHONE.test(req.body.phone)) {
    res.render('error', {error: { name: 'validation_error', message: 'Hubo un error en la validación de los datos al editar usuario. Chequee que los datos enviados cumplan los requerimientos' }})
    return;
  }
  userService.editUser(req.params.id, req.body).then((newUsers) => {
    res.send(newUsers);
  })
    .catch((err) => {
      err.code = 500;
      err.message = 'No pudimos editar al usuario';
      next(err)
    });
};

module.exports = self;
