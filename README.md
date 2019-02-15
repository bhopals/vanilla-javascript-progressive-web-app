

## Vanilla JavaScript - Progressive Web Applications ##



**Progressive Web Apps (PWS)** 
    
    -   The can load content while offline

    -   Support standardized technology like "Responsive Design" and "Web Push Notifications"
    
    -   On mobile devices, browser support adding web apps to home screen, the result is an
        app-like experience 


    
This is what progressive Web Apps are all about. Progressive web apps, or PWA's are website 
that can be stored on a mobile device using new web app technology like **Web App manifest** 
and **JavaScript Service workers** 

**PWA Checklist**
    
    - Responsive

    - Secure

    -  Available offline

    -  Installable

    -  Cross-browser compatible 


**Benefits of PWAS**

    -   Data Friendly
    -   Installation not required
    -   Easily Updated
    -   Easily Shared
    -   Increased User engagement
    

#### Icon for the PWA ####
http://realfavicongenerator.net  for the ICON.

 - Load your transparent ICON file and Upload. Once uploaded, select/choose the color for the background color. 
 - Also, can select ICON version for Andriod, IOS, safari, windows with CUSTOM name for the app.
 - At favicon Generator Options, choose "I will place favicon files...at the root" and click on **GENERATE your
 favicons HTML code**
 - This will genenerate ICONS and provide option to "Download generated Favicons".
 - After downloaded, unzip and copy all the files in the root directory of the project.
 - Also, copy the HTML code to add that in INDEX.html(In the HEAD section of the document).


#### Web App Manifest ####

-  When developer provides DATA about DATA, its called **Metadata**. 
-  Web App Manifest provides information about WebApp to the browser. The information contains Metadata, properties 
(Name, Icons, color scheme, start URL etc).
-  Manifest is a simple JSON file.

    ```
    {
    "name": "NCC CS",
    "short_name": "NCC CS",
    "icons": [
            {
                "src": "/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        "theme_color": "#ffc40d",
        "background_color": "#ffc40d",
        "display": "standalone",
        "start-url" : "/index.html"

    }

    ```

So by doing that, we can setup different color and start-url for all different platforms.
More Details :
https://app-manifest.firebaseapp.com/
https://developers.google.com/web/fundamentals/web-app-manifest/


**iOs Emulater**
Make sure to add extra META tag information to make the APP iOS compatible.
    ``` 
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-stautus-bar-style" content="default">
        <link rel="apple-touch-startup-image" href="/apple-touch-icon.png">

    ```

#### Emulator Development Limitations ####
- PWAs require HTTPS
- Add to home screen not supported in iOS.

#### Service Workers ####  More Details (https://serviceworke.rs/)

    - A script run by browser
    - Run in background
    - Separate from a webpage
    - Provides access to featurs

**Service Workers Features**
    -   Push Notifications
    -   Background sync
    -   Intercept Network Requests
    -   Manage Cache
    -   Intercept request to serve local files
    -   Offline capabilites

**Service Workers Lifecycle**
    
1.  Register - Registering a service worker

        -   App-like Functionality
        -   Navigator.serviceWorker.register() - (Should be from Main Script)
        -   Scope - Always should be public root of your domain (its Customary to serve a service worker
            from root of the site)


        This should go into initialize JS file of the PROJECT so it can register Service Workers.
          
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
           

2.  Install
            -   Files Once
            -   Offlince Cache initialization
            -   Notified by promise ( waitUntil METHOD)
            
            Note - Use the **SELF** keyword to refer the SERVICE Worker.

           
            var  cacheName = "CSv1";

                var cacheFiles = [
                    '/',
                    '/index.html',
                    '/js/main.js',
                    '/css/main.css'
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

           

Here in install event callback method, while adding files to the cache, we would call
event.waitUntil() method that takes a PROMISE as a parameter which defines the length 
of the install process. Here we would chain TWO promises

            For example:

            event.waitUntil(

                cache.open("cacheName").then(function(result){
                    return cache.addAll(cacheFiles) //Returning PROMISE from here
                }).then(function(){//Chained PROMISE
                    self.skipWaiting();
                    //It will simply makes the new Service Worker ACTIVE 
                    //Service Worker. It will not wait OLD service Workers to 
                    // handle all the fetches.
                }).cathc(function(error){
                    //ERROR 
                })

            )



3.  Activate

    -   Update or replace cached files
    -   claim() - If clients are claimed then only the fetches goes through the Service Workers
    -   skipWaiting() - To remove the old Service worker and activating/ installing the new one


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

            })

Here Promise.all returned in the keyList.map method resolve. Promise.all is a convenient way
to aggregate promises with associated collections. It will return a fulfilled promise if
all the promise in the collection are fullfilled. If any promise in the collection rejects, 
all methods will fail. Essentailly, a fulfilled promise is returned when each outdated cache is deleted.


client.claims set the service worker as the active service worker for all clients in scope.

self.clients.claim();

