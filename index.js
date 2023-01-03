let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7800;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.LiveMongo;
let cors = require('cors')
let bodyParser = require('body-parser')
let db;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('assignment');
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })

})

//list of mealtype
//query3
app.get('/restaurants',(req,res)=>{
    db.collection('restaurant').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//List of restaurant
//query1
app.get('/widget',(req,res)=>{
db.collection('mealtype').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//list of restaurant wrt city
//query2
app.get('/:city',(req,res)=>{
    let city=req.params.city;
    db.collection('restaurant').find({city_name:city}).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })

})
