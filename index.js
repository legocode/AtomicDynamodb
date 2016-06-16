var express = require('express');
var app = express();
var AWS = require('aws-sdk');
AWS.config.region = "us-west-2"
var dynamodb = new AWS.DynamoDB();
var params = {
  TableName: "User",
  Key: {
    UserName: {S: "leonli"}
  }
}


app.get('/', function (req, res) {
  dynamodb.getItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      var oldPassword = data.Item.Password.S;
      console.log("The original password would be => ", oldPassword);
    }

    var newPassword = Math.random().toString(16).substr(2);
    console.log("The new generated password would be => ", newPassword);
    var paramsUpdate = {
      TableName: "User",
      Key: {
        UserName: {S: "leonli"}
      },
      ConditionExpression: "Password = :old",
      UpdateExpression: "set Password = :new",
      ExpressionAttributeValues: {
        ":old": {S: oldPassword},
        ":new": {S: newPassword}
      }
    }
    dynamodb.updateItem(paramsUpdate, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        dynamodb.getItem(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
           console.log("After update, the new data now is => ", data); 
           res.send(data);
          }
        });
      }
    });

  });
});

app.get('/bool', function (req, res) {
  dynamodb.getItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      var oldBool = data.Item.SendOut.S;
      console.log("The original value would be => ", oldBool);
    }
    if(oldBool === "true") {
      console.log("The message has been sent, do nothing");
      res.status(400).send("nothing to do");
      return;
    }
    
    var paramsUpdate = {
      TableName: "User",
      Key: {
        UserName: {S: "leonli"}
      },
      ConditionExpression: "SendOut = :old",
      UpdateExpression: "set SendOut = :new",
      ExpressionAttributeValues: {
        ":old": {S: "false"},
        ":new": {S: "true"}
      }
    }
    dynamodb.updateItem(paramsUpdate, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        dynamodb.getItem(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
           console.log("After update, the new data now is => ", data); 
           res.send(data);
          }
        });
      }
    });

  });
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
