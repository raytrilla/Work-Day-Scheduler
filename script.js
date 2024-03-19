$(document).ready(function() {

    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  

    function generateTimeBlocks() {
      var container = $('.container');
      var currentTime = dayjs().hour();
      
      for (var i = 9; i <= 17; i++) {
        var timeBlock = $('<div>').addClass('time-block row');
        var timeCol = $('<div>').addClass('hour col-1').text(dayjs().hour(i).format('hA'));
        var eventCol = $('<textarea>').addClass('description col-10');
  
        if (i < currentTime) {
          timeBlock.addClass('past');
        } else if (i === currentTime) {
          timeBlock.addClass('present');
        } else {
          timeBlock.addClass('future');
        }
  
        var saveBtn = $('<button>').addClass('saveBtn col-1').html('<i class="fas fa-save"></i>');
  
        timeBlock.append(timeCol, eventCol, saveBtn);
        container.append(timeBlock);
      }
    }
  
    generateTimeBlocks();


  $('.description').each(function() {
    var hour = $(this).siblings('.hour').text();
    var savedEvent = localStorage.getItem(hour);
    if (savedEvent) {
      $(this).val(savedEvent);
    }
  });


  $('.saveBtn').on('click', function() {
    var eventText = $(this).siblings('.description').val();
    var hour = $(this).siblings('.hour').text();
    localStorage.setItem(hour, eventText);
  });


  $('#clearScheduleBtn').on('click', function() {
    $('.description').val('');
    localStorage.clear();
  });
});
  