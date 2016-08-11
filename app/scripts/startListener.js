/**
 * Created by itov on 3/29/2016.
 */

//debugger;
var isClicked = false;

var test = undefined;

chrome.browserAction.onClicked.addListener(function(tab)
    {
        debugger;
        if(!isClicked){
            console.log("start to parse");
            isClicked = !isClicked;
            chrome.browserAction.setIcon({path:"../images/panaya-click.png"});

        }else{
            console.log("back..");

            isClicked = !isClicked;
            chrome.browserAction.setIcon({path:"../images/panaya.png"});
        }



    });

chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
   alert(response);
});


