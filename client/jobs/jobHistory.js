
Template.jobHistory.events({
  'click #checkInBtn' : function(e) {
    e.preventDefault();
    Router.go('/jobCheckIn/'+this._id);
  },
  'click #finishBtn' : function(e) {
    e.preventDefault();
    result = Jobs.update({_id: this._id}, {
      $set: {finishDate: new Date()}
    });
  },
  'click .jobLink' : function(e) {
    e.preventDefault();
    Router.go('/jobEdit/'+this.job._id);
  },
  'click .checkInLink' : function(e) {
    e.preventDefault();
    Router.go('/checkInEdit/'+this._id);
  },
  'click a.thumbnail' : function(e) {
    e.preventDefault();
    loadGallery(true, 'a.thumbnail');
  },
  'click #checkOutBtn' : function(e) {
    e.preventDefault();
    var checkIn = JobCheckIns.findOne({job_id: this._id}, {sort:{checkOutTime:1}},{limit:1});
    result = JobCheckIns.update({_id: checkIn._id}, {
      $set:
      {
        checkOutTime: new Date(),
        systemCheckOutTime: new Date()
      }
    });
  }
});

Template.jobHistory.helpers({
  loadTimePlusTravelTime: function(checkInId){
    var checkIn = JobCheckIns.findOne({_id: checkInId});
    return Number(checkIn.loadTime) + Number(checkIn.travelTime);
  }
});

//This function disables buttons when needed
function disableButtons(counter_max, counter_current){
  $('#show-previous-image, #show-next-image').show();
  if(counter_max == counter_current){
    $('#show-next-image').hide();
  } else if (counter_current == 1){
    $('#show-previous-image').hide();
  }
}


/**
 *
 * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
 * @param setClickAttr  Sets the attribute for the click handler.
 */

function loadGallery(setIDs, setClickAttr){
  var current_image,
      selector,
      counter = 0;

  $('#show-next-image, #show-previous-image').click(function(){
    if($(this).attr('id') == 'show-previous-image'){
      current_image--;
    } else {
      current_image++;
    }

    selector = $('[data-image-id="' + current_image + '"]');
    updateGallery(selector);
  });

  function updateGallery(selector) {
    var $sel = selector;
    current_image = $sel.data('image-id');
    $('#image-gallery-caption').text($sel.data('caption'));
    $('#image-gallery-title').text($sel.data('title'));
    $('#image-gallery-image').attr('src', $sel.data('image'));
    disableButtons(counter, $sel.data('image-id'));
    $("#image-gallery").modal("show");
  }

  if(setIDs == true){
    $('[data-image-id]').each(function(){
      counter++;
      $(this).attr('data-image-id',counter);
    });
  }
  $(setClickAttr).on('click',function(){
    updateGallery($(this));
  });
}


