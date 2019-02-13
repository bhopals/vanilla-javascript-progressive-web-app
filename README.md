

## Vanilla JavaScript - Progressive Web Applications ##



**Progressive Web Apps (PWS)** 
    
    -   The can load content while offline

    -   Support standardized technology like "Responsive Design" and "Web Push Notifications"
    
    -   On mobile devices, browser support adding web apps to home screen, the result is an
        app-like experience 



    
    This is what progressive Web Apps are all about. Progressive web apps, or PWA's are website that can be stored on a mobile device using new web app technology like **Web App manifest** and **JavaScript Service workers** 

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

#### Service Workers ####
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
    
    -   Register - Registering a service worker
            -   App-like Functionality
            -   Navigator.serviceWorker.register() - (Should be from Main Script)
            -   Scope - Always should be public root of your domain (Customary)

    -   Install
            -   Files Once
            -   Offlince Cache initialization
            -   Notified by promise ( waitUntil METHOD)
            
    -   Activate
            -   Update or replace cached files
            -   claim() - If clients are claimed then only the fetches goes through the Service Workers
            -   skipWaiting() - To remove the old Service worker and activating/ installing the new one

    
    -   Fetch
            -   Custom Navigation - can interrupt navigation event and provide custom functionality
            -   Cache First Policy - In this case NO internet connetion required
            -   Network First Policy
            -   Stale while revalidate Policy
    
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

**Progressive Web App CheckList** (Failed Error List)

    1. Does not respond with a 200 when offline
    2. User will not be prompted to Install the Web App
    3. Failures: Site does not register a service worker.
    4. Does not redirect HTTP traffic to HTTPS
    5. Does not register a service worker

For more Informatio : https://developers.google.com/web/progressive-web-apps/checklist





### Demo

[Demo Link](https://javascript-card-game.herokuapp.com/)