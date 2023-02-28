/*Public service: Interface with frontend
This implements the functions that are launched by the UI
*/
const localRoute="/app/submenurequest/subscription/";

var bSubmit=false;

loadHandlers();


/*
*Add new subscription
*/
function addSubscriptionClick(){
    $(".modal-subs #id").val("new");
    $(".modal-subs #emailAddress").val("");
    $(".modal-subs #name").val("");
    $(".modal-subs #birthdate").val("");
    $(".modal-subs #genderSelect").prop('value', "0");
    $(".modal-subs #agreement").prop('checked', false);
    $(".modal-subs #newsletterId").val("");

    //Show new subscription modal form
    $("#mySubscriptionForm").modal();
}

function removeSubscriptionClick(id){
    //Get from UI the id to be removed
    //Supossed the list of subscriptions are shown in a datatable
	let row= $(this).closest('tr');
	let id=row.find('.subscription-list-id').text();

	let response=confirm("Are you sure you want to remove this subscription?");
	if (response==true){
		var formData=JSON.parse('{"id":""}');
		formData.id=id;
		ajaxCallBack("DELETE", localRoute + "data",formData ,function(result){
			if(result==false){
				alert(result.msg);
			}
			else{
                //reload main screen
				loadHTMLContent("#main-screen", localRoute);
			}
		});
	}
}

function getSubscriptionDetailsClick(event){    
    //Get from UI the id to be edited
    //Supossed the list of subscriptions are shown in a datatable
	let row= $(this).closest('tr');
	let id=row.find('.subscription-list-id').text();

	var dataOut=JSON.parse('{"id":""}');
	dataOut.id=id;
	ajaxCallBack("GET", localRoute + "data",dataOut ,function(result){
		if(result==false)
		{
			alert(result.msg);
		}
		else
		{
			if(result.data.subscription) 
			{
                //If data received is undefined, show empty space
				if(	typeof result.data.subscription.id == "undefined" ){
					result.data.subscription.id="";
				}
				if(	typeof result.data.subscription.emailAddress == "undefined" ){
					result.data.subscription.emailAddress="";
				}
				if(	typeof result.data.subscription.name == "undefined" ){
					result.data.subscription.name="";
				}
				if(	typeof result.data.subscription.birthdate == "undefined" ){
					result.data.subscription.birthdate="";
				}	
                //If data received is undefined, show first select option
				if(	typeof result.data.subscription.genderSelect == "undefined" ){
					result.data.subscription.genderSelect="0";
                } 
				
                $(".modal-subs #id").val( result.data.subscription.id );
                $(".modal-subs #emailAddress").val( result.data.subscription.emailAddress );
                $(".modal-subs #name").val( result.data.subscription.name );
                $(".modal-subs #birthdate").val( result.data.subscription.birthdate );    
				$(".modal-body #genderSelect").prop('value', result.data.subscription.genderSelect);
                $(".modal-subs #newsletterId").val( result.data.subscription.newsletterId );
			                
                //Show subscription modal form with the data received from backend (subsService)
				$("#mySubscriptionForm").modal();
			}
		}
	});
}

function getViewAllSubscriptionClick(event){    
	var dataOut;
	ajaxCallBack("GET", localRoute + "viewAll",dataOut ,function(result){
		if(result==false)
		{
			alert(result.msg);
		}
		else
		{ 
            //Show dataTable
            
		}
	});
}

//Public function add new subscription
//TODO: use this function with PUT method to develop the edition of a subscription
function buttonSubmitClick(){
	if(bSubmit==false){
		if(validateData()){
			bSubmit=true;
			
			let formData= $(this).serialize();

			ajaxCallBack("POST", localRoute, formData , function(result){
				if(result==false){
					alert(result.msg);
					bSubmit=false;
				}
				else{
					$('#mySubscriptionForm').modal('toggle');
					bSubmit=false;
				}
			});
		}
	}
}

//Check if the subscription form completed by user has any mistake
//Assuming localvalidation class is properly implemented in frontend form
function validateData(){		
	let element= $(".has-error").find('.localValidation');
	if(element.length > 0){
		element.each(function(i,item){
			alert("Invalid value, "+ item.title );
		});
		return false;
	}
	//If there is no mistakes in the data, check the consent agreement value
	consentAgreementValue=$(".modal-subs #agreement").prop('checked');;
	return consentAgreementValue;

}

function loadHandlers(){    
	$("#btnAddNewSubscription").bind("click", addSubscriptionClick);        
	$("#subscriptionSubmit").bind("click",buttonSubmitClick);

	$("#btnDeleteSubscription").bind("click", removeSubscriptionClick);
	$("#btnGetSubscriptionDetails").bind("click", getSubscriptionDetailsClick);   
	$("#btnViewAllSubscription").bind("click", getViewAllSubscriptionClick);
     
} 