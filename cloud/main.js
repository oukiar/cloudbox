//BY NEURONS ART AND TECHNOLOGY ALL RIGHTS RESERVED AND COPYRIGHTED.
//IN ASSOCIATION WITH LC CARGO XPRESS LOS ANGELES
//SISTEM PLANIFICATION BY LC CARGO XPRESS
//AUTHORS: SUI GENERIS / OSCAR ALCANTARA

require('cloud/app.js');

Parse.Cloud.define("restore", function(request, response) {
    Parse.Cloud.useMasterKey();
    var queryWarehouse = new Parse.Query("Receipts");
    queryWarehouse.equalTo("objectId", request.params.receiptId);
    
    queryWarehouse.first().then(function(results) 
    {
        //obtenemos el status anterior
        oldstat = results.get("Status");
        
        results.set("Status", oldstat.split(":")[1] );
        results.save();
        response.success("Receipt restored");
    });
});

Parse.Cloud.define("sendMail", function(request, response) {
    var Mandrill = require('mandrill');
    Mandrill.initialize('HyML8A-jJEV4rGScp2w2Sw');

    Mandrill.sendEmail(
     {
        message: 
        {
			/*html: "</br><img src='https://lccargoxpress.parseapp.com/login/images/logo.png' alt='Package' width='89' height='89' /><h3>LC Cargo Xpress</h3><br>" + request.params.text + "boxes </br><b>From:</b>" + request.params.shipper + "</br><b>Total Weight:</b> </br> <b>Receipt By:</b>" ,
            */
            html: request.params.text,
            subject: request.params.subject,
            from_email: request.params.from_email,
            from_name: request.params.from_name,
            to: [
            {
                email: request.params.to_email,
                name: request.params.to_name
            }]
        },
        async: true
    },
        
    {
        success: function(httpResponse) {
        console.log(httpResponse);
        response.success("Email sent! " + request.params.to_email);
        },
        error: function(httpResponse) {
        console.error(httpResponse);
        response.error("Uh oh, something went wrong");
        }
    });
});


Parse.Cloud.define("updateClientInfo", function(request, response) {
    Parse.Cloud.useMasterKey();    
    var user = Parse.User.current(); 
    var query = new Parse.Query("User");
    query.include("ClientID");
    query.get(user.id, {success:function(usr){
            usr.get("ClientID").set("Name", request.params.clientName );
            usr.get("ClientID").save();
        }});
    
    response.success("Update Successful!");
	 response.error("Sorry!");
 });
 
//UPPER CASE THE CLIENTS NAME BEFORE SAVE
Parse.Cloud.beforeSave("Clients", function(request, response){
    request.object.set("Name", request.object.get("Name").toUpperCase() ); 
    response.success();
});

//UPPER CASE THE STORES NAME BEFORE SAVE
Parse.Cloud.beforeSave("Agencies", function(request, response){
    request.object.set("Name", request.object.get("Name").toUpperCase() ); 
    response.success();
});


//Deletes saved or published articles
Parse.Cloud.define("byeByeClient", function(request, response) {
	Parse.Cloud.useMasterKey();
	var client = new Parse.Query("Clients");
	var company = request.params.companyId;
	client.equalTo("objectId", request.params.clientId);
	client.first().then(function(result) {
		if(result.get("Company").id = company){
		  result.destroy({}); 
		  response.success(); 
	  }
	 },function(error){
			response.error("Sorry something went wrong, please refresh the page and try again!");
		});  
});


//Deletes saved or published articles
Parse.Cloud.define("byeByeStaff", function(request, response) {
	Parse.Cloud.useMasterKey();
	var staff = new Parse.Query("User");
	staff.include("StaffId");
	var company = request.params.companyId;
	staff.equalTo("objectId", request.params.staffId);
	staff.first().then(function(result) {
		  result.get("StaffId").destroy({});
		  result.destroy({}); 
		  response.success(); 

	 },function(error){
			response.error("Sorry something went wrong, please refresh the page and try again!");
		});  
});


