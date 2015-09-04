

function tryget(myvar)
{
    if(typeof(myvar)!="undefined" || myvar == "")
        return myvar;
    else return "-";
}

function InsertForm(kwargs)
{
    /*REQUEST DATA FROM THE SERVER*/
    $.post("/getrendered", 
        kwargs,
        function(result)
        {
            $("#" + kwargs["itemid"]).replaceWith(result);
        }
    );      
}


function InsertTable(kwargs)
{
    /*REQUEST DATA FROM THE SERVER*/
    $.post("/getrendered", 
        kwargs, 
        function(data)
        {
            $("#" + kwargs["itemid"]).replaceWith(data);
        }
    );           
}

function Insert(kwargs)
{
    /*REQUEST DATA FROM THE SERVER*/
    $.post("/getrendered", 
        kwargs, 
        function(data)
        {
            $("#" + kwargs["itemid"]).replaceWith(data);
        }
    );           
}
    
function SaveForm(kwargs)
{
    /*REQUEST DATA FROM THE SERVER*/
    $.post("/extends", 
        kwargs, 
        function(data)
        {
            $("#" + kwargs["itemid"]).replaceWith(data);
        }
    );      
}

function GetRendered(kwargs)
{
    /*REQUEST DATA FROM THE SERVER*/
    $.post("/getrenderedby", 
        kwargs, 
        function(data)
        {
            $("#" + kwargs["itemid"]).replaceWith(data);
        }
    );      
}

function Update(kwargs)
{
    /*REQUEST DATA FROM THE SERVER*/
    $.post("/update", 
        kwargs, 
        function(data)
        {
            ;
        }
    );      
}

function clientDateConditions(query)
{
    
    if($("#filterdate").val() == "Today")
    {
        var nowbegin = new Date();
        var nowend = new Date();
        nowend.setHours(23, 59);
        
        query.greaterThanOrEqualTo('ReceiptDate', moment( nowbegin ).format("YYYYMMDD"));
        query.lessThanOrEqualTo('ReceiptDate', moment( nowend).format("YYYYMMDD"));
    }
    else if($("#filterdate").val() == "Yesterday")
    {
        var now = new Date();
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        
        query.greaterThanOrEqualTo('ReceiptDate', moment( yesterday ).format("YYYYMMDD"));
        query.lessThan('ReceiptDate', moment( now ).format("YYYYMMDD"));
    }
    else if($("#filterdate").val() == "This week")
    {
        var now = new Date();
        now.setHours(0,0,0);
        
        //dia de la semana
        var nday = now.getDay();  //index zero based
        
        var difftime = nday * (24 * 3600 * 1000); // number of day to substract to current date
        
        nowbegin = new Date(now.getTime() - difftime );
        
        var time = (24 * 3600 * 1000)-1000;
        var nowend = new Date(now.getTime() + (time) );
        
        query.greaterThanOrEqualTo('ReceiptDate', moment( nowbegin ).format("YYYYMMDD"));
        query.lessThanOrEqualTo('ReceiptDate', moment( nowend).format("YYYYMMDD"));
    }
    else if($("#filterdate").val() == "This month")
    {
        nowbegin = new Date();
        nowbegin.setDate(1);
        
        var nowend = new Date();
        nowend.setHours(23, 59);
        
        query.greaterThanOrEqualTo('ReceiptDate' , moment( nowbegin ).format("YYYYMMDD"));
        query.lessThanOrEqualTo('ReceiptDate' , moment( nowend).format("YYYYMMDD"));
    }
    else if($("#filterdate").val() == "Last month")
    {
        var nowend = new Date();
        nowend.setDate(0);
        /*nowend.setHours(23, 59);*/
        
        var nowbegin = new Date();
        nowbegin.setDate(1);
        nowbegin.setMonth(nowend.getMonth() );
        
        query.greaterThanOrEqualTo('ReceiptDate' , moment( nowbegin ).format("YYYYMMDD"));
        query.lessThanOrEqualTo('ReceiptDate' , moment(nowend).format("YYYYMMDD"));
    }
    else if($("#filterdate").val() == "Current year")
    {
        var now = new Date();
        now.setHours(0,0,0);
        
        nowbegin = new Date(now.getTime() - (1000) );
        nowbegin.setDate( 1 );
        nowbegin.setMonth(0);
        
        var nowend = new Date(now.getTime() );
        nowend.setHours(23,59,59);
        
        query.greaterThanOrEqualTo('ReceiptDate', moment( nowbegin ).format("YYYYMMDD"));
        query.lessThanOrEqualTo('ReceiptDate', moment(nowend).format("YYYYMMDD"));
    }
}

