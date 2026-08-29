import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PaginaUsuario.module.css';

const mockUsuarios = [
    { id: '1', nome: 'Jorge Augusto', email: 'jaug.braga@gmail.com', role: 'User' },
    { id: '2', nome: 'Lara Santana', email: 'laurinha23@hotmail.com', role: 'User' },
    { id: '3', nome: 'Marcelo Antônio', email: 'marquinhosilva@gmail.com', role: 'User' },
    { id: '4', nome: 'Lucas Vieira', email: 'luvi@yahoo.com.br', role: 'User' },
    { id: '5', nome: 'Ana Maria Moura', email: 'ana.mounra@passeadiante.com', role: 'ADMIN' },
    { id: '6', nome: 'Maria Aparecida Lima', email: 'mapa_lima@gmail.com', role: 'User' },
    { id: '7', nome: 'Julio Antonio Arara', email: 'ju_arara@yahoo.com.br', role: 'User' },
    { id: '8', nome: 'Laura Maria das Neves', email: 'laura.neves@passeadiante.com', role: 'ADMIN' },
    { id: '9', nome: 'Laura Maria das Neves', email: 'laura.neves@passeadiante.com', role: 'User' },
];

export default function PaginaUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        role: 'USER',
    });

    useEffect(() => {
        const usuarioEncontrado = mockUsuarios.find(u => u.id === id);
        if (usuarioEncontrado) {
            setUsuario(usuarioEncontrado);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Salvando alterações do usuário ID:', id, usuario);
        navigate('/app/usuarios');
    };

    const handleDelete = () => {
        console.log('Excluir usuário ID:', id);
        navigate('/app/usuarios');
    };

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Página de Usuário</h2>

            <div className={styles.card}>
                <form onSubmit={handleSave} className={styles.formContent}>
                    <div className={styles.leftColumn}>
                        <div className={styles.imagePlaceholder}>
                            <svg className={styles.imagePlaceholderIcon} viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <button type="button" className={styles.editAvatarBtn} title="Editar foto">
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                                    <path d="M12 20h9" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Nome:</label>
                            <input
                                type="text"
                                name="nome"
                                value={usuario.nome}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={usuario.email}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Role:</label>
                            <div className={styles.selectWrapper}>
                                <select
                                    name="role"
                                    value={usuario.role}
                                    onChange={handleChange}
                                    className={styles.select}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                                <svg className={styles.selectArrow} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                                    <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </form>

                <div className={styles.actionsFooter}>
                    <button type="button" onClick={handleDelete} className={styles.deleteButton}>
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                            <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Excluir Usuário
                    </button>
                    <button type="button" onClick={handleSave} className={styles.saveButton}>
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="17 21 17 13 7 13 7 21" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="7 3 7 8 15 8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
}