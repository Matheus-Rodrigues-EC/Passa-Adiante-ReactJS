import { useNavigate } from 'react-router-dom';
import styles from './EscolherPerfil.module.css';
import logoImgSrc from '../../assets/logo-full.png';

export default function EscolherPerfil() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <img src={logoImgSrc} alt="Passe Adiante" className={styles.logoImg} />
            </header>

            <main className={styles.content}>
                <h1 className={styles.title}>Escolha um perfil de acesso</h1>

                <div className={styles.buttonsRow}>
                    <button
                        type="button"
                        className={styles.profileButton}
                        onClick={() => navigate('/user/minhas-solicitacoes')}
                    >
                        Usuário comum
                    </button>
                    <button
                        type="button"
                        className={styles.profileButton}
                        onClick={() => navigate('/app/dashboard')}
                    >
                        Usuário admin
                    </button>
                </div>
            </main>
        </div>
    );
}
