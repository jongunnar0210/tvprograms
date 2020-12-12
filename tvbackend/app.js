const express = require('express');
let request = require('request');
const moment = require('moment');
const app = express();
const port = 5000;
const DATE_FORMAT = 'YYYY-MM-DD';

app.get('/channels', (req, res) => {
  console.log('Was asked for channels');

  request('https://api.stod2.is/dagskra/api', function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('Got channels');
      res.send(body);
    } else {
      console.log(`Error getting channels: ${error}`);
    }
  });
});

app.get('/programs/:channel/:date', (req, res) => {
  let channel = req.params.channel;
  let date = req.params.date;

  console.log(`Was asked for programs. Channel: ${channel}. Date: ${date}`);

  request(`https://api.stod2.is/dagskra/api/${channel}`, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('Got programs');
      res.send(constructProgramList(JSON.parse(body), date));
    } else {
      res.send('Error code ' + error);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

function constructProgramList(programs, date) {
  let retval = [];

  for (const program of programs) {
    const programDate = moment(program.dagsetning).format(DATE_FORMAT);

    if (programDate === date) {
      // Include this program since it has the date we are asked for:
      const item = {
        dagsetning: date,
        isltitill: program.isltitill,
        upphaf: program.upphaf,
        thattur: program.thattur,
        thattafjoldi: program.thattafjoldi
      };
      retval.push(item);
    }
  }

  return retval;
}
