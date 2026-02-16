const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/task'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});