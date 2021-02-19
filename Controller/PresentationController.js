(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.PresentationController={

       ShowAllCategory: function(){
           /*Get Main toolbar height*/

           underForeignFlag.Main.SetMainBodyHeight();
           let beverageTypes= underForeignFlag.PresentationModel.GetAllBeveragesTypes();
           let html = "<div class='category-container'>";
            for(let i = 0;i<beverageTypes.length;i++ ){
                html+="<div class='beverage-category'>"+beverageTypes[i]+"</div>"
            }
           html +="</div>"
            let bodyContent = $(document).find(".presentation-body");
          bodyContent.empty();
           bodyContent.append(html);
       } ,
        ShowBeverageItems:function(allbeverages){
            //let name = underForeignFlag.Main.GetTranslationText("Name");
            let articletype = underForeignFlag.Main.GetTranslationText("ArticleType");
            let priceinclvat = underForeignFlag.Main.GetTranslationText("PriceInclVat");
            let volumeml = underForeignFlag.Main.GetTranslationText("VolumeMl");
            let priceperlitre = underForeignFlag.Main.GetTranslationText("PricePerLitre");
            let introduced = underForeignFlag.Main.GetTranslationText("Introduced");
            let finaldelivery = underForeignFlag.Main.GetTranslationText("FinalDelivery");
            let packaging = underForeignFlag.Main.GetTranslationText("Packaging");
            let captype = underForeignFlag.Main.GetTranslationText("CapType");
            let countryoforigin = underForeignFlag.Main.GetTranslationText("CountryOfOrigin");
            let countryoforiginlandname = underForeignFlag.Main.GetTranslationText("CountryOfOriginLandName");
            let producer = underForeignFlag.Main.GetTranslationText("Producer");
            let provider = underForeignFlag.Main.GetTranslationText("Provider");
            let productionyear = underForeignFlag.Main.GetTranslationText("ProductionYear");
            let testedproductionyear = underForeignFlag.Main.GetTranslationText("TestedProductionYear");
            let alcoholstrength = underForeignFlag.Main.GetTranslationText("AlcoholStrength");
            let module = underForeignFlag.Main.GetTranslationText("Module");
            let assortment = underForeignFlag.Main.GetTranslationText("Assortment");
            let organic = underForeignFlag.Main.GetTranslationText("Organic");
            let kosher = underForeignFlag.Main.GetTranslationText("Kosher");
            let addToOrder = underForeignFlag.Main.GetTranslationText("AddToOrder");
            let add = underForeignFlag.Main.GetTranslationText("Add");
            underForeignFlag.Main.SetMainBodyHeight();

            let html = "<div class='node-container'>";
            for(let i= 0; i < allbeverages.length ; i++){
                let item = jQuery.parseJSON( allbeverages[i]);
                html += "<div class='node-view' data-item-nr='"+item.nr+"' data-article-id='"+item.articleid+"'>";

                //print name
                html+= "<div class='name'>"

                html+="<h1>"+ item.name +"</h1>"
                html+= "</div>"
                //end printName
//write specification
                html+= "<div class='specifications'>"
                //sp item
                if(item.alcoholstrength){
                    let itemValue =underForeignFlag.Formatter.GetTranslatedPercent(item.alcoholstrength);
                    html+= "<div class='sp'>"
                    html+="<label>"+ alcoholstrength+"</label>"
                    html+="<span>"+ itemValue +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.articletype){
                    let itemValue =underForeignFlag.Formatter.GetFormattedNumberToInt(parseInt(item.articletype));
                    html+= "<div class='sp'>"
                    html+="<label>"+ articletype+"</label>"
                    html+="<span>"+ itemValue +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.assortment){
                    html+= "<div class='sp'>"
                    html+="<label>"+ assortment+"</label>"
                    html+="<span>"+ item.assortment +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.organic){
                    html+= "<div class='sp'>"
                    html+="<label>"+ organic+"</label>"
                    html+="<span>"+ item.organic +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.kosher){
                    html+= "<div class='sp'>"
                    html+="<label>"+ kosher+"</label>"
                    html+="<span>"+ item.kosher +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.countryoforigin){
                    html+= "<div class='sp'>"
                    html+="<label>"+ countryoforigin+"</label>"
                    html+="<span>"+ item.countryoforigin +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.countryoforiginlandname){
                    html+= "<div class='sp'>"
                    html+="<label>"+ countryoforiginlandname+"</label>"
                    html+="<span>"+ item.countryoforiginlandname +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.captype){
                    html+= "<div class='sp'>"
                    html+="<label>"+ captype+"</label>"
                    html+="<span>"+item.captype +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.packaging){
                    html+= "<div class='sp'>"
                    html+="<label>"+ packaging+"</label>"
                    html+="<span>"+ item.packaging +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.provider){
                    html+= "<div class='sp'>"
                    html+="<label>"+ provider+"</label>"
                    html+="<span>"+ item.provider +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.introduced){
                    let date =underForeignFlag.Formatter.GetFormattedDate(new Date(item.introduced));
                    html+= "<div class='sp'>"
                    html+="<label>"+ introduced+"</label>"
                    html+="<span>"+ date +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.productionyear){
                    html+= "<div class='sp'>"
                    html+="<label>"+ productionyear+"</label>"
                    html+="<span>"+ item.productionyear +"</span>"
                    html+= "</div>"

                }
                //end spItem
                //sp item
                if(item.module){
                    html+= "<div class='sp'>"
                    html+="<label>"+ module+"</label>"
                    html+="<span>"+ item.module +"</span>"
                    html+= "</div>"

                }
                if(item.finaldelivery.trim()){
                    html+= "<div class='sp'>"
                    html+="<label>"+ finaldelivery+"</label>"
                    html+="<span>"+ item.finaldelivery +"</span>"
                    html+= "</div>"

                }
                if(item.producer){
                    html+= "<div class='sp'>"
                    html+="<label>"+ producer+"</label>"
                    html+="<span>"+ item.producer +"</span>"
                    html+= "</div>"

                }
                if(item.testedproductionyear){
                    html+= "<div class='sp'>"
                    html+="<label>"+ testedproductionyear+"</label>"
                    html+="<span>"+ item.testedproductionyear +"</span>"
                    html+= "</div>"

                }
                //end spItem
                html+= "</div>"
//end specification
                //Print the price information
                html+="<div class='price-information'>"
                if(item.priceinclvat){
                    let price =underForeignFlag.Formatter.GetFormattedCurrency(parseFloat(item.priceinclvat));
                    html+= "<div class='price-incl-vat'>"
                    html+="<label>"+ priceinclvat+"</label>"
                    html+="<span>"+ price +"</span>"
                    html+= "</div>"

                }
                if(item.volumeml){
                    html+= "<div class='volumeml'>"
                    html+="<label>"+ volumeml+"</label>"
                    html+="<span>"+ item.volumeml +"</span>"
                    html+= "</div>"

                }
                if(item.priceperlitre){
                    let price =underForeignFlag.Formatter.GetFormattedCurrency(item.priceperlitre);
                    html+= "<div class='price-per-litre'>"
                    html+="<label>"+ priceperlitre+"</label>"
                    html+="<span>"+ price+"</span>"
                    html+= "</div>"

                }
                html+="</div>"
                //end print price information
                /*write order information*/
                html+="<div class='add-to-order'>"
                html+="<div class='under-foreign-flag-quantity'>"
                html+= "<input class='add-qty'  max='1000' min='0' type='text' value='1'>"
                html+="<span class='increase'></span>"
                html+="<span class='decrease'></span>"
                html+="</div>"
                html+="<button class='add-to-order-button' data-text='"+addToOrder+"' data-short-text='"+add+"' ></button>"
                html+="</div>";
                /*end write order information*/
                html+="</div>"
            }
            html+="</div>"
            let bodyContent = $(document).find(".presentation-body");
            bodyContent.empty();
            bodyContent.append(html);
        },
    ShowBeverageCategoryItems : function (){

       let selectedCategory = window.localStorage.getItem("SelectedCategory");
       //now remove the storage
       // window.localStorage.removeItem("SelectedCategory");
       //Rename the presentation name
        let presentationname = $(document).find(".presentation-name")
        presentationname.text(selectedCategory);
        let allbeverages= underForeignFlag.PresentationModel.GetBeverageCategoryItems(selectedCategory);
        underForeignFlag.PresentationController.ShowBeverageItems(allbeverages);
    },
        AddToOrderCart : function (item_nr,quantity){
            let orderedItem = [];
            let previousOrderedItem = window.localStorage.getItem("OrderItems");
            let found =false;
            if(previousOrderedItem){
                let convertedOrder = JSON.parse(previousOrderedItem);
                for(let i= 0 ; i< convertedOrder.length ; i++){
                    let item = JSON.parse(convertedOrder[i]);
                    if(item.item_nr == item_nr){
                        found = true;
                        item.quantity = quantity;
                        let convertedItem = JSON.stringify(item);
                        orderedItem.push(convertedItem);
                    }
                    else{
                        let convertedItem = JSON.stringify(item);
                        orderedItem.push(convertedItem);
                    }
                }
            }
           if(found == false){
              let item = {
                  "item_nr" :item_nr,
                  "quantity": quantity
              }
               let convertedItem = JSON.stringify(item);
               orderedItem.push(convertedItem);
           }
            window.localStorage.setItem("OrderItems",JSON.stringify(orderedItem));
    }
    };
    $(document).on("click", ".beverage-category", function () {
        //Get Available languages
        window.localStorage.removeItem("SelectedCategory");
        let selectedCategory = $(this).text();
        if(selectedCategory){
            window.localStorage.setItem("SelectedCategory",selectedCategory)
            window.localStorage.setItem("ItemQuery","Category")
            let url = window.location.href;
            let splittedUrl = url.split("?")
            let mainUrl = splittedUrl[0].split("/");
            let finalUrl="";
            for(let i=0;i<mainUrl.length-1;i++){
                finalUrl+= mainUrl[i]+"/";
            }
            finalUrl+="NodeView.html"+"?"+splittedUrl[1];
            window.location.href = finalUrl;
        }

    });
    /*Add to order*/
    $(document).on("click", ".add-to-order-button", function () {
        let orderContainer = $(this).closest(".add-to-order");
        let nodeView =  $(this).closest(".node-view");
        let item_nr = nodeView.data("item-nr");
        let quantity = orderContainer.find(".add-qty").val();
        underForeignFlag.PresentationController.AddToOrderCart(item_nr,quantity);
    });
    $( window ).resize(function() {
        underForeignFlag.Main.SetMainBodyHeight();
    });
    $(function () {
        let presentationView = $(document).find(".presentation-view");
        if(presentationView.length > 0){
            //Load category
            underForeignFlag.PresentationController.ShowAllCategory();
        }
        let presentationNodeView =  $(document).find(".presentation-node-view");
        if(presentationNodeView.length > 0){
            let getItemsByQuery = window.localStorage.getItem("ItemQuery");
            switch(getItemsByQuery){
                case "Category":
                    underForeignFlag.PresentationController.ShowBeverageCategoryItems();
                     break;
                case "HardDrinks":
                    underForeignFlag.PresentationController.ShowBeverageCategoryItems();
                    break;
                case "SoftDrinks":
                    underForeignFlag.PresentationController.ShowBeverageCategoryItems();
                    break;
                case "Search":
                    underForeignFlag.PresentationController.ShowBeverageCategoryItems();
                    break;
            }
        }
    });
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));