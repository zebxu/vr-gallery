function renderPagination(page) {
  if (page < 2) {
    page = 2;
  }
  var toAdd = `
      <li class="page-item">
      <a class="page-link" id="prevButton" onclick="handlePrevButton()">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" onclick="changePagePath(${page -
      1})">${page - 1}</a></li>
    <li class="page-item"><a class="page-link" onclick="changePagePath(${page})">${page}</a></li>
    <li class="page-item"><a class="page-link" onclick="changePagePath(${page +
      1})">${page + 1}</a></li>
    <li class="page-item"><a class="page-link">...</a></li>
    <li class="page-item"><a class="page-link" onclick="changePagePath(${total_page})">${total_page}</a></li>
    <li class="page-item">
      <a class="page-link" id="nextButton" onclick="handleNextButton()">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  `;
  $('.pagination').html(toAdd);
}

function renderSearchPagination(query, page) {
  if (page < 2) {
    page = 2;
  }
  var toAdd = `
      <li class="page-item">
      <a class="page-link" id="prevButton" onclick="handlePrevButton()">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${query},${page -
    1})">${page - 1}</a></li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${query},${page})">${page}</a></li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${query},${page +
    1})">${page + 1}</a></li>
    <li class="page-item"><a class="page-link">...</a></li>
    <li class="page-item"><a class="page-link" onclick="changePageSearchPath(${query},${total_page})">${total_page}</a></li>
    <li class="page-item">
      <a class="page-link" id="nextButton" onclick="handleNextButton()">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  `;
  $('.pagination').html(toAdd);
}

function changePageSearchPath(q, p) {
  changePath('search/' + q + '/page/' + p);
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

function handleNextButton() {
  page++;
  if (searchMode) {
    let input = $('.form-inline input').val();
    api_url = `https://api.avgle.com/v1/search/${input}/${page}?limit=5`;
  } else {
    api_url = end_point + page + `?c=21&limit=5&o=${query_o}`;
  }
  $('.movie-group').empty();
  getMovies();
}

function handlePrevButton() {
  if (page > 1) {
    page--;
  }
  if (searchMode) {
    let input = $('.form-inline input').val();
    api_url = `https://api.avgle.com/v1/search/${input}/${page}?limit=5`;
  } else {
    api_url = end_point + page + `?c=21&limit=5&o=${query_o}`;
  }
  $('.movie-group').empty();
  getMovies();
}
