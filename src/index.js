const express = require('express');
const app = express();

app.use(express.json())

// Routes apply.
require('./api/routes/configure.routes')(app);
require('./api/routes/main.routes')(app);

// Service activation.
app.listen(3000, () => {
  console.log(`Service started.`);
});

module.exports = app