const express = require("express");
const router = express.Router();
const { posts } = require("../../models")

const getPosts = async (req, res, next) => {
    try {
    //   const { post_id } = req.params;
  
      const resGetPosts = await posts.findAll({
        raw: true, 
        order: [["createdAt", "DESC"]],
      });
  
      res.send({
        status: "Success",
        message: "Success get all post",
        data: resGetPosts,
      })
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  router.get("/", getPosts)


module.exports = router;