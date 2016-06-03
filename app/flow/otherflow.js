function createCell(cell) {

    var content = document.createElement('DIV');

    var string = "<table><tr><td><a href = \"#\" onclick = deleteColumn(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.cellIndex)>x</a></td>";
    string += "<td><a href = \"#\" onclick = this.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].value=\"\">x</a></td></tr>";
    string += "<tr><td><div contenteditable=\"true\" class=\"textbox\"></div></td>";
    string += "<td><a href = \"#\" onclick = deleteRow(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex)>x</a></td></tr></table>";
    content.innerHTML = string;
    $(".content").addClass('textBoxDiv')
    cell.appendChild(content);

}

function newSpeech() {
  var tbl = document.getElementById('flowspace'), // table reference
        i;
    // open loop for each row and append cell
    for (i = 0; i < tbl.rows.length; i++) {
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length));
    }

}

function newContention() {
  var tbl = document.getElementById('flowspace'), // table reference
      row = tbl.insertRow(tbl.rows.length),      // append table row
      i;
  // insert table cells to the new row
  for (i = 0; i < tbl.rows[0].cells.length; i++) {
      createCell(row.insertCell(i));
  }

}