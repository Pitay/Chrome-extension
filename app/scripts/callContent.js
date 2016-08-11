console.log("test");

var htm = document.body.innerHTML;

var token = undefined;

var env = "https://itov.panaya.int";
var accNum = 487;

var user = {};
user.username = "nirz@qa.com";
user.password = "Panaya311";

var getToken = function(){
    var data= {"payload":user};
    var erps = {};
    $.ajax(

        {
            type: "POST",
            url:env+"/api/login",
            headers:
            {'Content-Type': 'application/x-www-form-urlencoded'},
            data:"username=nirz@qa.com&password=Panaya311"
        }

    ).success(function(data){
            token = JSON.parse(data).token;
            getAllImpacts();
        });
};

var getAllImpacts = function(){
    // $http.defaults.headers.common['X-Auth-Token'] = var .token;

    //,
    var header = {"X-Auth-Token":token};

    $.ajax({
            type: "GET",
            url:env+"/api/allImpacts",
            headers: header
        }
    ).success(function(data){
            var impacts = data;
            addLinks(impacts);
        })
}

/*var getSystems = function(){

    // $http.defaults.headers.common['X-Auth-Token'] = var .token;

    //,
    var header = {"X-Auth-Token":token};

    $.ajax({
            type: "GET",
            url:env+"/api/erps",
            headers: header
        }
    ).success(function(data){
            var erps = data;
            getImpacts(impacts);
        })
};

var getImpacts = function(){

    // $http.defaults.headers.common['X-Auth-Token'] = var .token;

    //,
    var header = {"X-Auth-Token":token};

    $.ajax({
            type: "GET",
            url:env+"/api/erps/"+accNum+"/rca",
            headers: header,
            data:{
                q:""
            }
        }
    ).success(function(data){
            var impacts = data;
            addLinks(impacts);
        })
};*/

addLinks = function(impacts){
    var text = document.body.innerHTML;

    for(var i=0; i< impacts.length; i++){

        var accountId = impacts[i].accountId;

        var fprRunImpacts = impacts[i].impactedEntryPoint;

        for(var j=0;j<fprRunImpacts.length;j++){
            var impact = fprRunImpacts[j].impactEntryPoint;
            var index = text.indexOf(impact);
                if(index > -1){
                    changeTheHtml(impact,accountId);
                }
        }
    }


};

changeTheHtml = function(impact,accountId){
    document.body.innerHTML = document.body.innerHTML.replace(impact,"<a TARGET =_blank class='tooltip1' href='" + env + "/site/pages/security/chooseAccounts.jsf#/myERPs/"+accountId+"/RCA/q="+impact+"'>" + impact+"<span><div><img style='max-height: 30px;' src='http://km.panaya.int/s/en_GB/5780/e911fdad641682b02838ab32b82c9780ca1ecd5a.57/_/images/logo/confluence-logo.png'></div><div class='tooltip2'> Impact was found in Panaya</div></span></a>");
};


getToken();



