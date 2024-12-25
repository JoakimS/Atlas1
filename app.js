const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()


app.use(express.static('public'));
mongoose.connect(process.env.myuri)
  .then(() => {
    console.log("DB connected");
  })
 

const myschema = new mongoose.Schema({
    message: String,
    year:Number
}, { collection: 'public' });  

const Public = mongoose.model('Public', myschema);


app.get('/about', async (req, res) => {
    try {
        const data = await Public.findOne();  
        console.log("Fetched data:", data); 
        res.send(`<h1 id="message" style="
    font-size: 50px; 
    text-align: center; 
    height: 100vh; 
    margin: 0; 
    display: flex; 
    justify-content: center; 
    align-items: center;
    animation: colorChange 15s infinite;
  ">
    ${data.message}
  </h1>
  
  <style>
   
    @keyframes colorChange {
      0% {
        background-color: black;
        color: white;
      }
      25% {
        background-color: red;
        color: yellow;
      }
      50% {
        background-color: blue;
        color: orange;
      }
      75% {
        background-color: green;
        color: purple;
      }
      100% {
        background-color: black;
        color: white;
      }
    }
  </style>`);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});


app.listen(4400, () => {
    console.log("App is running on port 4400");
});
