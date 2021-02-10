(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.Main = {

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
        GetTranslationText:function(key){
            //Language Selected language
            let selectedLanguage = window.localStorage.getItem("SelectedLanguage");
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
                default:
                    translatedText = underForeignFlag.Translation.enString[key];
                    if(translatedText){
                        return translatedText;
                    }
                    break;
            }

            return key;
        }

    };


    $(function () {
        underForeignFlag.Main.LoadOrderQuantity();
        underForeignFlag.Main.SiteTranslation();
        window.localStorage.setItem("SelectedLanguage", "sv");

    });

}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));