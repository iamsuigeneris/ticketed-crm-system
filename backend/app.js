const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const userRouter = require("./routers/users")
const ticketRouter = require("./routers/tickets")
const handleError = require("./utils/errorHandler")
const { nextTick } = require("process")


// API security
app.use(helmet())

//handle CORS error
app.use(cors())

//Logger
app.use(morgan("tiny"))

// Set bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// use Routers
app.use("/v1/user", userRouter)
app.use("/v1/ticket", ticketRouter)

app.use((req, res, next) => {
    const error = new Error("Resources not found")
    error.status = 404

    next(error)
})
app.use((error, req, res, next) => {
    handleError(error, res)
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Backend is running on ${port}`)
})