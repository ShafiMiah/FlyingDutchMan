(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.OrderController={
        ShowAllOrderItems:function() {
            underForeignFlag.Main.SetMainBodyHeight();
            /*These needs to be translated*/
            let itemDetail = underForeignFlag.Main.GetTranslationText("ItemDetail");
            let Quantity = underForeignFlag.Main.GetTranslationText("Quantity");
            let category = underForeignFlag.Main.GetTranslationText("Catgegory");
            let summary = underForeignFlag.Main.GetTranslationText("Summary");
            let numberOfItems = underForeignFlag.Main.GetTranslationText("NumberOfItems");
            let totalPrice = underForeignFlag.Main.GetTranslationText("TotalPriceInclVat");
            let checkOut = underForeignFlag.Main.GetTranslationText("CheckOut");
            /*end translation*/
            let priceinclvat = underForeignFlag.Main.GetTranslationText("PriceInclVat");
            let alcoholstrength = underForeignFlag.Main.GetTranslationText("AlcoholStrength");

            let totalQuantity = 0;
            let totalCost=0;
            let orderItemsContainer = $(document).find(".order-items-container")
            let orderTotalCostContainer = $(document).find(".order-cost-container")


            let orderedItem = window.localStorage.getItem("OrderItems");
            if(orderedItem){
                let totalItems = 0;
                let convertedOrder = JSON.parse(orderedItem);
                let html = "";
                /*header of table*/
                html+="<div class='order-table-item'>"
                html+="<div class='order-detail'><h4>"+itemDetail+"</h4></div>"
                html+="<div class='order-unit-price'><h4>"+priceinclvat+"</h4></div>"
                html+="<div class='order-quantity'><h4>"+Quantity+"</h4></div>"
                html+="<div class='delete-icon'><h4></h4></div>"
                html+="</div>"

                html+="<div class='order-table-items-container'>"
                /*end header of table*/
                for(let i=0 ; i<convertedOrder.length;i++){
                    let item = JSON.parse(convertedOrder[i]);
                    html+="<div class='order-table-item'>"
                    //Get item with item nr and show html
                     let OrderedItem =  underForeignFlag.PresentationModel.GetItemById(item.item_nr);
                     //name container
                    html+="<div class='details-container order-item' data-item-nr='"+OrderedItem.nr+"'>"
                    //print name
                    html+= "<div class='name'>"
                    html+="<h4>"+ OrderedItem.name +"</h4>"
                    html+= "</div>"
                    //end printName
                    /*Print specification*/
                    html+= "<div class='specifications'>"
                    if(OrderedItem.catgegory){
                        html+= "<div class='sp'>"
                        html+="<label>"+ category+"</label>"
                        html+="<span>"+ OrderedItem.catgegory +"</span>"
                        html+= "</div>"
                    }
                    if(OrderedItem.alcoholstrength){
                        let itemValue =underForeignFlag.Formatter.GetTranslatedPercent(OrderedItem.alcoholstrength);
                        html+= "<div class='sp'>"
                        html+="<label>"+ alcoholstrength+"</label>"
                        html+="<span>"+ itemValue +"</span>"
                        html+= "</div>"

                    }

                    html+="</div>"
                    /*End print specification*/
                    html+="</div>"
                    /* second column*/
                    html+="<div class='unit-price-container'>"
                    if(OrderedItem.priceinclvat){
                        let price =underForeignFlag.Formatter.GetFormattedCurrency(parseFloat(OrderedItem.priceinclvat));
                        html+= "<div class='price-incl-vat'>"
                        html+="<span>"+ price +"</span>"
                        html+= "</div>"

                    }
                    html+="</div>"
                    /*end second column*/
                    /*column quantity*/
                    html+="<div class='under-foreign-flag-quantity'>"
                    html+= "<input class='add-qty'  max='1000' min='1' type='text' value='"+ parseInt(item.quantity)+"'>"
                    html+="<span class='increase'></span>"
                    html+="<span class='decrease'></span>"
                    html+="</div>"
                    /*end column quantity*/
                    html+="<div class='delete-icon order-item'> <span class=\"icon fa fa-trash delete-order fa-2x\"></span></div>";
                    if(OrderedItem.priceinclvat){
                        totalCost+=parseFloat(OrderedItem.priceinclvat.trim());
                    }
                    totalQuantity+= parseInt(item.quantity);
                    html+="</div>"
                }
                html+="</div>"
                //Load order detail
                orderItemsContainer.empty();
                orderItemsContainer.append(html);
                //load order total cost
                let totalMoney =underForeignFlag.Formatter.GetFormattedCurrency(totalCost);
          let summaryHtml="<div class='order-total-cost-items'><div class='order-total-cost-header'><h4>"+summary+"</h4></div>"
                summaryHtml+="<div class='number-of-items'><label>"+numberOfItems+"</label><span>"+totalQuantity+"</span></div>"
                summaryHtml+="<div class='total-price'><label>"+totalPrice+"</label><span>"+totalMoney+"</span></div>"
                summaryHtml+="<div class='button-container'>"
                summaryHtml+="<button class='check-out'  >"+checkOut+"</button>"
                summaryHtml+="</div></div>"
                orderTotalCostContainer.empty();
                orderTotalCostContainer.append(summaryHtml);
            }
    }
    };
    $(function () {
        underForeignFlag.OrderController.ShowAllOrderItems();
    });
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));