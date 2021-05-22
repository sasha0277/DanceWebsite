const express = require("express");
const path = require("path");

const app = express();


const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const port =8088;
// Define mongoose schemma 
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  

//   compiling our schema into a Model.
var Contact = mongoose.model('Contact', contactSchema);




// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('index.pug', params);
})

// app.get('/', (req, res)=>{
//     const params = { }
//     res.status(200).render('home.pug', params);
// })

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
// for sending post request to mongodb

app.post('/contact',(req,res)=>{

    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item is not saved to data")
    })

})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})