import * as express from 'express';
import UserModel from '../database/models/userM';
import UserService from '../services/userS';
import UserController from '../controllers/userC';
import validate from '../middlewares/validate';

require('express-async-errors');

const usersRoute = express.Router();

const userController = new UserController(new UserService(UserModel));

usersRoute.post('/', validate, (req, res, next) => {
  userController.login(req, res, next);
});

usersRoute.get('/validate', (req, res, next) => {
  UserController.validated(req, res, next);
});

export default usersRoute;
