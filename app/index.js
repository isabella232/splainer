const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const DIST = path.join(path.dirname(__dirname), 'node_modules');
const STATICS = ['scripts', 'styles', 'images', 'views'];

const elasticsearchUrl = function () {
  return process.env.ELASTICSEARCH_URL || 'http://quepid-elasticsearch.dev.o19s.com:9206';
}

const auth = function () {
    if (process.env.ELASTICSEARCH_USER && process.env.ELASTICSEARCH_PASSWORD) {
      console.log("found ES credentials for user " + process.env.ELASTICSEARCH_USER);

      return process.env.ELASTICSEARCH_USER + ':' + process.env.ELASTICSEARCH_PASSWORD;
    }

    return undefined;
}

const proxyServer = createProxyMiddleware('/es_proxy', { 
    target: elasticsearchUrl(), 
    auth: auth(),
    pathRewrite: {'^/es_proxy' : ''} 
  }
);

const renderIndex = function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}

const app = express();

// Define statics
app.use('/node_modules', express.static(DIST));
STATICS.forEach(function(static) {
    app.use(`/${static}`, express.static(path.join(__dirname, static)) )
  }
);

// Define proxy
app.use('/es_proxy', proxyServer);

app.get('/health', function(req, res) {
  res.send({'STATUS': 'OK'});
});

// Render index
app.get('/', renderIndex);

app.listen(9000, () => {
  console.log("Starting server at port 9000");
});
