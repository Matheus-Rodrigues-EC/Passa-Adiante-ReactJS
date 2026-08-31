import { useEffect, useState } from 'react';
import styles from './MinhasSolicitacoes.module.css';
import { listOrders, updateOrderStatus } from '../../../services/ordersService.js';
import { getCurrentUserId } from '../../../services/currentUser.js';
import { statusOptions, statusLabel } from '../../../data/orderOptions.js';

const STATUS_FILTER_OPTIONS = [{ value: 'TODAS', label: 'Todas' }, ...statusOptions];

export default function MinhasSolicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savingId, setSavingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('TODAS');

    function fetchSolicitacoes() {
        const currentUserId = getCurrentUserId();

        return listOrders().then((orders) => {
            setSolicitacoes(orders.filter((order) => order.userId === currentUserId));
        });
    }

    useEffect(() => {
        let cancelled = false;

        fetchSolicitacoes()
            .catch(() => {
                if (!cancelled) setError('Não foi possível carregar suas solicitações.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    function handleUpdateStatus(orderId, newStatus) {
        setSavingId(orderId);
        setError(null);
        updateOrderStatus(orderId, newStatus)
            .then(() => fetchSolicitacoes())
            .catch(() => setError('Não foi possível atualizar a solicitação.'))
            .finally(() => setSavingId(null));
    }

    const filteredSolicitacoes = solicitacoes.filter((solicitacao) => {
        const matchesSearch = solicitacao.item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'TODAS' || solicitacao.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Minhas Solicitações</h1>

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
                    <label htmlFor="status-filter">Status da Solicitação</label>
                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        className={styles.statusSelect}
                    >
                        {STATUS_FILTER_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <p className={styles.emptyState}>Carregando...</p>
            ) : filteredSolicitacoes.length > 0 ? (
                <div className={styles.grid}>
                    {filteredSolicitacoes.map((solicitacao) => (
                        <article key={solicitacao.id} className={styles.card}>
                            <div className={styles.cardImage} />
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}>{solicitacao.item.name}</h2>
                                <p className={styles.cardDonor}>
                                    <strong>Doador:</strong> {solicitacao.item.user?.name ?? '—'}
                                </p>

                                <span className={`${styles.badge} ${styles[`badge${solicitacao.status}`]}`}>
                                    {statusLabel(solicitacao.status)}
                                </span>

                                {solicitacao.status === 'PENDING' && (
                                    <button
                                        type="button"
                                        className={styles.cancelButton}
                                        onClick={() => handleUpdateStatus(solicitacao.id, 'CANCELED')}
                                        disabled={savingId === solicitacao.id}
                                    >
                                        Cancelar Pedido
                                    </button>
                                )}
                                {solicitacao.status === 'APPROVED' && (
                                    <button
                                        type="button"
                                        className={styles.confirmButton}
                                        onClick={() => handleUpdateStatus(solicitacao.id, 'COMPLETED')}
                                        disabled={savingId === solicitacao.id}
                                    >
                                        Confirmar Entrega
                                    </button>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p className={styles.emptyState}>Nenhuma solicitação encontrada.</p>
            )}
        </div>
    );
}
