const express = require('express');
const app = express();
port = 8000;
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);
const db = require('./config/mongoose');
app.use(express.urlencoded());
app.use('/',require('./routes'));
app.use(express.static('./assets'));
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.json());

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.listen(port,function(err){
    if(err){
        console.log(`error in running the ${port}`);
        return;
    }
    console.log(`Server is running @ ${port}`);
})
