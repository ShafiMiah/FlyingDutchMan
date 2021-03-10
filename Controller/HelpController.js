(function ( flyingDutchman,underForeignFlag, $, document) {
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