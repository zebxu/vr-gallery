var url = null;

function getHash() {
  var hash = window.location.hash;
  return hash;
}

function changePath(path) {
  window.location = '#/' + path;
}

function listen() {
  var current = getHash();
  if (url != current) {
    console.log('url change to ' + current);
    url = current;
    routing();
  }
  setTimeout(listen, 200);
}

function routing() {
  var parsed = url.split('/');
  console.log('parsed url = ' + parsed);
  if (parsed.length > 1) {
    switch (parsed[1]) {
      case 'mr':
        if (parsed[2] == 'page') {
          renderMainToPage(Number(parsed[3]));
        } else {
          renderMain('mr');
        }
        break;
      case 'mv':
        if (parsed[2] == 'page') {
          renderMainToPage(Number(parsed[3]));
        } else {
          renderMain('mv');
        }
        break;
      case 'tf':
        if (parsed[2] == 'page') {
          renderMainToPage(Number(parsed[3]));
        } else {
          renderMain('tf');
        }
        break;
      case 'tr':
        if (parsed[2] == 'page') {
          renderMainToPage(Number(parsed[3]));
        } else {
          renderMain('tr');
        }
        break;
      case 'search':
        if (parsed[3] == 'page') {
          renderSearchToPage(parsed[2], Number(parsed[4]));
        } else {
          renderSearch(parsed[2]);
        }
        break;
      case 'movie':
        renderMovie(parsed[2]);
        break;
      default:
        renderNotFound();
    }
  } else {
    renderMain('mr');
  }
}
