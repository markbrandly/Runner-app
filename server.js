var http = require("http")
var express = require("express")
var jade = require('jade')
var helmet = require('helmet')
var runners = require('./utilities/getRunnerData.js')
require('./gulpfile.js')

var app = express();


app.use(express.static('./dist'))
app.use(helmet())
app.set('views','./dev/views')
app.set('view engine', 'jade')



app.get('/util/runnerdata',function(req,res){
  runners.runnerdata(req.query.id,function(data){res.json(data)})
})

app.get(['/','/*'], function(req,res){
  res.sendFile('./dist/index.html',{"root":__dirname})
})

var server = app.listen(3000, function(){
  var host = server.address().address
  var port = server.address().port

  console.log('example app listening at http://localhost:%s', port)
})