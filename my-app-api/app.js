const express = require('express')
const app = express()
const port = process.env.PORT || 8080
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let liveClients = [];
const products = [
  {
    imgUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    title: "Burger",
    quantity: 1,
    price: 8.50,
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&w=1000&q=80",
    title: "Pizza",
    quantity: 1,
    price: 10.75,
  },
  {
    imgUrl: "https://images.pexels.com/photos/265393/pexels-photo-265393.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Chicken",
    quantity: 1,
    price: 18.50,
  },];

app.get('/get-products', (req, res) => {
  res.send(JSON.stringify(products));
})

app.post('/place-order', (req, res) => {
  const data = req.body;
  const orderedItems1 = data.orderedItems;
  const bill = data.grandTotal;
  const orderedItems = JSON.parse(orderedItems1);
  const processedItems = orderedItems.map(it => {
    return {
      title: it.title,
      unitPrice: it.unitPrice,
      numberOfUnit: it.numberOfPcsOrdered,
      totalCost: parseFloat(it.numberOfPcsOrdered) * parseFloat(it.unitPrice)
    }
  })
  processedItems.grandTotal = bill;
  // process this order...
  console.log(processedItems);
  res.json(processedItems);
});

app.post('/add-product', (req, res) => {
  const data = req.body;
  const product = {
    imgUrl: data.imgUrl,
    title: data.title,
    quantity: parseFloat(data.quantity) || 0,
    price: parseFloat(data.price) || 0
  };
  products.push(product)

  liveClients.forEach(it => {
    it.send(JSON.stringify(products))
  })
  res.send(JSON.stringify(products));
});


const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer(function (request, response) {

});
server.listen(8081, function () {
});

const wsServer = new WebSocketServer({
  httpServer: server
});

wsServer.on('request', function (request) {
  const connection = request.accept(null, request.origin);
  liveClients.push(connection);
  connection.on('message', function (message) {
    console.log(message);
  });

  connection.on('close', function (connection) {
    liveClients = liveClients.filter(it => it.key !== connection.key);
  });
});

app.listen(port, () => console.log(`api running at http://localhost:${port}`))