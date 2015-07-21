(function () {
    var DOM_ready_promise,
        JSON_PATH   = 'file.json',
        xhr         = new XMLHttpRequest();

    DOM_ready_promise = new Promise(function (resolve) {
        document.addEventListener('DOMContentLoaded', resolve);
    });

    xhr.open('GET', JSON_PATH);

    xhr.addEventListener('readystatechange', function () {
        var data, arr;

        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.response);
            arr = data.arr;

            DOM_ready_promise.then(function () {
                document.getElementById('output').innerHTML = arr.join(' ');
            });
        }
    });

    xhr.send();
}());