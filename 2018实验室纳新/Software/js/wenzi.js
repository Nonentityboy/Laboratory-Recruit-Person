// This is just to auto-update the data-text if you're editing it directly on the page and is not required for the actual effect
$('[data-text]').on('keyup', function(){
  $(this).attr('data-text', $(this).text());
});