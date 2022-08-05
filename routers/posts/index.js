const express =  require("express");
const router = express.Router();


const postPostsRouter = require("./post.posts");
const getPostsRouter = require("./get.posts")



router.use(postPostsRouter);
router.use(getPostsRouter);


module.exports = router;