//return the id of the subscription
//if any error, return 

function saveInfoInDDBB(subscriptionData){
    let result =true;
    //TODO: develop the function that save data and return subscriptionID
    data.status=result;
    if (!result)
        data.status.msg="Error saving information in DDBB";

    data.subscriptionID=subscriptionID;
    return data;
}

function getInfoFromDDBB(subscriptionData){
    let result =true;
    //TODO: develop the function that get subscription data
    data.status=result;
    if (!result)
        data.status.msg="Error getting information in DDBB";

    data.subscription=subscription;
    
    return data;
}

function deleteInfoFromBBDD(id){
    let result =true;
    //TODO: develop the function
    data.status=result;
    if (!result)
        data.status.msg="Error deleting information in DDBB";
        
    return data;
}