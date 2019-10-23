const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); 
app.use(express.static('public'));


app.get("/", function (req, res,next) {
  res.sendFile(__dirname + '/index.html');
});



app.route('/api/timestamp/:date_string').get( function (req, res, next) { 
  let date_string = req.params.date_string;
 
   if(!isNaN(date_string)) {
     date_string = parseInt(date_string) * 1000; 
   }
  
  let numberDate = new Date(date_string).getTime(); 
  let letterDate = new Date(date_string).toUTCString(); 
  
  res.json({numberDate: numberDate, letterDate: letterDate});
})


app.get('/api/timestamp/', function (req, res, next) { 
  let date_string = new Date(); 
  let date_time = date_string.toUTCString(); 
  res.json({"unix": date_string, "utc": date_time});
})


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});