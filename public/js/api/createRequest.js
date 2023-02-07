/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let { url, data, method, callback } = options;
  
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(null, xhr.response);
      }
    };
  
    try {
      if (method === 'GET') {
        url += '?';
        for (let key in data) {
          url += `${key}=${data[key]}&`;
        }
  
        xhr.open('GET', url.slice(0, -1));
        xhr.send();
      } else {
        const formData = new FormData();
        for (let key in data) {
          formData.append(key, data[key]);
        }
  
        xhr.open(method, url);
        xhr.send(formData);
      }
    } catch (error) {
      callback(error);
    }
  };