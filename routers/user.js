const { Router } = require("express");
const router = new Router
const User = require("../models").user

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .send({ message: "Please provide both email and password" });
        }

        const user = await User.findOne({ where: { password } });

        if (!user || !password) {
            return res.status(400).send({
                message: "User with that email not found or password incorrect",
            });
        }

        delete user.dataValues["password"]; // don't send back the password hash
        
        return res.status(200).send( user.dataValues);
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
            password,
            role
        });

        delete newUser.dataValues["password"]; // don't send back the password hash
        res.status(201).json(newUser.dataValues );

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