const express= require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const port=process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient } = require('mongodb');
const { query } = require('express');

const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.4yf1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});



async function run() {
    try {
      
      await client.connect();
       const database = client.db("hootstory");
       const storiesCollection = database.collection("stories");

      console.log('connect to db');

      //get stories

        app.get('/hootstory',async(req,res)=>{
          const cursor=storiesCollection.find({});
          const result=await cursor.toArray();
          res.send(result);

        });

        //delete stories

        app.delete('/hootstory',async(req,res)=>{

          const result= await storiesCollection.remove({});
          res.json(result);


        })


      console.log("Connected successfully to server");


    } finally {
     
    //  await client.close();
    }
  }
  run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('Hello hootstory');
});

app.listen(port,()=>{
    console.log(`connect to port ${port}`);
})