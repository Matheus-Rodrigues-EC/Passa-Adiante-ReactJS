import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './PaginaItem.module.css';
import mockItems, { categoriaOptions, estadoOptions, disponivelOptions } from '../../../data/mockItems.js';

const emptyItem = { nome: '', categoria: categoriaOptions[0], estado: estadoOptions[0], disponivel: disponivelOptions[0] };

export default function PaginaItem() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = id !== undefined && id !== 'novo';
    const existingItem = isEditing ? mockItems.find((item) => String(item.id) === id) : null;

    const [form, setForm] = useState(existingItem ?? emptyItem);

    function handleChange(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Dados mockados: sem persistência real ainda, isso é escopo da integração com a API (#43).
        navigate('/app/items');
    }

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>
                {isEditing ? `Editar item: ${existingItem?.nome ?? ''}` : 'Adicionar item'}
            </h2>

            <form className={styles.card} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label htmlFor="item-nome">Nome do item:</label>
                    <input
                        id="item-nome"
                        type="text"
                        value={form.nome}
                        onChange={(event) => handleChange('nome', event.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="item-categoria">Categoria:</label>
                    <select
                        id="item-categoria"
                        value={form.categoria}
                        onChange={(event) => handleChange('categoria', event.target.value)}
                    >
                        {categoriaOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor="item-estado">Estado de conservação:</label>
                    <select
                        id="item-estado"
                        value={form.estado}
                        onChange={(event) => handleChange('estado', event.target.value)}
                    >
                        {estadoOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor="item-disponivel">Disponível:</label>
                    <select
                        id="item-disponivel"
                        value={form.disponivel}
                        onChange={(event) => handleChange('disponivel', event.target.value)}
                    >
                        {disponivelOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.actions}>
                    <button type="button" className={styles.cancelButton} onClick={() => navigate('/app/items')}>
                        Cancelar
                    </button>
                    <button type="submit" className={styles.saveButton}>
                        {isEditing ? 'Salvar alterações' : 'Adicionar item'}
                    </button>
                </div>
            </form>
        </div>
    );
}
