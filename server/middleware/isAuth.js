const jwt = require('jsonwebtoken') 

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization")
    if (!authHeader){
        
        req.isAuth = false
        return next()
        console.log("here")
        console.log("hello")

        console.log("he")
        
    }
    const token = authHeader.split(" ")[1]
    if(!token || token === ""){
        
        req.isAuth = false
        return next()
        
    }
    let decodedToken
    try{
        
        decodedToken = jwt.verify(token, "superTopSecret")
    }
    catch(err){
        
        req.isAuth = false
        return next()
    }
    if(!decodedToken){
        
        req.isAuth = false
        return next()
    }
    console.log("here");
    
    req.isAuth = true
    req.userId = decodedToken.userId
    
    next()

}