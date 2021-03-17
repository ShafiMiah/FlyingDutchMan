(function ( flyingDutchman,underForeignFlag, $, document) {
    /********************************************************************************************************/
    /********************************************************************************************************/
    /***********************This controller have been implemented  Shafi Miah*************************/
    /********************************************************************************************************/
    /********************************************************************************************************/
    underForeignFlag.UndoRedoManager={
//This will put function object to undo stack and clear redo stack
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
        //This will ppo function object from undo stack and push redo stack
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
        //This will pop function object from redo stack and push undo stack
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
        //Based on the type of function object the corresponding function will be called
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
    //Undo or redo on pressing ctrl+ z and ctrl + y
    $(document).on("keydown", function (e) {

        var code = e.which || e.keycode;
        //ctrl+z undo
        if (code == 90) {
            underForeignFlag.UndoRedoManager.UndoFunction();
        }
        //ctrl+y redo
        if (code == 89) {
            underForeignFlag.UndoRedoManager.ReDoFunction();
        }
    });
    //undo the function
    $(document).on("click", ".undo-container", function () {
        underForeignFlag.UndoRedoManager.UndoFunction();
    });
    //redo the function
    $(document).on("click", ".redo-container", function () {
        underForeignFlag.UndoRedoManager.ReDoFunction();
    });
    $(function () {

    });
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));