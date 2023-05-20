require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const models = require('./models/models');
const fileUpload = require('express-fileupload');
const path = require('path');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 5000;

(async () => {
   try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('DB OK');
   } catch (error) {
      console.error('DB ERROR:', error);
   }
})();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
// routes
app.use('/api', router);
// error handling
app.use(errorHandler);

app.listen(PORT, (err) => {
   if (err) {
      return console.log(err);
   }
   console.log('Server OK');
});
