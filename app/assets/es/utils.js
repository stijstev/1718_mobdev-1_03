export class AJAX {
    static loadTextByPromise(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.onload = function() {
                if (xhr.status == 200) {
                    var data = xhr.response;
                    resolve(data);
                } else {
                    reject(Error('Error state: ' + status));
                }
            };
            xhr.onerror = function() {
                reject(Error('Network Error'));
            };
            xhr.send();
        });    
    }
}