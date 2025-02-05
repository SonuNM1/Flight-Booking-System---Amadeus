
const axios = require("axios")

// Fetching and caching the Amadeus API access token 

let accessToken = null
let tokenExpiry = 0

// Function to get Amadeus access token 

async function getAccessToken() {
    const currentTime = Math.floor(Date.now() / 1000);

    // Return cached token if still valid
    if (accessToken && currentTime < tokenExpiry) {
        console.log("Returning cached token");
        return accessToken;
    }

    try {
        const response = await axios.post(
            "https://test.api.amadeus.com/v1/security/oauth2/token", 
            new URLSearchParams({
                grant_type: "client_credentials",
                client_id: process.env.AMADEUS_API_KEY,
                client_secret: process.env.AMADEUS_SECRET_KEY
            }),
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
        );

        accessToken = response.data.access_token;
        tokenExpiry = currentTime + response.data.expires_in;

        console.log("New token generated: ", accessToken);

        return accessToken;
    } catch (error) {
        console.error("Error fetching access token: ", error.response?.data || error.message);
        throw new Error("Failed to get access token");
    }
}


// Controller function to return token 

const fetchAccessToken = async (req, res) => {

    try{

        const token = await getAccessToken()

        res.json({
            access_token: token
        })

    }catch(error){
         res.status(500).json({
            error: error.message
         })
    }

}


module.exports = {
    fetchAccessToken,
    getAccessToken
}
