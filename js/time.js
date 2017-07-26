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
            month = today.getMonth()+1;
            $("#time").html(day+" " +month+" "+h + ":" + m);
            t = setTimeout(function () {
                startTime()
            }, 1000);
        }
        startTime();
    })();

});