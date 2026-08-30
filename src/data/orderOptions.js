export const statusOptions = [
    { value: 'PENDING', label: 'Pendente' },
    { value: 'APPROVED', label: 'Aprovado' },
    { value: 'COMPLETED', label: 'Concluído' },
    { value: 'CANCELED', label: 'Cancelado' },
];

export function statusLabel(value) {
    return statusOptions.find((option) => option.value === value)?.label ?? value;
}
