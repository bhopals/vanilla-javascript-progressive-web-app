

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