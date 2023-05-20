require('dotenv').config();
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role) => {
   return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
      expiresIn: '24h',
   });
};

class UserController {
   async register(req, res, next) {
      try {
         const { email, password, role } = req.body;

         if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'));
         }

         const candidate = await User.findOne({ where: { email } });
         if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'));
         }

         const hashPassword = await bcrypt.hash(password, 5);
         const user = await User.create({ email, role, password: hashPassword });
         await Basket.create({ userId: user.id });
         const token = generateJwt(user.id, email, user.role);

         return res.json(token);
      } catch (error) {}
   }

   async login(req, res, next) {
      try {
         const { email, password } = req.body;

         if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'));
         }

         const user = await User.findOne({ where: { email } });
         if (!user) {
            return next(ApiError.internal('User with this email address does not exist'));
         }

         const compatePassword = bcrypt.compareSync(password, user.password);
         if (!compatePassword) {
            return next(ApiError.internal('Incorrect password'));
         }

         const token = generateJwt(user.id, email, user.role);
         return res.json(token);
      } catch (error) {}
   }

   async checkAuth(req, res) {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json(token);
   }
}

module.exports = new UserController();
