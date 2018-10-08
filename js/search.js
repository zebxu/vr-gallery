function search(query, page) {
  var api_page = page - 1;
  scroll = $(window).scrollTop();
  $('.movie-group').hide();
  api_url = `https://api.avgle.com/v1/search/${query}/${api_page}?limit=10`;
  axios.get(api_url).then(res => {
    console.log('request to ' + api_url);
    let movies = res.data.response.videos;
    console.log(movies);
    total_page = Math.floor(res.data.response.total_videos / 10) + 1;
    $.each(movies, (index, movie) => {
      let output = `
          <div class="movie-card shadow bg-light">
            <img src="${movie.preview_url}" onclick="changePath('movie/' + ${
        movie.vid
      })">
            <video class="preview-video" loop autoplay onclick="changePath('movie/' + ${
              movie.vid
            })">
              <source src="${movie.preview_video_url}" type="video/mp4">
            </video>
            <a href="#" onclick="changePath('movie/' + ${movie.vid})">${
        movie.title
      }</a>
          </div>
        `;
      $('.search-result').append(output);
      // $('video')[index].play();
    });
    hasMore = res.data.response.has_more;
    renderSearchPagination(query, page);
    getActivePageNum(page);
  });
}

function gotoSearchPage(q, p) {
  console.log('gotoSearchPage() ' + p);
  $('.search-result').empty();
  search(q, p);
  return false;
}

// render movie info for search result
// function getSearchVideoPage(id) {
//   axios.get(search_end_point + id).then(res => {
//     if (res.data.success == false) {
//       let output = `
//         <button class="btn btn-primary" onclick="goBackToSearch()">
//           Go back
//         </button>
//         <div class="alert alert-danger mt-4" role="alert">
//           ${res.data.response.error_message}
//         </div>
//       `;
//       $('.movie-info').append(output);
//     } else {
//       let movie = res.data.response.video;
//       console.log(movie);
//       let output = `
//     <button class="btn btn-primary" onclick="goBackToSearch()">
//       Go back
//     </button>
//     <header>
//       <h3>${movie.title}</h3>
//       <button class="btn btn-primary btn-sm" id="copyButton" onclick="textCopy()">Copy</button>
//     </header>
//     <iframe
//       width="1060"
//       height="596"
//       frameborder="0"
//       allowfullscreen
//       referrerpolicy="no-referrer-when-downgrade"
//       src="${movie.embedded_url}"></iframe>
//     `;
//       $('.movie-info').append(output);
//     }
//   });
// }

// handle back button in search result movie info page
function goBackToSearch() {
  $('.movie-group').hide();
  $('.search-result').show();
  $('.movie-info').empty();
  $('nav.pageNav').show();
  $('html').scrollTop(scroll);
}

// handle movie card click in search result
function searchMovieInfo(id) {
  scroll = $(window).scrollTop();
  $('.search-result').hide();
  $('nav.pageNav').hide();
  $('.movie-group').hide();
  getSearchVideoPage(id);
  return false;
}
