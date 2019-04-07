const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const PORT = process.env.PORT || 4200;


const routes = require("./routes/index");

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/', routes)

app.get('*', function(req,res) {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, function() {
  console.log("Server is running on Port: ", PORT);
})
