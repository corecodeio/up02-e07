const express = require('express');
const { server } = require('./src/config/config');
const oracle = require('./src/utils/oracle');
const app = express();
const cors = require('cors');
const cookies = require('cookie-parser');

const personRoutes = require('./src/routes/person');
const categoryRoutes = require('./src/routes/category');
const invalidRoutes = require('./src/routes/404');

app.use(cors({ origin: true, credentials: true }));
app.use(cookies());
app.use(express.json());

app.use(personRoutes);
app.use(categoryRoutes);
app.use(invalidRoutes);

oracle
  .start()
  .then(() => {
    console.log(`Oracle database connected!`);
    app.listen(server.port, () => {
      console.log(`Server is running on port: ${server.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
