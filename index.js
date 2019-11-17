const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getRate', function (req, res) { var mtype = req.query.mtype; var weight = req.query.weight; calculateRate(mtype, weight, function (rate) { res.render('pages/results',{ rate : rate }); }) })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))



function calculateRate(mtype, weight, callback) {

  //Letters (Stamped)
  if (mtype == 1 && weight <= 1 && weight > 0)
    callback(0.55);
  else if (mtype == 1 && weight <= 2 && weight > 1)
    callback(0.70);
  else if (mtype == 1 && weight <= 3 && weight > 2)
    callback(0.85);

  //Letters (Metered)
  if (mtype == 2 && weight <= 1 && weight > 0)
    callback(0.50);
  else if (mtype == 2 && weight <= 2 && weight > 1)
    callback(0.65);
  else if (mtype == 2 && weight <= 3 && weight > 2)
    callback(0.80);

  //Large Envelopes (Flats)
  if (mtype == 3 && weight <= 1 && weight > 0)
    callback(1.00);
  else if (mtype == 3 && weight <= 2 && weight > 1)
    callback(1.15);
  else if (mtype == 3 && weight <= 3 && weight > 2)
    callback(1.30);
  else if (mtype == 3 && weight <= 4 && weight > 3)
    callback(1.45);
  else if (mtype == 3 && weight <= 5 && weight > 4)
    callback(1.60);
  else if (mtype == 3 && weight <= 6 && weight > 5)
    callback(1.75);
  else if (mtype == 3 && weight <= 7 && weight > 6)
    callback(1.90);
  else if (mtype == 3 && weight <= 8 && weight > 7)
    callback(2.05);
  else if (mtype == 3 && weight <= 9 && weight > 8)
    callback(2.20);
  else if (mtype == 3 && weight <= 10 && weight > 9)
    callback(2.35);
  else if (mtype == 3 && weight <= 11 && weight > 10)
    callback(2.50);
  else if (mtype == 3 && weight <= 12 && weight > 11)
    callback(2.65);
  else if (mtype == 3 && weight <= 13 && weight > 12)
    callback(2.80);

  //First-Class Package Service—Retail
  if (mtype == 4 && weight <= 4 && weight > 0)
    callback(3.66);
  else if (mtype == 4 && weight <= 8 && weight > 4)
    callback(4.39);
  else if (mtype == 4 && weight <= 12 && weight > 8)
    callback(5.19);
  else if (mtype == 4 && weight <= 13 && weight > 12)
    callback(5.71);

}