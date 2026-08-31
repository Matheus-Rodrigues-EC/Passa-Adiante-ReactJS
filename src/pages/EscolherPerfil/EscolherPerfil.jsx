import { Link, useNavigate } from 'react-router-dom';
import styles from './EscolherPerfil.module.css';
import logoImgSrc from '../../assets/logo-full.png';
import { DEMO_USER_IDS, setCurrentUserId } from '../../services/currentUser.js';

export default function EscolherPerfil() {
    const navigate = useNavigate();

    const handleEscolherComum = () => {
        setCurrentUserId(DEMO_USER_IDS.COMUM);
        navigate('/user/minhas-solicitacoes');
    };

    const handleEscolherAdmin = () => {
        setCurrentUserId(DEMO_USER_IDS.ADMIN);
        navigate('/app/dashboard');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/">
                    <img src={logoImgSrc} alt="Passe Adiante" className={styles.logoImg} />
                </Link>
            </header>

            <main className={styles.content}>
                <h1 className={styles.title}>Escolha um perfil de acesso</h1>

                <div className={styles.buttonsRow}>
                    <button
                        type="button"
                        className={styles.profileButton}
                        onClick={handleEscolherComum}
                    >
                        Usuário comum
                    </button>
                    <button
                        type="button"
                        className={styles.profileButton}
                        onClick={handleEscolherAdmin}
                    >
                        Usuário admin
                    </button>
                </div>
            </main>
        </div>
    );
}
