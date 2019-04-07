const express = require("express");
const url = require('url')
const Router = express.Router();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ss1: true
})

Router.get('/generate', function(req, res) {
  sqlquery = `select * from PasswordAnimals`
  client.query(sqlquery, function(err, result){
    if(err) throw err;
    //generate password
    let index = Math.floor(Math.random() * result.rows.length);
    let randomFirst = result.rows[index].animal;
    index = Math.floor(Math.random() * result.rows.length);
    let randomSecond = result.rows[index].animal;
    index = Math.floor(Math.random() * result.rows.length);
    let randomThird = result.rows[index].animal;
    index = Math.floor(Math.random() * result.rows.length);
    let randomForth = result.rows[index].animal;
    index = Math.floor(Math.random() * result.rows.length);
    let randomFifth = result.rows[index].animal;



    randomPassword = {
      first: randomFirst,
      second: randomSecond,
      third: randomThird,
      forth: randomForth,
      fifth: randomFifth
    }
    res.json(randomPassword)
  })


})

Router.post('/state', function(req, res){
  const logs = req.body.logs;
  for(let i=0; i< logs.length; i++){
    let date = logs[i].date;
    let userid = logs[i].user;
    let service = logs[i].serv;
    let password = logs[i].password;
    let attempted = logs[i].typed;
    let attemptNo = logs[i].attemptNo;
    let success = logs[i].success;
    let mode = logs[i].mode;
    let time = logs[i].time;
    let sql = `Insert into Logs(date, userid, service, password, attempted, attemptNo, success, mode, time) values
                                        ('${date}','${userid}','${service}','${password}','${attempted}', '${attemptNo}', '${success}', '${mode}', '${time}')`;

    client.query(sql,  function(err, result){
      if(err) throw err;
      if(i == logs.length -1){
        client.end();
      }
    })

  }
})

Router.get('/tokens*', function(req,res){
    var urlObj = parseURL(req, res);
    //check if token exists
    client.connect();
    let user = urlObj.query['user'];
    let sql = `Select id from Tokens where id='${user}'`;

    client.query(sql,function(err, result){

      res.json(result.rows);
    })

})


function parseURL(request, response) {
  let parseQuery = true //parseQueryStringIfTrue
  let slashHost = true //slashDenoteHostIfTrue
  let urlObj = url.parse(request.url, parseQuery, slashHost)


  return urlObj
}

module.exports = Router
