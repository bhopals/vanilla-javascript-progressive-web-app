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

if('serviceWorker' in navigator){
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
