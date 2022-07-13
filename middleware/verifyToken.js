const { verifyToken } = require('../utilities/auth');

exports.authorizeToken = async (req, res, next) => {
    console.log('Hitting Middleware');
    const _id = verifyToken(req);
    if(_id){
        req.body.middlewareUserId = _id;
        return next();
    }
    else{
        return res.send(JSON.stringify({
            success : false,
            errors : 'Invalid Token'
        }));
    }
}