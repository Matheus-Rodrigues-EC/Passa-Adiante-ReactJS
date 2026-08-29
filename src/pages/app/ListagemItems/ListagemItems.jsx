import { useState } from 'react';
import styles from './ListagemItems.module.css';

const mockItems = [
    { id: 1, nome: 'Livro de Ciências', categoria: 'Livro', estado: 'Usado', disponivel: 'Sim' },
    { id: 2, nome: 'Mochila c/ roda', categoria: 'Acessório', estado: 'Usado', disponivel: 'Não' },
    { id: 3, nome: 'Caderno 10 Mat.', categoria: 'Livro', estado: 'Novo', disponivel: 'Sim' },
    { id: 4, nome: 'Kit de canetas', categoria: 'Acessório', estado: 'Novo', disponivel: 'Não' },
    { id: 5, nome: 'Canetinhas', categoria: 'Acessório', estado: 'Novo', disponivel: 'Sim' },
    { id: 6, nome: 'Dicionário de Inglês', categoria: 'Livro', estado: 'Novo', disponivel: 'Sim' },
    { id: 7, nome: 'Estojo escolar', categoria: 'Acessório', estado: 'Usado', disponivel: 'Sim' },
    { id: 8, nome: 'Calculadora Científica', categoria: 'Eletrônico', estado: 'Novo', disponivel: 'Não' },
    { id: 9, nome: 'Bloco de Notas', categoria: 'Papelaria', estado: 'Novo', disponivel: 'Sim' },
    { id: 10, nome: 'Regua 30cm', categoria: 'Papelaria', estado: 'Usado', disponivel: 'Sim' },
    { id: 11, nome: 'Tesoura escolar', categoria: 'Papelaria', estado: 'Novo', disponivel: 'Não' }
];

const ITEMS_PER_PAGE = 5;

export default function ListagemItems() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = mockItems.filter(item =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
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
                <button className={styles.addButton}>
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
                            {currentItems.length > 0 ? (
                                currentItems.map((item) => (
                                    <tr key={item.id} className={styles.tableRow}>
                                        <td>{item.nome}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.estado}</td>
                                        <td>{item.disponivel}</td>
                                        <td>
                                            <button className={styles.actionBtn} title="Visualizar">
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