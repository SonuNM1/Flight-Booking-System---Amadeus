
const express = require("express")
const router = express.Router()

const {fetchAccessToken} = require("../controllers/amadeusController")

// Route to get amadeus access token 

router.get("/get-token", fetchAccessToken)

module.exports = router  