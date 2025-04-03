const exp = require('constants');
const mustache = require('mustache');
const cookieParser = require('cookie-parser');
const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const PORT = 8000;

const app = express();

function generateCsrfToken() {
    const token =crypto.randomBytes(20).toString('hex');
    return token;
}

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get('/', (req, res) => {
    const csrfToken = generateCsrfToken();
    const htmlTemplate = fs.readFileSync('frontend.html', 'utf-8');
    const renderedHTML = mustache.render(htmlTemplate, { csrfToken });
    res.send(renderedHTML);
});

app.post('/transfer', (req, res) => {
    console.log(req.body);
    const senderName = req.body['sender-name'];
    const receiverName = req.body['receiver-name'];
    const amount = req.body.amount;
    const csrfToken = req.headers['x-csrf-token'];

    const msg = `$${amount} was transferred from ${senderName} to ${receiverName}. TOKEN : ${csrfToken}`;
    console.log(msg);
    res.send(msg);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));