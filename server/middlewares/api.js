const low = require('lowdb');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const timeline = require('./timeline.json');

function setupDb() {
  const db = low();

  db.defaults({ timeline: [] })
    .value();

  timeline.forEach((item) => {
    const itemWithId = Object.assign({}, item, {
      id: uuid(),
    });
    db.get('timeline').push(itemWithId).value();
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

  app.get('/api/timeline', (req, res) => {
    res.send(db.get('timeline').toArray().value());
  });
};
