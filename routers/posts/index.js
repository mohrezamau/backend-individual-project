const express =  require("express");
const router = express.Router();

// const patchUserRouter = require("./patch.user");
const postPostsRouter = require("./post.posts");



// router.use(patchUserRouter);
router.use(postPostsRouter);



module.exports = router;