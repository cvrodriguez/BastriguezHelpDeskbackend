//packages
const express = require("express");
const corsMiddleWare = require("cors");


//routers
const userRouter = require('./routers/user')
const ticketRouter = require('./routers/ticket')

//constants
const { PORT } = require("./config/constants");

// Create an express app
const app = express();


// CORS middleware:  * Since our api is hosted on a different domain than our client
// we are are doing "Cross Origin Resource Sharing" (cors)
// Cross origin resource sharing is disabled by express by default
app.use(corsMiddleWare());

// express.json() to be able to read request bodies of JSON requests a.k.a. body-parser
app.use(express.json());


//routes
app.use('/users', userRouter)
app.use(ticketRouter)

//start listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});