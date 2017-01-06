require('es6-promise').polyfill();
require('isomorphic-fetch');

const TIMEOUT = 25 * 1000;

function createEndpoint(url) {

  let token = null;

  if (process.env.BROWSER) {
    token = sessionStorage.getItem("token");
  }

  const tokenQueryString = token ? `token=${token}` : ""

  return url.indexOf('?') < 0 ? `${url}?${tokenQueryString}` : `${url}&${tokenQueryString}`
}

function timeoutPromise(ms, promise) {
  return new Promise( (resolve, reject) => {
    const timeoutId = setTimeout( () => {
      reject( new Error("timeout") )
    }, ms);

    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    )
  })
}

function callApi(endpoint, params = {}) {

  endpoint = createEndpoint(endpoint)

  if(params.method){
    params.method = params.method.toUpperCase()
  }

  params.body = typeof params.body === 'string' ? params.body : JSON.stringify(params.body)

  params.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  params.credentials = 'include'

  const fetchPromise = timeoutPromise(TIMEOUT, fetch(endpoint, params))
    .then(response => response.json())

  return fetchPromise;
}

export default callApi;
