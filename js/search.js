function search(query, page) {
  $('.search-result').empty();
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
    renderSearchPagination(page);
    getActivePageNum(page);
  });
}

function gotoSearchPage(q, p) {
  console.log('gotoSearchPage() ' + p);
  $('.search-result').empty();
  search(q, p);
  return false;
}
