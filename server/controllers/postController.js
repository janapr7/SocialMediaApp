const db = require("../models");
const posts = db.Post;
const users = db.User;
const profiles = db.Profile;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET_KEY;

module.exports = {
    getPostDetail: async (req, res) => {
        try {
            const postDetail = await posts.findOne({where: {id: req.params.id}, include: [{model: users, include: {model: profiles}}]});
            if (!postDetail) {
                return res.status(400).send({isError: true, message: `Post detail not found`})
            }
            res.status(200).send({isError: false, message: "Get post detail success", data: postDetail});
        } catch (error) {
            console.log(error);
            res.status(400).send({isError: true, message: "Get post detail failed"})}
    },
}