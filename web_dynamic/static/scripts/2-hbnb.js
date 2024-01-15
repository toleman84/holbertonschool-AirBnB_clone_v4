$(document).ready(function() {
  // Create a dictionary to store the selected amenity IDs.
  var selectedAmenities = {};

  // Request the status of the API.
  $.get('http://0.0.0.0:5001/api/v1/status/:', function(response) {
    // If the status is "OK", add the class available to the div#api_status.
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      // Otherwise, remove the class available from the div#api_status.
      $('#api_status').removeClass('available');
    }
  });

  // Listen for changes on each input checkbox tag.
  $('input[type="checkbox"]').change(function() {
    // Get the amenity ID and name from the input tag.
    var amenityId = $(this).attr('data-id');
    var amenityName = $(this).attr('data-name');

    // If the checkbox is checked, add the amenity ID to the dictionary.
    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      // If the checkbox is unchecked, remove the amenity ID from the dictionary.
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag inside the div Amenities with the list of selected amenities.
    var amenityList = '';
    for (var amenityId in selectedAmenities) {
      amenityList += amenityList ? ', ' : '';
      amenityList += selectedAmenities[amenityId];
    }
    $('#Amenities h4').text(amenityList);
  });
});
