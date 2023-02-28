/*
This implements all the logic of the subscription system 
Exchange information between the DDBB and the public part
Launches the calls to the email service

It remains to develop the security part, the logger system and the data schemes
*/
function FE_viewAllSubscription(req,res){
    console.log("FE_viewAllSubscription");
    let ajaxOut;  // TODO: load schema
    try{
        ajaxOut.data=result.data.allSubscription
    }
    catch(err){
        //TODO: Log error 
        ajaxOut.result=false;
        res.send(ajaxOut);
    }

    res.send(ajaxOut);
}

function FE_getSubscriptionDetails(req,res){
    console.log("FE_viewAllSubscriptionEdit"); 
    let ajaxOut;  // TODO: load schema
    try{
        ajaxOut.data.subscription = getInfoFromBBDD(req.query.id);
    }
    catch(err){
        //TODO: Log error 
        ajaxOut.result=false;
        res.send(ajaxOut);
    }

    res.send(ajaxOut);
}

//Edit subscription
function FE_subscriptionPut(req,res){
    console.log("FE_subscriptionPut");   
    let ajaxOut;  // TODO: load schema
    let result=validate(req.body);
    ajaxOut.result=result;
    if(result){
        try{
            saveInfoInDDBB(req.body.id,
                req.body.emailAddress,
                req.body.name,
                req.body.birthdate,
                req.body.genderSelect,
                req.body.newsletterId)
        }
        catch(err){
            //TODO: Log error 
            ajaxOut.result=false;
            res.send(ajaxOut);
        }
    } 
    else{
        ajaxOut.error=result.msg;
    }
    
    //TODO: Send confirmation email

    res.send(ajaxOut);
}

//Add new subscription
function FE_subscriptionPost(req,res){
    console.log("FE_subscriptionPost");
    let ajaxOut;  // TODO: load schema
    let result=validate(req.body);
    ajaxOut.result=result;
    if(result){
        try{
            result= saveInfoInDDBB(req.body.id,
                req.body.emailAddress,
                req.body.name,
                req.body.birthdate,
                req.body.genderSelect,
                req.body.newsletterId)

            ajaxOut.data.subscriptionID=result.subscriptionID;
            ajaxOut.result=result.status;
        }
        catch(err){
            //TODO: Log error 
            ajaxOut.result=false;
            res.send(ajaxOut);
        }      
    } 
    else{
        ajaxOut.error=result.msg;
    }

    //TODO: Send confirmation email

    res.send(ajaxOut);
}

//Cancel Subscription
function FE_subscriptionDelete(req,res){
    console.log("FE_subscriptionDelete");
    let ajaxOut;  // TODO: load schema
    let result;
    try{
        result = deleteInfoFromBBDD(req.query.id);
        ajaxOut.result=result;

    }
    catch(err){
        //TODO: Log error 
        ajaxOut.result=false;
        res.send(ajaxOut);        
    }    

    //TODO: Send confirmation email

    res.send(ajaxOut);  
}

function validate(){
    //TODO: Function that validates input data
    //returns true if everything is OK
    //otherwise returns false and the details of the error in a string
}

module.exports = {
	FE_viewAllSubscription,
	FE_getSubscriptionDetails,
	FE_subscriptionPut,
	FE_subscriptionDelete,
    FE_subscriptionPost,
  };

