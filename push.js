/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var webPush = require('web-push');

var pushSub = {"endpoint":"https://android.googleapis.com/gcm/send/d18eF13HSz0:APA91bHyn2CPkbbUKe2sACrCs8HFm7OtatqGl5x4vls5h4D4buTr2yi-UccFQc-5Cc_7SE4Xs2pa7uDF7lIV_5FaHBDaW088tae0Ww97hY9Z4rtrPzsoysiDag1bj8LrZgUm7u4OxUajLMijhnCbmIF7sp8_--Jhiw","expirationTime":null,"keys":{"p256dh":"BBwotnU53UY4pFk3xJIuZHkGYxAA7ETWCN83ql0AfYZ8R9_IN5YR8D_8oCcGFbMmcdaCOdJ5E3Iz1xLbogHsseo=","auth":"ZWq9FG-SjihtFNgC1xPQOw=="}};

var options = {
    TTL: 60,
    gcmAPIKey: 'AAAAiiHEZlY:APA91bE_j82pR4mfSE1s3iIii1xyuTYo767ghAp0oiZyYTJSbQuiSyGgH8o9W6h2cBIXEKhROAMs0yNMx6YbmCJS0jgwXiS1jl9y5vYc4CHzO6mhufU79D8xx9_J899vNZYHeXbaqFfO'
};

var payload = 'index.html#programs';

webPush.sendNotification(pushSub, payload, options);

