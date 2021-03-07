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
            let clearOrder = underForeignFlag.Main.GetTranslationText("ClearOrder");
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
                    //Get item with item nr and show html
                    let OrderedItem =  underForeignFlag.PresentationModel.GetItemById(item.item_nr);
                    html+="<div class='order-table-item' data-item-nr='"+OrderedItem.nr+"'>"
                     //name container
                    html+="<div class='details-container order-item'>"
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
                    html+= "<input class='order-cart-quantity add-qty'   max='1000' min='1' type='text' value='"+ parseInt(item.quantity)+"'>"
                    html+="<span class='increase'></span>"
                    html+="<span class='decrease'></span>"
                    html+="</div>"
                    /*end column quantity*/
                    html+="<div class='delete-icon order-item'> <span class=\"icon fa fa-trash delete-order fa-2x\"></span></div>";
                    if(OrderedItem.priceinclvat){
                        totalCost+=(parseFloat(OrderedItem.priceinclvat.trim()) * parseFloat(item.quantity));
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
                summaryHtml+="<button class='clear-order'  >"+clearOrder+"</button>"
                summaryHtml+="<button class='check-out'  >"+checkOut+"</button>"
                summaryHtml+="</div></div>"
                orderTotalCostContainer.empty();
                orderTotalCostContainer.append(summaryHtml);
            }
    }
    };

    $(document).on("click", ".check-out", function () {
        /*Get total quantity and total price*/
        let orderedItem = window.localStorage.getItem("OrderItems");
        let totalQuantity = 0;
        let totalCost=0;
        if(orderedItem){
            let convertedOrder = JSON.parse(orderedItem);
            for(let i=0 ; i<convertedOrder.length;i++){
                let item = JSON.parse(convertedOrder[i]);
                let OrderedItem =  underForeignFlag.PresentationModel.GetItemById(item.item_nr);
                if(OrderedItem.priceinclvat){
                    totalCost+=(parseFloat(OrderedItem.priceinclvat.trim()) * parseFloat(item.quantity));
                }
                totalQuantity+= parseInt(item.quantity);
            }
        }
        /*End total price and total item*/
        /*Check if user have enough credentials*/

         let user = JSON.parse(window.localStorage.getItem("FlyingDutchManUser"));
        let userCredential = underForeignFlag.AccountModel.GetCredentialByUserId(user.user_id);
        let paymentGranted = true;
        if(!userCredential || parseFloat(userCredential.creditSEK) < totalCost){
            //User does not have enough credential
            paymentGranted= false;

        }
        /*end check credential*/

        let orderMessageHtml ="<div class='order-message-container'>"
        orderMessageHtml+="<div class='order-message'>"
        if(!paymentGranted){
            orderMessageHtml+="<div class='close-icon-container'><span class='close-icon'></span></div>"
        }
        //header container
        orderMessageHtml+="<div class='message-header'>"
        orderMessageHtml+="<div class='"+(!paymentGranted ? "ignored " : "" )+"header'>"
        /*payment grant*/
        let iconClass = "";
        let orderMessageHeader =""
        let orderMessage =""
        if(paymentGranted){
            iconClass+="order-icon success";
            orderMessageHeader+=underForeignFlag.Main.GetTranslationText("OrderSuccessHeader");
            let msg = underForeignFlag.Main.GetTranslationText("OrderSuccessMessage");
            orderMessage +=  msg.replace("{0}", "<span class='order-code'>SHMI1293</span>");
             let body = $(document).find(".main-body");
            body.addClass("hidden");
            /*Clear the order cart and save order to dataBase*/
               // window.localStorage.removeItem("OrderItems");
                 underForeignFlag.Main.LoadOrderQuantity();
            /*endClear the order and save to database*/
            /*Set new amount to database*/
            let newAmount = parseFloat(userCredential.creditSEK)-totalCost;
            underForeignFlag.AccountModel.PurchaseWithCredential(user.user_id,newAmount);
            /*end save new amount*/
        }
        else{
            iconClass+="order-icon failure"
            orderMessageHeader+=underForeignFlag.Main.GetTranslationText("OrderFailureHeader");
            orderMessage +=underForeignFlag.Main.GetTranslationText("OrderFailureMessage");
        }
        orderMessageHtml+= "<span class='"+iconClass+"'></span>"
        orderMessageHtml+= "<h4>"+orderMessageHeader+"</h4>"
        /*payment grant*/
        orderMessageHtml+=   "</div>"

        orderMessageHtml+=  "</div>"
        //End header
        orderMessageHtml+="<div class='order-message-text'><span>"+orderMessage+"</span>"
        if(paymentGranted){
            //go back to start page
            let backToStartPage = underForeignFlag.Main.GetTranslationText("BackToStart");
            orderMessageHtml+= "<a class='back-to-start'>"+backToStartPage+"</a>"
        }
        orderMessageHtml+="</div>"

        orderMessageHtml+="</div>"
        /*print order detail*/
        if(paymentGranted){
            let numberOfItems = underForeignFlag.Main.GetTranslationText("NumberOfItems");
            let totalPrice = underForeignFlag.Main.GetTranslationText("TotalPriceInclVat");
            let totalMoney =underForeignFlag.Formatter.GetFormattedCurrency(totalCost);
            orderMessageHtml+="<div class='order-summary-confirmation'>"
            orderMessageHtml+="<div class='number-of-items'><label>"+numberOfItems+"</label><span>"+totalQuantity+"</span></div>"
            orderMessageHtml+="<div class='total-price'><label>"+totalPrice+"</label><span>"+totalMoney+"</span></div>"
            orderMessageHtml+="</div>"
        }
        /*end order detail*/
        orderMessageHtml+="</div>"

        underForeignFlag.PopUp.Show(orderMessageHtml,null, {modal:true})
    });
    $(document).on("click", ".details-container.order-item", function () {
        let item = $(this).closest(".order-table-item").data("item-nr");
        window.localStorage.setItem("ItemQueryValue",item)
        window.localStorage.setItem("ItemQuery","OrderItem")
        underForeignFlag.Main.RedirectUrl("NodeView")
    });
    $(document).on("click", ".close-icon", function () {
        underForeignFlag.PopUp.Close();
    });
    $(document).on("click", ".back-to-start", function () {
        underForeignFlag.Main.RedirectUrl("Presentation");
    });
    $(document).on("click", ".delete-order", function () {
        let orderItems =[]
        let item = $(this).closest(".order-table-item").data("item-nr");
        orderItems.push(item);
        underForeignFlag.Main.DeleteFromOrderCart(orderItems);
        window.location.reload();
    });
    $(document).on("click", ".clear-order", function () {
        let orderItems =[]
        let previousOrderedItem = window.localStorage.getItem("OrderItems");
        if(previousOrderedItem){
            let convertedOrder = JSON.parse(previousOrderedItem);
            for(let i= 0 ; i< convertedOrder.length ; i++){
                let item = JSON.parse(convertedOrder[i]);
                orderItems.push(item.item_nr)
            }
        }
        underForeignFlag.Main.DeleteFromOrderCart(orderItems);
        window.location.reload();
    });

    $( window ).resize(function() {
        underForeignFlag.Main.SetMainBodyHeight();
    });
    $(function () {
            underForeignFlag.OrderController.ShowAllOrderItems();
        /*Here we shall call add to order cart functions*/
        $('.order-cart-quantity').on("change cut paste", function() {
           let orderItem = $(this).closest(".order-table-item").data("item-nr");
           let latestQuantity = $(this).val();
           if(!latestQuantity|| latestQuantity < 1){
               latestQuantity=1
               $(this).val(1)
           }
            underForeignFlag.Main.AddToOrderCart(orderItem,latestQuantity);
            window.location.reload();

        });
    });
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));