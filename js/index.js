
function resize() {
    addRow();
    m = 0;
    for (i = 0; i < oCells.length; i++) {
        oCells[i].innerHTML = '';
    }
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
    numbers.shuffle();
    for (i = 0; i < numbers.length; i++) {
        oCells[i].innerHTML = numbers[i];
    }
    reDrawBoard(numbers.length);
}

function addRow(){
    var root=document.getElementById('tblBoard').getElementsByTagName('tbody')[0];
    var rows=root.getElementsByTagName('tr');
    var clone=cloneEl(rows[rows.length-1]);
    root.appendChild(clone);
    addColumn();
}

function addColumn(){
    var rows=document.getElementById('tblBoard').getElementsByTagName('tr'), i=0, r, c, clone;
    while(r=rows[i++]){
    c=r.getElementsByTagName('td');
    clone=cloneEl(c[c.length-1]);
    c[0].parentNode.appendChild(clone);
    }
}

function cloneEl(el){
    var clo=el.cloneNode(true);
    return clo;
}

function restart() {
    m = 0;
    for (i = 0; i < oCells.length; i++) {
        oCells[i].innerHTML = '';
    }
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    numbers.shuffle();
    for (i = 0; i < numbers.length; i++) {
        oCells[i].innerHTML = numbers[i];
    }
    reDrawBoard(numbers.length);
}

function resetAll() {
    m = 0;
    for (i = 0; i < oCells.length; i++) {
        oCells[i].innerHTML = '';
    }
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    for (i = 0; i < numbers.length; i++) {
        oCells[i].innerHTML = numbers[i];
    }
    reDrawBoard(numbers.length);
}

function reDrawBoard(num) {
    for (i = 0; i < oCells.length; i++) {
        oCells[i].onclick = oCells[i].className = oCells[i].title = '';
    }
    touchingCells = new Array();
    oBlank = oCells[num];
    oBlank.rowNum = new Number(getRowIndex(oBlank));
    oBlank.cellNum = new Number(getCellIndex(oBlank));
    if (num >= 25) {
        oBlank.cellIndx = (oBlank.rowNum * 6) + oBlank.cellNum;
    } else {
        oBlank.cellIndx = (oBlank.rowNum * 5) + oBlank.cellNum;
    }
    // oCells[blankIndx].className="empty";
    getEmptyCell(oBlank);
    touchingCells = getTouchingCells(oBlank, num);
    assignOnclicks(num);
}

function getEmptyCell(obj) {
    oBlank.classList.add('empty');
}

function getTouchingCells(obj, num) {
    var newTouchingCells = new Array();
    if (num >= 25) {
        if (obj.cellNum - 1 >= 0) {
            newTouchingCells.push(oTable.rows[obj.rowNum].cells[obj.cellNum - 1]);
        }
        if (obj.cellNum + 1 <= 5) {
            newTouchingCells.push(oTable.rows[obj.rowNum].cells[obj.cellNum + 1]);
        }
        if (obj.rowNum - 1 >= 0) {
            newTouchingCells.push(oTable.rows[obj.rowNum - 1].cells[obj.cellNum]);
        }
        if (obj.rowNum + 1 <= 5) {
            newTouchingCells.push(oTable.rows[obj.rowNum + 1].cells[obj.cellNum]);
        }
        
    } else {
        if (obj.cellNum - 1 >= 0) {
            newTouchingCells.push(oTable.rows[obj.rowNum].cells[obj.cellNum - 1]);
        }
        if (obj.cellNum + 1 <= 4) {
            newTouchingCells.push(oTable.rows[obj.rowNum].cells[obj.cellNum + 1]);
        }
        if (obj.rowNum - 1 >= 0) {
            newTouchingCells.push(oTable.rows[obj.rowNum - 1].cells[obj.cellNum]);
        }
        if (obj.rowNum + 1 <= 4) {
            newTouchingCells.push(oTable.rows[obj.rowNum + 1].cells[obj.cellNum]);
        }
    }
    
    for (i = 0; i < newTouchingCells.length; i++) {
        newTouchingCells[i].className = 'touchingCells';
        newTouchingCells[i].title = 'Swap this number';
    }
    return newTouchingCells;
}

function getRowIndex(obj) {
    var oParent = obj.parentNode;
    while (oParent.nodeName.toLowerCase() != 'tr') {
        oParent = oParent.parentNode;
    }
    return oParent.rowIndex;
}

function getCellIndex(obj) {
    var rowIndex = getRowIndex(obj);
    for (i = 0; i < oRows[rowIndex].cells.length; i++) {
        if (obj == oRows[rowIndex].cells[i]) {
            return i;
        }
    }
}

function assignOnclicks(num) {
    m = m + 1;
    for (i = 0; i < touchingCells.length; i++) {
        touchingCells[i].onclick = function() {
            if (num >= 25) {
                var cellIndex = (getRowIndex(this) * 6) + getCellIndex(this);
            } else {
                var cellIndex = (getRowIndex(this) * 5) + getCellIndex(this);
            }
            var blankIndx = oBlank.cellIndx;
            var temp = oCells[cellIndex].innerHTML;
            oCells[cellIndex].innerHTML = '';
            
            oCells[blankIndx].innerHTML = temp;
            if (ifWinner()) {
                alert('Win!');
                // document.write('Win!');
                reDrawBoard(cellIndex, blankIndx);
            } else {
                reDrawBoard(cellIndex, blankIndx);
            }
        }
    }
}

function ifWinner() {
    var ifWin = true;
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    for (i = 0; i < numbers.length; i++) {
        if (new Number(oCells[i].innerHTML) != numbers[i]) {
            ifWin = false;
            i = numbers.length;
        }
    }
    return ifWin;
}

Array.prototype.shuffle = function() {
    var s = [];
    while (this.length)
        s.push(this.splice(Math.random() * this.length, 1));
    while (s.length)
        this.push(s.pop());
    return this;
}

window.onload = function() {
    m = 1;
    oTable = document.getElementById('tblBoard');
    oRows = document.getElementById('tblBoard').getElementsByTagName('tr');
    oCells = document.getElementById('tblBoard').getElementsByTagName('td');
    document.getElementById('btnRestart').onclick = restart;
    document.getElementById('btnReset').onclick = resetAll;
    
    restart();
}

