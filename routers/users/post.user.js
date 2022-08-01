const express = require("express");
const router = express.Router();
const { users } = require("../../models")
const { Op } =require("sequelize")
const { hash, compare } = require("../../src/lib/bcryptjs");

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
        const encryptedPassword = hash(password);
        const resCreateNewUser = await users.create({
            username, email, password: encryptedPassword
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
            where: {email},
        });
        console.log(`ini resfinduser ${resFindUser}`)
        const isPasswordMatch = compare(password, resFindUser.password);
        if (!isPasswordMatch) {
            throw {
              code: 401,
              message: `Password is incorrect`,
            };
          }

        if(resFindUser){
            res.send({status: "success", message: "login success", data: {
                result: email
            }
        })
        } else {
            throw {
                code: 405,
                message: "incorrect email or password",
                errorType: "Incorrect Login"
            }
        }

    } catch (error) {
        next(error)
    }
}

router.post("/", postUser);
router.post("/login", loginUser);

module.exports = router;