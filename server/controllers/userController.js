const db = require("../models");
const users = db.User;
const profiles = db.Profile;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const jwtKey = process.env.JWT_SECRET_KEY;
const sendEmail = require("../helper/sendEmail")


module.exports = {
    register: async (req, res) => {
        try {
          let { username, name, email, password } = req.body;
          if (!username || !name || !email || !password)
            return res.status(400).send({isError: true, message: "Please fill all the required fields"});
          const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!regexEmail.test(email))
            return res.status(400).send({ isError: true, message: "Invalid email format" });
          let findEmail = await users.findOne({ where: { email: email } });
          if (findEmail) return res.status(400).send({ isError: true, message: "Email already registered" });
          let findUsername = await users.findOne({ where: { username: username } });
          if (findUsername) return res.status(400).send({ isError: true, message: "Username already registered" });
          const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=[\]{}|\\,./?'":;<>~`])(?!.*\s).{8,}$/;
          if (!regexPass.test(password)) return res.status(400).send({isError: true, message: "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number"});
          const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm;
          if (!regexUsername.test(username)) return res.status(400).send({isError: true, message: "Username only containt characters, number, or underscore."});
          const salt = await bcrypt.genSalt(10);
          const hashPass = await bcrypt.hash(req.body.password, salt);
          const result = await users.create({username, name, email, password: hashPass});
          const token = jwt.sign({ id: result.id, username: result.username, name: result.name, email: result.email }, jwtKey, { expiresIn: '24h' });
          const url = `${process.env.CLIENT_URL}verify?token=${token}`;
          const message = `<p>Click this link to verify: <a href='${url}'>${url}</a></p>`;
          await sendEmail(result.email, "Verify Your Account", message);
          res.status(200).send({isError: false, message: "Register Success! Please Check Email to Verify", data: result});
        } catch (error) {
          console.log(error); res.status(400).send({isError: true, message: "Register failed"})
        }
    },
    verifyEmail: async (req, res) => {
        const { token } = req.query
        try {
          const checkToken = jwt.verify(token, jwtKey);
          if(!checkToken) return res.status(400).send({ isError: true, message: "Invalid token" })
          let findUser = await users.findOne({ where: { id: checkToken.id } });
        if(findUser.isVerified==1) return res.status(400).send({ isError: true, message: "Email already verified" })
          await users.update({ isVerified: 1 },{where: {id: checkToken.id}}) 
          res.status(200).send({isError: false, message: "Verification success"});
        } catch (err) {
          console.log(err);
          return res.status(400).send({ isError: true, message: "Verification failed" })
        }
    },
    getUserDetail: async (req, res) => {
        try {
            const userDetail = await users.findOne({where: {id: req.params.id}, include: [{model: profiles}]});
            if (!userDetail) {
                return res.status(400).send({isError: true, message: `User detail not found`})
            }
            res.status(200).send({isError: false, message: "Get user detail success", data: userDetail});
        } catch (error) {
            console.log(error);
            res.status(400).send({isError: true, message: "Get user detail failed"})}
    },
}