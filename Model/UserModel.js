(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.UsersModel={
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
       GetCredentialByUserId:function(userId){
           let cachedCredential = window.sessionStorage.getItem("UserAccount");
           let allCredential = cachedCredential? JSON.parse(cachedCredential) : underForeignFlag.FlyingDutchManUsersDB.account;
           for(let i=0;i< allCredential.length;i++){
               let item = allCredential[i];
               if(item.user_id == userId){
                   return item;
               }
           }
           return null;
       } ,
        PurchaseWithCredential : function(userId, newAmount){
            let cachedCredential = window.sessionStorage.getItem("UserAccount");
            let allCredential =  cachedCredential? JSON.parse(cachedCredential) : underForeignFlag.FlyingDutchManUsersDB.account;
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