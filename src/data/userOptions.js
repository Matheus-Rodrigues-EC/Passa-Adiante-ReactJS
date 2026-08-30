export const typeOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'DONOR', label: 'Doador' },
    { value: 'RECEIVER', label: 'Receptor' },
    { value: 'INSTITUTION', label: 'Instituição' },
];

export function typeLabel(value) {
    return typeOptions.find((option) => option.value === value)?.label ?? value;
}
