const express = require("express");
const router = express.Router();
const { users } = require("../../models")


const getUser = async (req, res, next) => {
    try {
      const { user_id } = req.params;
  
      const resGetUser = await user.findOne({
        where: { user_id },
      });
  
      const { dataValues } = resGetUser;
  
      res.send({ dataValues });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

router.get("/", getUser);



module.exports = router;