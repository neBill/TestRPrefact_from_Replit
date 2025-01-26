

let lev5_toggle = document.getElementById('lev5')
let lev6_toggle = document.getElementById('lev6')



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



lev5_toggle.addEventListener('change', function() {

  let toggle_state = lev5_toggle.checked;

  if(toggle_state === true){

    lev6_toggle.checked = false;
    isTest6 = false;
  }else{

    lev6_toggle.checked = true;
    isTest6 = true;
  }

  
});

lev6_toggle.addEventListener('change', function() {

  let toggle_state = lev6_toggle.checked;

  if(toggle_state === true){

    lev5_toggle.checked = false;
    isTest6 = true;
  }else{

    lev5_toggle.checked = true;
    isTest6 = false;
  }

  
});

function getTestList() {  

  const test5 = {
   
    st5_1 : [test_5s_block_1, "5p Стандарт 1"],
    st5_2 : [test_5s_block_2, "5p Стандарт 2"],
    ot_1 : [test_ot_block_1, "Охрана труда 1"],
    ot_2 : [test_ot_block_2, "Охрана труда 2"],
    ot5_2025 : [test_otrp, "ОT 2025"],

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
   
  }

  if(isTest6) {      
    return test6;    
  }
  else {  
    return test5;
  }

  

}

function createTestButtons(testList){

    const testButtons = document.getElementById('levels');

    for(let testId in testList){

      const testButton = document.createElement('button');


      testButton.id = testId;

      testButton.className = "test_button";

      testButton.textContent = testList[testId][1];

      testButtons.appendChild(testButton);

    }

}

function removeButtons() {

  const buttonsDiv = document.getElementById('levels');  
  buttonsDiv.innerHTML = '';
  
}



//////////////////////////????????????

//   let deviceId = localStorage.getItem('deviceId');

//   if (!deviceId) {

//     deviceId = generateDeviceId();
//     localStorage.setItem('deviceId', deviceId);

//   }

// }


function showHistoryDropdown(){

  //document.getElementById("dropDown_History").style.display = "block";
  document.getElementById("dropDown_History").classList.toggle("visible");
}

// function showMenu() {

//   //let isMenuShown = document.getElementById("dropDownMenu").classList.toggle("visible");
//   document.getElementById("dropDownMenu").style.display = "block";

//   // if(isMenuShown === false){

//   //   saveSettings();

//   // }

// }

// function hideMenu() { 

//   document.getElementById("dropDownMenu").style.display = "none"; 

//   saveSettings();

//   removeButtons();

//   const testList = getTestList();
 
//   createTestButtons(testList);
  
// }

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

    //alert(isTest6)

    removeButtons();

    const testList = getTestList();

    createTestButtons(testList);
  }
  
  
}





function hideHelpPage() {

  document.getElementById("help_block").style.display = "none"; 
  //alert('hhh')

}

function showHelpPage() {

  document.getElementById("help_block").style.display = "block"; 
  showHideMenu();

}



function loadSettings(){

  if(!localStorage.getItem('settings'))  return

  let togglesState = JSON.parse(localStorage.getItem('settings'));  

  apply(togglesState);

}

function apply(togglesState){  

  document.getElementById('theme_toggle').checked = togglesState.isDarkTheme; 
  document.getElementById('shuffle_toggle').checked = togglesState.isShuffle;
  document.getElementById('learn_mode_toggle').checked = togglesState.isLearn;
  lev6_toggle.checked = togglesState.isTest6;

  if(togglesState.isTest6 === true) {

    lev6_toggle.checked = true;
    isTest6 = true;

  }else{

    lev5_toggle.checked = true;
    isTest6 = false;

  }
  

  isLearnMode = togglesState.isLearn;
  isShuffle = togglesState.isShuffle;
  // isNewBases = togglesState.isNewBases;

  if (togglesState.isDarkTheme == true) { 

    //document.documentElement.setAttribute('theme', 'dark');
    document.body.className = 'dark-theme';
  }
  else {

     //document.documentElement.removeAttribute('theme'); 
    document.body.className = 'light-theme';
  }



}


// document.getElementById('themeToggle').addEventListener('click', function() {
//     // Этот код будет выполняться при каждом клике на кнопку

//     // Получаем текущий класс, заданный для элемента body (текущую тему)
//     const currentTheme = document.body.className;

//     // Проверяем, является ли текущая тема светлой
//     if (currentTheme === 'light-theme') {
//         // Если да, меняем тему на темную
//         document.body.className = 'dark-theme';
//     } else {
//         // Если текущая тема не светлая (или отсутствует), устанавливаем светлую тему
//         document.body.className = 'light-theme';
//     }
// });

function saveSettings(){  

  const togglesState = {
   // isHistory:document.getElementById('save_history_toggle').checked,
    isLearn : document.getElementById('learn_mode_toggle').checked,
    isShuffle : document.getElementById('shuffle_toggle').checked,
    isDarkTheme : document.getElementById('theme_toggle').checked,
    isTest6 : lev6_toggle.checked,
  }

  apply(togglesState);

  localStorage.setItem("settings", JSON.stringify(togglesState));
}

// function generateDeviceId() {
//   // generate a random string
//   return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
// }

// function temp() {

//   // let ts = test
//   // //alert(ts[0][1].length)

//   // for (var i = 0; i < ts.length; ++i) {
    
//   //   if (ts[0][1].length != 4) {

//   //     alert(ts[0][1].length + "  --> " +  (i+1))
      
//   //   }

    
//   // }

//   // alert("Ok")

// }


