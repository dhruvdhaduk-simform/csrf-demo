const exp = require('constants');
const express = require('express');
const fs = require('fs');

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    const page = fs.readFileSync('frontend.html', 'utf-8');
    res.send(page);
});

app.post('/transfer', (req, res) => {
    console.log(req.body);
    const senderName = req.body['sender-name'];
    const receiverName = req.body['receiver-name'];
    const amount = req.body.amount;

    const msg = `$${amount} was transferred from ${senderName} to ${receiverName}`;
    console.log(msg);
    res.send(msg);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));