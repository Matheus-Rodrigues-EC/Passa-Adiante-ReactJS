import api from './api.js';

export function listItems() {
    return api.get('/items/list').then((response) => response.data);
}

export function getItem(id) {
    return api.get(`/items/${id}`).then((response) => response.data);
}

export function createItem(data) {
    return api.post('/items/create', data).then((response) => response.data);
}

export function updateItem(id, data) {
    return api.patch(`/items/${id}`, data).then((response) => response.data);
}

export function deleteItem(id) {
    return api.delete(`/items/${id}`).then((response) => response.data);
}
