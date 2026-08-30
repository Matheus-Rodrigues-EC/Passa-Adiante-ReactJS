import { useState } from 'react';
import styles from './MinhasSolicitacoes.module.css';

const STATUS_OPTIONS = ['TODAS', 'PENDENTE', 'APROVADO', 'RECUSADO', 'CONCLUÍDO'];

const mockSolicitacoes = [
    { id: 1, item: 'Kit de Livros Didáticos - 5° Ano (Ensino Fundamental)', doador: 'M. Oliveira', status: 'PENDENTE' },
    { id: 2, item: 'Mochila Escolar Reforçada', doador: 'R. Bezerra', status: 'APROVADO' },
    { id: 3, item: 'Coleção de Livros Didáticos', doador: 'S. Ferreira', status: 'RECUSADO' },
    { id: 4, item: 'Kit de Lápis de Cor 48un.', doador: 'A. Beatriz', status: 'CONCLUÍDO' },
    { id: 5, item: 'Estojo Escolar', doador: 'L. Martins', status: 'PENDENTE' },
];

export default function MinhasSolicitacoes() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('TODAS');

    const filteredSolicitacoes = mockSolicitacoes.filter((solicitacao) => {
        const matchesSearch = solicitacao.item.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'TODAS' || solicitacao.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Minhas Solicitações</h1>

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
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredSolicitacoes.length > 0 ? (
                <div className={styles.grid}>
                    {filteredSolicitacoes.map((solicitacao) => (
                        <article key={solicitacao.id} className={styles.card}>
                            <div className={styles.cardImage} />
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}>{solicitacao.item}</h2>
                                <p className={styles.cardDonor}>
                                    <strong>Doador:</strong> {solicitacao.doador}
                                </p>

                                <span className={`${styles.badge} ${styles[`badge${solicitacao.status.replace('Í', 'I')}`]}`}>
                                    {solicitacao.status}
                                </span>

                                {solicitacao.status === 'PENDENTE' && (
                                    <button type="button" className={styles.cancelButton}>
                                        Cancelar Pedido
                                    </button>
                                )}
                                {solicitacao.status === 'APROVADO' && (
                                    <button type="button" className={styles.confirmButton}>
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
