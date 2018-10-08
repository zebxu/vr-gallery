const end_point = 'https://api.avgle.com/v1/videos/';
const search_end_point = 'https://api.avgle.com/v1/video/';
// let page = 0;
let hasMore = false;
let query_o = 'mr';
let scroll = 0;
let api_url = end_point + '0?c=21&o=mr&limit=10';
let total_page = 0;

$(document).ready(() => {
  $('.not-found-msg').hide();
  listen();

  // Handle Navbar click
  $('.navbar-brand').click(() => {
    changePath('/');
  });
  $('.nav-link').click(() => {
    var target = $('this').attr('id');
    changePath(target);
  });

  // Handle Search Button click
  $('.form-inline button').click(() => {
    var query = $('.form-inline input').val();
    changePath('search/' + query);
  });

  $('body').on('click', 'a.page-link', e => {
    console.log('a click!');
    e.preventDefault();
  });
});

function renderMain(type) {
  console.log('render main page ' + type);
  // Toggle component view
  $('.not-found-msg').hide();
  $('.movie-group').show();
  $('.movie-info').hide();
  $('.pageNav').show();
  $('.search-result').hide();

  query_o = type;
  refreshMovies();
  $('.' + type).toggleClass('active');
}

function renderMainToPage(p) {
  $('.not-found-msg').hide();
  $('.movie-group').show();
  $('.movie-info').hide();
  $('.pageNav').show();
  $('.search-result').hide();
  $('.not-found-msg').hide();
  gotoPage(p);
}

function renderSearch(q) {
  console.log('render search');
  $('.not-found-msg').hide();
  $('.form-inline input').val('');
  $('.movie-group').hide();
  $('.pageNav').show();
  $('.movie-info').hide();
  $('.search-result').show();
  search(q, 1);
}

function renderSearchToPage(q, p) {
  $('.not-found-msg').hide();
  $('.form-inline input').val('');
  $('.movie-group').hide();
  $('.pageNav').show();
  $('.movie-info').hide();
  $('.search-result').show();
  gotoSearchPage(q, p);
}

function renderMovie(id) {
  $('.not-found-msg').hide();
  $('.form-inline input').val('');
  $('.movie-group').hide();
  $('.search-result').hide();
  $('.movie-info').show();
  $('.pageNav').hide();
  movieSelected(id);
}

function renderNotFound() {
  console.log('page not found!');
  $('.movie-group').hide();
  $('.search-result').hide();
  $('.pageNav').hide();
  $('.movie-info').hide();
  $('.not-found-msg').show();
}
