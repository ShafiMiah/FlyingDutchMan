(function ( flyingDutchman,underForeignFlag, $, document) {
    /********************************************************************************************************/
    /********************************************************************************************************/
    /***********************This controller have been implemented by Shafi Miah*************************/
    /********************************************************************************************************/
    /********************************************************************************************************/
    //This will adjust document body height.
    $( window ).resize(function() {
        underForeignFlag.Main.SetMainBodyHeight();
        let containerWidth = $(document).find(".help-view-container");
        let width = containerWidth.outerWidth()-10;
        if( width <= 1250){
            containerWidth.find(".help-view-content-body").css("width",width+"px")
        }
        else{
            containerWidth.find(".help-view-content-body").css("width","inherit")
        }
    });
    $(function () {
        underForeignFlag.Main.SetMainBodyHeight();
    });
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));