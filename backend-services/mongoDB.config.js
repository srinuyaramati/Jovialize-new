
// module.exports = {
//     mongoDBURL: "mongodb://localhost:27017",
//     mongoDatabase: "test1"
// }

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test1";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database connected!");
  // db.close();
});