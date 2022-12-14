
const { Router } = require("express");
const Ticket = require("../models").ticket;

const router = new Router();

router.get('/tickets', async(req, res, next)=>{
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

router.post('/tickets', async(req, res,next)=>{
    try {
        const {subject,description,severity,state,assignedTo}= req.body

        if (!subject || !description || !assignedTo) {
            return res
              .status(400)
              .send({ message: "Please provide required data" });
          }

          const response = await Ticket.created({
            subject, description, severity, state
          })

          res.status(201).json(response);
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;