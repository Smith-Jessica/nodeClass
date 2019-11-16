const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getRate', (req, res) => res.render('pages/results'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


  function calculateRate(mtype, weight) {
  switch(mtype) {
    case '1':
      //Letters (Stamped)
      if(weight <= 1 && weight > 0) {
        return 0.55;
      }
      else if(weight <= 2 && weight > 1) {
        return 0.70;
      }
      else if(weight <= 3 && weight > 2) {
        return 0.85;
      }
      else {
        return 0;
      }
    case '2':
       //Letters (Metered)
       if(weight <= 1 && weight > 0) {
        return 0.50;
      }
      else if(weight <= 2 && weight > 1) {
        return 0.65;
      }
      else if(weight <= 3 && weight > 2) {
        return 0.80;
      }
      else {
        return 0;
      }
    case '3':
       //Large Envelopes (Flats)
       if(weight <= 1 && weight > 0) {
        return 1.00;
      }
      else if(weight <= 2 && weight > 1) {
        return 1.15;
      }
      else if(weight <= 3 && weight > 2) {
        return 1.30;
      }
      else if(weight <= 4 && weight > 3) {
        return 1.45;
      }
      else if(weight <= 5 && weight > 4) {
        return 1.60;
      }
      else if(weight <= 6 && weight > 5) {
        return 1.75;
      }
      else if(weight <= 7 && weight > 6) {
        return 1.90;
      }
      else if(weight <= 8 && weight > 7) {
        return 2.05;
      }
      else if(weight <= 9 && weight > 8) {
        return 2.20;
      }
      else if(weight <= 10 && weight > 9) {
        return 2.35;
      }
      else if(weight <= 11 && weight > 10) {
        return 2.50;
      }
      else if(weight <= 12 && weight > 11) {
        return 2.65;
      }
      else if(weight <= 13 && weight > 12) {
        return 2.80;
      }
      else {
        return 0;
      }
    case '4':
          //First-Class Package Service—Retail
          if(weight <= 4 && weight > 0) {
           return 3.66;
         }
         else if(weight <= 8 && weight > 4) {
           return 4.39;
         }
         else if(weight <= 12 && weight > 8) {
           return 5.19;
         }
         else if(weight <= 13 && weight > 12) {
           return 5.71;
         }
         else {
           return 0;
         }
  }
  }