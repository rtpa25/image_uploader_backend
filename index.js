/** @format */

const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

const app = express();
cloudinary.config({
  cloud_name: 'dmyxlcu3s',
  api_key: '335326774527259',
  api_secret: '2J6-6776QNsHzG1m4cXzLbGhhBo',
});

//templating engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

app.get('/myget', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post('/mypost', async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  //##single image uplaod
  // let file = req.files.samplefile;
  // result = await cloudinary.uploader.upload(file.tempFilePath, {
  //   folder: 'users',
  // });

  //##multiple images upload
  let imageArray = [];
  let result;
  if (req.files) {
    for (let i = 0; i < req.files.samplefile.length; i++) {
      result = await cloudinary.uploader.upload(
        req.files.samplefile[i].tempFilePath,
        {
          folder: 'users',
        }
      );
      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
    imageArray,
  };
  console.log(details);
  console.log(result);
  res.send(req.body);
});

//just to render the forms
app.get('/mygetform', (req, res) => {
  res.render('getform');
});

app.get('/mypostform', (req, res) => {
  res.render('postform');
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
