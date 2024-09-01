const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config.js');
const empleadoRouter = require('./app/routers/router.js');
const departamentoRouter = require('./app/routers/router.js');
const clienteRouter = require ('./app/routers/router.js')
const proveedorRouter = require ('./app/routers/router.js')
const productoRouter = require ('./app/routers/router.js')
const facturaRouter = require ('./app/routers/router.js')
const FdetalleRouter = require ('./app/routers/router.js')


const app = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

db.sequelize.sync({ force: false }).then(() => {
  console.log('Resync with { force: false }');
});

app.use('/', empleadoRouter); 
app.use('/', departamentoRouter);
app.use('/', clienteRouter);
app.use('/', proveedorRouter);
app.use('/', productoRouter);
app.use('/', facturaRouter);
app.use('/', FdetalleRouter);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos UMG" });
});

const server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
