// ==UserScript==
// @name            Preenchimento da tabela de imposto
// @description     Script to be used with PW pages
// @include         http://www010.dataprev.gov.br/cws/contexto/conrmi/index.html
// @version         1.0
// ==/UserScript==

var valueList = "";


function wrapArray(list)
{
  var out = [];
  for (var i = 0 ; i < list.length; i++)
    out.push(list[i]);
  return out;
}

function findTable(finder)
{
  var tables = wrapArray(finder.querySelectorAll('div[align="center"] center table[border="1"]'));
  while (tables.length > 0)
  {
    var table = tables.pop();
    if (table.querySelectorAll('tr').length > 10 && table.querySelectorAll('tr:first-of-type>td').length == 4)
    {
      return table;
    }
  }
}

var start = function(){
  var frameDoc = document.querySelector('frame').contentWindow.document;
  var anchor = frameDoc.querySelector('#anchor');
  if (!anchor)
  {
    var table = findTable(frameDoc);
    table.id='anchor';
    anchor = table;
  }
  
  var fields = wrapArray(anchor.querySelectorAll('td input[type="text"]'));
  fill(fields, valueList);
};

function fill(fields, string)
{
  function doFill(fields, value, qtn)
  {
    for (var i = 0; fields.length > 0 && qtn > i; i++)
    {
      var field = fields.pop();
      field.value=value;
    }
  }
  var list = string.replace(/\./g,",").split(";");
  while (list.length > 0 && fields.length > 0)
  {
    var str = list.shift().trim();
    if (str != "")
    {
      var val = str.replace(/\s*:.*$/,"");
      var qtn = Number(str.replace(/^.*\s*:/,""));
      doFill(fields, val, qtn);
    }
  }
}

window.addEventListener("load", function() {
  start();
}, true);
