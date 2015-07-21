(function () {  //   окрему область видимості, щоб не забруднювати глобальну
    var DOM_ready_promise, handleResponse,
        URL_PATH    = 'https://www.favbet.com/live/markets/?0.826076822122559',
        xhr         = new XMLHttpRequest();

    // ініціалізуємо Проміс, щоб в майбутньому використовувати його в якості події DCL
    // (не залежимо від поточного стану: відбувся до підписки (then()), чи після)
    DOM_ready_promise = new Promise(function (resolve) {
        // контролюючий код
        document.addEventListener('DOMContentLoaded', resolve);
    });
    // обробити відповідь
    handleResponse = function (data) {
        /////////////////////////// тупий варіант
        // якщо відома точна структура відповіді:
//        var i1, i2, i3, a2, a3, current_outcomes,
//            result_array = [],
//            a1 = data.markets;
//
//        for (i1 = 0; i1 < a1.length; i1++) {
//            a2 = a1[i1].tournaments;
//
//            for (i2 = 0; i2 < a2.length; i2++) {
//                a3 = a2[i2].events;
//
//                for (i3 = 0; i3 < a3.length; i3++) {
//                    current_outcomes = a3[i3].head_market.outcomes;
//
//                    if (current_outcomes && current_outcomes.length) {
//                        result_array = result_array.concat(current_outcomes);
//                    }
//                }
//            }
//        }
        ///////////////////////////////////

        //////////////////////////////// розумний варіант на pure JS
//        var getOutcomes = function (input_value) {
//            var i, l, prop_name, prop_value, result, temp;
//
//            if (Array.isArray(input_value)) { // перевірка масив
//                result = [];
//
//                for (i = 0, l = input_value.length; i < l; i++) {
//                    temp = getOutcomes(input_value[i]);
//
//                    if (Array.isArray(temp)) {  // нам не потрібні undefined повернені значення
//                        result = result.concat(temp);
//                    }
//                }
//            } else if (typeof input_value === 'object') {
//                for (prop_name in input_value) {
//                    prop_value = input_value[prop_name];
//
//                    if (prop_name === 'outcomes') {
//                        result = prop_value;
//                        break;
//                    } else if (typeof prop_value === 'object' && prop_value !== null) {
//                        result = getOutcomes(prop_value);
//                    }
//                }
//            }
//
//            return result;
//        };
//
//        var result_array = getOutcomes(data);
        ////////////////////////

        //////////////////////////////// розумний варіант на pure JS #2
        var getOutcomes = function (input_value) {
            var i, l, prop_name, prop_value, result, temp;

            if (_.isArray(input_value)) { // перевірка масив
                result = [];

                for (i = 0, l = input_value.length; i < l; i++) {
                    temp = getOutcomes(input_value[i]);

                    if (_.isArray(temp)) {  // нам не потрібні undefined повернені значення
                        result = result.concat(temp);
                    }
                }
            } else if (_.isObject(input_value)) {
                for (prop_name in input_value) {
                    prop_value = input_value[prop_name];

                    if (prop_name === 'outcomes') {
                        result = prop_value;
                        break;
                    } else if (_.isObject(prop_value)) {
                        result = getOutcomes(prop_value);
                    }
                }
            }

            return result;
        };

        var result_array = getOutcomes(data);
        ////////////////////////

//        var getOutcomes = function (input_value) {
//            return _.reduce(input_value, function (result, value, key) {
//                if (_.isObject(value) && key === 'outcomes') {
//                    return result.concat(value);
//                }
//
//                if (_.isObject(value) || _.isArray(value)) {
//                    return getOutcomes(value);
//                }
//            }, []);
//        };
//
//        var result_array = getOutcomes(data);

        // приклад навіщо нам потрібен Проміс:
        // при умові що DCL вже відбувся (до того, як прийшла відповідь), наш слухач
        // ніколи не виконається (і в результаті ми не побачимо дані в HTML'i)
//            document.addEventListener('DOMContentLoaded', function () {
//                document.getElementById('output').innerHTML = JSON.stringify(data);
//            });

        DOM_ready_promise
            .then(  // метод для підписки слухачів (аля addEventListener)
                function () {   // слухач
                    document.getElementById('output').innerHTML = JSON.stringify(result_array);
                }
        );
    };

    // ініціалізуємо XMLHttpRequest
    xhr.open('GET', URL_PATH/*, true - асинхронно по замовчанню*/);

    // підписуємо слухача на зміну стана XHR
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // при вищеописаних умовах xhr містить властивість response
            handleResponse(JSON.parse(xhr.response));
        }
    });

//    xhr.response; // undefined
//
//    setTimeout(function () {
//        xhr.response; // undefined || ДАНІ
//    }, 5000);

    xhr.send();
}());