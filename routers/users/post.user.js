const express = require("express");
const router = express.Router();
const { users } = require("../../models")
const { Op } =require("sequelize")
const { hash, compare } = require("../../src/lib/bcryptjs");
const { sendVerificationMail } = require("../../src/lib/email-auth");
const { createToken } = require("../../src/lib/token");

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
    
        const token = createToken({
          user_id: resCreateNewUser.dataValues.user_id,
        });
        
        const patchToken = await users.findOne({where: {user_id: resCreateNewUser.dataValues.user_id}})
        await patchToken.update({
            user_token: token
        })
        const resPatchToken = await patchToken.save()

        console.log(`ini token yaaa ==> ${token}`)
        await sendVerificationMail({ email, token, username });
        res.send({
            status: "success",
            message: "sukses bikin user lanjuuut",
            data: {
                result: resCreateNewUser, resPatchToken
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
        const token = createToken({
            user_id: users.user_id,
            username: users.username,
          });
        if(resFindUser){
            res.send({status: "success", message: "login success", data: {
                result: {
                    user_id: users.user_id,
                    email: users.email,
                    username: users.username,
                    accesstoken: token,
                },
            }
        })
        } else {
            throw {
                code: 405,
                message: "incorrect email or password",
                errorType: "Incorrect Login"
            }
        }
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