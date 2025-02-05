const axios = require("axios")
const User = require("../models/User")

const searchFlights = async (req, res) => {

    const {userId} = req.user ;     // get the user id from JWT 
    const user = await User.findById(userId) ; 

    if(!user || !user.amadeusAccessToken){
        return res.status(400).json({
            message: 'User is not authenticated'
        })
    }

    const {origin, destination, departureDate, adults, currency} = req.body 

    if(!origin || !destination || !departureDate || !adults || !currency){
        return res.status(400).json({
            message: 'Missing required fields'
        })
    }

    const accessToken = user.amadeusAccessToken

    const searchParams = {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: departureDate,
        adults: parseInt(adults, 10),
        currencyCode: currency
    }

    try{

        const flightSearchResponse = await axios.get(
            'https://test.api.amadeus.com/v2/shopping/flight-offers', 
            {
                params: searchParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        res.json(flightSearchResponse.data)

    }catch(error){
        console.error('Error searching flights: ', error)

        res.status(500).json({
            message: 'Error searching flights'
        })
    }
}

module.exports = {searchFlights}