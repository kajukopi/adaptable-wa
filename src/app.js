// Import Koa and necessary middlewares
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// Initialize a new Koa application
const app = new Koa();
const router = new Router();

// Middleware to handle request parsing
app.use(bodyParser());

// Simple route to handle GET requests
router.get('/', async (ctx) => {
  ctx.body = 'Hello, Koa!';
});

// Route to handle POST requests
router.post('/data', async (ctx) => {
  const data = ctx.request.body;
  ctx.body = {
    message: 'Data received successfully',
    data: data
  };
});

// Use the router middleware
app
  .use(router.routes())
  .use(router.allowedMethods());

// Start the server
module.exports = app
