import { useState } from 'react';
import styles from './ListagemUsuarios.module.css';
import { useNavigate } from 'react-router-dom';

const mockUsuarios = [
    { id: 1, nome: 'Jorge Augusto', email: 'jaug.braga@gmail.com', role: 'User' },
    { id: 2, nome: 'Lara Santana', email: 'laurinha23@hotmail.com', role: 'User' },
    { id: 3, nome: 'Marcelo Antônio', email: 'marquinhosilva@gmail.com', role: 'User' },
    { id: 4, nome: 'Lucas Vieira', email: 'luvi@yahoo.com.br', role: 'User' },
    { id: 5, nome: 'Ana Maria Moura', email: 'ana.mounra@passeadiante.com', role: 'ADMIN' },
    { id: 6, nome: 'Maria Aparecida Lima', email: 'mapa_lima@gmail.com', role: 'User' },
    { id: 7, nome: 'Julio Antonio Arara', email: 'ju_arara@yahoo.com.br', role: 'User' },
    { id: 8, nome: 'Laura Maria das Neves', email: 'laura.neves@passeadiante.com', role: 'ADMIN' },
    { id: 9, nome: 'Laura Maria das Neves', email: 'laura.neves@passeadiante.com', role: 'User' },
];

const USERS_PER_PAGE = 5;

export default function ListagemUsuarios() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredUsuarios = mockUsuarios.filter(user =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsuarios.length / USERS_PER_PAGE) || 1;
    const validCurrentPage = Math.min(currentPage, totalPages);

    const startIndex = (validCurrentPage - 1) * USERS_PER_PAGE;
    const currentUsuarios = filteredUsuarios.slice(startIndex, startIndex + USERS_PER_PAGE);

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
                <h2 className={styles.pageTitle}>Listagem de Usuários</h2>
            </div>

            <div className={styles.filterRow}>
                <div className={styles.searchContainer}>
                    <svg className={styles.searchIcon} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                        <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="1.5" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar por nome do usuário"
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
                                    E-mail <span className={styles.sortIcon}>↕</span>
                                </th>
                                <th>
                                    Role <span className={styles.sortIcon}>↕</span>
                                </th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsuarios.length > 0 ? (
                                currentUsuarios.map((user) => (
                                    <tr key={user.id} className={styles.tableRow}>
                                        <td>{user.nome}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button
                                                className={styles.actionBtn}
                                                title="Visualizar"
                                                onClick={() => navigate(`/app/usuarios/${user.id}`)}
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
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                                        Nenhum usuário encontrado.
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