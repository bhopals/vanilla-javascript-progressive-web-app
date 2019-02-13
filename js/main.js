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


if('serviceWorker' in navigator) {

    //Register ServiceWorker
    navigator.serviceWorker.register('/sw.js').then(function(response){
        console.log("Scope: "+response.scope);
        console.log("Service Worker Registered");
    }, function(error){
        console.log("Service Worker Registration Failed");
        console.log(error);
    });
} else {
    console.log("Service Workers Not Supported");
}