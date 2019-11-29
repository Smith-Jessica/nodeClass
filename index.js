const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/takeQuiz', function (req, res) { buildQuiz(function (quiz, currQ) { res.render('pages/questions', { quiz: quiz, currQ: currQ }); }) })
  .get('/getRate', function (req, res) { res.render('pages/form'); })
  //.get('/getMovie', function (req, res) { res.render('pages/search');})
  .get('/results', function (req, res) { var mtype = req.query.mtype; var weight = req.query.weight; calculateRate(mtype, weight, function (rate) { res.render('pages/results', { rate: rate }); }) })
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


class Question {

  constructor(question, correct_answer, incorrect_answers) {
    this.question = question;
    this.correct_answer = correct_answer;
    this.score = 5;
    this.incorrect_answers = incorrect_answers;
  }
  getText() {
    return this.question;
  }
  getAnswers() {
    let choices = new Array();

    for (let i = 0; i < 4; i++) {
      if (i == 3) {
        choices[i] = this.correct_answer;
      }
      else {
        choices[i] = this.incorrect_answers[i];
      }

    }

    return choices;
  }
  getScore() {
    return this.score;
  }
  getCorrectAnswer() {
    return this.correct_answer;
  }

}

function buildQuiz(callback) {
  //AJAX to get json file for quiz questions
  //if (first) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://opentdb.com/api.php?amount=2&type=multiple");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // var question = new Question();
        var obj = JSON.parse(this.responseText);//this will return 10 questions in JSON format

        if (obj.response_code == 0) {
          var q1 = Object.assign(new Question(obj.results[0].question, obj.results[0].correct_answer, obj.results[0].incorrect_answers), obj.results[0]);
          var q2 = Object.assign(new Question(obj.results[1].question, obj.results[1].correct_answer, obj.results[1].incorrect_answers), obj.results[1]);
          /*var q3 = Object.assign(new Question(obj.results[2].question, obj.results[2].correct_answer, obj.results[2].incorrect_answers), obj.results[2]);
          var q4 = Object.assign(new Question(obj.results[3].question, obj.results[3].correct_answer, obj.results[3].incorrect_answers), obj.results[3]);
          var q5 = Object.assign(new Question(obj.results[4].question, obj.results[4].correct_answer, obj.results[4].incorrect_answers), obj.results[4]);
          var q6 = Object.assign(new Question(obj.results[5].question, obj.results[5].correct_answer, obj.results[5].incorrect_answers), obj.results[5]);
          var q7 = Object.assign(new Question(obj.results[6].question, obj.results[6].correct_answer, obj.results[6].incorrect_answers), obj.results[6]);
          var q8 = Object.assign(new Question(obj.results[7].question, obj.results[7].correct_answer, obj.results[7].incorrect_answers), obj.results[7]);
          var q9 = Object.assign(new Question(obj.results[8].question, obj.results[8].correct_answer, obj.results[8].incorrect_answers), obj.results[8]);
          var q10 = Object.assign(new Question(obj.results[9].question, obj.results[9].correct_answer, obj.results[9].incorrect_answers), obj.results[9]);
*/
          var quiz = [q1, q2]// q3, q4, q5, q6, q7, q8, q9, q10];
          
          //console.log("this means that the ajax request worked just fine.");
          //console.log(quiz + "  ", currQ);
          //remove the 'Take Quiz' Button
          //removeButton("takeQuiz");
          //display the quiz
          
          //nextQuestion(quiz, currQ);
          callback(quiz, 0);
        }
        else {
          console.log("Error fetching quiz questions");
        }

      } else {
        
      };
    
    }
  //} else {

  //}

}