4.    Fetch

    -   Custom Navigation - can interrupt navigation event and provide custom functionality
    -   Cache First Policy - In this case NO internet connetion required
    -   Network First Policy
    -   Cache-Then-Network Policy
    -   Network-Then-Cache Policy
    -   Stale while revalidate Policy

            self.addEventListener('fetch', function(event){
                //when any request is made on PWA
                console.log("Fetch Event Occurent:", event.request.url);
                
                //RespondWith Method requires a PROMISE
                event.respondWith(

                    //Cache-then-Network Policy
                    caches.match(event.request).then(function(response){
                        return response || fetch(event.request);
                    })

                    //Network-then-Cache Policy
                    caches.match(event.request).then(function(response){
                        return fetch(event.request) ||  response;
                    })


                );
                
            })
            


-   Add to home screen
    -   The app isn't already installed
    -   The user has interacted with the domain for 30 seconds
    -   Served over HTTPS
    -   Registers a service worker that includes a fetch over event handler
    -   A web manifest is added to the home screen 

-   Push
    -   Reengage Users
    -   Native app - Messaging
    -   Visual and auditory cues




**Note**
    To check that SITE is PWA or not. In Chrome Dev Tools, go to AUDIT section, click on RUN AUDIT. Once clicked
    a full AUDIT would run and scan for all PWA checklist options**


**Note**
    1.  To resolve PWA error "Link to cross-origin destinations are unsafe", use below code settings

        - Add rel="noopener" or rel="noreferrer" to any external links to improve performance and prevent security 
          vulenrabilities. This is for all the external links that we have in our application. This would open the 
          targeted URL's in new page.

    2. To resolve, "HTML element doesnot have lang object"
        - we need to add lang="en" in <html>  
        



**Progressive Web App CheckList** (Failed Error List)

    1. Does not respond with a 200 when offline
    2. User will not be prompted to Install the Web App
    3. Failures: Site does not register a service worker.
    4. Does not redirect HTTP traffic to HTTPS
    5. Does not register a service worker

For more Information : https://developers.google.com/web/progressive-web-apps/checklist


#### Install APP to the HOME Screen ####

Below code snipped will install the app

```
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

```

### Notifications ###

Native App Core Featuer - Push Notification is a core feature to reengage mobile users. 
example : Message or any App sends alert


#### Vocabulary ####
    -   Notification - is a message dispalyed to the user outside of the app's normal UI.
    -   Push Message - A message sent from some servers to registered clients
    -   Push Notification - A notification displayed response to push message

#### Process #### 
    -   Create and display a notification
    -   Configure a push messaging service (Google Firebase)
    -   Write a script to send a push message (Node and Mozilla Web Push library)
    -   Show a notification in response tp a push message   


#### Steps ####

1. Request Notification Permission

    The below code should be placed in the Service Workers Registration Success PROMISE.

    ```
        if('Notification' in window){
            console.log('Notifications Supported');
            Notification.requestPermission(function(status){
                console.log('Notification Status: ', status);
            });
        }
    ```
    A notification can be sent even the PWA isn't active.


2. Show notification with options

```
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

        function notify(title, options){
            if(Notification.permission === 'granted'){
                navigator.serviceWorker.ready.then(function(reg){
                    reg.showNotification(title, options);
                });
            }
        }

```

3. Close Notification

```
    function closeNotification(message, event){
        console.log(message, event.notificaiton.data);
        event.notificaiton.close();
    }

    self.addEventListener('notificationclose', function(event){
        closeNotification("Notification Closed", event)
    });

```


4. Find active client and navigate to Location

```
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

```

4. Sending Push Notification from the SERVER

In general Push Notifications work like this:

    1.  The client accesses the PWA, and it asks the user to allow notifications via the push manager's subscribe method. 

    2.  If the user allows notifications, a subscription object is created. Developers need to store the data in the subscription for sending Push Messages.

    3. An HTTP Post request, that may or may not be originated from the app server, is made to a messaging service that 
        includes data from the subscription. 

    4. The messaging service sends the Push Message to the client using data stored in the subscription. 

    5. If needed, when the message is received, the app is awakened, and the push message is routed to the correct service worker.

    6. The service worker handles the push message, in the push event listener.

    7. If the user clicks on the notification, the code in the notification click event executes, waking the PWA if needed.

                                Subscription
    -------------------      <-------------          ----------------
    |    App Server   |                              |    Client    |   <---------->  SERVICE Worker
    -------------------      -------------->         ---------------- 
            |                   PWA                        ^
            |                                              | PUSH Message
            |                                              |
            V                                              |
    -------------------                               ---------------------
    |    HTTP Post    |         ----------->          | Messaging Service |
    -------------------                               ---------------------


Google provides Firebase Cloud messaging tool as its messaging service. To do that we need to create project at
https://console.firebase.google.com/, one project is created, copy the SENDER ID from SETTINGS > CLOUD MESSAGING > Sender ID which looks like "899022591513". Once copied, add that sender id in manifest.json's "gsm_sender_id"

```
{
    "gcm_sender_id": "899022591513"
}

```


5. Subscribe to PUSH Event

```
function subscribeToPush() {
    navigator.serviceWorker.ready.then(function(registration){

        registration.pushManager.subscribe({
            userVisibleOnly:true }).then(function(sub){
                console.log(JSON.stringify(sub));
                console.log("Endpoint: "+sub.endpoint);
                console.log("User Subscribed");
            });
    });
}
```

### Demo

[Demo Link](https://vanilla-javascript-progressive.herokuapp.com/)