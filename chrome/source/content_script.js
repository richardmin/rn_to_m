walk(document.body);

function walk(node) 
{
	var child, next;

  if (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea' || node.tagName.toLowerCase() == 'script'
      || node.classList.indexOf('ace_editor') > -1)  //don't screw with the user
    return;
  

	switch (node.nodeType)  
	{
    case 3: //text
        check(node);

		case 11: //part of doc
			child = node.firstChild;
			while (child) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;
	}
}

function check(textNode) {
	var txt = textNode.nodeValue;
  txt = txt.replace(/rn/g, "r n");
	textNode.nodeValue = txt;
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer) {
    mutations.forEach(function(mutation) { 
      walk(mutation.target); 
    });
});

observer.observe(document.body, {
  subtree: true,
  attributes: false,
  characterData: true,
  childList: true
});