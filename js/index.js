const end_point = 'https://api.avgle.com/v1/videos/';
const search_end_point = 'https://api.avgle.com/v1/video/';
let page = 0;
let hasMore = false;
let query_o = 'mr';
let searchMode = false;
let scroll = 0;
let url = end_point + '0?c=21&o=mr&limit=10';
let total_page = 0;

$(document).ready(() => {
  getMovies();
  // $('#moreButton').on('click', () => {
  //   console.log('button click, more is:' + hasMore);
  //   if (hasMore) {
  //     page++;
  //     if (searchMode) {
  //       let input = $('.form-inline input').val();
  //       url = `https://api.avgle.com/v1/search/${input}/${page}?limit=5`;
  //     } else {
  //       url = end_point + page + `?c=21&limit=5&o=${query_o}`;
  //     }
  //     getMovies();
  //   } else {
  //     alert('No more movie');
  //   }
  // });

  $('.navbar-brand').click(() => {
    $('.movie-group').show();
    $('#moreButton').show();
    $('.movie-info').empty();
    changeQuery('mr', $(this));
  });

  $('#mr').click(() => {
    console.log('mr clicked!');
    $('.movie-group').show();
    $('#moreButton').show();
    $('.movie-info').empty();
    changeQuery('mr', $(this));
  });
  $('#mv').click(() => {
    $('.movie-group').show();
    $('#moreButton').show();
    $('.movie-info').empty();
    changeQuery('mv', $(this));
  });
  $('#tf').click(() => {
    $('.movie-group').show();
    $('#moreButton').show();
    $('.movie-info').empty();
    changeQuery('tf', $(this));
  });
  $('#tr').click(() => {
    $('.movie-group').show();
    $('#moreButton').show();
    $('.movie-info').empty();
    changeQuery('tr', $(this));
  });

  $('.form-inline button').click(() => {
    searchMode = true;
    let input = $('.form-inline input').val();
    url = `https://api.avgle.com/v1/search/${input}/${page}?limit=10`;
    refreshMovies();
  });

  $('body').on('click', 'a.page-link', e => {
    console.log('a click!');
    e.preventDefault();
  });
});

function gotoPage(p) {
  page = p;
  $('.movie-group').empty();
  url = end_point + page + `?c=21&limit=10&o=${query_o}`;
  getMovies();
  return false;
}

function changeQuery(type, object) {
  query_o = type;
  searchMode = false;
  refreshMovies();
  object.toggleClass('active');
}

function movieSelected(id) {
  // sessionStorage.setItem('movieId', id);
  // window.location = 'movie.html';
  scroll = $(window).scrollTop();

  $('nav.pageNav').hide();
  $('.movie-group').hide();
  $('#moreButton').hide();
  getVideoPage(id);
  return false;
}

function getVideoPage(id) {
  axios.get(search_end_point + id).then(res => {
    if (res.data.success == false) {
      let output = `
        <button class="btn btn-primary" onclick="goBack()">
          Go back
        </button>
        <div class="alert alert-danger mt-4" role="alert">
          ${res.data.response.error_message}
        </div>
      `;
      $('.movie-info').append(output);
    } else {
      let movie = res.data.response.video;
      console.log(movie);
      let output = `
    <button class="btn btn-primary" onclick="goBack()">
      Go back
    </button>
    <header>
      <h3>${movie.title}</h3>
      <button class="btn btn-primary btn-sm" id="copyButton" onclick="textCopy()">Copy</button>
    </header>
    <iframe 
      width="1060" 
      height="596"
      frameborder="0" 
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      src="${movie.embedded_url}"></iframe>
    `;
      $('.movie-info').append(output);
    }
  });
}

function goBack() {
  $('.movie-group').show();
  $('#moreButton').show();
  $('.movie-info').empty();
  $('html').scrollTop(scroll);
  $('nav.pageNav').show();
}

