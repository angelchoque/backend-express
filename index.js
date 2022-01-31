const express = require('express');
const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error.handler")

const routerApi = require('./routes')

const app = express();
const port = 3000;

app.use(express.json())

const whiteList = ["http://localhost:8080", "https://myapp.dev"]
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("no permitido"))
    }
  }
}
app.use(cors(options))

app.get('/', (req, res) => {
  res.send('hello world');
})

app.get('/route-new', (req, res) => {
  res.send('Hola soy una nueva ruta o endpoint');
});

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
})
