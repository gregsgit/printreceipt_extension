printreceipt_extension
======================

Extension to Firefox browser, integrates with libraryworld.com, to print checkout on narrow (e.g. thermal) printer.


## Source Notes

 * chrome.manifest
   - specifies overlay

 * chrome/content/overlay.xul
   - adds menu item to Tools menu

## Development notes

  * to start FF using dev profile:
    /Applications/Firefox.app/Contents/MacOS/firefox-bin -no-remote -P dev &

  * added a file named gregs_printreceipt_extension@sulliwood.org to
    /Users/gregsullivan/Library/Application Support/Firefox/Profiles/zoua03rb.dev/extensions
    with the contents:
    /Users/gregsullivan/Documents/AuburndaleBranchLibrary/printreceipt_extension

  * to reload extension, do 
    touch /Users/gregsullivan/Documents/AuburndaleBranchLibrary/printreceipt_extension

  * to build xpi and push to sulliwood.org/gregs/software, 
     1. in the printreceipt_extension folder, do
     2. find . -not -path '*/.svn/*' -print | zip -@ printreceipt.xpi
     3. cp printreceipt.xpi ~/Documents/gregs_public_html
     4. cd ~/Documents/gregs_public_html ; svn ci -m 'edit message'
        * note that checking in automagically checks back out to web space.

  * to checkout, git clone https://github.com/gregsgit/printreceipt_extension.git

  * had a hard time figuring out how to write to a new window (hit
    security violation).  Following works:

    ````
    var newWin = window.open('','receipt',"chrome=yes");
    var newDoc = newWin.document;
    newDoc.write("<html><body><h1>heading 1</h1><p>para 1</p><h2>heading 2</h2><p>para 2</p></body></html>");
    newDoc.close();
    ````

  * note that full browser layout is in chrome://browser/content/browser.xul 

## Notes on FF extensions

  * important page about working with windows from chrome:
    https://developer.mozilla.org/en/Working_with_windows_in_chrome_code

  * Very useful page: http://kb.mozillazine.org/Getting_started_with_extension_development
  * XUL Tutorial: https://developer.mozilla.org/en/XUL_Tutorial
  * lots of tutorials: http://kb.mozillazine.org/Extension_development#Tutorials
  * DOM and JS in Gecko (mozilla): https://developer.mozilla.org/en/Gecko_DOM_Reference
    * https://developer.mozilla.org/en/The_DOM_and_JavaScript

  * adding overlays to other packages: https://developer.mozilla.org/en/XUL_Tutorial/Cross_Package_Overlays

## Using Venkman / JS Debugger

  * To set the scope to the browser window: Find the "Open Windows"
    view, right-click on "Browser Window", and select "Set as
    Evaluation Object".

  * To see chrome js files, uncheck Debug->Exclude Browser Files

## Using DOM inspector, 

  * Body > Table > Tbody > TR[3] (4th row) > TD > 2nd Table > Tbody > 3rd TR > TD > 
    3rd P has text "Out or on Hold", followed by a table > 1st TR is a bunch of TH's (headers), 
    2nd thru nth TR each contain 6 TD's:
     1. "out"
     2. book id
     3. book title
     4. book category (ex. "[J easy]J fix")
     5. checkout date
     6. due date
