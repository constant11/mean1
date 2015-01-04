myApp.controller('PhoneBookCtrl', function($scope, $http, $location, $route, $routeParams) {
	
	console.log("Hello From PhoneBookCtrl");
	console.log($routeParams.contactid);
	$scope.message = "Default";

	$scope.headerLabels = [{'label':'Name'},{'label':'Address'},
							{'label':'Telephone No'},{'label':'Cellphone No'},
							{'label':'Birthday'},{'label':'Action'}];	
	
	var yearnow = new Date().getFullYear();
	$scope.years = [];
	for(var x = 1950; x <= yearnow; x++){
		$scope.years.push({'val':x});
	}
	
	$scope.months = [{'val':'1','dis':"January"}, {'val':'1','dis':"February"}, {'val':'1','dis':"March"}, 
					{'val':'1','dis':"April"}, {'val':'1','dis':"May"}, {'val':'1','dis':"June"}, 
					{'val':'1','dis':"July"}, {'val':'1','dis':"August"}, {'val':'1','dis':"September"}, 
					{'val':'1','dis':"October"}, {'val':'1','dis':"November"}, {'val':'1','dis':"December"}];
	
	$scope.days = [];
	for(var x = 1; x <= 31; x++){
		$scope.days.push({'val':x});
	}

	//-------------listeners------------
	
	$scope.lsnr_cancel_ls = function(){
		$location.path( '/phonebook' );
	}
	
	$scope.lsnr_create_ev = function (id){
		$location.path( '/phonebook/create/' );
	}
	
	$scope.lsnr_edit_ev = function (id){
		$location.path( '/phonebook/edit/'+id );
	}
	
	$scope.lsnr_delete_ls = function (id){
		$http.delete("/phoneBook/"+id)
		.success(function (response){
			$scope.listview();
		});
	}		
	
	$scope.lsnr_save_ls = function(id){
		if(typeof $scope.contactDetails == 'undefined' || typeof $scope.contactDetails.givenname == 'undefined'){
			jQuery('#contact_form').bootstrapValidator('validate');
			return false;
		}
		// alert(1);
		if(id == undefined){
			$http.post("/phoneBook", $scope.contactDetails);
		}
		else{
			$http.put("/phoneBook/"+$scope.contactDetails._id,$scope.contactDetails)
		}
		$location.path( '/phonebook' );
	}	
	
	//-------------listeners end------------

	
	$scope.renderPhoneBook = function (response){
		console.log(response);
		$scope.message = "Phone Book";
		var temp = [];
		angular.forEach(response, function(value, key) {
			temp = response[key];
			
			temp.completename = addtostring("",value.givenname);
			temp.completename = addtostring(temp.completename,value.middlename);
			temp.completename = addtostring(temp.completename,value.familyname);
			
			temp.completeaddress = addtostring("",value.preaddress);
			temp.completeaddress = addtostring(temp.completeaddress,value.city);
			temp.completeaddress = addtostring(temp.completeaddress,value.province);
			temp.completeaddress = addtostring(temp.completeaddress,value.country);

		});
		$scope.contactsDetails = response;
	}
	
	$scope.listview = function(){
		$http.get("/phoneBook")
		.success($scope.renderPhoneBook);
	}
	
	$scope.createview = function (){
		$scope.message = "Create New Contact";
	}	
	
	$scope.editview = function (){
		$scope.message = "Edit Contact";
		$http.get("/phoneBook/"+$routeParams.contactid)
		.success(function (response){
			$scope.contactDetails = response;
		});
	}	
	
	$scope[$route.current.functionName]();
	
	
	
	addtostring = function (string, variable){
		if(variable != undefined){
			if(string == ''){
				string = variable;
			}
			else{
				string = string+' '+variable;
			}
		}
		return string;
	}
});