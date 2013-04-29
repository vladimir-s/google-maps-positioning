$(function() {
    var map;
    var infoBox = new google.maps.InfoWindow();
    var mapContainer = $('#map');
    mapContainer.width('70%').height(500);

    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(50.5, 30.5),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }

    initialize();

    $.getJSON('data.json', function(data) {
        if (data.length > 0) {
            var list = $('<ul>');
            $.each(data, function(index, city) {
                var item = $('<li>')
                    .on('click', city, showCity)
                    .html(city.city);
                list.append(item);
            });
            $('#cities').html(list);
        }
    });

    function showCity(event) {
        var coords = new google.maps.LatLng(event.data.lat, event.data.lng);
        infoBox.setContent(event.data.city + ' - ' + event.data.desc);
        infoBox.setPosition(coords);
        infoBox.open(map);
        map.setCenter(coords);
    }
});