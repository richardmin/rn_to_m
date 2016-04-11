walk(document.body);

function walk(node) 
{
	var child, next;

	switch (node.nodeType)  
	{
    case 3: //text
        handleText(node);
    case 1:
    case 9:
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

function handleText(textNode) {
	var txt = textNode.nodeValue;
   txt = txt.replace(/rn/gi, function(match, p1, offset, string) {
    return "r n";
  });

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