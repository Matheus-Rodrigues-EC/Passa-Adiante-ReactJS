import { useState } from 'react';
import styles from './Catalogo.module.css';
import { categoryOptions, categoryLabel, conditionLabel } from '../../../data/itemOptions.js';

const CATEGORY_FILTER_OPTIONS = [{ value: 'TODOS', label: 'Todas' }, ...categoryOptions];

const mockCatalogo = [
    { id: 1, item: 'Kit de Livros Didáticos - 5° Ano (Ensino Fundamental)', doador: 'Ana Souza', localizacao: 'Bairro XX, Caucaia-CE', category: 'BOOK', condition: 'GOOD' },
    { id: 2, item: 'Mochila Escolar Reforçada', doador: 'Carlos Lima', localizacao: 'Bairro YY, Caucaia-CE', category: 'BACKPACK', condition: 'NEW' },
    { id: 3, item: 'Kit de Lápis de Cor 48un.', doador: 'Fernanda Alves', localizacao: 'Bairro ZZ, Caucaia-CE', category: 'PENCIL', condition: 'NEW' },
    { id: 4, item: 'Uniforme Escolar Tamanho M', doador: 'João Pedro', localizacao: 'Bairro XX, Caucaia-CE', category: 'UNIFORM', condition: 'GOOD' },
    { id: 5, item: 'Estojo Escolar', doador: 'Marina Costa', localizacao: 'Bairro YY, Caucaia-CE', category: 'PENCIL_CASE', condition: 'FAIR' },
    { id: 6, item: 'Caderno Universitário 200 folhas', doador: 'Ana Souza', localizacao: 'Bairro XX, Caucaia-CE', category: 'NOTEBOOK', condition: 'NEW' },
];

export default function Catalogo() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('TODOS');
    const [requestedIds, setRequestedIds] = useState([]);

    const filteredCatalogo = mockCatalogo.filter((item) => {
        const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'TODOS' || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    function handleSolicitar(itemId) {
        setRequestedIds((current) => [...current, itemId]);
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Catálogo</h1>

            <div className={styles.filtersRow}>
                <input
                    type="text"
                    placeholder="Buscar por nome do item"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className={styles.searchInput}
                />

                <div className={styles.statusField}>
                    <label htmlFor="category-filter">Categoria</label>
                    <select
                        id="category-filter"
                        value={categoryFilter}
                        onChange={(event) => setCategoryFilter(event.target.value)}
                        className={styles.statusSelect}
                    >
                        {CATEGORY_FILTER_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredCatalogo.length > 0 ? (
                <div className={styles.grid}>
                    {filteredCatalogo.map((item) => {
                        const jaSolicitado = requestedIds.includes(item.id);

                        return (
                            <article key={item.id} className={styles.card}>
                                <div className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <h2 className={styles.cardTitle}>{item.item}</h2>
                                    <p className={styles.cardDonor}>
                                        <strong>Doador:</strong> {item.doador}
                                    </p>
                                    <p className={styles.cardLocation}>
                                        <strong>Localização:</strong> {item.localizacao}
                                    </p>

                                    <div className={styles.badgeRow}>
                                        <span className={styles.badge}>{categoryLabel(item.category)}</span>
                                        <span className={styles.badge}>{conditionLabel(item.condition)}</span>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.primaryButton}
                                        onClick={() => handleSolicitar(item.id)}
                                        disabled={jaSolicitado}
                                    >
                                        {jaSolicitado ? 'Solicitado' : 'Solicitar Item'}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <p className={styles.emptyState}>Nenhum item encontrado.</p>
            )}
        </div>
    );
}
