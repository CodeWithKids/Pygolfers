const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mock-db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors, etc.)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/api/users/:username', (req, res) => {
  const username = req.params.username;
  const users = router.db.get('users').value();
  const user = users.find(u => u.username === username);
  
  if (user) {
    res.jsonp(user);
  } else {
    res.status(404).jsonp({
      error: "User not found"
    });
  }
});

// Use default router
server.use(router);

// Start server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
  console.log(`Try accessing: http://localhost:${PORT}/api/users/pygolfer123`);
});
