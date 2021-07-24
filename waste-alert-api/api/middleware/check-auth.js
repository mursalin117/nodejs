const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (token === null) return res.status(403).json({
        message: 'A token is required for authorization'
    });

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid Token'
        });
    }
};




// const jwt = require('jsonwebtoken');
// const User = require('../routes/user');

// module.exports = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization").replace("Bearer ", "");
//         // const decoded = 
//         await jwt.verify(token, process.env.JWT_KEY, function (err, decode) {
//             if (err) {
//                 return res.status(401).json({
//                     message: err.message
//                 });
//             }
//             req.userData = decode;
//         });
//         // const user = await User.findOne({
//         //     _id: decoded._id,
//         //     "tokens.token": token,
//         // });
//         // req.userData = decoded;
//         // req.token = token;
//         // req.user = user;
//         next();    
//     } catch (error) {
//         return res.status(401).json({
//             message: 'Authentication failed'
//         });
//     }
// };