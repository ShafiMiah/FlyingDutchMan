(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.UndoRedoManager={

         DoFunction:  function (funcobj) {
             let redostack=[]
             let undostack=[]
            //Get Undo stack from local storage
           let undoVar =  window.sessionStorage.getItem("UndoStack");
            funcobj.Execute();
            if(undoVar){
                undostack=JSON.parse(undoVar) ;
            }
            else{
                undostack=[]
            }

            undostack.push(funcobj);
           // window.sessionStorage.removeItem("RedoStack");
            redostack = [];
          if(undostack.length > 0)
            window.sessionStorage.setItem("UndoStack",JSON.stringify(undostack));
          else
              window.sessionStorage.removeItem("UndoStack")

         if(redostack.length > 0)
            window.sessionStorage.setItem("RedoStack",JSON.stringify(redostack));
         else
             window.sessionStorage.removeItem("RedoStack")

        },
        UndoFunction:function() {
            let redostack=[]
            let undostack=[]
            let undoVar =  window.sessionStorage.getItem("UndoStack");
            if(undoVar){
                undostack=JSON.parse(undoVar);
            }
            else{
                undostack=[]
            }
            let redoVar = window.sessionStorage.getItem("RedoStack");
            if(redoVar){
                redostack=JSON.parse(redoVar)
            }
            else{
                redostack=[]
            }
            if(undostack.length > 0){
                funcobj = undostack.pop();
                //funcobj.UnExecute();
                underForeignFlag.UndoRedoManager.PerformOperation("undo",funcobj)
                //Get Redo stack
                redostack.push(funcobj);
            }
            if(undostack.length > 0)
                window.sessionStorage.setItem("UndoStack",JSON.stringify(undostack));
            else
                window.sessionStorage.removeItem("UndoStack")

            if(redostack.length > 0)
                window.sessionStorage.setItem("RedoStack",JSON.stringify(redostack));
            else
                window.sessionStorage.removeItem("RedoStack")

        },
        ReDoFunction: function() {
            let redostack=[]
            let undostack=[]
            //Get the redo stack
            let redoVar = window.sessionStorage.getItem("RedoStack");
            if(redoVar){
                redostack=JSON.parse(redoVar)
            }
            else{
                redostack=[]
            }
            let undoVar = window.sessionStorage.getItem("UndoStack");
            if(undoVar){
                undostack= JSON.parse(undoVar)
            }
            else{
                undostack=[]
            }
            if(redostack.length > 0){
                funcobj = redostack.pop();
               // funcobj.Execute();
                underForeignFlag.UndoRedoManager.PerformOperation("redo",funcobj)

                undostack.push(funcobj);
            }
            if(undostack.length > 0)
                window.sessionStorage.setItem("UndoStack",JSON.stringify(undostack));
            else
                window.sessionStorage.removeItem("UndoStack")

            if(redostack.length > 0)
                window.sessionStorage.setItem("RedoStack",JSON.stringify(redostack));
            else
                window.sessionStorage.removeItem("RedoStack")

        },
        PerformOperation: function(operationType,functionObject){
            let functionName = functionObject.functionName;
            switch(functionName){
                case "AddToOrderCart":
                   let funcobj =  underForeignFlag.Main.AddToOrderCart(functionObject.itemNumber,functionObject.itemQuantity);
                    if(operationType == "undo"){
                        funcobj.UnExecute();
                    }
                    else{
                        funcobj.Execute();
                    }
                    break;
                case "DeleteFromOrderCart":
                    let funcobj1 =  underForeignFlag.Main.DeleteFromOrderCart(functionObject.itemNumbers);
                    funcobj1.itemNumbers = functionObject.itemNumbers;
                    funcobj1.quantities = functionObject.quantities;
                    if(operationType == "undo"){
                        funcobj1.UnExecute();
                    }
                    else{
                        funcobj1.Execute();
                    }
                    break;
            }
            window.location.reload();
        }
    };
    $(document).on("keydown", function (e) {

        var code = e.which || e.keycode;
        //ctrl+z
        if (code == 90) {
            underForeignFlag.UndoRedoManager.UndoFunction();
        }
        //ctrl+y
        if (code == 89) {
            underForeignFlag.UndoRedoManager.ReDoFunction();
        }
    });
    $(document).on("click", ".undo-container", function () {
        underForeignFlag.UndoRedoManager.UndoFunction();
    });
    $(document).on("click", ".redo-container", function () {
        underForeignFlag.UndoRedoManager.ReDoFunction();
    });
    $(function () {

    });
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));