const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const bling = fs.readFileSync(`${__dirname}/../client/client2.html`);
const bird = fs.readFileSync(`${__dirname}/../client/client3.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getBling = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html'});
    response.write(bling);
    response.end();
};

const getBird = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html'});
    response.write(bird);
    response.end();
};

module.exports = {
    getIndex,
    getBling,
    getBird
};
