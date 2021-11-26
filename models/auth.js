const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next){
    console.log(config.get('vidly_email'));
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denited. No token provide');

    try{
        const decode = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = decode;
        next();
    }
    catch(ex){
        res.status(400).send("Invalid token");
    }
}


module.exports = auth;