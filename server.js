let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const db = require('./app/config/db.config.js');

const expressport = 8000;

// force: true will drop the table if it already exists
let forceresync = false;

if (process.env.FORCERESYNC === "true") {
  forceresync = true;
}
if (forceresync) {
  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop table and resync');
  });  
}
else {
  db.sequelize.sync({
    force: false,
    alter: true
  }).then(() => {
    console.log('Altering table without resync');
  });
}

require('./app/route/account.route.js')(app);
require('./app/route/recipe.route.js')(app);

 
// Create the Server
const server = app.listen(expressport, function () {

  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port)
});
