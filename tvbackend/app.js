const express = require('express');
let request = require('request');
const app = express();
const port = 5000;

app.get('/channels', (req, res) => {
  request('https://api.stod2.is/dagskra/api', function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});

app.get('/programs/:channel/:date', (req, res) => {
  let channel = req.params.channel;
  let date = req.params.date;

  request(`https://api.stod2.is/dagskra/api/${channel}`, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.send('Error code ' + response.statusCode);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
