const express = require("express");
const app = express();
const path = require("path");

const PORT = '3000';
const URLS = [
  'home',
  'aboutme',
  'projects',
  'contact'
]
function urlMatches(urlParts) {
  return URLS.some(url => url === urlParts[1]);
}

function routeHandler(req, res, next) {
  const urlRequested = req.url;
  const urlParts = urlRequested.split('/');

  if (!urlMatches(urlParts)) {
    return next(res.sendFile(path.join(__dirname + '/src/404.html')));
  }
  next();
}

function errorHandler (err, req, res, next) {
  if (err == '404') {
    res.send('jo')
  }
}

app.use(express.static('public'));

app.use(routeHandler);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/src/index.html'));
})



app.listen(process.env.PORT || PORT,
  () => console.log("Server running at port: " + PORT)
);