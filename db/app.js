const express = reuire('express');
const stripe = require('stripe')(sk_test_HBEgLQhaQgO9aewGSaEKTHAY00ZlGQJIcH);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server started on port ${port');
});
