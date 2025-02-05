
const express = require("express")
const router = express.Router()
const {searchFlights} = require("../controllers/flightController")
const authMiddleware = require("../middleware/authMiddleware")

router.post('/search', authMiddleware, searchFlights)

module.exports = router ; 