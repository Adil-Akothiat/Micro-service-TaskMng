const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/", authMiddleware, checkRole(["admin"]), getAllUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteUser);
router.patch("/:id/block", authMiddleware, checkRole(["admin"]), toggleBlockUser);


module.exports = router;
