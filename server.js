const express = require('express');
const api = require('./api/index');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

const PORT = process.env.PORT || 3001;


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`);
});

app.use(express.static('public'));

app.listen(PORT, () => console.log(`We are live through ${PORT}`))