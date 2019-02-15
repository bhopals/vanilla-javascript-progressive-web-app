window.onhashchange = function(){
    //Header is fixed, need to slide down some to see sectionHead
    setTimeout('scrollBy(0,-110)',10);
};
var hidden = true;
function toggleNav(){
    if(hidden){
        document.getElementsByTagName('nav')[0].style.display = 'block';
    }else{
        document.getElementsByTagName('nav')[0].style.display = 'none';
    }
    hidden = !hidden;
}
var pwaSupport = false;

if('serviceWorker' in navigator){
    pwaSupport = true;
    //register the service worker
    navigator.serviceWorker.register('/sw.js').then(function(result){
        console.log('Service Worker Registered');
        console.log('Scope: ' + result.scope);
    }, function(error){
        console.log('Service Worker Regiatration Failed');
        console.log(error);
    });
}else{
    console.log('Service Workers Not Supported');
}

var installEvt;
window.addEventListener('beforeinstallprompt', function(evt){
    console.log('Before Install Prompt');
    installEvt = evt;
    evt.preventDefault();
    document.getElementById('addToHomeScreen').style.display = 'block';
});

function hidePrompt(){
    document.getElementById('addToHomeScreen').style.display = 'none';
}

function installApp(){
    hidePrompt();
    installEvt.prompt();
    installEvt.userChoice.then(function(result){
        if(result.outcome === 'accepted')
            console.log('App Installed');
        else
            console.log('App Not Installed');
    });
}

window.addEventListener('appinstalled', function(evt){
    console.log('App Installed Event');
});

window.onload = function(){
    if(pwaSupport){
        var p = navigator.platform;
        if(p === 'iPhone' || p === 'iPad' || p === 'iPod'){
            if(!navigator.standalone){
                var lastShown = parseInt(localStorage.getItem('lastShown'));
                var now = new Date().getTime();
                if(isNaN(lastShown) || (lastShown + 1000*60*60*24*7) <= now){
                    document.getElementById('instructions').style.display = 'block';
                    localStorage.setItem('lastShown', now);
                }
            }
        }
    }
};

function hideInstructions(){
    document.getElementById('instructions').style.display = 'none';
}
