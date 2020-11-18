const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000 ;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex: true,useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
const connection = mongoose.connection;
connection.on('error',console.error.bind(console,'connection error'));
connection.once('open', () => {
   console.log('Successfully established MongoDB Database');
})

const goodRouter = require('./routes/goods');
const storageRouter = require('./routes/storages');
const storeRouter = require('./routes/stores');

app.use('/goods',goodRouter);
app.use('/storages',storageRouter);
app.use('/stores',storeRouter);


app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});
