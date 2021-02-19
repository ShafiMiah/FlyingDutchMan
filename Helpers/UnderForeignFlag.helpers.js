(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.PopUp={
        defaults: {
            modal: false,
            autoClose: false,
            closeOnClick: false,
            fixed: true,
            overlay: true
        },
        containerClass: "popup-container",
        popupClass: "under-foreign-flag-popup",

        getDefaultContainerOwner: function () {
            return $(document.body);
        },
        createContainer: function () {
            return $("<div></div>").addClass(this.containerClass);
        },
        createPopup: function () {
            return $("<div></div>").addClass(this.popupClass);
        },
        getDefaultContainer: function () {
            let owner = this.getDefaultContainerOwner();
           let container = this.createContainer();
            owner.append(container);

            return container;
        },
        Show: function (popupContent, relativeElement, options) {
            let opts = $.extend({},  underForeignFlag.PopUp.defaults, options);
            let relativeItem= relativeElement;
            let container = this.getDefaultContainer();
            let popUp = this.createPopup();
            popUp.append(popupContent);
            //Check if the pop up is a modal
            if(opts.modal){

            }
            else{
               //normal popup
                container.append(popUp);
                //Show the container relative to the element
                let alignOffset = $(relativeElement).offset();
                let alignHeight = $(relativeElement).outerHeight();
                let alignWidth = $(relativeElement).outerWidth();
                let top = alignOffset.top ? alignOffset.top + alignHeight - 10: alignHeight-10;
                let ElementRight = alignWidth + alignOffset.left;
                let right = ($( window ).width()-ElementRight)+10;

                popUp.css("position","fixed");
                popUp.css("top",top);
                popUp.css("right",right);
                //Close event
                let closeHandler = function (event) {
                    let outsidePopup = $(event.target).closest(container).length == 0;
                    if (outsidePopup == false) {
                       /* let bounds = $(event.target).bounds();*/
                        //var css = window.getComputedStyle(event.target, ":before");

                        if (event.offsetX < 0 || event.offsetY < 0 /*|| event.offsetX > bounds.width || event.offsetY > bounds.height*/) {
                            outsidePopup = true;
                        }
                    }
                    let type = event.type;
                    if (((type == "mousedown" || type == "focusin" || type == "DOMMouseScroll" || type == "mousewheel") && outsidePopup == true)
                        || (type == "keydown" && event.keyCode == 27)
                        || (type == "blur" && event.target == window)
                        || (type == "resize")) {
                        $(window).off(windowHandlers, closeHandler);
                        $(document).off(documentHandlers, closeHandler);
                        underForeignFlag.PopUp.Close();

                    } else if (outsidePopup == false) {
                        let srcElement = $(event.srcElement);
                        let closerAction = srcElement.data("popup-closer");
                        if ((type == "click" && (opts.closeOnClick == true || closerAction == "click"))
                            || (type == "submit" && closerAction == "submit")) {
                                underForeignFlag.PopUp.Close();
                        }
                    }
                }

                let windowHandlers = "keydown submit";
                let documentHandlers = "mousedown click";
                if (opts.autoClose == true) {
                    windowHandlers = windowHandlers + " resize focusin blur";
                }

                $(window).on(windowHandlers, closeHandler);
                $(document).on(documentHandlers, closeHandler);

            }

        },
        Close:function(){
            let container = $(document).find(".popup-container");
            container.remove();
        }
    };
    underForeignFlag.Formatter={
       percentToNumber:function(percentStr) {
        return Number(percentStr.slice(0,-1));
        },
        GetTranslatedPercent : function(percentStr){
            let number = this.percentToNumber(percentStr);
            let formattedNumber = this.GetFormattedNumberToFloat(number);
            return formattedNumber+"%"
        },
        GetFormattedCurrency:function(amount){
            let selectedLanguage = underForeignFlag.Main.GetSelectedUi();
            var price = jQuery.localFormat(amount, "C",selectedLanguage);
            return price;
        },
        GetFormattedNumberToInt: function(number){
            let selectedLanguage = underForeignFlag.Main.GetSelectedUi();
            var number = jQuery.localFormat(number, "n0",selectedLanguage);
            return number;
        },
        GetFormattedNumberToFloat: function(number){
            let selectedLanguage = underForeignFlag.Main.GetSelectedUi();
            var number = jQuery.localFormat(number, "n2",selectedLanguage);
            return number;
        },
        GetFormattedDate :function(date){
            let selectedLanguage = underForeignFlag.Main.GetSelectedUi();

            var date = jQuery.localFormat(date, "D",selectedLanguage);
            return date;
        }
    };

}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));