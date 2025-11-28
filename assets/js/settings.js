const lev5Toggle = document.getElementById('lev5');
const lev6Toggle = document.getElementById('lev6');
const themeToggle =  document.getElementById('theme'); 
const shuffleToggle = document.getElementById('shuffle');
const learnmodeToggle = document.getElementById('learn_mode');
const helpBlock = document.getElementById("help_block");
const buttonsBlock = document.getElementById('levels');
const stg2026Toggle = document.getElementById('stg2026');
const ntg2026Toggle = document.getElementById('ntg2026');




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

function clearCurrentHistory() {

  localStorage.removeItem(currentTest.id); 

}



window.addEventListener("load", ()=>{  
  document.body.className = 'light-theme';   

  loadSettings();   

  const testList = getTestList(); 
  
  createTestButtons(testList);

});

//лечение выхода из приложения при нажании кнопки назад в андроид
window.addEventListener('load', function() {
    window.history.pushState({}, '')
});
  
  window.addEventListener('popstate', function() {
    window.history.pushState({}, '')
});



lev5Toggle.addEventListener('change', function() {

  let toggleState = lev5Toggle.checked;

  if(toggleState === true){

    lev6Toggle.checked = false;
    stg2026Toggle.checked = false;
    ntg2026Toggle.checked = false;
    

    defaultTest = 'test5';

  }
  
  else{

    lev5Toggle.checked = true;
   
  }

  
});

lev6Toggle.addEventListener('change', function() {

  let toggleState = lev6Toggle.checked;

  if(toggleState === true){

    lev5Toggle.checked = false;
    stg2026Toggle.checked = false;
    ntg2026Toggle.checked = false;

    defaultTest = 'test6';

  }else{

    lev6Toggle.checked = true;
  
  }

  
});

stg2026Toggle.addEventListener('change', function() {

  let toggleState = stg2026Toggle.checked;

  if(toggleState === true){

    lev5Toggle.checked = false;
    lev6Toggle.checked = false;
    ntg2026Toggle.checked = false;
    

    defaultTest = 'stg26';

  }else{

    stg2026Toggle.checked = true;

  }

  
});

ntg2026Toggle.addEventListener('change', function() {

  let toggleState = ntg2026Toggle.checked;

  if(toggleState === true){

    lev5Toggle.checked = false;
    lev6Toggle.checked = false;
    stg2026Toggle.checked = false;

    defaultTest = 'ntg26';

  }else{

    ntg2026Toggle.checked = true;

  }

  
});

function getTestList() {  

  const test5 = {
   
    st5_1 : [test_5s_block_1, "5p Стандарт 1"],
    st5_2 : [test_5s_block_2, "5p Стандарт 2"],
    ex5 : [test_5ex, "5р эксперт"],
    ot_1 : [test_ot_block_1, "Охрана труда 1"],
    ot_2 : [test_ot_block_2, "Охрана труда 2"],
    ot5_2025 : [test_otrp, "ОT 2025"],
    econs : [econs, "ЭКОНС"],        

  }   
  
  
  const test6 = {
       
    st6_1 : [test_6s_block_1, "6p Стандарт 1"],
    st6_2 : [test_6s_block_2, "6p Стандарт 2"],
    st6_3 : [test_6s_block_3, "6p Стандарт 3"],
    st6_4 : [test_6s_block_4, "6p Стандарт 4"],
    ex6 : [test_6e_block_1, "6р Эксперт"],
    ot_1 : [test_ot_block_1, "Охрана труда 1"],
    ot_2 : [test_ot_block_2, "Охрана труда 2"],
    ot6_2025 : [test_otrp, "ОT 2025"],
    ot6com_2025 : [test_otcom, "ОT 2025 ком"],
    econs : [econs, "ЭКОНС"],
    ex6_plus : [test_6e_plus, "Старшие эксперт"],
   
  }


  const stg26 = {           
    
    k27 : [test_k27, "К-27"],
    k6 : [test_k6, "К-6, К-18"],
    k9 : [test_k9, "К-9"],
    tg : [test_tg, "Конд. и ТГ"],    
    fakel : [test_fakel, "Факелы"],  
   
  }

   const ntg26 = {       
    
    hb : [test_hb, "ХБ"],
    k10 : [test_k10, "К-10"],
    r1 : [test_r1, "Р-1"],
    k11 : [test_k11, "К-11"],
    k12 : [test_k12, "К-12, К-13"],
    k14 : [test_k14, "К-14"],
    k16 : [test_k16, "К-16"],
    k17 : [test_k17, "К-17"],
    k19 : [test_k19, "К-19, К-20"],     
    ph : [test_ph, "ПХЦ"],
    eh : [test_eh, "ЭХЦ"],     
   
  }
 

  if(defaultTest === 'test6') {      
    return test6;    
  }
  if(defaultTest === 'test5'){ 

    return test5;
  }
  if(defaultTest === 'stg26'){ 

    return stg26;
  }
  if(defaultTest === 'ntg26'){ 

    return ntg26;
  }

  

}

function createTestButtons(testList){
    
    for(let testId in testList){

      const testButton = document.createElement('button');

      testButton.id = testId;

      testButton.className = "test_button";

      testButton.textContent = testList[testId][1];

      buttonsBlock.appendChild(testButton);

    }

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

    const testList = getTestList();




    createTestButtons(testList);
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

 

  if(!localStorage.getItem('settings')) 
  {
    defaultTest = 'test6';
    
    return;

  }else{

    lev6Toggle.checked = false;

    let togglesState = JSON.parse(localStorage.getItem('settings'));  

    apply(togglesState);

  }

  

}

function apply(togglesState){    

 

  themeToggle.checked = togglesState.isDarkTheme; 
  
  shuffleToggle.checked = togglesState.isShuffle;

  learnmodeToggle.checked = togglesState.isLearn;

  defaultTest = togglesState.defaultTest;

 

  
  if(defaultTest === 'test6') {

    lev6Toggle.checked = true;
    

  }
  if(defaultTest === 'test5'){

    lev5Toggle.checked = true;    

  } 
  if(defaultTest === 'stg26'){

    stg2026Toggle.checked = true;    

  } 
  if(defaultTest === 'ntg26'){

    ntg2026Toggle.checked = true;    

  } 

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
    defaultTest : defaultTest,
  }

  apply(togglesState);

  localStorage.setItem("settings", JSON.stringify(togglesState));
}

