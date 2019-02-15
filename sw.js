/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var cacheName = 'CSv4';

var cachedFiles = [
    '/',
    '/index.html',
    '/manifest.json',
    '/js/main.js',
    '/css/main.css',
    '/css/normalize.min.css',
    '/img/cassidy.jpg',
    '/img/cramer.jpg',
    '/img/duffy.jpg',
    '/img/gabor.jpg',
    '/img/aths.png',
    '/img/share.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png'
];

self.addEventListener('install', function(evt){
    console.log('Service Worker Install Event');
    //Add the file to the cache
    evt.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log('Caching Files');
            return cache.addAll(cachedFiles);
        }).then(function(){
            return self.skipWaiting();
        }).catch(function(err){
            console.log('Cache Failed', err);
        })    
    );
});

self.addEventListener('activate', function(evt){
    console.log('Service Worker Activated');
    evt.waitUntil(
       caches.keys().then(function(keyList){
           return Promise.all(keyList.map(function(key){
               if(key !== cacheName){
                   console.log('Removing Old Cache', key);
                   return caches.delete(key)
               }
           }));
       })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(evt){
    console.log('Fetch Event' + evt.request.url);
    evt.respondWith(
       caches.match(evt.request).then(function(response){
           return response || fetch(evt.request);
       })
    );
});

function closeNotification(msg, evt){
    console.log(msg, evt.notification.data);
    evt.notification.close();
}

self.addEventListener('notificationclose', function(evt){
    closeNotification('Notification Closed', evt);
});

self.addEventListener('notificationclick', function(evt){
    if(evt.action !== 'close'){
        evt.waitUntil(
            self.clients.matchAll({type: 'window', includeUncontrolled: 'true'}).then(function(allClients){
                console.log(allClients);
                for(var i = 0; i<allClients.length; i++){
                    if(allClients[i].visibilityState === 'visible'){
                        console.log('Navigating');
                        allClients[i].navigate(evt.notification.data.loc);
                        break;
                    }
                }
            })
        );
    }
    closeNotification('Notification Clicked', evt);
});

