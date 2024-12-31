"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserMongoRepositories_1 = require("../../interfaces/repositories/userSide/UserMongoRepositories");
const createUser_1 = require("../../use-cases/userside/createUser");
const userController_1 = require("../../interfaces/controllers/userController");
const userRepositories = new UserMongoRepositories_1.UserMongodbRepositories();
const createUser = new createUser_1.CreateUser(userRepositories);
const userController = new userController_1.Usercontroller(createUser);
const userRouter = express_1.default.Router();
userRouter.post('/signup', (req, res) => userController.signUp(req, res));
exports.default = userRouter;
