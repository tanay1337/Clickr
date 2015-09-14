/* Javascript file for clickr */

"use strict";

// some local variables
var clickr = {
  
  'manifest_url': null,
  'clicks': 0,
  'timer': null

};


// install function to be called later.
function install(ev) {
  
  ev.preventDefault();
  
  // installs the app using API.
  var installLocFind = navigator.mozApps.install(clickr.manifest_url);
  
  installLocFind.onsuccess = function() {
    
    $('.installer').hide();

    clickrFunc();

    
  };
  
  // if error occurs during installation
  installLocFind.onerror = function() {
    
    // App wasn't installed, info is here
    alert(installLocFind.error.name);
    
  
  };

}


(function() {


  // checks whether the OS is firefox OS. 
  if (navigator.mozApps) {
    
    // firefox OS then show installer
      $('.installer').show();

    // define the path for manifest URL
    var path = location.href.split('/');
    
    // removes index.html from URL to get only path not trailing filename
    path.pop();
    
    path = path.join("/") + "/"; 
    
    
    clickr.manifest_url = path + 'manifest.webapp';

      
    // get a reference to the button and call install() on click if the app isn't already installed. If it is, hide the button.
    var button = document.getElementById('install-btn');

    // checks whether app is installed or not
    var installCheck = navigator.mozApps.checkInstalled( clickr.manifest_url );

    installCheck.onsuccess = function() {
      
      // if app is already installed.
      if( installCheck.result ) {
        
        // hides the install button.
        button.style.display = "none";

        // hides installer container.
        $('.installer').hide();

      } 
      else {
        
        button.addEventListener('click', install, false);
      
      }
    
    };

    clickrFunc();


  }
  // if OS if not firefox OS.
  else{

    $('.installer').hide();
    
    clickrFunc();

  
  }
  

}() );





function clickrFunc(){

    //$('.mainApp').show();

    $('#restart-icon').hide();


    // binds click event to pad
    $( '.clicking-pad' ).on( 'click' , function() { 

      if( clickr.clicks === 0 ){

        startTimer();
      }

      clickr.clicks++;

      $('#mouse-clicks').text( clickr.clicks );

      $('#pad-text').html('You have clicked <strong>'+clickr.clicks+'</strong> times');


    });

    $('#restart-icon').on('click',function(){

      window.location.reload();
    });

}


// startTimer function to start counter and update timer.

function startTimer() {

  clickr.timer = setInterval( changeTimer , 1000);  

}


// function changeTimer to reduce counter by one.
function changeTimer() {

  var timeLeft = parseInt( $('#timer').text() );  

  if( timeLeft === 0 ){

    clearInterval( clickr.timer );

    showResult();
  }
  else{

    $('#timer').text(( timeLeft - 1 ));

  } 

}


// function showResult to show result after required time

function showResult() {

  $( '.clicking-pad' ).unbind( 'click' );

  var averageClick = ( clickr.clicks / 10 ).toFixed( 1 );

  $('#pad-text').append('<br>Average: <strong>'+ averageClick + '</strong> clicks per second');

  $('#restart-icon').fadeIn();


}





  