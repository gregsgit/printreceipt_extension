/* 
 Copyright (c) 2009-2012 Greg Sullivan gregs@sulliwood.org
 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 - Redistributions must retain the above copyright notice and this list of conditions.
*/

function find_checkout_table(doc) {
  return doc.getElementById("checkout_table");
//  var tables = doc.getElementsByTagName("table");
//  return tables[6];
}

var PrintReceiptOverlay = {
 onLoad: function(e) {
    // initialization code
    this.initialized = true;
  },

 onMenuItemCommand: function(e, doc) {
    // following code from: https://developer.mozilla.org/en/Working_with_windows_in_chrome_code
    var ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
               .getService(Components.interfaces.nsIWindowWatcher);
    var newWin = ww.openWindow(null, "checkout",
			       "checkout", "resizable=no,scrollbars=no,toolbars=no,titlebar", null);
    var checkout_table = find_checkout_table(doc);
    newWin.document.write("<html><body><table border=\"1\">");
    newWin.document.write("<col width=\"200\" /> <col width=\"100\" />");
    newWin.document.write("<th>Title</th> <th>Due Date</th>");
    for (var i=1; i < checkout_table.rows.length; i++) {
      newWin.document.write("<tr><td>" +
      checkout_table.rows[i].cells[2].innerHTML + "</td><td>");
      newWin.document.write(checkout_table.rows[i].cells[5].innerHTML + "</td></tr>");
    }
    newWin.document.write("</table></body></html>");
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  }
};

window.addEventListener("load", function(e) { PrintReceiptOverlay.onLoad(e); }, false); 
