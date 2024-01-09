const jwt = require('jsonwebtoken');
const jWT_SECRETE_CODE = "fINALLY WE CALL FROM COLLEGE";
// Middleware to check JWT and authenticate user
const checkAuthentication = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  console.log(typeof(token));
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided.' });
  }

  // Verify the token
  jwt.verify(token.replace('Bearer ', ''), jWT_SECRETE_CODE, (err, decodedToken) => {
    if (err) {
      console.log("yaah ")
      return res.status(401).json({ message: 'Authentication failed: Invalid token.' });
    }

    // If the token is valid, you can access the user's data from decodedToken
    req.user = decodedToken;
    console.log(req.user);
    next(); // Proceed to the next middleware or route handler
  });
};
module.exports = checkAuthentication;