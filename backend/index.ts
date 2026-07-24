// IMPORTANT: init.js must be first — it calls extendZodWithOpenApi(z)
// which patches the Zod prototype. All schema files that call .openapi()
// must be imported AFTER this.
import "./src/openapi/init.js";
import "./src/openapi/auth.openapi.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import express from 'express';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { router as apis } from './src/routes/api.js';
import swaggerUi from 'swagger-ui-express';
import { generateOpenApiDocument } from "./src/openapi/document.js";
import { env } from "node:process";
import cors from "cors";

const app = express();

const hostname = env.HOST_URL || '127.0.0.1';
const port = env.PORT || 3000;

const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL!,
    ssl: true
  }
});

app.use(cors({
  origin: env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'))

// Generate the OpenAPI document AFTER all openapi registration side-effects
const openApiDocument = generateOpenApiDocument('http://' + hostname + ':' + port.toString());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument)
);

app.get("/swagger.json", (_, res) => {
    res.json(openApiDocument);
});

app.use('/api', apis);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send("Hello world hello");
});

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

export default app;
