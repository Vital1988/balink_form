const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors')

app.use(cors())


const countries = [
    'Israel',
    'Russia',
    'USA'
];
const submited = [] ;

// GET 

app.get('/',(req,res) =>{
    res.send('Hello Vitaly');
});

app.get('/api/countries',(req,res) =>{
    res.send(countries);
});

app.get('/api/submited',(req,res) =>{
    res.send(submited);
});



// POST 

app.post('/api/customer',(req,res) => {
    
    const submit = {
        id: submited.length + 1,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        title:req.body.title,
        country:req.body.country,
        city:req.body.city,
        street:req.body.street,
        email:req.body.email,
        phone:req.body.phone
    };
    submited.push(submit);
    res.status(200).send('200 OK')
    
});







const port = process.env.PORT || 8001;
app.listen(port,()=>{
    console.log(`listen on port ${port}...`);
});
