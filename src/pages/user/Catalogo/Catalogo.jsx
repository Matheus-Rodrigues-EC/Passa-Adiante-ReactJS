import { useEffect, useState } from 'react';
import styles from './Catalogo.module.css';
import { listItems } from '../../../services/itemsService.js';
import { createOrder } from '../../../services/ordersService.js';
import { getCurrentUserId } from '../../../services/currentUser.js';
import { categoryOptions, categoryLabel, conditionLabel } from '../../../data/itemOptions.js';

const CATEGORY_FILTER_OPTIONS = [{ value: 'TODOS', label: 'Todas' }, ...categoryOptions];

export default function Catalogo() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requestingId, setRequestingId] = useState(null);
    const [requestedIds, setRequestedIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('TODOS');

    useEffect(() => {
        let cancelled = false;
        const currentUserId = getCurrentUserId();

        listItems()
            .then((data) => {
                if (!cancelled) {
                    setItems(data.filter((item) => item.availability === 'AVAILABLE' && item.userId !== currentUserId));
                }
            })
            .catch(() => {
                if (!cancelled) setError('Não foi possível carregar o catálogo.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'TODOS' || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    function handleSolicitar(itemId) {
        setRequestingId(itemId);
        setError(null);
        createOrder({ userId: getCurrentUserId(), itemId, status: 'PENDING' })
            .then(() => setRequestedIds((current) => [...current, itemId]))
            .catch(() => setError('Não foi possível solicitar o item.'))
            .finally(() => setRequestingId(null));
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Catálogo</h1>

            {error && <p className={styles.errorMessage}>{error}</p>}

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

            {loading ? (
                <p className={styles.emptyState}>Carregando...</p>
            ) : filteredItems.length > 0 ? (
                <div className={styles.grid}>
                    {filteredItems.map((item) => {
                        const jaSolicitado = requestedIds.includes(item.id);

                        return (
                            <article key={item.id} className={styles.card}>
                                <div className={styles.cardImage} />
                                <div className={styles.cardContent}>
                                    <h2 className={styles.cardTitle}>{item.name}</h2>
                                    <p className={styles.cardDonor}>
                                        <strong>Doador:</strong> {item.user?.name ?? '—'}
                                    </p>

                                    <div className={styles.badgeRow}>
                                        <span className={styles.badge}>{categoryLabel(item.category)}</span>
                                        <span className={styles.badge}>{conditionLabel(item.condition)}</span>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.primaryButton}
                                        onClick={() => handleSolicitar(item.id)}
                                        disabled={jaSolicitado || requestingId === item.id}
                                    >
                                        {jaSolicitado ? 'Solicitado' : requestingId === item.id ? 'Solicitando...' : 'Solicitar Item'}
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
