import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditarDoacao.module.css';
import { categoryOptions, conditionOptions, availabilityOptions } from '../../../data/itemOptions.js';
import { getItem, updateItem } from '../../../services/itemsService.js';

const emptyForm = {
    name: '',
    description: '',
    category: categoryOptions[0].value,
    condition: conditionOptions[0].value,
    availability: availabilityOptions[0].value,
};

export default function EditarDoacao() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        getItem(id)
            .then((data) => {
                if (!cancelled) {
                    setForm({
                        name: data.name,
                        description: data.description ?? '',
                        category: data.category,
                        condition: data.condition,
                        availability: data.availability,
                    });
                }
            })
            .catch(() => {
                if (!cancelled) setError('Não foi possível carregar o item.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    function handleChange(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setError(null);

        updateItem(id, { ...form, description: form.description || undefined })
            .then(() => navigate('/user/minhas-doacoes'))
            .catch(() => {
                setError('Não foi possível salvar as alterações. Confira os campos e tente novamente.');
                setSaving(false);
            });
    }

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Editar item</h2>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <form className={styles.card} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label htmlFor="item-nome">Nome do item:</label>
                    <input
                        id="item-nome"
                        type="text"
                        value={form.name}
                        onChange={(event) => handleChange('name', event.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="item-descricao">Descrição:</label>
                    <input
                        id="item-descricao"
                        type="text"
                        value={form.description}
                        onChange={(event) => handleChange('description', event.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="item-categoria">Categoria:</label>
                    <select
                        id="item-categoria"
                        value={form.category}
                        onChange={(event) => handleChange('category', event.target.value)}
                    >
                        {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor="item-estado">Estado de conservação:</label>
                    <select
                        id="item-estado"
                        value={form.condition}
                        onChange={(event) => handleChange('condition', event.target.value)}
                    >
                        {conditionOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor="item-disponivel">Disponibilidade:</label>
                    <select
                        id="item-disponivel"
                        value={form.availability}
                        onChange={(event) => handleChange('availability', event.target.value)}
                    >
                        {availabilityOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.actions}>
                    <button type="button" className={styles.cancelButton} onClick={() => navigate('/user/minhas-doacoes')}>
                        Cancelar
                    </button>
                    <button type="submit" className={styles.saveButton} disabled={saving}>
                        {saving ? 'Salvando...' : 'Salvar alterações'}
                    </button>
                </div>
            </form>
        </div>
    );
}
