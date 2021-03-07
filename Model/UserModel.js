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
           let allCredential = underForeignFlag.FlyingDutchManUsersDB.account;
           for(let i=0;i< allCredential.length;i++){
               let item = allCredential[i];
               if(item.user_id == userId){
                   return item;
               }
           }
           return null;
       } ,
        PurchaseWithCredential : function(userId, newAmount){
            let allCredential = underForeignFlag.FlyingDutchManUsersDB.account;
            for(let i=0;i< allCredential.length;i++){
                let item = allCredential[i];
                if(item.user_id == userId){
                    underForeignFlag.FlyingDutchManUsersDB.account[i].creditSEK = newAmount.toString();
                  // this.WriteJSON()
                    break;
                }
            }

        },

        WriteJSON: function( ) {
                // Creating a XHR object
                let xhr = new XMLHttpRequest();
                let url = "http://localhost:63342/FlyingDutchMan/Data/dutchman_table_users.json";

                // open a connection
                xhr.open("POST", url, true);

                // Set the request header i.e. which type of content you are sending
                xhr.setRequestHeader("Content-Type", "application/json");

                // Create a state change callback
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {

                        // Print received data from server
                        //result.innerHTML = this.responseText;

                    }
                };

                // Converting JSON data to string
                var data = JSON.stringify({ "name": "1", "email": "2" });

                // Sending data with the request
                xhr.send(data);

        },

    };
    $(function () {

    });
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));