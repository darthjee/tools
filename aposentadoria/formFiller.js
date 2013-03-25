var jQueryAddr = "http://code.jquery.com/jquery-1.6.1.min.js";
var valueList = "";

console.clear();
var watcher=null;

function findTable(finder)
{
  var tables = finder.find('div[align="center"] center table[border="1"]').get();
  while (tables.length > 0)
  {
    var table = jQuery(tables.pop());
    if (table.find('tr').length > 10 && table.find('tr:first>td').length == 4)
    {
      return table;
    }
  }
}

var start = function(){
  if (document.querySelector("#jquerySrc"))
  {
    if (typeof jQuery == "function")
    {
      watcher = clearInterval(watcher);
      var frameDoc = jQuery(jQuery('frame').get(0).contentWindow.document);
      var anchor = frameDoc.find('#anchor');
      if (anchor.length <= 0)
      {
        var table = findTable(frameDoc);
        table.attr('id','anchor');
        anchor = table;
      }
      
      var fields = anchor.find('td input[type="text"]').get();
      fill(fields, valueList);
    }
    
  }
  else
  {
    var scrpt = document.createElement('script');
    scrpt.src=jQueryAddr;
    scrpt.id="jquerySrc";
    document.querySelector('head').appendChild(scrpt);
    watcher = window.setInterval(start,200);
  }
};

function fill(fields, string)
{
  function doFill(fields, value, qtn)
  {
    for (var i = 0; fields.length > 0 && qtn > i; i++)
    {
      var field = fields.pop();
      jQuery(field).val(value);
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

start();