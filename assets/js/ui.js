'use strict';

let rightOptionIndex;
let isLearnMode;
let testMark;
let historyIndex;
let isHistorySave = true;
let isShuffle;
let isAnswerDone = false;


var fff = [test]

//const testList = [test_5b, test_6b, test_6e, micro_5, micro_6, test_ot, test_maxim, test];


class CurrentTest {
   constructor(test) {
     this.index = test
   }
}

class Counter {
  constructor(index) {    
    this.index = index
  }
}

class WrongAnswers {
   constructor(answer) {
     this.answer = answer
   }
}


class Errors {  
  errors = []  
  addError(error) {   
    this.errors.push(error)
  }
}

const wrongAnswers = new Errors();
const currentIndex = new Counter(0);
const currentTest = new CurrentTest();

//вспомогательная функция
function putToCache(elem, cache) {
  if (cache.indexOf(elem) !== -1) {
    return;
  }
  let i = Math.floor(Math.random() * (cache.length + 1));
  cache.splice(i, 0, elem);
}

//функция, возвращающая свеженький, компаратор
function madness() {
  let cache = [];
  return function(a, b) {
    putToCache(a, cache);
    putToCache(b, cache);
    return cache.indexOf(b) - cache.indexOf(a);
  };
}

//функция перемешивания
function shuffle(arr) {  
  
    let compare = madness();
    return arr.sort(compare);
  
}

function showErrors(id) {

  let indexes =  wrongAnswers.errors[id];

  document.getElementById('test').style.display = 'block';
  
  const index = indexes[0];
  
  const chosenIndex = indexes[1]; 
  
  let answerButtonBorder;
  for (var i = 0; i < 4; ++i) {
    answerButtonBorder = 'none';
    if (currentTest.test[index][1][i][1] == 1) {
      answerButtonBorder = 'var(--right-answer-border)';
    }

    document.getElementById('option' + i).style.border = answerButtonBorder;
    document.getElementById('option' + i).innerHTML = currentTest.test[index][1][i][0];
    document.getElementById('option' + i).disabled = true;
  }
  document.getElementById('option' + chosenIndex).style.border = 'var(--wrong-answer-border)';
  document.getElementById('question').innerHTML = currentTest.test[index][0];
}

function updateQuestionBlock() {
 
  let currentQuestionBlock = currentTest.test[currentIndex.index];     
  
  shuffle(currentQuestionBlock[1]);  
  
  for (var i = 0; i < 4; ++i) {
    if (currentQuestionBlock[1][i][1] == 1) {
      rightOptionIndex = i;
    }
    document.getElementById('option' + i).innerHTML = currentQuestionBlock[1][i][0];
    document.getElementById('option' + i).style.border = 'none';
    document.getElementById('option' + i).disabled = false;
  }
  document.getElementById('question').innerHTML = currentQuestionBlock[0];

  document.getElementById('counter').innerHTML = `Вопрос: ${currentIndex.index + 1}/${currentTest.test.length}`;
  
}

function setTrainingMode(optionIndex) {
  
  document.getElementById('button_next').style.display = "inline-block";

  let borderColor = '';
   
  if (currentTest.test[currentIndex.index][1][optionIndex][1] == 1) {
   
    borderColor = "var(--right-answer-border)";
    
  } else {
   
    borderColor = "var(--wrong-answer-border)";
    
    document.getElementById('option' + rightOptionIndex).style.border = "var(--right-answer-border)";
  }

    document.getElementById('option' + optionIndex).style.border = borderColor;  
      
  for (let element of document.getElementById('test').children) {
    element.disabled = true;
  }
    
}



function calcRightAnswers(questionsQuantity, errorsQuantity ) {

  let rightAnswersQuantity = Math.round(questionsQuantity - errorsQuantity);

  let percent = Math.round(rightAnswersQuantity * 100 / (questionsQuantity));

  return { rightAnswers: rightAnswersQuantity, errorsPercent: percent };
}



