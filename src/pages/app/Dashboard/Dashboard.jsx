import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { listUsers } from '../../../services/usersService.js';
import { listItems } from '../../../services/itemsService.js';
import { listOrders } from '../../../services/ordersService.js';
import { statusLabel } from '../../../data/orderOptions.js';

const ULTIMOS_PEDIDOS_LIMIT = 5;

export default function Dashboard() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        Promise.all([listUsers(), listItems(), listOrders()])
            .then(([usersData, itemsData, ordersData]) => {
                if (!cancelled) {
                    setUsers(usersData);
                    setItems(itemsData);
                    setOrders(ordersData);
                }
            })
            .catch(() => {
                if (!cancelled) setError('Não foi possível carregar os dados do dashboard.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const stats = [
        { id: 1, value: users.length, label: 'Total de Usuários', variant: styles.statCardDark },
        { id: 2, value: items.length, label: 'Total de Itens', variant: styles.statCardBlue },
        { id: 3, value: orders.filter((order) => order.status === 'PENDING').length, label: 'Pedidos Pendentes', variant: styles.statCardGreen },
        { id: 4, value: items.filter((item) => item.availability === 'AVAILABLE').length, label: 'Itens Disponíveis', variant: styles.statCardCyan },
    ];

    // O model Order não tem campo de data (createdAt/updatedAt), então não há como
    // ordenar por "mais recente" de verdade. Mostra os primeiros N pedidos retornados
    // pela API como aproximação.
    const ultimosPedidos = orders.slice(0, ULTIMOS_PEDIDOS_LIMIT);

    return (
        <div className={styles.pageContainer}>
            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.statsRow}>
                {stats.map((stat) => (
                    <div className={`${styles.statCard} ${stat.variant}`} key={stat.id}>
                        <span className={styles.statValue}>{loading ? '—' : stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                ))}
            </div>

            <span className={styles.sectionTitle}>Últimos Pedidos</span>

            <div className={styles.card}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th>Usuário</th>
                                <th>Item</th>
                                <th>Status</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                                        Carregando...
                                    </td>
                                </tr>
                            ) : ultimosPedidos.length > 0 ? (
                                ultimosPedidos.map((pedido) => (
                                    <tr className={styles.tableRow} key={pedido.id}>
                                        <td>{pedido.user.name}</td>
                                        <td>{pedido.item.name}</td>
                                        <td>{statusLabel(pedido.status)}</td>
                                        <td>
                                            <button
                                                className={styles.actionBtn}
                                                title="Visualizar"
                                                onClick={() => navigate(`/app/pedidos/${pedido.id}`)}
                                            >
                                                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                                                    <circle cx="11" cy="11" r="8" stroke="#374151" strokeWidth="1.5" />
                                                    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                                        Nenhum pedido encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
