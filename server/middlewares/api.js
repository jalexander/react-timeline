const low = require('lowdb');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const art = require('./art.json');

function setupDb() {
  const db = low();

  db.defaults({ art: [] })
    .value();

  art.forEach((item) => {
    const itemWithId = Object.assign({}, item, {
      id: uuid(),
    });
    db.get('art').push(itemWithId).value();
  });

  return db;
}

module.exports = (app) => {
  const db = setupDb();

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Pass to next layer of middleware
    next();
  });

  app.use(bodyParser.json());

  app.get('/api/art', (req, res) => {
    res.send(db.get('art').toArray().value());
  });
};
