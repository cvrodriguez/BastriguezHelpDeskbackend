const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");

const { SALT_ROUNDS } = require("../config/constants");
const User = require("../models/").user;
const { Router } = require("express");
const router = new Router


router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password, "email, password")

        if (!email || !password) {
            return res
                .status(400)
                .send({ message: "Please provide both email and password" });
        }

        const user = await User.findOne({ where: {email} });
        console.log(user)

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                message: "User with that email not found or password incorrect",
            });
        }

        delete user.dataValues["password"]; // don't send back the password hash
        const token = toJWT({  userId: user.id});

        return res.status(200).send({ token, user: user.dataValues });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Something went wrong, sorry" });
    }
});


//signup
router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
        return res.status(400).send("Please provide all the data require");
    }

    try {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, SALT_ROUNDS),
            role
        });

        delete newUser.dataValues["password"]; // don't send back the password hash
        const token = toJWT({ userId: newUser.id });
        res.status(201).json({ token, user: newUser.dataValues });

    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res
                .status(400)
                .send({ message: "There is an existing account with this email" });
        }
        console.log(error)
        return res.status(400).send({ message: "Something went wrong, sorry" });
    }
});

module.exports = router;