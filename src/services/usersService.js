import api from './api.js';

export function listUsers() {
    return api.get('/user/list').then((response) => response.data);
}
