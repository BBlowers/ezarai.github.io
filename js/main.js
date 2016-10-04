$(function() {
  $('.project-nav-button').on('click', function() {
    $('.shown-project').addClass('hidden-project').removeClass('shown-project');
    $('#project-container').find('#' + $(this).attr('data-related-project')).removeClass('hidden-project').addClass('shown-project');
    $('.active-project').removeClass('active-project');
    $(this).addClass('active-project');
  })
});