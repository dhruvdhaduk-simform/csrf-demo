const express = require('express');
const fs = require('fs');

const PORT = 8000;

const app = express();

app.get('/', (req, res) => {
    const page = fs.readFileSync('frontend.html', 'utf-8');
    res.send(page);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));