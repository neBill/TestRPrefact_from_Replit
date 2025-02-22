const lev5Toggle = document.getElementById('lev5');
const lev6Toggle = document.getElementById('lev6');
const themeToggle =  document.getElementById('theme'); 
const shuffleToggle = document.getElementById('shuffle');
const learnmodeToggle = document.getElementById('learn_mode');
const helpBlock = document.getElementById("help_block");
const buttonsBlock = document.getElementById('levels');




'use strict';

function chageFontSize(buttonId){  

  const bodyStyles = window.getComputedStyle(document.body);

  const oldSize = bodyStyles.getPropertyValue('--btn-font-size'); //get

  let newSize = 20;    

  if(buttonId == "font-increase"){  

    newSize = (parseFloat(oldSize) + 1).toFixed(2);       
  }

  if(buttonId == "font-decrease"){

    newSize = (parseFloat(oldSize) - 1).toFixed(2);
  }   

  if(newSize <= 23 && newSize >= 17){

    document.body.style.setProperty("--btn-font-size", `${newSize}px`);//set

    document.getElementById('fontsize').style.fontSize = `${newSize}`;

    localStorage.setItem('size', newSize);
  }
}




function clearCaches(){  
  // caches.open('s-app-v1').then(cache => {
  //   cache.keys().then(keys => {
  //     keys.forEach(request => {
  //       cache.delete(request);
  //     });
  //   });
  // });
}

function clearAllHistory() {

  localStorage.clear(); 

}

// function clearCurrentHistory() {

//   localStorage.removeItem(currentTest.id); 

// }



window.addEventListener("load", ()=>{  

  document.body.className = 'light-theme';  

  loadSettings();  

  createTestButtons();
  
});

//лечение выхода из приложения при нажании кнопки назад в андроид
window.addEventListener('load', function() {

    window.history.pushState({}, '')
});
  
window.addEventListener('popstate', function() {
   
    btnHome.click();
    
    window.history.pushState({}, '')
});



lev5Toggle.addEventListener('change', function() {
  
  if(lev5Toggle.checked === true){

    lev6Toggle.checked = false;

    defaultRank = 'rank5';

  }else{

    lev6Toggle.checked = true;

    defaultRank = 'rank6';

  }

  
});

lev6Toggle.addEventListener('change', function() {

  if(lev6Toggle.checked === true){

    lev5Toggle.checked = false;

    defaultRank = 'rank6';

  }else{

    lev5Toggle.checked = true;

    defaultRank = 'rank5';
  }
  
});



// document.addEventListener('click', function(event) {

//   if(event.target.className === 'Toggle__input toggle-rank') {

//       //let testsLavel = isTest6 ? testList.test6 : testList.test5;

//       let toggleState = lev6Toggle.checked;

//       alert(toggleState)

//       if(toggleState === true){

//         lev5Toggle.checked = false; 
//         lev6Toggle.checked = true;       

//         // testsLavel = testList.test6;

//       }else{

//         lev5Toggle.checked = true;
//         lev6Toggle.checked = false;

//         //isTest6 = true;
//         // testsLavel = testList.test5;
//       }

//    }
    
 
  
// });




const testsList = {
   
     rank5 : { 

      st5_1 : [test_5s_block_1, "5p Стандарт 1"],
      st5_2 : [test_5s_block_2, "5p Стандарт 2"],
      ex5 : [test_5ex, "5р эксперт"],
      ot_1 : [test_ot_block_1, "Охрана труда 1"],
      ot_2 : [test_ot_block_2, "Охрана труда 2"],
      ot5_2025 : [test_otrp, "ОT 2025"],

    },    
        
    rank6 : {
         
      st6_1 : [test_6s_block_1, "6p Стандарт 1"],
      st6_2 : [test_6s_block_2, "6p Стандарт 2"],
      st6_3 : [test_6s_block_3, "6p Стандарт 3"],
      st6_4 : [test_6s_block_4, "6p Стандарт 4"],
      ex6 : [test_6e_block_1, "6р Эксперт"],
      ot_1 : [test_ot_block_1, "Охрана труда 1"],
      ot_2 : [test_ot_block_2, "Охрана труда 2"],
      ot6_2025 : [test_otrp, "ОT 2025"],
      tmp : [temp, "TEMP"],
     
    },
}


  



function createTestButtons(){ 

  
  Object.keys(testsList[defaultRank]).forEach(key => {

    const testButton = document.createElement('button');

    testButton.id = key;

    testButton.className = "test_button";

    testButton.textContent = testsList[defaultRank][key][1]

    buttonsBlock.appendChild(testButton);


  });


 //alert(testsLavel)

  // for(let testId in testsLavel){

  //   //alert(testId[0])

  //   // const testButton = document.createElement('button');

  //   // testButton.id = testId;

  //   // testButton.className = "test_button";

  //   // testButton.textContent = testList[testId][1];

  //   // buttonsBlock.appendChild(testButton);

  // }

}

function removeButtons() {
    
  buttonsBlock.innerHTML = '';
  
}


function showHistoryDropdown(){

  document.getElementById("dropDown_History").classList.toggle("visible");

}


function showHideMenu() {

  const ddMenu = document.getElementById("dropDownMenu");

  let display = window.getComputedStyle(ddMenu).display;

  if(display === "none")
  {
      ddMenu.style.display = "block";
  }
  else {

    ddMenu.style.display = "none";

    saveSettings();      

    removeButtons();

    //const testList = getTestList();

    createTestButtons();
  }
  
  
}


function hideHelpPage() {

  helpBlock.style.display = "none";  

}

function showHelpPage() {

  helpBlock.style.display = "block"; 

  showHideMenu();

}



function loadSettings(){

  if(!localStorage.getItem('settings'))  return

  let togglesState = JSON.parse(localStorage.getItem('settings'));  

  apply(togglesState);

}

function apply(togglesState){    

  themeToggle.checked = togglesState.isDarkTheme; 
  
  shuffleToggle.checked = togglesState.isShuffle;

  learnmodeToggle.checked = togglesState.isLearn;

  //lev6Toggle.checked = togglesState.isTest6;

  // if(togglesState.isTest6 === true) {

  //   lev6Toggle.checked = true;

  //   isTest6 = true;

  // }else{

  //   lev5Toggle.checked = true;

  //   isTest6 = false;

  // }  

  isLearnMode = togglesState.isLearn;

  isShuffle = togglesState.isShuffle;

  if (togglesState.isDarkTheme == true) { 

    document.body.className = 'dark-theme';

  }
  else {  

    document.body.className = 'light-theme';

  }

}

function saveSettings(){  

  const togglesState = {
  
    isLearn : learnmodeToggle.checked,
    isShuffle : shuffleToggle.checked,
    isDarkTheme : themeToggle.checked,
    // isTest6 : lev6Toggle.checked,
  }

  apply(togglesState);

  localStorage.setItem("settings", JSON.stringify(togglesState));
}

