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

  function fetchPlaces() {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({}), 
      success:  function(data) {
        displayPlaces(data);
      },
      error: function(error) {
        console.error;
      }
    });
  }

  function displayPlaces(places) {
    var placesSection = $('section-places');
    placesSection.empty();

    for (var i = 0; i < places.length; i++) {
      var place = places[i];

      var article = $('<article>');
      var title = $('<h2>').text(place.name);
      var price = $('<div class="price_by_night">').text('$' + place.price_by_night);
      var description = $('<div class="information"><div class="max_guest">' + place.max_guest + ' Guests</div><div class="number_rooms">' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom</div></div>');
      var user = $('<div class="user"><b>Owner:</b> ' + place.user_id + '</div>');
      
      article.append(title, price, description, user);
      placesSection.append(article);
    }
  }

  fetchPlaces();

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
    $('button').click(function() {
      fetchPlaces();
  });
});
