
//Install Event

var  cacheName = "CSv2";

var cacheFiles = [
    '/',
    '/index.html',
    '/manifest.json',
    '/js/main.js',
    '/css/main.css',
    '/css/normalize.min.css',
    '/img/cassidy.jpg',
    '/img/cramer.jpg',
    '/img/duffy.jpg',
    '/img/gabor.jpg'
];

self.addEventListener('install', function(event){
    console.log("Service Worker Install Event");
   
    //Add files to the cache
    event.waitUntil(

        caches.open(cacheName).then(function(cache){
            console.log("Caching Files",cache);
            return cache.addAll(cacheFiles);
        }).then(function(){
            return self.skipWaiting();
        }).catch(function(error){
            console.log("Cache Failed:",error);
        })
    )
});


self.addEventListener('activate', function(event){
    console.log("Service Worker Activated");
    
    event.waitUntil(
        
        caches.keys().then(function(keyList){

            return Promise.all(keyList.map(function(key){
                if(key !== cacheName){
                    console.log("Removing OLD Cache", key);
                    return cache.delete(key)
                }
            }));
        })

    );
    self.clients.claim();
})