const express = require("express");
const router = express.Router();
const { users } = require("../../models")
const { Op } =require("sequelize")

const postUser = async(req, res, next) => {
    try {
        console.log("jalan")
        const { username, email, password} = req.body;
        const resFindUser = await users.findOne({
            where: {[Op.or]: {username, email}},
        });
        if (resFindUser) {
            console.log(resFindUser)
            if(resFindUser.dataValues.username == username){
                throw {
                    code: 400, message: "username already exists",
                    detail: {
                        databaseUsername: resFindUser,
                        currentClientUsername: username,
                    }, errorType: "username"
                }
            }
        }
        const resCreateNewUser = await users.create({
            username, email, password
        })
        res.send({
            status: "success",
            message: "sukses bikin user lanjuuut",
            data: {
                result: resCreateNewUser,
            },
        })
    } catch (error) {
        next(error)
    }
}

const loginUser = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const resFindUser = await users.findOne({
            where: {[Op.and]: {email, password}},
        });
        if(resFindUser){
            res.send({status: "success", message: "login success", data: {
                result: email
            }
        })
        } else {
            throw {
                code: 404,
                message: "incorrect email or password"
            }
        }
        
    } catch (error) {
        next(error)
    }
}

router.post("/", postUser);
router.post("/login", loginUser);

module.exports = router;