function showTestResult(isTestFinished) {
  
  if(currentIndex.index === 0 || isAnswerDone === false) {
    showLevels();
    return;
  }
  
  // let testState = '';
  // let state = ''; 

  let testState, questionQuantity, state = '';
 // let state = ''; 

  if (localStorage.getItem(testMark)) {
   
    getErrorsArray();

    //alert(wrongAnswers)
  }
 

  //let questionQuantity = '';
 
   

  if (isTestFinished === false) {

   // testState = `<br>Тест остановлен.<br>Пройдено вопросов: ${currentQuestionIndex} из ${currentTest.length}<br>`;
     state = 'остановлен';
     questionQuantity = currentIndex.index;
     
  }

  else {
   
    state = 'завершен';
    questionQuantity = currentIndex.index + 1;
  }

  testState = `<br>Тест ${state}.<br>Пройдено вопросов: ${questionQuantity} из ${currentTest.test.length}<br>`;


  const { rightAnswers, errorsPercent } = calcRightAnswers(questionQuantity, wrongAnswers.errors.length);
  

  let success = '';

  if(state === 'завершен') {
      success = '<br>Тест успешно пройден!<br>';    
  }
    
  const unsuccess = '<br>Ваши ошибки:<br>';

  let result = `${testState}Правильных ответов:  ${rightAnswers} из ${questionQuantity} (${errorsPercent}%)`;

  result += (errorsPercent < 100) ? unsuccess : success;
  
  document.getElementById('result').innerHTML = result;

  for (var index = 0; index < wrongAnswers.errors.length; ++index) {
    const btn = document.getElementById('errors');
    btn.innerHTML += `<button id="${index}" class="error_button">${index + 1}</button>`;
  }
}



document.addEventListener("click", function(event) {
  const buttonClass = event.target.className;

  const buttonId = event.target.id;
  
  if (buttonClass == "error_button") {
    //const buttonId = event.target.id;

    const links = document.querySelectorAll(".error_button");

   // alert(buttonId)
    //showErrors(wrongAnswers[buttonId]);
    showErrors(buttonId);

    links.forEach(link => {
      link.setAttribute("style", "background:`:root { --main-bg-color}`");

    });
    document.getElementById(buttonId).style.background = "var(--error-btn-color)";
  }

  // if(button_class == "count_button") {   
  //   questions_count = event.target.value; 
  //   const count_buttons = document.querySelectorAll(".count_button");         
  //   count_buttons.forEach(count_button => {    
  //    count_button.setAttribute("style", "background: var(--main-bg-color)");      
  //   });        
  //   document.getElementById(event.target.id).style.border = "var(--right-answer-border)";
  // }

  if (buttonClass == "font-size-change") {
    
     chageFontSize(buttonId);
  }


});


//переход на главную страницу,нажата кнопка На главную
button_home.addEventListener("click", function(event) {

  const buttonText = event.target.textContent

  if (buttonText == "Завершить") {

    showResultsPage();
    showTestResult(false);
    
    // if(isShuffle === true) {
    //   localStorage.removeItem(testMark);
    // }

      
  }
  if (buttonText == "На главную") { 

    isAnswerDone = false;
    
    showLevels();

  }

  // if(isShuffle === true) {
  //  // alert(isShuffle)
  //   localStorage.removeItem(testMark);
  // }

  if(isShuffle) {
   
    localStorage.removeItem(testMark);
  }
  
  currentIndex.index = 0;


})

button_next.addEventListener("click", function() {

  updateQuestionBlock();
  document.getElementById('button_next').style.display = "none";

})



function saveTestHistory(optionIndex) { 

  //alert(optionIndex + "   " + rightOptionIndex)

  const savedItem = localStorage.getItem(testMark);

  let wrongOption = ''

  if (optionIndex != rightOptionIndex) {

    wrongOption = `[${currentIndex.index},${optionIndex}]`;
    //alert(optionIndex + "   " + rightOptionIndex)
  }
  

  if(savedItem == null){

   // alert("nulldata")
    
    localStorage.setItem(testMark, `${currentIndex.index}$${wrongOption}`);
    
  } else {

        
      let history = savedItem.split("$");

      let historyData = history[1];

    //alert(history[0])

    if (history[0] <= currentTest.test.length) {

      let newData = '';

      if (historyData.length != 0 && wrongOption.length != 0) {

        historyData += "; ";

      }

     // alert(wrongOption.length)
      if (wrongOption.length == 0) {        

        
        newData = `${currentIndex.index}$${historyData}`;

      } else {

        newData = `${currentIndex.index}$${historyData}${wrongOption}`;
       
      }

     // saveItems(testMark, newData);
      localStorage.setItem(testMark, newData);

    }

  }
 

}


