const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
        message: "Login In Required!"
      });
  }
  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      if(err.name =="TokenExpiredError"){
         return res.status(403).json({
           message: "Your session is expired, please login again!",
        
      });
      }
     
    }
    req.user = user;
    next();
  });
}
module.exports={authenticateToken}