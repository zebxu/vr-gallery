function refreshMovies() {
  $('.movie-group').empty();
  getMovies(1);
}

function getMovies(page) {
  var api_page = page - 1;
  api_url = end_point + api_page + `?c=21&limit=10&o=${query_o}`;
  console.log('request to ' + api_url);
  axios
    .get(api_url)
    .then(res => {
      let movies = res.data.response.videos;
      total_page = Math.floor(res.data.response.total_videos / 10) + 1;
      $.each(movies, (index, movie) => {
        let output = `
          <div class="movie-card shadow bg-light">
            <img src="${movie.preview_url}" onclick="changePath('movie/'+${
          movie.vid
        })">
            <video class="preview-video" loop autoplay onclick="changePath('movie/'+${
              movie.vid
            })">
              <source src="${movie.preview_video_url}" type="video/mp4">
            </video>
            <a href="#${movie.vid}" onclick="return changePath('movie/'+${
          movie.vid
        })">${movie.title}</a>
          </div>
        `;
        $('.movie-group').append(output);
        // $('video')[index].play();
      });
      hasMore = res.data.response.has_more;
      renderPagination(page); // from pagination.js
      getActivePageNum(page); // from pagination.js
      getActiveTab();
    })
    .then(() => {
      scrollToSavedPos();
    })
    .catch(error => {
      console.log(error);
    });
}

function getActiveTab() {
  $('li.nav-item.active').toggleClass('active');
  $(`.nav-link[id*="${query_o}"]`)
    .parent()
    .toggleClass('active');
}
