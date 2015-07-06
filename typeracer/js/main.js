(function () {
    var texts, timer_el, source_text_el, input_text_el, start_time, timer_instance, inp_text,
        state = 'idle',

        initDOM_Elements = function () {
            var random_text;

            timer_el        = document.getElementById('time_r');
            source_text_el  = document.getElementById('source_text');
            input_text_el   = document.getElementById('input_text');

            timer_el.innerHTML = '5';
            random_text = texts[Math.floor(Math.random() * texts.length)]; // fix
//            parseInt(Math.random() * 10) // 0..10
//            parseInt(Math.random() * 30) //0..30  text[29];
            source_text_el.innerHTML = random_text;
        },

        initEvents = function () {
            input_text_el.addEventListener('keypress', function (e) {
                if (e.keyCode === 13) {
                    result();
                }
            });
        },

        Timer = function (func, interval) {
            var timer_handler;

            this.start = function () {
                timer_handler = window.setInterval(func, interval);
            };

            this.stop = function () {
                window.clearInterval(timer_handler);
            };
        },

        result = function () {
            var result_speed, message,
                user_text = input_text_el.value;

            inp_text = source_text_el.innerHTML;
            timer_instance.stop();

            if (inp_text === user_text) {
                result_speed = window.parseInt(
                    user_text.length / ((Date.now() - start_time) / 1000 / 60));
                message = 'Швидкість набору: ' + result_speed + ' зн/хв.';
            } else {
                message = 'Невірно введений текст! Спробуйте знову';
            }

            if (window.confirm(message + '\nСпробувати ще раз?')) {
                window.location.reload();
            }
        },

        timerFunction = function () {
            var new_time,
                previous_time = Number(timer_el.innerHTML);

            if (state === 'prepare') {
                new_time = previous_time - 1;

                timer_el.innerHTML = new_time;

                if (new_time === 0) {
                    state = 'start';
                    start_time = Date.now();
                    setFocus();
                }
            } else if (state === 'start') {
                timer_el.innerHTML = previous_time + 1;
            }
        },

        setFocus = function () {
            input_text_el.disabled = false;
            input_text_el.focus();
        },

        loadTexts = function () {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    texts = JSON.parse(xhr.responseText).data;

                    if (state === 'idle') {
                        init();
                    }
                }
            };

            xhr.open('GET', 'data/texts.json');
            xhr.send();
        },

        init = function () {
            state = 'prepare';
            timer_instance = new Timer(timerFunction, 1000);
            initDOM_Elements();
            initEvents();
            timer_instance.start();
        };

    loadTexts();

    document.addEventListener('DOMContentLoaded', function () {
        if (texts && state === 'idle') {    // use Promise
            init();
        }
    });
}());