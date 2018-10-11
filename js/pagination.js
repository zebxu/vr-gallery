function renderPagination(page) {
  if (page < 3) {
    page = 3;
  }
  console.log('total page = ' + total_page);
  if (total_page < 10) {
    console.log('first few pages');
    var page_link_list = [];
    page_link_list.push(`
      <li class="page-item">
        <a class="page-link" id="prevButton" onclick="handlePrevButton(${page})">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
  `);
    for (var i = 1; i < total_page + 1; i++) {
      page_link_list.push(
        `<li class="page-item">
          <a class="page-link" 
           onclick="changePagePath(${i})">${i}
          </a>
        </li>`
      );
    }
    page_link_list.push(`
      <li class="page-item">
        <a class="page-link" id="nextButton" onclick="handleNextButton(${page})">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    `);
    $('.pagination').html(page_link_list.join('/n'));
  } else if (page > total_page - 5) {
    console.log('last few pages');
    var page_link_list = [];
    page_link_list.push(`
      <li class="page-item">
        <a class="page-link" id="prevButton" onclick="handlePrevButton(${page})">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" 
           onclick="changePagePath(1)">1
        </a>
      </li>
      <li class="page-item"><a class="page-link">...</a></li>
  `);
    for (var i = total_page - 5; i < total_page + 1; i++) {
      page_link_list.push(
        `<li class="page-item">
          <a class="page-link" 
           onclick="changePagePath(${i})">${i}
          </a>
        </li>`
      );
    }
    page_link_list.push(`
      <li class="page-item">
        <a class="page-link" id="nextButton" onclick="handleNextButton(${page})">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    `);
    $('.pagination').html(page_link_list.join(' '));
  } else {
    console.log('pages in the middle');
    var toAdd = `
      <li class="page-item">
        <a class="page-link" id="prevButton" onclick="handlePrevButton(${page})">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" onclick="changePagePath(${page -
        2})">${page - 2}</a></li>
      <li class="page-item"><a class="page-link" onclick="changePagePath(${page -
        1})">${page - 1}</a></li>
      <li class="page-item"><a class="page-link" onclick="changePagePath(${page})">${page}</a></li>
      <li class="page-item"><a class="page-link" onclick="changePagePath(${page +
        1})">${page + 1}</a></li>
      <li class="page-item"><a class="page-link" onclick="changePagePath(${page +
        2})">${page + 2}</a></li>
      <li class="page-item"><a class="page-link" onclick="changePagePath(${page +
        3})">${page + 3}</a></li>
      <li class="page-item"><a class="page-link">...</a></li>
      <li class="page-item"><a class="page-link" onclick="changePagePath(${total_page})">${total_page}</a></li>
      <li class="page-item">
        <a class="page-link" id="nextButton" onclick="handleNextButton(${page})">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
  `;
    $('.pagination').html(toAdd);
  }
}

function renderSearchPagination(page) {
  if (page < 3) {
    page = 3;
  }
  console.log('total page = ' + total_page);
  if (total_page < 10) {
    console.log('too less page');
    var page_link_list = [];
    page_link_list.push(`
      <li class="page-item">
        <a class="page-link" id="prevButton" onclick="handlePrevButton(${page})">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
  `);
    for (var i = 1; i < total_page + 1; i++) {
      page_link_list.push(
        `<li class="page-item">
          <a class="page-link" 
          onclick="changePageSearchPath(${i})">${i}
          </a>
        </li>`
      );
    }
    page_link_list.push(`
      <li class="page-item">
        <a class="page-link" id="nextButton" onclick="handleNextButton(${page})">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    `);
    $('.pagination').html(page_link_list.join(' '));
  } else if (page > total_page - 5) {
    console.log('near end');
    var page_link_list = [];
    page_link_list.push(`
      <li class="page-item">
        <a class="page-link" id="prevButton" onclick="handlePrevButton(${page})">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" 
        onclick="changePagePath(1)">1
        </a>
      </li>
      <li class="page-item"><a class="page-link">...</a></li>
  `);
    for (var i = total_page - 5; i < total_page + 1; i++) {
      page_link_list.push(
        `<li class="page-item">
        <a class="page-link" 
         onclick="changePageSearchPath(${i})">${i}
        </a>
      </li>`
      );
    }
    page_link_list.push(`
      <li class="page-item">
        <a class="page-link" id="nextButton" onclick="handleNextButton(${page})">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    `);
    $('.pagination').html(page_link_list.join(' '));
  } else {
    var toAdd = `
      <li class="page-item">
      <a class="page-link" id="prevButton" onclick="handlePrevButton(${page})">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${page -
      2})">${page - 2}</a></li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${page -
      1})">${page - 1}</a></li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${page})">${page}</a></li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${page +
      1})">${page + 1}</a></li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${page +
      2})">${page + 2}</a></li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${page +
      3})">${page + 3}</a></li>
    <li class="page-item"><a class="page-link">...</a></li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${total_page})">${total_page}</a></li>
    <li class="page-item">
      <a class="page-link" id="nextButton" onclick="handleNextButton(${page})">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  `;
    $('.pagination').html(toAdd);
  }
}

function changePageSearchPath(p) {
  var search_query = window.location.hash.split('/')[2];
  changePath('search/' + search_query + '/page/' + p);
}

function changePagePath(p) {
  changePath(query_o + '/page/' + p);
}

function gotoPage(p) {
  $('.movie-group').empty();
  getMovies(p); // from mainPage.js
  return false;
}

function getActivePageNum(p) {
  console.log('getActivePageNum()' + p);
  $.each($('.page-link'), function(i, item) {
    if ($(item).html() == p) {
      $(item)
        .parent()
        .toggleClass('active');
    }
  });
  // $(`.page-link:contains("${p}")`)
  //   .parent()
  //   .toggleClass('active');
}

function handleNextButton(page) {
  if (page < total_page) {
    if (window.location.hash.split('/')[1] == 'search') {
      changePageSearchPath(page + 1);
    } else {
      changePagePath(page + 1);
    }
  }
}

function handlePrevButton(page) {
  if (page > 0) {
    if (window.location.hash.split('/')[1] == 'search') {
      changePageSearchPath(page - 1);
    } else {
      changePagePath(page - 1);
    }
  }
}
