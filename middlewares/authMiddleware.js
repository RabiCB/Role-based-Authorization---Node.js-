const jwt = require("jsonwebtoken")

const verifyToken = async(req,res, next) => {
    let token;

   
    let authHeader = req.headers.Authorization || req.headers.authorization

     

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]
       
    
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
      
    } catch (error) {
        res.status(400).json({
            message: "Token is not valid"
        })
    }}else{
        res.status(401).json({
            message: "Auth Token is not provided"
        })
    }
}

module.exports = verifyToken