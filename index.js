const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

// Middleware to parse body and cookies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

// Set headers function
function setHeaders(res) {
  res.header('P3P', 'CP="DSP LAW"');
}

// Home route
app.get('/', (req, res) => {
  res.cookie('COOKIEROOT', 'root-' + Math.random() * 1000 );
  const token = `test-${Math.floor(Math.random() * 1000)}`;
  res.render('base', { token: token });
});

// iframe-xdomain routes
app.route('/iframe-xdomain')
  .get((req, res) => {
    const token = req.query.token;
    res.cookie('COOKIE', token);
    setHeaders(res);
    res.render('frame', { token: token });
  })
  .post((req, res) => {
    const token = req.body.token;
    res.cookie('COOKIE', token);
    setHeaders(res);
    res.render('frame', { token: token });
  });

// iframe-xdomain2 routes
app.route('/iframe-xdomain2')
  .get((req, res) => {
    const token = req.query.token;
    res.cookie('COOKIE', token);
    setHeaders(res);
    res.render('frame2', { token: token });
  })
  .post((req, res) => {
    const token = req.body.token;
    res.cookie('COOKIE', token);
    setHeaders(res);
    res.render('frame2', { token: token });
  });

// iframe-xdomain routes
app.route('/path/iframe-xdomain')
  .get((req, res) => {
    const token = req.query.token;
    res.cookie('COOKIE', token);
    setHeaders(res);
    res.render('frame', { token: token });
  })
  .post((req, res) => {
    const token = req.body.token;
    res.cookie('COOKIE', token);
    setHeaders(res);
    res.render('frame', { token: token });
  });

// ajax routes
app.get('/ajax', (req, res) => {
  // Assuming you want to return the cookie value
  res.send(req.cookies['COOKIE']);
});

// popup route
app.get('/popup', (req, res) => {
  res.cookie('COOKIE', 'foo');
  res.render('popup');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
