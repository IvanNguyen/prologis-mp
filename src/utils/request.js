import wxPromisify from './wxPromisify';
import { API_DOMAIN } from './constants';
import {
  getLocal,
} from './helper';

const buildRequest = method => (url, data = {}) => wxPromisify({
  method: 'request',
  data: {
    url: `${API_DOMAIN}${url}`,
    data,
    method,
    header: {
      Accept: 'application/json',
      Authorization: `Bearer ${getLocal('token')}`,
    },
  },
}).then((res) => {
  if (res.statusCode === 200 || res.statusCode === 201) {
    return Promise.resolve(res);
  }
  return Promise.reject(res);
});

const request = {
  get: buildRequest('GET'),
  post: buildRequest('POST'),
  put: buildRequest('PUT'),
  delete: buildRequest('DELETE'),
};

export default request;
