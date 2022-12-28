const { Router } = require("express");

const Comment = require("../models").comment;
const Ticket = require("../models").ticket;

const router = new Router();

router.post('/tickets/:ticketId/comments', async (req, res, next) => {
    try {
        const ticketId = req.params.ticketId
        const { comment, userId } = req.body

        const ticket = await Ticket.findByPk(ticketId)
        
        if (!ticket) {
            res.status(404).send("Ticket Not Found")
            return
        }
        if (!comment) {
            res.status(400).send("Missing data request")
            return
        }
        const response = await Comment.create({
            ticketId, comment, userId
            
        }) 
        res.json(response)


    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

module.exports = router;