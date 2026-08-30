import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PaginaItem.module.css';
import { categoryOptions, conditionOptions, availabilityOptions } from '../../../data/itemOptions.js';
import { getItem, createItem, updateItem } from '../../../services/itemsService.js';
import { listUsers } from '../../../services/usersService.js';

const emptyItem = {
    userId: '',
    name: '',
    description: '',
    category: categoryOptions[0].value,
    condition: conditionOptions[0].value,
    availability: availabilityOptions[0].value,
};

export default function PaginaItem() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = id !== undefined && id !== 'novo';

    const [form, setForm] = useState(emptyItem);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        listUsers()
            .then(setUsers)
            .catch(() => setError('Não foi possível carregar a lista de usuários.'));
    }, []);

    useEffect(() => {
        if (!isEditing) return;

        let cancelled = false;
        getItem(id)
            .then((data) => {
                if (!cancelled) {
                    setForm({
                        userId: data.userId,
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
    }, [id, isEditing]);

    function handleChange(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setError(null);

        const payload = { ...form, description: form.description || undefined };
        const request = isEditing ? updateItem(id, payload) : createItem(payload);

        request
            .then(() => navigate('/app/items'))
            .catch(() => setError('Não foi possível salvar o item. Confira os campos e tente novamente.'))
            .finally(() => setSaving(false));
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
            <h2 className={styles.pageTitle}>
                {isEditing ? 'Editar item' : 'Adicionar item'}
            </h2>

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
                    <label htmlFor="item-usuario">Doador:</label>
                    <select
                        id="item-usuario"
                        value={form.userId}
                        onChange={(event) => handleChange('userId', event.target.value)}
                        required
                    >
                        <option value="" disabled>Selecione um usuário</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                        ))}
                    </select>
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
                    <button type="button" className={styles.cancelButton} onClick={() => navigate('/app/items')}>
                        Cancelar
                    </button>
                    <button type="submit" className={styles.saveButton} disabled={saving}>
                        {saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Adicionar item'}
                    </button>
                </div>
            </form>
        </div>
    );
}
