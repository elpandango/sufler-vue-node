const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const uglifycss = require('uglifycss');

const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
// const autoprefixer = require('express-autoprefixer');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/status', function (req, res) {
    return (
        res.send({
            message: 'Hello!'
        })
    )
});

app.post('/uglify', function (req, res) {
    const content = req.body.text;
    const uglified = uglifycss.processString(
        content,
        {maxLineLen: 500, expandVars: true}
    );
    return (
        res.send({
            message: `${uglified}`
        })
    )
});

app.post('/autoprefix', function (req, res) {
    let content = req.body.text;

    postcss([ autoprefixer ]).process(content).then(function (result) {
        result.warnings().forEach(function (warn) {
            console.warn(warn.toString());
            res.send({
                message: `${warn.toString()}`
            })
        });
        // console.log(result.css);
        res.send({
            message: `${result.css}`
        })
    });
});

app.listen(process.env.PORT || 8081);