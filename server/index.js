import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import router from './routes';

const app = express();
const { NODE_ENV, PORT = 3000 } = process.env;
const isProduction = NODE_ENV === 'production';

// Middlewares
// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Body parser and helmet middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Routes
app.use(router);

// Error Handler
app.use((err, req, res, next) =>
  res.status(500).json({
    message: 'Internal server error',
    error: isProduction ? null : err,
  }),
);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;
