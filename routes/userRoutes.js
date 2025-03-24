const express = require("express");
const { authMiddleware, checkRole } = require("../middlewares/auth");
const { getAllUsers, updateUser, deleteUser, toggleBlockUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", authMiddleware, checkRole(["admin"]), getAllUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteUser);
router.patch("/:id/block", authMiddleware, checkRole(["admin"]), toggleBlockUser);

module.exports = router;
