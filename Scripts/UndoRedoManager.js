(function ( flyingDutchman,underForeignFlag, $, document) {
    underForeignFlag.UndoRedoManager={
        undostack : [],
        redostack : [],
        DoFunction:  function (funcobj) {
            funcobj.execute();
            undostack.push(funcobj);
            redostack = [];
        },
        UndoFunction:function() {
            funcobj = undostack.pop();
            funcobj.unexecute();
            redostack.push(funcobj);
        },
        ReDoFunction: function() {
            funcobj = redostack.pop();
            funcobj.reexecute();
            undostack.push(funcobj);
        }
    };
    $(function () {

    });
}(window.flyingDutchman = window.flyingDutchman || {}, window.underForeignFlag = window.underForeignFlag || {}, window.jQuery, document));