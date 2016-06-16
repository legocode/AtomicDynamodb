# The POC to test if the conditional update is meeting the requirement of atomic dynamodb

To test this repository, simply `npm install && npm start`.

Create your dynamodb demo table `User`.

```
{
  UserName: "leonli",
  Password: "dj423j55",
  "SendOut": "false" // the value must be false for the testing purpose
}
```
Enjoy with your benchmark tool.
`ab -c 100 -n 200 http://localhost:3000/bool`

For more information, please check `index.js`.
