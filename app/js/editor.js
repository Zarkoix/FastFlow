const ipcRenderer = require('electron').ipcRenderer

$(document).ready(function() {
  var theURI = window.location.search

  if (theURI.length > 0) {
    var decodedURI = decodeURIComponent(theURI).substring(1)

    FileArray = ipcRenderer.sendSync('FileOpen', decodedURI)

    document.getElementById('title').innerHTML = FileArray[0]
    document.getElementById('tags').innerHTML = FileArray[1]
    document.getElementById('content').innerHTML = FileArray[2]
  }
})

var bar = {
  add: {
    buttons: ['image', 'hline', 'table'],
    tabIndex: 2
  },
  styles: {
    selections: Selections,
    tabIndex: 1
  }
}

var Selections = [{
        name: 'link',
        buttons: ['linkEdit'],
        test: AlloyEditor.SelectionTest.link
    }, {
        name: 'image',
        buttons: ['imageLeft', 'imageRight'],
        test: AlloyEditor.SelectionTest.image
    }, {
        name: 'text',
        buttons: ['bold', 'italic', 'underline', 'link'],
        test: AlloyEditor.SelectionTest.text
    }, {
        name: 'table',
        buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
        getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
        setPosition: AlloyEditor.SelectionSetPosition.table,
        test: AlloyEditor.SelectionTest.table
}]

$(document).ready(function () {
  var editor = AlloyEditor.editable('content', {
    toolbars: {
      add: {
        buttons: ['hline', 'table'],
        tabIndex: 2
      },
      styles: {
        selections: Selections,
        tabIndex: 1
      }
    }
  })
  $('#saveButton').hide()
})

function saveFunction() {
  var TitleString = $('#title').text()
  var TagString = $('#tags').text()
  var ContentString = $('#content').html()
  ipcRenderer.send('FileSave', [TitleString, TagString, ContentString])
  window.alert('Saved!')
}

function saveShow () {
  $('#saveButton').show()
}