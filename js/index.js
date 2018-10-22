'use strict';
const end_point = 'https://api.avgle.com/v1/videos/';
const search_end_point = 'https://api.avgle.com/v1/video/';
// let page = 0;
let hasMore = false;
let query_o = 'mr';
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
    sessionStorage.setItem('scrollPos', 0);
    var target = $('this').attr('id');
    changePath(target);
  });

  // Handle Search Button click
  $('.form-inline button').click(() => {
    sessionStorage.setItem('scrollPos', 0);
    var query = $('.form-inline input').val();
    changePath('search/' + query);
  });
});

function renderMain(type) {
  // Toggle component view
  $('.not-found-msg').hide();
  $('.movie-group').show();
  $('.movie-info').empty();
  $('.pageNav').show();
  $('.search-result').empty();
  $('.form-inline input').val('');
  query_o = type;
  refreshMovies();
  $('.' + type).toggleClass('active');
}

function renderMainToPage(p) {
  $('.not-found-msg').hide();
  $('.movie-group').show();
  $('.movie-info').empty();
  $('.pageNav').show();
  $('.search-result').empty();
  $('.not-found-msg').hide();
  gotoPage(p);
}

function renderSearch(q) {
  $('.not-found-msg').hide();
  $('.form-inline input').val('');
  $('.movie-group').empty();
  $('.pageNav').show();
  $('.movie-info').empty();
  $('.search-result').show();
  search(q, 1);
}

function renderSearchToPage(q, p) {
  $('.not-found-msg').hide();
  $('.form-inline input').val('');
  $('.movie-group').empty();
  $('.pageNav').show();
  $('.movie-info').empty();
  $('.search-result').show();
  gotoSearchPage(q, p);
}

function renderMovie(id) {
  $('.not-found-msg').hide();
  $('.form-inline input').val('');
  $('.movie-group').empty();
  $('.search-result').empty();
  $('.movie-info').show();
  $('.pageNav').hide();
  movieSelected(id);
}

function renderNotFound() {
  $('.movie-group').hide();
  $('.search-result').hide();
  $('.pageNav').hide();
  $('.movie-info').empty();
  $('.not-found-msg').show();
}
