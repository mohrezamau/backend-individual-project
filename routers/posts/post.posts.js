const express = require("express");
const router = express.Router();
const { posts } = require("../../models")

const newPost = async(req, res, next) => {
    try {
        const { caption, image, user_id} = req.body;
        const resCreateNewPost = await posts.create({
            caption, image, user_id
        })
        res.send({
            status: "success",
            message: "sukses bikin post",
            data: {
                result: resCreateNewPost
            },
        })


    } catch (error) {
        next(error)
    }
}

router.post("/", newPost)

module.exports = router;