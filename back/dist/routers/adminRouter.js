"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const asyncHandler_1 = require("../middleware/asyncHandler");
const adminRouter = (0, express_1.Router)();
adminRouter.get("/", (req, res) => {
    res.send("Admin API funcionando correctamente");
});
adminRouter.post('/register', (0, asyncHandler_1.asyncHandler)(adminController_1.AdminController.createAdmin));
adminRouter.post('/login', (req, res, next) => {
    console.log("🔥 Petición POST a /login recibida");
    next();
}, (0, asyncHandler_1.asyncHandler)(adminController_1.AdminController.login));
exports.default = adminRouter;
