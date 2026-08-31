import { useState } from 'react';
import styles from './MinhasDoacoes.module.css';
import { availabilityOptions, availabilityLabel } from '../../../data/itemOptions.js';

const AVAILABILITY_FILTER_OPTIONS = [{ value: 'TODOS', label: 'Todos' }, ...availabilityOptions];

const mockDoacoes = [
    { id: 1, item: 'Kit de Livros Didáticos - 5° Ano (Ensino Fundamental)', localizacao: 'Bairro XX, Caucaia-CE', availability: 'AVAILABLE' },
    { id: 2, item: 'Mochila Escolar Reforçada', localizacao: 'Bairro YY, Caucaia-CE', availability: 'AVAILABLE' },
    { id: 3, item: 'Coleção de Livros Didáticos', localizacao: 'Bairro XX, Caucaia-CE', availability: 'DONATED' },
    { id: 4, item: 'Kit de Lápis de Cor 48un.', localizacao: 'Bairro ZZ, Caucaia-CE', availability: 'AVAILABLE' },
    { id: 5, item: 'Estojo Escolar', localizacao: 'Bairro YY, Caucaia-CE', availability: 'DONATED' },
    { id: 6, item: 'Uniforme Escolar Tamanho M', localizacao: 'Bairro XX, Caucaia-CE', availability: 'AVAILABLE' },
];

export default function MinhasDoacoes() {
    const [searchTerm, setSearchTerm] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState('TODOS');

    const filteredDoacoes = mockDoacoes.filter((doacao) => {
        const matchesSearch = doacao.item.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAvailability = availabilityFilter === 'TODOS' || doacao.availability === availabilityFilter;
        return matchesSearch && matchesAvailability;
    });

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Minhas Doações</h1>

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

            {filteredDoacoes.length > 0 ? (
                <div className={styles.grid}>
                    {filteredDoacoes.map((doacao) => (
                        <article key={doacao.id} className={styles.card}>
                            <div className={styles.cardImage} />
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}>{doacao.item}</h2>
                                <p className={styles.cardLocation}>
                                    <strong>Localização:</strong> {doacao.localizacao}
                                </p>

                                <span className={`${styles.badge} ${styles[`badge${doacao.availability}`]}`}>
                                    {availabilityLabel(doacao.availability).toUpperCase()}
                                </span>

                                <button type="button" className={styles.primaryButton}>
                                    Ver Solicitações
                                </button>

                                <div className={styles.secondaryActions}>
                                    <button type="button" className={styles.editButton}>
                                        Editar Item
                                    </button>
                                    <button type="button" className={styles.deleteButton}>
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