function date_condition(filterdate)
{
    if(typeof filterdate == "undefined") filterdate = "filterdate";
    
    if($("#"+filterdate).val() == "Today")
    {
        var nowbegin = new Date();
        var nowend = new Date();
        nowend.setHours(23, 59);
        
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : moment( nowbegin ).format("YYYYMMDD")},
                lessThanOrEqualTo: {'ReceiptDate' : moment( nowend).format("YYYYMMDD")}
                };
        
        /*        
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:moment( nowbegin ).format("MM[/]DD[/]YYYY")}},
                lessThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:nowend}}
                };*/
    }
    else if($("#"+filterdate).val() == "Yesterday")
    {
        var now = new Date();
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        
        
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : moment( yesterday ).format("YYYYMMDD")},
                lessThan: {'ReceiptDate' : moment( now ).format("YYYYMMDD")}
                };
        
        /*
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:moment( yesterday ).format("MM[/]DD[/]YYYY")}},
                lessThan: {'ReceiptDate' : {__type:"Date", iso:moment( now ).format("MM[/]DD[/]YYYY")}}
                };*/
    }
    else if($("#"+filterdate).val() == "This week")
    {
        
        var now = new Date();
        now.setHours(0,0,0);
        
        //dia de la semana
        var nday = now.getDay();  //index zero based
        
        var difftime = nday * (24 * 3600 * 1000); // number of day to substract to current date
        
        nowbegin = new Date(now.getTime() - difftime );
        
        var time = (24 * 3600 * 1000)-1000;
        var nowend = new Date(now.getTime() + (time) );
        
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : moment( nowbegin ).format("YYYYMMDD")},
                lessThanOrEqualTo: {'ReceiptDate' : moment( nowend).format("YYYYMMDD")}
                };
        /*
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:moment( nowbegin ).format("MM[/]DD[/]YYYY")}},
                lessThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso: nowend}}
                };*/
    }
    else if($("#"+filterdate).val() == "This month")
    {
        nowbegin = new Date();
        nowbegin.setDate(1);
        
        var nowend = new Date();
        nowend.setHours(23, 59);
        
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : moment( nowbegin ).format("YYYYMMDD")},
                lessThanOrEqualTo: {'ReceiptDate' : moment( nowend).format("YYYYMMDD")}
                };
        
        /*
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:moment( nowbegin ).format("MM[/]DD[/]YYYY")}},
                lessThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso: nowend}}
                };*/
    }
    else if($("#"+filterdate).val() == "Last month")
    {
        var nowend = new Date();
        nowend.setDate(0);
        /*nowend.setHours(23, 59);*/
        
        var nowbegin = new Date();
        nowbegin.setDate(1);
        nowbegin.setMonth(nowend.getMonth() );
        
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : moment( nowbegin ).format("YYYYMMDD")},
                lessThanOrEqualTo: {'ReceiptDate' : moment(nowend).format("YYYYMMDD")}
                };
        
        /*
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:moment( nowbegin ).format("MM[/]DD[/]YYYY")}},
                lessThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:nowend}}
                };*/
    }
    else if($("#"+filterdate).val() == "Current year")
    {
        var now = new Date();
        now.setHours(0,0,0);
        
        nowbegin = new Date(now.getTime() - (1000) );
        nowbegin.setDate( 1 );
        nowbegin.setMonth(0);
        
        var nowend = new Date(now.getTime() );
        nowend.setHours(23,59,59);
        
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : moment( nowbegin ).format("YYYYMMDD")},
                lessThanOrEqualTo: {'ReceiptDate' : moment(nowend).format("YYYYMMDD")}
                };
        
        /*
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:moment( nowbegin ).format("MM[/]DD[/]YYYY")}},
                lessThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:nowend}}
                };*/
    }
    
    return {};
}

function filter_conditions_with_dict(kwargs)
{
    res = filter_conditions(kwargs["filterby"], kwargs["searchtext"], kwargs["filterdate"]);
    
    return jQuery.extend(res, kwargs["conditions"]);
}

function filter_conditions(filterby, searchtext, filterdate)
{
    if(typeof filterby == "undefined") filterby = "filterby";
    if(typeof searchtext == "undefined") searchtext = "searchtext";
    if(typeof filterdate == "undefined") filterdate = "filterdate";

    
    //DATE INTERVAL
    if($("#"+filterby).val() == "Date")
    {
        var begindate = new Date($("#"+searchtext).val());
        var enddate = new Date($("#"+filterdate).val());
        
        return {
                greaterThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:moment( begindate ).format("MM[/]DD[/]YYYY")}},
                lessThanOrEqualTo: {'ReceiptDate' : {__type:"Date", iso:moment( enddate ).format("MM[/]DD[/]YYYY")}}
                };
    }
    else
    {
        
        /* NEW RANGE INTERVAL */
        if($("#fromdate").val() != "" && $("#todate").val() != "")
        {
            var begindate = new Date($("#fromdate").val() );
            
            var enddate = new Date($("#todate").val() );
            
            /*var today = moment();
            var enddate = today;*/
            
            /*var enddate = moment(today).add(1, 'days');*/
            
            /*alert(enddate);*/
            
            var daterange = {
                            greaterThanOrEqualTo: {'ReceiptDate' : moment( begindate ).format("YYYYMMDD")},
                            lessThanOrEqualTo: {'ReceiptDate' : moment( enddate).format("YYYYMMDD")}
                            };
            
            return daterange;
            
        }
        else
            return date_condition(filterdate);
    }
}

