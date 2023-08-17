const db = require("../models");
const users = db.User;
const profiles = db.Profile;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET_KEY;

module.exports = {
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