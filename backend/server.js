const path = require('path');
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const connectMongoose = require('./config/mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/api', require('./routes/index'));

app.use((error,req,res,next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    return res.status(status).json({message: message, data:data});
})

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(process.env.PORT || 5000,() => {
    connectMongoose();
    console.log("Server is running");
});

