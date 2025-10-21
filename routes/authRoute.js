import express from "express";
import * as UserController from "../controllers/authController.js";

const router = express.Router();

router.get("/auth", UserController.getUsers);
router.get("/auth/:id", UserController.getUser);
router.post("/auth/", UserController.createUser);
router.put("/auth/:id", UserController.updateUser);
router.delete("/auth/:id", UserController.deleteUser);
router.post("/auth/logout", UserController.logout);

export default router;
