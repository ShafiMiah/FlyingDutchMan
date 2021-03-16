(function ( flyingDutchman,underForeignFlag, $, document) {
    /********************************************************************************************************/
    /********************************************************************************************************/
    /***********************This controller have been implemented Albin Ingvarrson*************************/
    /********************************************************************************************************/
    /********************************************************************************************************/
    //Clicking on sign in user will have sign in validation and go through authorization.
    $(document).on("click", ".sign-in-button", function () {
        //Check validation of user Name and Password
        let userName = $(document).find(".user-name-input")
        let passWord = $(document).find(".password-input");
        if(!userName.val()){
            userName.css("border","solid 2px red")
            return;
        }
        if(!passWord.val()){
            userName.css("border","solid 2px red")
            return;
        }
        // Get User Information
     let userObject =   underForeignFlag.UsersModel.UserAuthorization(userName.val().trim(),passWord.val().trim() )
        if (userObject){
            //Go to start page and set to local storage
            window.sessionStorage.setItem("FlyingDutchManUser",JSON.stringify(userObject));
            underForeignFlag.Main.RedirectUrl("Presentation");

        }
        else{
            //Show error message
            let messageContainer = $(document).find(".invalid-user-name-password");
            let logInErrorMessage = underForeignFlag.Main.GetTranslationText("LogInErrorMessage");
            messageContainer.text(logInErrorMessage);
        }
    });
    //Validate User name
    $(document).find(".user-name-input").focusout(function() {
        //Check validation of user Name and Password
        let userName = $(document).find(".user-name-input")
        if(!userName.val()){
            userName.css("border","solid 2px red")
            return;
        }
        else{
            userName.css("border","solid 1px grey")
            return;
        }

    });
    //Validate password
    $(document).find(".password-input").focusout(function(){
        //Check validation of user Name and Password
        let passWord = $(document).find(".password-input")
        if(!passWord.val()){
            passWord.css("border","solid 2px red")
            return;
        }
        else{
            passWord.css("border","solid 1px grey")
            return;
        }

    });

    $(function () {

    });
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));