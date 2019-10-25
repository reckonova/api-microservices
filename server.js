const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors()); 
app.use(express.static('public'));


app.get("/", function (req, res,next) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/timestamp/', function (req, res, next) { 
  let date_string = new Date(Date.now());
  let date_time = date_string.toUTCString(); 
  var timestamp = { "unix": date_string.getTime(),"utc": date_string.toUTCString()}
  res.json(timestamp);
})


app.route('/api/timestamp/:date_string?').get( function (req, res, next) { 
   var date_string = null;
    if (req.params.date_string !== undefined) {
      var unixTimestamp = parseInt(req.params.date_string*1);
      if (isNaN(unixTimestamp)) {
        date_string = new Date(req.params.date_string);
      } else {
        date_string = new Date(unixTimestamp);
      }
      
    } 
  let numberDate = new Date(date_string).getTime(); 
  let letterDate = new Date(date_string).toUTCString(); 
  
   var response = date_string == "Invalid Date" ? 
      { error: "Invalid Date" } :
      { "unix": numberDate,
        "utc": letterDate
      };
    
    res.json(response);
  res.json({numberDate: numberDate, letterDate: letterDate});
})




var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

listener;