(function ( flyingDutchman,underForeignFlag, $, document) {
    /********************************************************************************/
    /********************************************************************************/
    /*******************************This controller have been implemented Albin Ingvarrson*************************************************/
    /********************************************************************************/
    /********************************************************************************/
    //Check if the user is authorized or not. If user is authorized then go to corresponding view otherwise go to log in view
    let user = window.sessionStorage.getItem("FlyingDutchManUser");
    if(!user){
        //Redirect to User View
        let restoreLanguage = window.sessionStorage.getItem("SelectedLanguage");
        window.sessionStorage.clear();
        if(restoreLanguage){
            window.sessionStorage.setItem("SelectedLanguage",restoreLanguage)
        }
        //Redirect to login page
        let url = window.location.href; // current url
        let splittedUrl = url.split("?");
        let finalUrl = "";
        let mainUrl = splittedUrl[0].split("/");
        for(let i = 0; i < mainUrl.length-2; i++ ){
            finalUrl += mainUrl[i] + "/";
        }
        let folderNameLocation = mainUrl.length-2;
        if(mainUrl[folderNameLocation] !="OrderCart" && mainUrl[folderNameLocation] !="Presentation" && mainUrl[folderNameLocation] !="LogIn" && mainUrl[folderNameLocation] !="Help" )
        {
            finalUrl += mainUrl[folderNameLocation] + "/Views/";
        }
        finalUrl += "LogIn" + "/Index.html";
        if(restoreLanguage){
            finalUrl = finalUrl +"?"+"lang="+restoreLanguage;
        }
        else{
            finalUrl = finalUrl +"?"+"lang="+"en-GB";
        }
        window.location.href = finalUrl;
    }
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));