function check(optionIndex) {  

  isAnswerDone = true; 
  
  //alert(currentIndex.index)
 
  if (currentIndex.index === currentTest.test.length - 1) {  
   
    finilizeTest(optionIndex);    
   
    return;

  }
  // //  LearnMode   
  // if (isLearnMode === true && optionIndex != rightOptionIndex) {     
    
  //   setTrainingMode(optionIndex);
  //   return;
  // } 

  if(isHistorySave){   
    saveTestHistory(optionIndex);
  }
  
  

  //  LearnMode   
  if (isLearnMode === true && optionIndex != rightOptionIndex) {     
    setTrainingMode(optionIndex);
    currentIndex.index++;
    return;
  } 

  currentIndex.index++;

  

  updateQuestionBlock();

}

function finilizeTest(optionIndex) {

  if(isHistorySave){
    saveTestHistory(optionIndex)
  }
  showResultsPage();
  showTestResult(true);

  currentIndex.index = 0;
  
}




function showMainPage() {

  document.getElementById('main_page').style.display = "block";
  document.getElementById('results').style.display = "none";
  document.getElementById('levels').style.display = "none";
  document.getElementById('questions_counter').style.display = 'none';
  document.getElementById('test').style.display = "none";
  document.getElementById('nav_block').style.display = "none";
  document.getElementById('result').style.display = "none";
 
}



function showLevels() {

  document.getElementById('button_home').style.display = "none";
  document.getElementById('nav_block').style.display = "none";
  document.getElementById('levels').style.display = "block";
  document.getElementById('errors').innerHTML = "";
  document.getElementById('test-title').innerHTML = "";
  document.getElementById('results').style.display = "none";
  document.getElementById('test').style.display = "none";
  document.getElementById('button_menu').style.display = "block";
  
      wrongAnswers.errors.length = 0;

  //currentQuestionIndex = 0;
}

function showTest() {
  document.getElementById('questions_counter').style.display = 'block';
  document.getElementById('levels').style.display = "none";
  document.getElementById('counter').style.display = "block";
}



function getTestHistoryIndex(testName) {   

  const savedHistory = localStorage.getItem(testName);  

  if(savedHistory === null){   
    return 0;      
  }
  else{    

    const testHistoryIndex = Number(savedHistory.slice(0, savedHistory.indexOf("$"))) + 1;

    if (testHistoryIndex < currentTest.test.length) {

      return testHistoryIndex; 
    }
    if (testHistoryIndex === currentTest.test.length) {      
      localStorage.removeItem(testName);
      return 0;
    }   
  }
   
}

function getErrorsArray() {
  
  let errors = localStorage.getItem(testMark).split("$");
  
  if (errors[1].length == 0) return;

  let errors_array = errors[1].split(';');

  errors_array.forEach(error => {

    var array = JSON.parse(error);
    
        wrongAnswers.addError(array)

  });

  
}



function chooseTest(test, testName, testTitle) {

  alert(fff[0][0])
  
  currentTest.test = test;
 
  testMark = testName;//////////////////////???????///////
  
  currentIndex.index = getTestHistoryIndex(testName);  

  if (isShuffle) {   
    
    shuffle(test);
    //localStorage.removeItem(test);
    //localStorage.removeItem(test);
    
  }
  
  showChosenTest(testTitle);  

  updateQuestionBlock();
}

function showResultsPage() {
  document.getElementById('button_home').style.display = "block";
  document.getElementById('button_next').style.display = "none";
  document.getElementById('results').style.display = 'block';
  document.getElementById('test').style.display = "none";
  document.getElementById('result').style.display = "block";
  document.getElementById('counter').style.display = "none";
  document.getElementById('button_home').innerText = "На главную";
}

function showChosenTest(testTitle) {

  document.getElementById('test').style.display = "block";
  document.getElementById('counter').innerHTML = "Вопрос: 1/" + currentTest.test.length;
  document.getElementById('counter').style.display = "block";
  document.getElementById('questions_counter').style.display = 'block';
  document.getElementById('levels').style.display = "none";
  document.getElementById('nav_block').style.display = "block";
  document.getElementById('button_next').style.display = "none";
  document.getElementById('button_home').innerText = "Завершить";
  document.getElementById('button_home').style.display = "block";
  document.getElementById('button_menu').style.display = "none";
  document.getElementById('test-title').innerHTML = testTitle;
  
}
