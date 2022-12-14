export var Instafilter = (function () {
  'use strict';

  var defaults = {
    listSelector:     '.instafilter-list',
    itemSelector:     '.instafilter-item',
    contentSelector:  '.instafilter-content'
  };

  var publicAPIs = {};

  publicAPIs.activate = function (searchInput, options) {
    let settings = Object.assign({}, defaults, options);
    let list = document.querySelector(settings.listSelector);
    let rows = list.querySelectorAll(settings.itemSelector);
    searchInput.onkeyup = function() {
      let searchTerm = searchInput.value.toLowerCase();

      for (let row of rows) {
        let searchNode = row.querySelector(settings.contentSelector);
        let candidateText = searchNode.textContent.trim().toLowerCase();
        row.hidden = searchTerm.length > 0 && !termMatchesText(searchTerm, candidateText);
      }
    };
  };

  var termMatchesText = function (term, text) {
    var term_i = 0;
    for (let text_i = 0; text_i < text.length; text_i++) {
      if (charsMatch(term.charAt(term_i), text.charAt(text_i))) {
        term_i++;
        if (term_i >= term.length) {
          return true;
        }
      }
    }
    return false;
  };

  if (window.Intl && typeof window.Intl === "object"){
    let collator = new Intl.Collator([], { sensitivity: "base" });
    var charsMatch = function(a, b) {
      return collator.compare(a, b) === 0;
    };
  } else {
    var charsMatch = function(a, b) {
      return a === b;
    };
  };

  return publicAPIs;
})();
