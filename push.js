/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var webPush = require('web-push');

var pushSub = {"endpoint":"https://updates.push.services.mozilla.com/wpush/v1/gAAAAABbbHx_Wfq7NSQKEuOEcsEKmwuykFaliE_-zGBUANhkrbKQM-150xsE7cIbvE0O_uS2S1RvkSihOQ5SWPAcbY0hG7Q5CF3_WxEz4fBWIilW0HCQEvHiyvbiAWP6nG87rObu5UWJ","keys":{"auth":"Y3sg1aHF2pQWnNDrFHZstw","p256dh":"BGnjSP1YKac4kjjaEioJLjZI1OzyIx2rrGWC19254JcQftJLTay5qJ1zSUTaOGnxXr6AGDqXLEudSKgMZqMmV5I"}};

var options = {
    TTL: 60,
    gcmAPIKey: 'AAAAgZRAuuo:APA91bGCp7BEJaB7yhtx5si57gG18nhtsv1dHOn4yv1ftg5KHslwRT42jUKnlXYKSaQyNEIpvVh0A4dgXOKquWwLYzo9mcNqF0GAfKUQgfpU1xtAlKI8W7WZMVgwyRzzAl2tjr7Sux1e9vp40zH-_GFOJBUtHW82FA'
};

var payload = 'index.html#programs';

webPush.sendNotification(pushSub, payload, options);

