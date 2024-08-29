const db = require('./app/config/db.config.js'); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized without dropping tables');
  })
  .catch(error => {
    console.error('Error synchronizing the database:', error);
  });

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

const deptoRouter = require('./app/routes/router.js');

app.use('/', deptoRouter);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
