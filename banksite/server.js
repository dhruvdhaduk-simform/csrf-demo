const exp = require('constants');
const express = require('express');
const fs = require('fs');

const PORT = 8000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    const page = fs.readFileSync('frontend.html', 'utf-8');
    res.send(page);
});

app.post('/transfer', (req, res) => {
    const senderName = req.body.senderName;
    const receiverName = req.body.receiverName;
    const amount = req.body.amount;
    res.send(`$${amount} was transferred from ${senderName} to ${receiverName}`);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));