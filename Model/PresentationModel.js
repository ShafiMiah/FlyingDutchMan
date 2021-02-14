(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.PresentationModel={
        GetAllBeveragesTypes: function(){
                let types = [];
                let spirits = underForeignFlag.FlyingDutchManPresentationDB.spirits;
                for (let i = 0; i < spirits.length; i++) {

                     underForeignFlag.PresentationModel.AddToSet(types, spirits[i].catgegory);
                }

                if(types.length > 0){
                    types.sort()
                }
                return types;

        },
        GetBeverageCategoryItems:function (categoryName){
            let allItems = [];
            let spirits = underForeignFlag.FlyingDutchManPresentationDB.spirits;
            for (let i = 0; i < spirits.length; i++) {
                    if(spirits[i].catgegory.trim() == categoryName){
                        let item = spirits[i];
                        allItems.push(JSON.stringify(item));
                    }
            }
            return allItems;
        },

        AddToSet : function(set, item){
            if (!set.includes(item.trim())) {
                if(item){
                    set.push(item.trim());
                }
            }
            return set;
        }
    };

}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));