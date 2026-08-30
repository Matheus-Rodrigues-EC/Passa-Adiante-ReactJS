export const categoryOptions = [
    { value: 'BOOK', label: 'Livro' },
    { value: 'NOTEBOOK', label: 'Caderno' },
    { value: 'BACKPACK', label: 'Mochila' },
    { value: 'PENCIL', label: 'Lápis' },
    { value: 'PEN', label: 'Caneta' },
    { value: 'ERASER', label: 'Borracha' },
    { value: 'PENCIL_CASE', label: 'Estojo' },
    { value: 'UNIFORM', label: 'Uniforme' },
    { value: 'SHOES', label: 'Calçado' },
    { value: 'SCHOOL_SUPPLIES', label: 'Material Escolar' },
];

export const conditionOptions = [
    { value: 'NEW', label: 'Novo' },
    { value: 'GOOD', label: 'Seminovo' },
    { value: 'FAIR', label: 'Usado' },
];

export const availabilityOptions = [
    { value: 'AVAILABLE', label: 'Disponível' },
    { value: 'DONATED', label: 'Doado' },
];

function labelFor(options, value) {
    return options.find((option) => option.value === value)?.label ?? value;
}

export function categoryLabel(value) {
    return labelFor(categoryOptions, value);
}

export function conditionLabel(value) {
    return labelFor(conditionOptions, value);
}

export function availabilityLabel(value) {
    return labelFor(availabilityOptions, value);
}
