const exp = require('constants');
const mustache = require('mustache');
const cookieParser = require('cookie-parser');
const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const PORT = 8000;

const app = express();

const csrfTokens = new Map();
const TOKEN_EXPIRY = 30 * 1000;

function generateCsrfToken() {
    const token = crypto.randomBytes(20).toString('hex');
    csrfTokens.set(token, Date.now());

    setTimeout(() => {
        csrfTokens.delete(token);
    }, TOKEN_EXPIRY);

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
    const senderName = req.body['sender-name'];
    const receiverName = req.body['receiver-name'];
    const amount = req.body.amount;
    const csrfToken = req.headers['x-csrf-token'];

    if (!csrfToken) {
        return res.send('Unauthorized Request. No CSRF token found.');
    }

    if (!csrfTokens.has(csrfToken)) {
        return res.send('Invalid or expired CSRF token.');
    }

    csrfTokens.delete(csrfToken);

    const msg = `$${amount} was transferred from ${senderName} to ${receiverName}.`;
    console.log(msg);
    res.send(msg);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));