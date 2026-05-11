import express from 'express';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const app = express();

const hostname = '127.0.0.1';
const port = 3000;

const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL!,
    ssl: true
  }
});

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send("Hello world hello")
})

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
