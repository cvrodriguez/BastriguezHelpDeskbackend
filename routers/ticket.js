
const { Router } = require("express");
const Ticket = require("../models").ticket;
const User = require("../models").user;
const Comment = require("../models").comment;


const router = new Router();

router.get('/tickets', async (req, res, next) => {
    try {
        const response = await Ticket.findAll()

        if (!response) {
            res.status(404).send("Tickets  does not exist");
        }

        res.json(response)

    } catch (error) {
        console.log(error)
    }
})

router.get('/tickets/filters', async (req, res, next) => {
    const { severity, state } = req.query

    try {
        let response = []
        if (!severity && !state) {
            response = await Ticket.findAll()
        } else if (!severity && state) {
            response = await Ticket.findAll(
                { where: { state: state } })
        } else if (!state && severity) {
            response = await Ticket.findAll(
                { where: { severity: severity } })
        } else if (severity && state) {
            response = await Ticket.findAll({
                where: {
                    severity: severity, state: state
                }
            })
        }

        if (!response) {
            res.status(404).send("Tickets  does not exist");
        }
        
        res.json(response)

    } catch (error) {
        console.log(error)
    }
})


router.post('/tickets', async (req, res, next) => {
    try {
        const { subject, description, severity, state, assignedTo, reportedBy } = req.body

        if (!subject || !description || !assignedTo || !reportedBy || !assignedTo || !reportedBy) {
            return res
                .status(400)
                .send({ message: "Please provide required data" });
        }

        const response = await Ticket.create({
            subject, description, severity, state, assignedTo, reportedBy
        })

        res.status(201).json(response);

    } catch (error) {
        console.log(error)
    }
})

router.get('/tickets/:id', async (req, res, next) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(404)
                .send({ message: "Ticket do not found" });
        }
        const response = await Ticket.findByPk(id, {
            include: [{ model: Comment }]
        })

        res.status(201).json(response);

    } catch (error) {
        console.log(error)
    }
})

router.patch('/tickets/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { subject, severity, state, description, reportedBy, assignedTo } = req.body

        if (!id) {
            return res.status(404)
                .send({ message: "Ticket do not found" });
        }

        const ticket = await Ticket.findByPk(id)
        const response = await ticket.update({
            subject, severity, state,
            description, reportedBy, assignedTo
        })

        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

module.exports = router;