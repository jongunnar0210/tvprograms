const express = require('express');
const moment = require('moment');
let axios = require('axios');
const app = express();
const port = 5000;
const DATE_FORMAT = 'YYYY-MM-DD';
let baseURL = 'https://api.themoviedb.org/3/';
let apiKey = '742a69f58e9db4777ac4fce0aebd3d15';  // Jon Gunnar's API key for themoviedb.org
let imdbSearchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=';
let imdbImageBaseUrl = '';
let posterSize = '';

// GetChannels:
app.get('/channels', async (req, res, next) => {
  console.log('Was asked for channels');

  try {
    const response = await axios.get('https://api.stod2.is/dagskra/api');
    console.log('Got channels');
    res.send(response.data);
  } catch (error) {
    console.log(`Failed getting channels: ${error}`);
    next(error);
  }
});

// GetPrograms:
app.get('/programs/:channel/:date', async (req, res, next) => {
  let channel = req.params.channel;
  let date = req.params.date;

  console.log(`Was asked for programs. Channel: ${channel}. Date: ${date}`);

  // RUV has another api with other property names than all the others so handle that specifically:
  if (channel === 'RÚV') {
    try {
      const response = await axios.get('https://apis.is/tv/ruv');
      console.log('Got RUV programs');
      res.send(constructProgramListRUV(response.data.results));
    } catch (error) {
      console.log(`Error getting programs: ${error}`);
      next(error);
    }
  } else {
    try {
      const response = await axios.get(`https://api.stod2.is/dagskra/api/${channel}`);
      console.log('Got programs');

      const retval = await constructProgramListNormal(response.data, date, channel);
      res.send(retval);
    } catch (error) {
      console.log(`Error getting programs: ${error}`);
      next(error);      
    }
  }
});

async function constructProgramListNormal(programs, date, channel) {
  let retval = [];

  for (const program of programs) {
    const programDate = moment(program.dagsetning).format(DATE_FORMAT);

    if (programDate === date) {
      // Include this program since it has the date we are asked for:
      const from = moment(program.upphaf).format('HH:mm');
      const to = moment(from, 'HH:mm').add(program.slott, 'minutes').format('HH:mm');

      const item = {
        isltitill: program.isltitill,
        titill: program.titill,
        upphaf: program.upphaf,
        birta_thatt: program.birta_thatt,
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

  // Add the posters and ratings from imdb:
  for (const program of retval) {
    if (!showPostersInChannel(channel) || program.birta_thatt !== 0) continue; // For now, only fetch imdb stuff from certain channels and only if it's a movie.

    const imdbData = await axios.get(imdbSearchUrl + encodeURI(program.titill));
    if (imdbData.status !== 200) continue;

    const data = imdbData.data;
    if (data) {
      const results = data.results;
      if (results && results.length && results.length > 0) {
        const firstResult = results[0];
        if (firstResult && firstResult.poster_path) {
          program.poster_path =  `${imdbImageBaseUrl}${posterSize}${firstResult.poster_path}`;
          program.vote_average = firstResult.vote_average;
        }
      }
    }
  }

  return retval;
}

function showPostersInChannel(channel) {
  return ['stod2', 'stod3', 'bio'].includes(channel);
}

function constructProgramListRUV(programs) {
  let retval = [];

  for (const program of programs) {
    const from = moment(program.startTime).format('HH:mm');
    const to = '00:01'; // Initially set this to one minute.
    const { thattur, thattafjoldi } = getThatturRUV(program);

    const item = {
      isltitill: program.title,
      titill: program.originalTitle,
      upphaf: program.startTime,
      birta_thatt: null,  // For now I don't have a good way of telling which programs are movies so we skip posters for RUV.
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

// First we get the base config from themoviedb.org and only then we start to listen as a REST server:
async function start() {
  try {
    const response = await axios.get(`${baseURL}configuration?api_key=${apiKey}`);

    const baseConfImages = response.data.images;
    if (baseConfImages) {
      imdbImageBaseUrl = baseConfImages.secure_base_url;
      const posterSizes = baseConfImages.poster_sizes;

      // Always get the second smallest poster:
      if (posterSizes && posterSizes.length != null && posterSizes.length > 1) {
        posterSize = posterSizes[1];

        if (posterSize) {
          console.log(`imdbImageBaseUrl: ${imdbImageBaseUrl}, posterSize: ${posterSize}`);

          // Start listening as a REST server:
          app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
          });
        }
      }
    }
  } catch (error) {
    console.log(`Error getting base config from themoviedb.org: ${error}`);
  }
}

start();
