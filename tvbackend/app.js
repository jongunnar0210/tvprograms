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

  // RUV has another api with other property names than all the others so handle that specifically:
  if (channel === 'RÚV') {
    console.log('We were asked for the RUV program today');
    request('https://apis.is/tv/ruv', function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log('Got RUV programs');
        res.send(constructProgramListRUV(JSON.parse(body).results));
      } else {
        res.send('Error code ' + error);
      }
    });
  } else {
    request(`https://api.stod2.is/dagskra/api/${channel}`, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log('Got programs');
        res.send(constructProgramList(JSON.parse(body), date));
      } else {
        res.send('Error code ' + error);
      }
    });
  }
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
      const from = moment(program.upphaf).format('HH:mm');
      const to = moment(from, 'HH:mm').add(program.slott, 'minutes').format('HH:mm');

      const item = {
        isltitill: program.isltitill,
        upphaf: program.upphaf,
        thattur: program.thattur,
        thattafjoldi: program.thattafjoldi,
        bannad: program.bannad,
        lysing: program.lysing,
        midill_heiti: program.midill_heiti,
        from,
        to
      };
      retval.push(item);
    }
  }

  return retval;
}

function constructProgramListRUV(programs) {
  let retval = [];

  for (const program of programs) {
    const from = moment(program.startTime).format('HH:mm');
    const to = '00:01'; // Initially set this to one minute.
    const { thattur, thattafjoldi } = getThatturRUV(program);

    const item = {
      isltitill: program.title,
      upphaf: program.startTime,
      thattur,
      thattafjoldi,
      bannad: null, // RUV's API doesn't seem to offer this except possibly inside the description and for performance sake we'll skip it for now.
      lysing: program.description,
      midill_heiti: 'RÚV',
      from,
      to
    };
    retval.push(item);
  }

  // RUV has an unusual way of specifying 'to' so we loop all over 'programs' again to set 'to' to the program that comes after it, except the last one:
  for (let index = 0; index < programs.length - 1; index++) { // Notice the -1 one here to not mess with the last one which is usually RUV's end of program.
    retval[index].to = retval[index + 1].from;
  }

  // Set the 'to' of the last RUV item to the 'from' of the previous one plus one minute:
  retval[programs.length - 1].to = retval[programs.length - 1].from;

  return retval;
}

function getThatturRUV(program) {
  const series = program.series;
  if (series) {
    return {
      thattur: series.episode,
      thattafjoldi: series.series
    };
  } else {
    return {
      thattur: null,
      thattafjoldi: null
    };
  }
}
