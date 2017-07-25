$( document ).ready(function() {
    (function () {
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }
        
        function startTime() {
            var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
            d = checkTime(today.getDay());
            month=checkTime(today.getMonth())
            $("#time").html(d+" " +month+" "+h + ":" + m);
            t = setTimeout(function () {
                startTime()
            }, 500);
        }
        startTime();
    })();

});