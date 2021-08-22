const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const dotenv = require('dotenv')
const userRouter = require("./routers/users")
const ticketRouter = require("./routers/tickets")
const handleError = require("./utils/errorHandler")


const app = express()

// API security
app.use(helmet())

//handle CORS error
app.use(cors())

dotenv.config()

// Set bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// MongoDB connnection setup
const mongoose = require("mongoose")

mongoose.connect(, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
})

if (process.env.NODE_ENV !== "production") {
    const mDb = mongoose.connection
    mDb.on("open", () => {
        console.log("MongoDB is connected")
    })
    mDb.on("error", (error) => {
        console.log(error)
    })
    //Logger
    app.use(morgan("tiny"))
}

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