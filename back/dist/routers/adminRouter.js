"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const adminRouter = (0, express_1.Router)();
adminRouter.post('/register', adminController_1.AdminController.createAdmin);
adminRouter.post('/login', adminController_1.AdminController.login);
exports.default = adminRouter;
