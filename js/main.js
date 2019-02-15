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
        subscribeToPush();
        /*
        if('Notification' in window){
            console.log('Notifications Supported');
            Notification.requestPermission(function(status){
                console.log('Notification Status: ', status);
            });
            var options = {
                body: 'See What\'s New',
                icon: 'android-chrome-192x192.png',
                data: {
                    timestamp: Date.now(),
                    loc: 'index.html#info'
                },
                actions: [
                    {action: 'go', title: 'Go Now'}
                ]
            };
            notify('NCC Computer Science', options);
        }
        */
    }, function(error){
        console.log('Service Worker Regiatration Failed');
        console.log(error);
    });
}else{
    console.log('Service Workers Not Supported');
}

function notify(title, options){
    if(Notification.permission === 'granted'){
        navigator.serviceWorker.ready.then(function(reg){
            reg.showNotification(title, options);
        });
    }
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

function subscribeToPush(){
    navigator.serviceWorker.ready.then(function(reg){
        reg.pushManager.subscribe({userVisibleOnly:true}).then(function(sub){
            console.log(JSON.stringify(sub));
            console.log("Endpoint: " + sub.endpoint);
            console.log('User Subscribed');
        });
    });
}

