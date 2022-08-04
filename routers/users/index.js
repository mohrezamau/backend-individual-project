const express =  require("express");
const router = express.Router();

// const patchUserRouter = require("./patch.user");
const postUserRouter = require("./post.user");
const getUserRouter = require("./get.user");
const patchUserRouter = require("./patch.user")

// router.use(patchUserRouter);
router.use(postUserRouter);
router.use(getUserRouter);
router.use(patchUserRouter);


module.exports = router;