
//TODO: Add a secure way for transmitting information, for instance jwt or oauth2

const express = require('express');
const router = express.Router();
const subscription = require('../subsService/subscriptions');

router.get('/app/submenurequest/subscription/viewAll',subscription.FE_viewAllSubscription); //view all
router.get('/app/submenurequest/subscription/data',subscription.FE_getSubscriptionDetails); //get info (id)
router.put('/app/submenurequest/subscription',subscription.FE_subscriptionPut);//save edit 
router.post('/app/submenurequest/subscription',subscription.FE_subscriptionPost);// new
router.delete('/app/submenurequest/subscription/data',subscription.FE_subscriptionDelete);

module.exports = router;
