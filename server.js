const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const notebooks = './notebooks/';
const fs = require('fs');
app.use(bodyParser.json());
app.get('/api/hello', (req, res) => {
//  res.send({ express: 'Hello From Express' });



  fs.readdir(notebooks, (err, files) => {
    ///console.log(files);

    
    res.setHeader('Content-type','text/html')

    res.set('Content-Type', 'text/html');
    res.send({ express:  files.map(file => 

      '<p style="text-align: left; "> ' + file + ' </p> <br> </br>'

    ).join('') });
    

  });
  //res.send({ express: s });
  ///console.log(s);


});

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


app.post('/api/data', (req, res) => {
  console.log(req.body.post);
  var path = "";
  path = './notebooks/' + req.body.post.substring(0,8).replace(/[/\\?%*:|"<>]/g, '-') + makeid(3) + '.txt'
  fs.writeFileSync(path, req.body.post);

});

app.listen(port, () => console.log(`Listening on port ${port}`));