function filter_like_with_dict(kwargs)
{
    res = filter_like(kwargs["filterby"], kwargs["searchtext"]);
    
    return jQuery.extend(res, kwargs["like"]);
}

function filter_like(filterby, searchtext)
{
    if(typeof filterby == "undefined") filterby = "filterby";
    if(typeof searchtext == "undefined") searchtext = "searchtext";
    
    if($("#"+filterby).val() == "Shipper" || $("#"+filterby).val() == "Consignee" || $("#"+filterby).val() == "Client")
    {
        var dic = {};
        dic[$("#"+filterby).val()] = {"Name":$("#"+searchtext).val()};
        return dic;
    }
    else if($("#"+filterby).val() == "Date")
    {
        return {};
    }
    else
    {
        var dic = {};
        dic[$("#"+filterby).val()] = $("#"+searchtext).val();
        return dic;
    }
    
}
	
function filterby_changed(filterby, searchtext, filterdate, updatetable)
{
    if(typeof filterby == "undefined") filterby = "filterby";
    if(typeof searchtext == "undefined") searchtext = "searchtext";
    if(typeof filterdate == "undefined") filterdate = "filterdate";
    if(typeof updatetable == "undefined") updatetable = update_table;
    //if(typeof searchkeyup == "undefined") searchkeyup = searchtext_keyup;
    
    if($("#"+filterby).val() == "Date_DISABLED" )
    {
        $("#"+searchtext).replaceWith("<input type='text'  placeholder='From' id='searchtext' name='searchtext'>".replace(/searchtext/g, searchtext));
        /*$("#fromTxt").replaceWith("<label class='pfont' style='display: block;' id='fromTxt'>Date:</label>");
        $("#toTxt").replaceWith("<label class='pfont' id='toTxt'>To:</label>");*/
        $("#"+filterdate).replaceWith("<input type='text'  placeholder='To' id='filterdate' name='filterdate'>".replace(/filterdate/g, filterdate));
    
        $( "#"+searchtext ).datepicker();
        $( "#"+filterdate ).datepicker(
            {
                onSelect: 
                    function(dateText, inst) 
                    {            
                        updatetable();
                    }
                });
                
    }
    else if($("#"+filterby).val() == "All")
    {
        $("#"+searchtext).replaceWith("<input type='hidden' placeholder='Search' id='searchtext' name='searchtext'>".replace(/searchtext/g, searchtext));
        /*$("#"+filterdate).replaceWith("<select id='filterdate' name='filterdate'><option value='All'>All</option><option value='Today'>Today</option> <option value='Yestarday'>Yesterday</option><option value='This week'>This week</option><option value='This month'>This month</option><option value='Last month'>Last month</option><option value='Current year'>Current Year</option></select>".replace(/filterdate/g, filterdate));
            
        $("#"+filterdate).change(function(){
                updatetable();
            }); 
              
        updatetable();*/
        
    }
    else
    {
        $("#"+searchtext).replaceWith("<input type='text' placeholder='Search' id='searchtext' name='searchtext'>".replace(/searchtext/g, searchtext));
        /*$("#"+filterdate).replaceWith("<select id='filterdate' name='filterdate'><option value='All'>All</option><option value='Today'>Today</option> <option value='Yesterday'>Yesterday</option><option value='This week'>This week</option><option value='This month'>This month</option><option value='Last month'>Last month</option><option value='Current year'>Current Year</option></select>".replace(/filterdate/g, filterdate));
        
        //$("#"+searchtext).keyup(searchkeyup);
        
        $("#"+filterdate).change(function(){
                updatetable();
            }); */
        
        /* CLIENT AUTOFILL ON FILTER */    
        if($("#"+filterby).val() == "Consignee")
        {            
            $("#"+searchtext).keyup(function(){
                                    
                    if($("#"+searchtext).val().length <= 2)
                        return;
                    
                    var myval = $("#"+searchtext).val();
                    
                    var query = new Parse.Query("Clients");
                    query.descending('createdAt');
                    query.equalTo("Company", {__type: "Pointer", className: "Companies", objectId: user.get("Company").id} );
                    query.startsWith("Name", myval.toUpperCase());
                    
                    query.find({
                        success: 
                            function(results)
                            {
                                var newresult = [];
                                
                                for(i in results)
                                    newresult.push({label:results[i].get("Name"), idx:results[i].id});
                                    
                                $("#"+searchtext).autocomplete({source: newresult});   
                                $("#"+searchtext).trigger("keydown");
                            }
                        });
                
                });
        }
        else if($("#"+filterby).val() == "Shipper")
        {            
            $("#"+searchtext).keyup(function(){
                                    
                    if($("#"+searchtext).val().length <= 2)
                        return;
                    
                    var myval = $("#"+searchtext).val();
                    
                    var query = new Parse.Query("Agencies");
                    query.descending('createdAt');
                    query.equalTo("Company", {__type: "Pointer", className: "Companies", objectId: user.get("Company").id} );
                    query.startsWith("Name", myval.toUpperCase());
                    
                    query.find({
                        success: 
                            function(results)
                            {
                                var newresult = [];
                                
                                for(i in results)
                                    newresult.push({label:results[i].get("Name"), idx:results[i].id});
                                    
                                $("#"+searchtext).autocomplete({source: newresult});   
                                $("#"+searchtext).trigger("keydown");
                            }
                        });
                
                });
        }
    }
}

