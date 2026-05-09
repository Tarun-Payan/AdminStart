import express from 'express';

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send("Hello world hello")
})

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
