const express = require("express");
const jwt = require("jsonwebtoken")
const userModal = require("../modals/user.model")
require("dotenv").config()

const userRouter = express.Router()
// for register part


userRouter.get("/users", async (req, res) => {
    try {
        const data = await userModal.find();
        await res.send(data)
    } catch (error) {
        res.send({ "msg": "error" })
    }
});

userRouter.post("/register", async (req, res) => {
    const { Username, Email } = req.body;

    try {

        const validate_email = await userModal.findOne({ Email});

        if (validate_email) {

            let token = jwt.sign({ email: validate_email.Email, userId: validate_email._id }, process.env.secret);
            console.log(token)

            const response = {
                "ok": true,
                "msg": "Successfull redirected",
                token: token,

            }

            res.status(200).json(response)
        } else {
            
            const data = new userModal({ Username, Email });
            await data.save();
 
            let token = jwt.sign({ email: data.Email, creator: data._id }, process.env.secret);
            const response = {
                "ok": true,
                "msg": "Successfull created",
                
                token: token,

            }

            res.status(200).json(response)
        }

    } catch (error) {
        res.status(400).json({ "msg": error.message })
    }


});


module.exports = {
    userRouter
}