function byeByeClient(clientId, companyId){
    swal({   
                title: "This user will be deleted permanently!",   
                text: "Do you want to continue?",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "Yes, delete it!",   
                closeOnConfirm: true
            },
            function()
            {    
                var query = new Parse.Query("Clients");
                
                query.get(clientId, {success: function(client){
                        client.destroy({success:function(){
                                update_table();
                            }});
                    }});
                
            });
}

function byeByeConsignee(clientId){
    swal({   
                title: "This user will be deleted permanently!",   
                text: "Do you want to continue?",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "Yes, delete it!",   
                closeOnConfirm: true
            },
            function()
            {    
                var query = new Parse.Query("Clients");
                
                query.get(clientId, {success: function(client){
                        client.destroy({success:function(){
                                update_consigneestable();
                            }});
                    }});
                
            });
}
  
  function byeByeStaff(staffId, companyId, url){
    swal({   
  	  title: "This user will be deleted permanently!",   text: "Do you want to continue?",   
             type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   
             confirmButtonText: "Yes, delete it!",   closeOnConfirm: true },
             function(){    
  			   Parse.Cloud.run('byeByeStaff', { staffId: staffId, companyId: companyId, url:url}, {
    success: function() {
  	$('#staffTableList').load(document.URL +  ' #staffTableList');
  	    },
    error: function() {
  	  alert("Sorry something went wrong, please refresh the page and try again!");
  	    }
  	  });
    });
    }
	
		
//FORM ADD STAFF REGISTRATION VALIDATION
	function valRegStaff() {
	   var staffFullName = document.forms["regStaffForm"]["staffName"].value;
	   var staffPosition = document.forms["regStaffForm"]["staffJobPosition"].value;
	   var staffUsername = document.forms["regStaffForm"]["staffUsername"].value;
	   var staffPassword = document.forms["regStaffForm"]["staffPassword"].value;
	   var staffConPassword = document.forms["regStaffForm"]["staffConPassword"].value;
	   var vreg_email = document.forms["regStaffForm"]["staffEmail"].value;
	   var atpos = vreg_email.indexOf("@");
	   var dotpos = vreg_email.lastIndexOf(".");
	   var findme = "@";
   
	   if( staffFullName == null || staffFullName == "") {
		 sweetAlert("Sorry...","Please fill out the name!", "error");
	        return false;
	    } else if (staffFullName.length < 2) {
		   sweetAlert("Sorry...", "Invalid name!", "error");
	        return false;
	  }else if (vreg_email == null || vreg_email == "") {
		  sweetAlert("Sorry...", "Email must be filled out!", "error");
	        return false;
		}else if (staffUsername.indexOf(findme) > -1){
  		  sweetAlert("Sorry...", "Username can't have @", "error");
  	        return false;
	  } else if (atpos < 1 || ( dotpos - atpos < 2 )) {
		  sweetAlert("Sorry...", "Invalid Email!", "error");
	        return false;
	  } else if (staffPosition == null || staffPosition == "") {
		  sweetAlert("Sorry...", "Please enter staff job position!", "error");
	        return false;
	    } else if (staffPassword == null || staffPassword == "") {
		 sweetAlert("Error...", "Password needed!");
	        return false;
	    } else if (staffConPassword == null || staffConPassword == "") {
		  sweetAlert("Error...", "Please confirm your password!", "error");
	        return false;
	    }else if(staffPassword != staffConPassword){
	   	 sweetAlert("Error...", "Password does not match!", "error");	
	           return false;
	        }
	      };
  

		  	
	



