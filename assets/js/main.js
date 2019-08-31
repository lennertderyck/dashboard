function ovStop(StopNumber, Outcome, StopName, StopDirection) {
    var ovResultFrame, ovStopName, ovStopDirection;

    ovResultFrame = document.getElementById('ovResultFrame');
    ovStopName = document.getElementById('ovStopName');
    ovStopDirection = document.getElementById('ovStopDirection');

    ovStopName.innerHTML = StopName;
    ovStopDirection.innerHTML = StopDirection;
    ovResultFrame.setAttribute('src', 'https://www.delijn.be/realtime/' + StopNumber + '/' + Outcome)
    // $('#modalBussen').modal('hide');
    // $('collapseOvResult').collapse('show');
}

var backModalBussen = document.getElementById('backModalBussen');
var ovResultFrame = document.getElementById('ovResultFrame');

backModalBussen.onclick = function() {
    // $('#collapseOvResult').collapse('hide');
    // $('#modalBussen').modal('show');
    $('#carouselOvStops').carousel('prev')
    // ovResultFrame.setAttribute('src', '')
}