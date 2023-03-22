const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');
require("dotenv").config()
const {USERNAME,PASSWORD}=process.env
const uri = "mongodb+srv://"+USERNAME+":"+PASSWORD+"@cluster0.z466n73.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object ss 
  client.close();
});