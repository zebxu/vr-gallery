function movieSelected(id) {
  // sessionStorage.setItem('movieId', id);
  scroll = $(window).scrollTop();
  $('nav.pageNav').hide();
  $('.movie-group').hide();
  $('.search-result').hide();
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
  // $('.movie-group').show();
  // $('.movie-info').empty();
  // $('.search-result').empty();
  // $('nav.pageNav').show();
  // $('html').scrollTop(scroll);
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
