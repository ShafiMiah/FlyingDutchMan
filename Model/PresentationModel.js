(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.PresentationModel={
        GetSearchedItems: function (searchText) {
            let allSearchedItems = [];
            let allPresentation = underForeignFlag.FlyingDutchManPresentationDB.spirits;
            for (let i =0; i < allPresentation.length; i++) {
                let item = allPresentation [i];
                if(item.name.indexOf(searchText) != -1 || item.catgegory.indexOf(searchText) !=-1){
                    allSearchedItems.push(JSON.stringify(item));
                }
            }
                return allSearchedItems;
        },
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
        GetBeverageStrengthItems:function (strength){
            let allItems = [];
            let spirits = underForeignFlag.FlyingDutchManPresentationDB.spirits;
            for (let i = 0; i < spirits.length; i++) {
               let percentStrength =  underForeignFlag.Formatter.percentToNumber(spirits[i].alcoholstrength);
                switch(strength){
                    case "SoftDrinks":
                    {
                        if(percentStrength <= 10){
                            let item = spirits[i];
                            allItems.push(JSON.stringify(item));
                        }
                        break;
                    }
                    case "HardDrinks":
                        {
                        if(percentStrength > 10){
                            let item = spirits[i];
                            allItems.push(JSON.stringify(item));
                        }
                        break;
                    }
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