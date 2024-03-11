const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const mongourl = process.env.MONGO_URL;

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
});
const restaurant = require('./routes/restaurantRoute')
app.use('/restaurant', restaurant);
const adminLogin = require('./routes/adminRoute')
app.use('/admin',adminLogin)
//databalse ga ulanish 
mongoose.set('strictQuery', true);
mongoose.connect(mongourl)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server ${port} portda ishga tushdi va MongoDB ga ulandi`);
        });
    })
    .catch(err => console.log(err))
