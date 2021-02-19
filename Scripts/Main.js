(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.Main = {
        SetMainBodyHeight: function(){
            let mainToolbar = $(document).find(".main-toolbar");
            let mainfooter = $(document).find(".main-footer");
            let totalHeight = mainToolbar.outerHeight()+mainfooter.outerHeight();
            let mainBodyHeight = $( window ).height()-totalHeight;
            let mainBody = $(document).find(".main-body");
            mainBody.css("max-height",mainBodyHeight);
            mainBody.css("overflow-x","hidden");
            mainBody.css("overflow-y","auto");

        },
        LoadOrderQuantity: function () {
            //Get the quantity from the local storage
            let quantity = "7"
            let quantityElement = $(document).find(".order-cart-container");
            if(quantityElement.length> 0){
                quantityElement.find(".total-qty").text(quantity)
            }
        },
        SiteTranslation:function(){
            //Get the text from resources file
            let items = $(document).find(".key-text");
            for(let i = 0; i < items.length; i++) {
                let key = $(items[i]).text();
                //Get the translated text from dictionary
               $(items[i]).text(underForeignFlag.Main.GetTranslationText(key));
               let placeholder = $(items[i]).attr('placeholder');
               if(placeholder){

                   $(items[i]).attr("placeholder", underForeignFlag.Main.GetTranslationText(placeholder))
               }
            }
        },
        ReloadUrl : function(){
            let url = window.location.href.trim();
            let language = underForeignFlag.Main.GetSelectedUi().trim();
            let urlSplit = url.split('?')
            let finalUrl =urlSplit[0]+"?"+"lang="+language;
            if(url!= finalUrl){
                window.location.href = finalUrl;
            }
        },
        LoadStartUrl : function(){
            let url = window.location.href.trim();
            let language = underForeignFlag.Main.GetSelectedUi().trim();
            let urlSplit = url.split('?')
            let mainSplittedUrl = urlSplit[0].split("/");
            let finalUrl = "";
            for(let i=0 ;i <mainSplittedUrl.length-2;i++){
                finalUrl+=mainSplittedUrl[i]+"/";
            }
            finalUrl+="Presentation/Index.html";
            finalUrl = finalUrl +"?"+"lang="+language;
            if(url!= finalUrl){
                window.location.href = finalUrl;
            }
        },
        GetSelectedUi: function(){
            let selectedLanguage = window.localStorage.getItem("SelectedLanguage");
            if(selectedLanguage){
                return selectedLanguage;
            }
            return "en-GB";
        },
        GetTranslationText:function(key){
            //Language Selected language
            let selectedLanguage = underForeignFlag.Main.GetSelectedUi();
            let translatedText = "";
            switch(selectedLanguage){
                case "en-GB" || "en" :
                    translatedText = underForeignFlag.Translation.enString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
                case "sv" :
                    translatedText = underForeignFlag.Translation.svString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
                case "bn" :
                    translatedText = underForeignFlag.Translation.bnString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
                case "ur" :
                    translatedText = underForeignFlag.Translation.urString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
                case "ru" :
                    translatedText = underForeignFlag.Translation.roString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
                default:
                    translatedText = underForeignFlag.Translation.enString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
            }

            return key;
        },
        SetLanguageFlag : function(){
            let language = $(document).find(".language-container");
            let selectedLanguage = underForeignFlag.Main.GetSelectedUi();
            if(language){
             let imagePath =  language.find(".img-icon").attr("src");

              let splittedItem = imagePath.split('/');
              let finalFlagUrl ="";
              for(let i = 0; i < splittedItem.length ; i++){
                  if(i== splittedItem.length-1){
                      finalFlagUrl+=selectedLanguage+".svg";
                  }
                  else{
                      finalFlagUrl+=splittedItem[i]+"/";
                  }
              }
              //
              language.find(".img-icon").attr("src",finalFlagUrl)
            }
        },
        RedirectUrl: function(controllerName)
        {
            // RedirectUrl
            let url = window.location.href; // current url
            let splittedUrl = url.split("?");
            let finalUrl = "";
            let mainUrl = splittedUrl[0].split("/");
            for(let i = 0; i < mainUrl.length-2; i++ ){
                finalUrl += mainUrl[i] + "/";
            }
            switch(controllerName){
                case "OrderCart":
                    finalUrl += "OrderCart" + "/Index.html";
                    break;

                case "Presentation":
                    finalUrl += "Presentation" + "/Index.html";
                    break;

                case "NodeView":
                    finalUrl += "Presentation" + "/NodeView.html";
                    break;

                case "LogIn":
                    finalUrl += "LogIn" + "/Index.html";
                    break;

                case "Help":
                    finalUrl += "Help" + "/Index.html";
                    break;
            }

            let language = underForeignFlag.Main.GetSelectedUi().trim();
            finalUrl = finalUrl +"?"+"lang="+language;
            window.location.href = finalUrl;

            //let  = ;
        },


    };

    $(document).on("click", ".language-container", function (e) {
         //Get Available languages
        let availableCulture = underForeignFlag.Cultures.availableCulture;
        let selectedLanguage = underForeignFlag.Main.GetSelectedUi();
        let txt1 = "<ul class='under-foreign-flag-menu'>";
        for(let i =0;i< availableCulture.length;i++){
            let className = selectedLanguage == availableCulture[i] ? "language-item selected" : "language-item";
            /*Get Culture native name*/
          let culture =  jQuery.findClosestCulture(availableCulture[i]);
            txt1+="<li data-culture='"+availableCulture[i]+"' class='"+className +"'>"+culture.nativeName+"</li>"
        }

        txt1+="</ul>"
        let languageContainer = $(document).find(".language-container");
        underForeignFlag.PopUp.Show(txt1,languageContainer,null)

    });
    $(document).on("click", ".language-item", function (e) {
        //Get Available languages
       let selectedCulture = $(this).data("culture");
        window.localStorage.setItem("SelectedLanguage",selectedCulture);
        underForeignFlag.Main.ReloadUrl();

    });
    $(document).on("click", ".start-url", function (e) {
        //Get Available languages
      underForeignFlag.Main.LoadStartUrl();
    });


    // Goto OrderCart func
    $(document).on("click", ".order-cart-container", function (e) {
        // onclick event for actions
        // class click -> calls the function
        // redirect to OrderView
        underForeignFlag.Main.RedirectUrl("OrderCart");


    });

    // Go to order end
    // The Search func
    $(document).on("click", ".toolbar-search-icon", function (e) {
       let searchText=$('input[type="search"]').val()
        if (searchText.length>0){
            window.localStorage.setItem("ItemQueryValue",searchText)
            window.localStorage.setItem("ItemQuery","Search")
            underForeignFlag.Main.RedirectUrl("NodeView")

        }
//This is to show test pupose

    });
    // End of Search func



    $(function () {
        underForeignFlag.Main.LoadOrderQuantity();
        underForeignFlag.Main.SiteTranslation();
        underForeignFlag.Main.SetLanguageFlag();
        underForeignFlag.Main.ReloadUrl();
    });

}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));