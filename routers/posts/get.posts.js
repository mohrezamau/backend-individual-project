const express = require("express");
const router = express.Router();
const { posts } = require("../../models")
const { users } = require("../../models")

const getPosts = async (req, res, next) => {
    try {
    //   const { post_id } = req.params;
  
      const resGetPosts = await posts.findAll({
        raw: true, 
        order: [["createdAt", "DESC"]],
      });

      const mappedUser = resGetPosts.map((post)=>{
        return post.user_id
      })

      const userFound = []

      for (const user_id of mappedUser){
        const getPostUser = await users.findOne({where:{user_id}})
        userFound.push(getPostUser.username)
      }

      const resPostUser = resGetPosts.map((post,index)=>{
        post.username=userFound[index]
        return post
      })


      res.send({
        status: "Success",
        message: "Success get all post",
        data: resGetPosts
      })
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  router.get("/", getPosts)


module.exports = router;