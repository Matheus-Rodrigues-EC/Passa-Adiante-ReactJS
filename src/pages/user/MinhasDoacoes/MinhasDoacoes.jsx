import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MinhasDoacoes.module.css';
import { listItems, deleteItem } from '../../../services/itemsService.js';
import { getCurrentUserId } from '../../../services/currentUser.js';
import { availabilityOptions, availabilityLabel } from '../../../data/itemOptions.js';

const AVAILABILITY_FILTER_OPTIONS = [{ value: 'TODOS', label: 'Todos' }, ...availabilityOptions];

export default function MinhasDoacoes() {
    const navigate = useNavigate();
    const [doacoes, setDoacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState('TODOS');

    function fetchDoacoes() {
        const currentUserId = getCurrentUserId();

        return listItems().then((items) => {
            setDoacoes(items.filter((item) => item.userId === currentUserId));
        });
    }

    useEffect(() => {
        let cancelled = false;

        fetchDoacoes()
            .catch(() => {
                if (!cancelled) setError('Não foi possível carregar suas doações.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    function handleExcluir(item) {
        if (!window.confirm(`Excluir o item "${item.name}"? Essa ação não pode ser desfeita.`)) return;

        setDeletingId(item.id);
        setError(null);
        deleteItem(item.id)
            .then(() => fetchDoacoes())
            .catch(() => setError('Não foi possível excluir o item.'))
            .finally(() => setDeletingId(null));
    }

    const filteredDoacoes = doacoes.filter((doacao) => {
        const matchesSearch = doacao.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAvailability = availabilityFilter === 'TODOS' || doacao.availability === availabilityFilter;
        return matchesSearch && matchesAvailability;
    });

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Minhas Doações</h1>

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
                    <label htmlFor="availability-filter">Disponibilidade</label>
                    <select
                        id="availability-filter"
                        value={availabilityFilter}
                        onChange={(event) => setAvailabilityFilter(event.target.value)}
                        className={styles.statusSelect}
                    >
                        {AVAILABILITY_FILTER_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <p className={styles.emptyState}>Carregando...</p>
            ) : filteredDoacoes.length > 0 ? (
                <div className={styles.grid}>
                    {filteredDoacoes.map((doacao) => (
                        <article key={doacao.id} className={styles.card}>
                            <div className={styles.cardImage} />
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}>{doacao.name}</h2>

                                <span className={`${styles.badge} ${styles[`badge${doacao.availability}`]}`}>
                                    {availabilityLabel(doacao.availability).toUpperCase()}
                                </span>

                                <button
                                    type="button"
                                    className={styles.primaryButton}
                                    onClick={() => navigate(`/user/minhas-doacoes/${doacao.id}/solicitacoes`)}
                                >
                                    Ver Solicitações
                                </button>

                                <div className={styles.secondaryActions}>
                                    <button
                                        type="button"
                                        className={styles.editButton}
                                        onClick={() => navigate(`/user/minhas-doacoes/${doacao.id}/editar`)}
                                    >
                                        Editar Item
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.deleteButton}
                                        onClick={() => handleExcluir(doacao)}
                                        disabled={deletingId === doacao.id}
                                    >
                                        Excluir Item
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p className={styles.emptyState}>Nenhuma doação encontrada.</p>
            )}
        </div>
    );
}
