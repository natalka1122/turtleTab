Date.prototype.getMonthText = function() {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[this.getMonth()];
}

$( document ).ready(function() {
    (function () {
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }

        function startTime() {
            var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            day = today.getDate();
            month = today.getMonthText();
            $("#time").html(h + ":" + m);
            $("#date").html(month+", "+day);
            t = setTimeout(function () {
                startTime()
            }, 1000);
        }
        startTime();
    })();

});