//Create and save the PDF for best print times
Parse.Cloud.define("createPDF", function(request, response) {

    
    var jsPDF = require('cloud/jspdf.debug.js');
    //var jsPDF = require('cloud/split_text_to_size.js');
       
    /*var doc = new jsPDF('l', 'in', [6,4]);*/
    var doc = new jsPDF('l', 'pt', [432,288]);
    
        company = 'LCCargo Xpress';
        rcpData = '# 00124123       -       Destination';
        headTable = 'Length | Width | Height | Volume | Weight-Vol. | Weight';
        values = '134511 | 134511 | 134511 | 134511 | 134511 | 134511';
        shipper = 'Shipper: Carlos hernandez';
        zone = 'Zone: ABCD';
        time = '15/07/2015 00:00';
        box = '12/12';
              
        /*
        doc.setFontSize(16);
        * 
        var offset=10;
        
        //var offset = doc.internal.pageSize.width/2 - (doc.getStringUnitWidth(company)*16)/2;
        doc.text(offset, 20, company);
        
        //var offset = doc.internal.pageSize.width/2 - (doc.getStringUnitWidth(rcpData)*16)/2;
        doc.text(offset, 40, rcpData);
        
        //var offset = doc.internal.pageSize.width/2 - (doc.getStringUnitWidth(headTable)*16)/2;
        doc.text(offset, 60, headTable);
        
        //var offset = doc.internal.pageSize.width/2 - (doc.getStringUnitWidth(values)*16)/2;
        doc.text(offset, 80, values);
        
        //var offset = doc.internal.pageSize.width/2 - (doc.getStringUnitWidth(shipper)*16)/2;
        doc.text(offset, 100, shipper);
        
        //var offset = doc.internal.pageSize.width/2 - (doc.getStringUnitWidth(zone)*16)/2;
        doc.text(offset, 120, zone);
        
        //var offset = doc.internal.pageSize.width/2 - (doc.getStringUnitWidth(time)*16)/2;
        doc.text(offset, 140, time);
		
        //var offset = doc.internal.pageSize.width/2 - (doc.getStringUnitWidth(box)*16)/2;
        doc.text(offset, 160, box);
        */
    
	var query = new Parse.Query("Boxes");
    
    query.equalTo("Receipt", {__type:"Pointer", className:"Receipts", objectId:request.params.receiptId});
    
	query.find({success:function(results) {
            
            for(i=0; i<results.length; i++)
            {
                
                var offset=10;
                
                //var w = doc.getStringUnitWidth("hello hello");
                
                doc.text(offset, 20, company);
                doc.text(offset, 40, rcpData);
                doc.text(offset, 60, headTable);
                doc.text(offset, 80, values);
                doc.text(offset, 100, shipper);
                doc.text(offset, 120, w.toString() );
                doc.text(offset, 140, time);
                if(typeof results[i].get("Num") != "undefined")
                    doc.text(offset, 160, results[i].get("Num"));
                
                doc.addPage();
            }
            
            response.success( doc.output() ); 
        }});
});

//CLIENT SIGNUP ADD FROM STAFF SESSION
Parse.Cloud.define("regClientByStaff", function(request, response){
    
    var currentUser = Parse.User.current();
    
    //var currentToken = ._sessionToken;
    
    var newuser = new Parse.User();
        
    newuser.set('username', request.params.user + "@" + request.params.companyName.toLowerCase() );
    newuser.set('password', request.params.pass);
    
    newuser.set('Class', "client");
    newuser.set('ClientID', {__type: "Pointer", className: "Clients", objectId:request.params.clientID});
    newuser.set("Company", {__type: "Pointer", className: "Companies", objectId:request.params.companyID });
    
    newuser.signUp(null, {success: function(newuser){    
        response.success("OK");
        /*
        Parse.User.become(currentUser._sessionToken).then(function (user) {
                
                response.success();
            });*/
    }});
    
});

//Update password for active users with account
Parse.Cloud.define("updateUserPassword", function(request, response) {
	Parse.Cloud.useMasterKey();
    
	var User = Parse.Object.extend("User");
	var user = new User;
    
    user.id = request.params.userId;
    user.set("password", request.params.newpass);
    
    user.save({success:function(user){
        
            Parse.User.become("session-token-here").then(function (user) {
                    
                }, function (error) {
                // The token could not be validated.
            });
        
        
            response.success("OK");
        }});
});

//Edit Staff Info
Parse.Cloud.define("editStaffInfo", function(request, response) {
	Parse.Cloud.useMasterKey();
	var userStaff = Parse.Object.extend("User");
	var usrStaff = new userStaff;
	usrStaff.id = request.params.staffId;
	usrStaff.set("email", request.params.stemail);
	usrStaff.set("username", request.params.stusrname);
	usrStaff.save();
		  response.success(); 
});

//DELETE A SUBCLIENTS-CONSIGNEES
Parse.Cloud.afterDelete("Clients", function(request) {
    
    var query = new Parse.Query("Clients");
    query.equalTo("MainClient", {__type:"Pointer", className:"Clients", objectId:request.object.id});

    query.find().then(function(clients) {
            return Parse.Object.destroyAll(clients);
        }).then(function(success) {
            //SUB-CLIENTS DELETED
            response.success(); 
        }, function(error){
            console.error("Error deleting related clients " + error.code + ": " + error.message);
        }
    );
});



