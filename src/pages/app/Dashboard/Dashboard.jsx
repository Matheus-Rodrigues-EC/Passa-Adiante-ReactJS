import styles from './Dashboard.module.css';

const stats = [
    { id: 1, value: 120, label: 'Total de Usuários', variant: styles.statCardDark },
    { id: 2, value: 340, label: 'Total de Itens', variant: styles.statCardBlue },
    { id: 3, value: 12, label: 'Pedidos Pendentes', variant: styles.statCardGreen },
    { id: 4, value: 210, label: 'Itens Disponíveis', variant: styles.statCardCyan },
];

const ultimosPedidos = [
    { id: '01', usuario: 'João', item: 'Livro', status: 'Pendente', data: '12/05/25' },
    { id: '02', usuario: 'Maria', item: 'Mochila', status: 'Aprovado', data: '13/05/25' },
    { id: '03', usuario: 'Clara', item: 'Estojo', status: 'Recusado', data: '11/05/25' },
];

export default function Dashboard() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.statsRow}>
                {stats.map((stat) => (
                    <div className={`${styles.statCard} ${stat.variant}`} key={stat.id}>
                        <span className={styles.statValue}>{stat.value}</span>
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
                                <th>ID</th>
                                <th>Usuário</th>
                                <th>Item</th>
                                <th>Status</th>
                                <th>Data</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ultimosPedidos.map((pedido) => (
                                <tr className={styles.tableRow} key={pedido.id}>
                                    <td>{pedido.id}</td>
                                    <td>{pedido.usuario}</td>
                                    <td>{pedido.item}</td>
                                    <td>{pedido.status}</td>
                                    <td>{pedido.data}</td>
                                    <td>
                                        <button className={styles.actionBtn} title="Visualizar">
                                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                                                <circle cx="11" cy="11" r="8" stroke="#374151" strokeWidth="1.5" />
                                                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
