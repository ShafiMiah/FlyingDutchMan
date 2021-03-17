(function ( flyingDutchman,underForeignFlag, $, document) {
    /********************************************************************************************************/
    /********************************************************************************************************/
    /***********************This controller have been implemented by Albin Ingvarsson and Shafi Miah*************************/
    /********************************************************************************************************/
    /********************************************************************************************************/
    underForeignFlag.UsersModel={
        //Authorize the user with user name and password
        UserAuthorization: function (userName, passWord){
            let allUsers = underForeignFlag.FlyingDutchManUsersDB.users;
            for (let i=0;i<allUsers.length;i++){
                let item = allUsers[i];
                if((item.username == userName|| item.email == userName) && item.password==passWord ){
                    return item;
                }
            }
            return null;
        },
        //Get User by id
        GetUserById : function (id){
            let allUsers = underForeignFlag.FlyingDutchManUsersDB.users;
            for (let i=0;i<allUsers.length;i++){
                let item = allUsers[i];
                if(item.user_id==id ){
                    return item;
                }
            }
            return null;
        }
    };
    underForeignFlag.AccountModel={
        //Get available credit of signed in user
       GetCredentialByUserId:function(userId){
           let cachedCredential = window.sessionStorage.getItem("UserAccount");
           let allCredential = cachedCredential && cachedCredential!=null? JSON.parse(cachedCredential) : underForeignFlag.FlyingDutchManUsersDB.account;
           for(let i=0;i< allCredential.length;i++){
               let item = allCredential[i];
               if(item.user_id == userId){
                   return item;
               }
           }
           return null;
       } ,
        //Clicking on checkout in order cart the credit will be updated.
        PurchaseWithCredential : function(userId, newAmount){
            let cachedCredential = window.sessionStorage.getItem("UserAccount");
            let allCredential =  cachedCredential && cachedCredential!=null? JSON.parse(cachedCredential) : underForeignFlag.FlyingDutchManUsersDB.account;
            for(let i=0;i< allCredential.length;i++){
                let item = allCredential[i];
                if(item.user_id == userId){
                    allCredential[i].creditSEK = newAmount.toString();
                  // this.WriteJSON()
                    break;
                }
            }
            window.sessionStorage.setItem("UserAccount",JSON.stringify(allCredential))

        },



    };
    $(function () {

    });
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));