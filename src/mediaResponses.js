const fs = require('fs');
const path = require('path');

let file = '';

const getPath = (fileName) => {
  file = path.resolve(__dirname, fileName);
};

const setup = (request, response, fileType) => {
  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    let { range } = request.headers;

    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': fileType,
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

const getParty = (request, response) => {
  getPath('../client/party.mp4');
  setup(request, response, 'video/mp4');
};

const getBling = (request, response) => {
  getPath('../client/bling.mp3');
  setup(request, response, 'audio/mpeg');
};

const getBird = (request, response) => {
  getPath('../client/bird.mp4');
  setup(request, response, 'video/mp4');
};

module.exports = {
  getParty,
  getBling,
  getBird,
};
