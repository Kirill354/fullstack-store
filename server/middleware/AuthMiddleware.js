const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
   if (req.method === 'OPTIONS') next();

   try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
         return res.status(401).json({ message: 'Unauthorized' });
      }

      const decodedData = jwt.decode(token, process.env.SECRET_KEY);
      req.user = decodedData;
      next();
   } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
   }
};
