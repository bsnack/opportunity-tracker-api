const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Enable CORS for all origins
server.use(cors());

// Use default middlewares (logger, static, cors)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use body-parser
server.use(jsonServer.bodyParser);

// Use default router
server.use(router);

// Get port from environment or use 3001
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Resources available at http://localhost:${PORT}/opportunities`);
});