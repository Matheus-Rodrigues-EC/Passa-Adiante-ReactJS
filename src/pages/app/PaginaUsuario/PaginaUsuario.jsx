import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PaginaUsuario.module.css';
import { getUser, updateUser, deleteUser } from '../../../services/usersService.js';
import { typeOptions } from '../../../data/userOptions.js';

const emptyUsuario = { name: '', email: '', type: typeOptions[0].value, phones: '', address: '' };

export default function PaginaUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(emptyUsuario);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        getUser(id)
            .then((data) => {
                if (!cancelled) {
                    setUsuario({
                        name: data.name ?? '',
                        email: data.email,
                        type: data.type,
                        phones: (data.phones ?? []).join(', '),
                        address: data.address ?? '',
                    });
                }
            })
            .catch(() => {
                if (!cancelled) setError('Não foi possível carregar o usuário.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const payload = {
            name: usuario.name,
            email: usuario.email,
            type: usuario.type,
            phones: usuario.phones.split(',').map((phone) => phone.trim()).filter(Boolean),
            address: usuario.address || undefined,
        };

        updateUser(id, payload)
            .then(() => navigate('/app/usuarios'))
            .catch(() => {
                setError('Não foi possível salvar as alterações.');
                setSaving(false);
            });
    };

    const handleDelete = () => {
        setSaving(true);
        setError(null);
        deleteUser(id)
            .then(() => navigate('/app/usuarios'))
            .catch(() => {
                setError('Não foi possível excluir o usuário.');
                setSaving(false);
            });
    };

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Página de Usuário</h2>

            {error && <p className={styles.errorMessage}>{error}</p>}

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
                                name="name"
                                value={usuario.name}
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
                            <label className={styles.label}>Telefones (separados por vírgula):</label>
                            <input
                                type="text"
                                name="phones"
                                value={usuario.phones}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Endereço:</label>
                            <input
                                type="text"
                                name="address"
                                value={usuario.address}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Tipo:</label>
                            <div className={styles.selectWrapper}>
                                <select
                                    name="type"
                                    value={usuario.type}
                                    onChange={handleChange}
                                    className={styles.select}
                                >
                                    {typeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <svg className={styles.selectArrow} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                                    <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </form>

                <div className={styles.actionsFooter}>
                    <button type="button" onClick={handleDelete} className={styles.deleteButton} disabled={saving}>
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                            <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Excluir Usuário
                    </button>
                    <button type="button" onClick={handleSave} className={styles.saveButton} disabled={saving}>
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="17 21 17 13 7 13 7 21" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="7 3 7 8 15 8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </div>
        </div>
    );
}
