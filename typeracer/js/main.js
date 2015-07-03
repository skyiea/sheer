function timer () {
   var time = document.getElementById('time_r');
    time.innerHTML--;

    if(time.innerHTML==0){
        setFocus();
        setTimeout(timer2,1000);
    }
        else {
        setTimeout(timer,1000);
    }
}
setTimeout(timer, 1000);

function setFocus () {
    document.getElementById("inp").focus();
}

function timer2 () {

    var time = document.getElementById('time_r');
    time.innerHTML++;
    var t = setTimeout(timer2, 1000);


    window.captureEvents(Event.KEYPRESS);
    window.onkeypress = pressed;

    function pressed(e) {
        if (e.which == 13) {
            clearTimeout(t);
            result();
        }
    }
}

function result () {
    var rez;
    var inp_text = document.getElementById('text').innerHTML;
    var out_text = document.getElementById('inp').value;
    var tim = document.getElementById('time_r').innerHTML;

    if (inp_text == out_text)
    {
        rez = (out_text.length / parseInt(tim))*60;
        alert('Швидкість набору: ' + rez + ' зн/хв.');
    }
    else {
        alert ('Невірно введений текст! Перезавантажте сторінку і почніть знову');
    }
}








