$(() => {
  $('body').click((e) => {
    if ($(e.target).hasClass('user') || $(e.target).parent().hasClass('user')) {
      $('.dropdown').toggleClass('is-open');
    } else {
      $('.dropdown').removeClass('is-open');
    }
  });
  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '/servers') {
    $('#servers > a').tooltipster({
      theme: 'tooltipster-discord',
      delay: 0
    });
  }
});