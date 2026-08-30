import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ListagemItems.module.css';
import { listItems } from '../../../services/itemsService.js';
import { categoryLabel, conditionLabel, availabilityLabel } from '../../../data/itemOptions.js';

const ITEMS_PER_PAGE = 5;

export default function ListagemItems() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        let cancelled = false;

        listItems()
            .then((data) => {
                if (!cancelled) setItems(data);
            })
            .catch(() => {
                if (!cancelled) setError('Não foi possível carregar os itens.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;

    const validCurrentPage = Math.min(currentPage, totalPages);

    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerRow}>
                <h2 className={styles.pageTitle}>Listagem de Itens</h2>
                <button className={styles.addButton} onClick={() => navigate('/app/items/novo')}>
                    Adicionar item
                </button>
            </div>

            <div className={styles.filterRow}>
                <div className={styles.searchContainer}>
                    <svg className={styles.searchIcon} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="1.5" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar por nome do item"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.card}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th>
                                    Nome <span className={styles.sortIcon}>↕</span>
                                </th>
                                <th>
                                    Categoria <span className={styles.sortIcon}>↕</span>
                                </th>
                                <th>
                                    Estado <span className={styles.sortIcon}>↕</span>
                                </th>
                                <th>
                                    Disponível <span className={styles.sortIcon}>↕</span>
                                </th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                                        Carregando itens...
                                    </td>
                                </tr>
                            ) : currentItems.length > 0 ? (
                                currentItems.map((item) => (
                                    <tr key={item.id} className={styles.tableRow}>
                                        <td>{item.name}</td>
                                        <td>{categoryLabel(item.category)}</td>
                                        <td>{conditionLabel(item.condition)}</td>
                                        <td>{availabilityLabel(item.availability)}</td>
                                        <td>
                                            <button
                                                className={styles.actionBtn}
                                                title="Visualizar"
                                                onClick={() => navigate(`/app/items/${item.id}`)}
                                            >
                                                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="12" cy="12" r="3" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                                        Nenhum item encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            className={styles.pageArrow}
                            onClick={() => handlePageChange(validCurrentPage - 1)}
                            disabled={validCurrentPage === 1}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => {
                            const pageNum = index + 1;
                            return (
                                <button
                                    key={pageNum}
                                    className={`${styles.pageNumber} ${validCurrentPage === pageNum ? styles.active : ''}`}
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            className={styles.pageArrow}
                            onClick={() => handlePageChange(validCurrentPage + 1)}
                            disabled={validCurrentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
