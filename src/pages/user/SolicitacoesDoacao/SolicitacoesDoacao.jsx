import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './SolicitacoesDoacao.module.css';
import { getItem } from '../../../services/itemsService.js';
import { listOrders, updateOrderStatus } from '../../../services/ordersService.js';
import { statusLabel } from '../../../data/orderOptions.js';

export default function SolicitacoesDoacao() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [item, setItem] = useState(null);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savingId, setSavingId] = useState(null);

    function fetchSolicitacoes() {
        return Promise.all([getItem(id), listOrders()]).then(([itemData, orders]) => {
            setItem(itemData);
            setSolicitacoes(orders.filter((order) => order.item.id === id));
        });
    }

    useEffect(() => {
        let cancelled = false;

        fetchSolicitacoes()
            .catch(() => {
                if (!cancelled) setError('Não foi possível carregar as solicitações deste item.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    function handleUpdateStatus(orderId, newStatus) {
        setSavingId(orderId);
        setError(null);
        updateOrderStatus(orderId, newStatus)
            .then(() => fetchSolicitacoes())
            .catch(() => setError('Não foi possível atualizar a solicitação.'))
            .finally(() => setSavingId(null));
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
            <button type="button" className={styles.backLink} onClick={() => navigate('/user/minhas-doacoes')}>
                &larr; Voltar para Minhas Doações
            </button>

            <h1 className={styles.pageTitle}>Solicitações — {item?.name}</h1>

            {error && <p className={styles.errorMessage}>{error}</p>}

            {solicitacoes.length > 0 ? (
                <div className={styles.grid}>
                    {solicitacoes.map((solicitacao) => (
                        <article key={solicitacao.id} className={styles.card}>
                            <p className={styles.cardSolicitante}>
                                <strong>Solicitante:</strong> {solicitacao.user.name}
                            </p>
                            <p className={styles.cardEmail}>{solicitacao.user.email}</p>

                            <span className={`${styles.badge} ${styles[`badge${solicitacao.status}`]}`}>
                                {statusLabel(solicitacao.status)}
                            </span>

                            {solicitacao.status === 'PENDING' && (
                                <div className={styles.actions}>
                                    <button
                                        type="button"
                                        className={styles.approveButton}
                                        onClick={() => handleUpdateStatus(solicitacao.id, 'APPROVED')}
                                        disabled={savingId === solicitacao.id}
                                    >
                                        Aprovar
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.rejectButton}
                                        onClick={() => handleUpdateStatus(solicitacao.id, 'CANCELED')}
                                        disabled={savingId === solicitacao.id}
                                    >
                                        Recusar
                                    </button>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            ) : (
                <p className={styles.emptyState}>Nenhuma solicitação para este item ainda.</p>
            )}
        </div>
    );
}
