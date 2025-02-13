
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.header('Authorization') || req.headers.authorization?.split(' ')[1] 

    if(!token){
        return res.status(401).json({
            error: 'Access Denied'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded 

        next()
    }
    catch(error){
        console.log('Auth error: ', error)

        res.status(400).json({
            error: 'Invalid token'
        })
    }
}