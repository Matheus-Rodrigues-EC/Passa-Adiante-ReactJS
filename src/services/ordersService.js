import api from './api.js';

export function listOrders() {
    return api.get('/orders/list').then((response) => response.data);
}

export function getOrder(id) {
    return api.get(`/orders/${id}`).then((response) => response.data);
}

export function createOrder(data) {
    return api.post('/orders/create', data).then((response) => response.data);
}

export function updateOrderStatus(id, status) {
    return api.patch(`/orders/${id}`, { status }).then((response) => response.data);
}
