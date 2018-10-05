const end_point = 'https://api.avgle.com/v1/videos/';
const search_end_point = 'https://api.avgle.com/v1/video/';
let page = 0;
let hasMore = false;
let query_o = 'mr';
let searchMode = false;
let scroll = 0;
let url = end_point + '0?c=21&o=mr&limit=10';

$(document).ready(() => {
  getMovies();
  $('#moreButton').on('click', () => {
    console.log('button click, more is:' + hasMore);
    if (hasMore) {
      page++;
      if (searchMode) {
        let input = $('.form-inline input').val();
        url = `https://api.avgle.com/v1/search/${input}/${page}?limit=5`;
      } else {
        url = end_point + page + `?c=21&limit=5&o=${query_o}`;
      }
      getMovies();
      console.log();
    } else {
      alert('No more movie');
    }
  });

  $('.navbar-brand').click(() => {
    $('.movie-group').show();
    $('#moreButton').show();
    $('.movie-info').empty();
    changeQuery('mr', $(this));
  });

  $('#mr').click(() => {
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
});

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

  $('.movie-group').hide();
  $('#moreButton').hide();
  getVideoPage(id);
  return false;
}

function getVideoPage(id) {
  console.log('info page, id: ' + id);
  axios.get(search_end_point + id).then(res => {
    console.log(res);
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
  });
}

function goBack() {
  $('.movie-group').show();
  $('#moreButton').show();
  $('.movie-info').empty();
  $('html').scrollTop(scroll);
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
              <a href="#" onclick="movieSelected(${movie.vid})">${
          movie.title
        }</a>
            </div>
        `;
        $('.movie-group').append(output);
        // $('video')[index].play();
      });
      hasMore = res.data.response.has_more;
    })
    .catch(error => {
      console.log(error);
    });
}
