//Author: RGK
//This app works by simply using the HTML5 navigator.geolocation object 
//to retrieve the user's ip based Lat and Long coordinates 
//this data is sent to the google maps api to do a reverse address lookup 
//
//If the user is in one of the cities in foodCities we tell the slack api to join the food channel else we leave it

var foodCities = [
  'Madison, WI'
];

var slackToken = "PASTE SLACK API ID HERE"; //find this at https://api.slack.com/

var channelName = "food";
var channelId = "C024REE5R";


var foodLeave = function(){
    console.log('connected to the internet, determining location...');
    window.navigator.geolocation.getCurrentPosition(function(position) {
        //success handler for getCurrentPosition
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng, function(data){
          var fullAddress = data.results[0].formatted_address;
          console.log(fullAddress);

          var joinFoodChannel = foodCities.some(function(element){
            //if our current address contains one of our acceptable food channel cities
            return (fullAddress.indexOf(element) > -1);
          });

          if(joinFoodChannel){
            $.get('https://slack.com/api/channels.join?token=' + slackToken + '&name=' + channelName + '&pretty=1');
          }
          else{
            $.get('https://slack.com/api/channels.leave?token=' + slackToken + '&channel=' + channelId + '&pretty=1');
          }

        });

    }, function(error) {
        //error handler for getCurrentPosition
        console.log("Geocoder failed");
        console.log(error);
    });
};


//if the user is currently online, run the extension, otherwise wait till they come online
if(window.navigator.onLine){
    foodLeave();
}

window.addEventListener("online", function(){setTimeout(foodLeave, 5000)}); //need to wait like 5 secs after connection is made for good measure