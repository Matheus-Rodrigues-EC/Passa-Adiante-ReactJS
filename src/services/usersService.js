import api from './api.js';

export function listUsers() {
    return api.get('/user/list').then((response) => response.data);
}

export function getUser(id) {
    return api.get(`/user/${id}`).then((response) => response.data);
}

export function updateUser(id, data) {
    return api.patch(`/user/${id}`, data).then((response) => response.data);
}

export function deleteUser(id) {
    return api.delete(`/user/${id}`).then((response) => response.data);
}