function textCopy() {
  console.log('copy click');
  var $temp = $('<input>');
  $('body').append($temp);
  $temp.val($('h3').text()).select();
  document.execCommand('copy');
  $temp.remove();
  alert('Copy!');
}

function refreshMovies() {
  page = 0;
  if (!searchMode) {
    console.log('go to normal mode!');
    url = end_point + page + `?c=21&limit=10&o=${query_o}`;
  }
  console.log('request to ' + url);
  $('.movie-group').empty();
  getMovies();
}

function getMovies() {
  console.log('request to ' + url);
  axios
    .get(url)
    .then(res => {
      console.log(res.data.response);
      let movies = res.data.response.videos;
      total_page = Math.floor(res.data.response.total_videos / 10) + 1;
      console.log(total_page);
      $.each(movies, (index, movie) => {
        let output = `
          <div class="movie-card shadow bg-light">
            <img src="${movie.preview_url}" onclick="movieSelected(${
          movie.vid
        })">
            <video class="preview-video" loop autoplay onclick="movieSelected(${
              movie.vid
            })">
              <source src="${movie.preview_video_url}" type="video/mp4">
            </video>
            <a href="#" onclick="movieSelected(${movie.vid})">${movie.title}</a>
          </div>
        `;
        $('.movie-group').append(output);
        // $('video')[index].play();
      });
      hasMore = res.data.response.has_more;
      renderPagination();
      getActivePageNum();
      getActiveTab();
    })
    .catch(error => {
      console.log(error);
    });
}

function renderPagination() {
  if (page > 1) {
    $('.pagination').html(
      `
      <li class="page-item">
      <a class="page-link" href="#" id="prevButton" onclick="handlePrevButton()">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
        <li class="page-item">
          <a class="page-link" 
          href="#" 
          onclick="gotoPage(${page - 1})">
            ${page}
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" onclick="gotoPage(${page})">
            ${page + 1}
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" onclick="gotoPage(${page + 1})">
            ${page + 2}
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">...</a></li>
        <li class="page-item"><a class="page-link" href="#" onclick="gotoPage(${total_page})">${total_page}</a></li>
        <li class="page-item">
            <a class="page-link" href="#" id="nextButton" onclick="handleNextButton()">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
      `
    );
  } else {
    $('.pagination').html(
      `
      <li class="page-item">
      <a class="page-link" href="#" id="prevButton" onclick="handlePrevButton()">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
        <li class="page-item"><a class="page-link" href="#" onclick="gotoPage(0)">1</a></li>
        <li class="page-item"><a class="page-link" href="#" onclick="gotoPage(1)">2</a></li>
        <li class="page-item"><a class="page-link" href="#" onclick="gotoPage(2)">3</a></li>
        <li class="page-item"><a class="page-link" href="#">...</a></li>
        <li class="page-item"><a class="page-link" href="#" onclick="gotoPage(${total_page})">${total_page}</a></li>
        <li class="page-item">
            <a class="page-link" href="#" id="nextButton" onclick="handleNextButton()">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
      `
    );
  }
}

function getActiveTab() {
  $('li.nav-item.active').toggleClass('active');
  $(`.nav-link[id*="${query_o}"]`)
    .parent()
    .toggleClass('active');
}

function getActivePageNum() {
  $(`.page-link:contains("${page + 1}")`)
    .parent()
    .toggleClass('active');
}

function handleNextButton() {
  page++;
  if (searchMode) {
    let input = $('.form-inline input').val();
    url = `https://api.avgle.com/v1/search/${input}/${page}?limit=5`;
  } else {
    url = end_point + page + `?c=21&limit=5&o=${query_o}`;
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
    url = `https://api.avgle.com/v1/search/${input}/${page}?limit=5`;
  } else {
    url = end_point + page + `?c=21&limit=5&o=${query_o}`;
  }
  $('.movie-group').empty();
  getMovies();
}
