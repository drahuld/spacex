import axios from 'axios';

/**
 * API Service call which provides common REST interface
 * to call from respective service modules using Axios API.
 */
const ApiService = {

  /**
   * Inititalization.
   *
   * @param {*} baseURL
   */
  init(baseURL) {
    console.log('******* init axios base *****', baseURL);
    axios.defaults.baseURL = baseURL;
    // this.setHeader();
  },

  /**
   * Set global axios interceptor to handle resonse errors.
   */
  setGlobalExceptionResponseHandler(globalEventBusEmitter) {
    axios.interceptors.response.use(
      (response) => {
        if (response.status === 200 || response.status === 201) {
          console.log('------- setGlobalExceptionResponseHandler : Success 200 -------');
          return Promise.resolve(response);
        }
        console.log('------- setGlobalExceptionResponseHandler : Reject -------');
        return Promise.reject(response);
      },
      (error) => {
        console.log('------- interceptior error response satus 11 ------', error.response.data.message);
        console.log('------- interceptior error response satus 22 ------', error.response.data.trace);
        let errorMsg = '';
        if (error.response.status) {
          switch (error.response.status) {
            case 400:
              errorMsg = 'Server Exception: 400 (Bad Request) - The server could not understand the request due to invalid syntax';
              break;
            case 401:
              errorMsg = 'Server Exception: 401 (Unauthorized) - Some authorization error occurred';
              break;
            case 403:
              errorMsg = 'Server Exception: 403 (Forbidden) - You do not have access rights to the content';
              break;
            case 404:
              errorMsg = 'Server Exception: 404 (Not Found) - The requested resouce does not exist';
              break;
            case 408:
              errorMsg = 'Server Exception: 404 (Request Timeout) - Your request is timeout';
              break;
            case 500:
              errorMsg = 'Server Exception: 500 (Internal Server Error) - Some internal server error occurred';
              break;
            case 501:
              errorMsg = 'Server Exception: 501 (Not Implemented) - The request method is not supported by the server and cannot be handled';
              break;
            case 502:
              errorMsg = 'Server Exception: 502 (Bad Gateway) - Invalid response';
              break;
            case 503:
              errorMsg = 'Server Exception: 503 (Service Unavailable) - The server is not ready to handle the request';
              break;
            case 504:
              errorMsg = 'Server Exception: 504 (Gateway Timeout) - Cannot get a response in time';
              break;
            default: break;
          }
          console.log('Error msg :', errorMsg);
        }
        globalEventBusEmitter.$emit('showSnackBarMsg', { successful: false, message: errorMsg });
        return Promise.reject(error.response);
      },
    );

    axios.interceptors.request.use((request) => request, (error) => Promise.reject(error));
  },

  /**
   * Method to remove header from request.
   */
  removeHeader() {
    axios.defaults.headers.common = {};
  },

  /**
   * Method is used to GET resource through Axios API.
   *
   * @param {*} resource
   */
  get(resource) {
    return axios.get(resource);
  },

  /**
   * Method is used to POST resource through Axios API.
   *
   * @param {*} resource
   * @param {*} data
   */
  post(resource, data) {
    return axios.post(resource, data);
  },

  /**
   * Method is used to PUT resource through Axios API.
   *
   * @param {*} resource
   * @param {*} data
   */
  put(resource, data) {
    return axios.put(resource, data);
  },

  /**
   * Method is used to Delete Resource through Axios API.
   *
   * @param {*} resource
   */
  delete(resource) {
    return axios.delete(resource);
  },

  customRequest(data) {
    console.log('ApiService: custom request call : ', data);
    return axios(data);
  },
};

export default ApiService;
