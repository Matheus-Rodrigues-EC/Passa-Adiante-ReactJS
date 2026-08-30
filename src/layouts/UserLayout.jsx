import { Outlet, Link } from 'react-router-dom';
import styles from './UserLayout.module.css';
import logoImgSrc from '../assets/logo-full.png';
import avatarImgSrc from '../assets/avatar.png';

export function UserLayout() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logoArea}>
                    <img src={logoImgSrc} alt="Passe Adiante" className={styles.logoImg} />
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.userText}>
                        <span className={styles.userName}>Maria</span>
                        <span className={styles.userRole}>Receptora</span>
                    </div>
                    <img src={avatarImgSrc} alt="Avatar do usuário" className={styles.userAvatarImg} />
                </div>
            </header>

            <div className={styles.layoutBody}>
                <aside className={styles.sidebar}>
                    <nav className={styles.nav}>
                        <Link to="/user/minhas-solicitacoes" className={styles.navLink}>
                            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M9 17V9M12 17V5M15 17v-4" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                            </svg>
                            Minhas Solicitações
                        </Link>
                        <Link to="/user/minhas-doacoes" className={styles.navLink}>
                            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M12 21C12 21 4 15.5 4 9.5C4 6.46 6.46 4 9.5 4C11.24 4 12.76 4.81 12.76 4.81C12.76 4.81 14.24 4.81 15 4.81C18.04 4.81 19.5 6.46 19.5 9.5C19.5 15.5 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Minhas Doações
                        </Link>
                        <Link to="/user/catalogo" className={styles.navLink}>
                            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Catálogo
                        </Link>
                    </nav>

                    <div>
                        <Link to="/" className={styles.logoutLink}>
                            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M5.75 9.75L14.75 9.75M12.75 11.75L14.75 9.75L12.75 7.75M10.75 13.75L10.75 16.75C10.75 17.8546 9.85457 18.75 8.75 18.75L2.75 18.75C1.64543 18.75 0.75 17.8546 0.75 16.75L0.750001 2.75C0.750001 1.64543 1.64543 0.75 2.75 0.75L8.75 0.75C9.85457 0.75 10.75 1.64543 10.75 2.75L10.75 5.75" strokeLinecap="round" />
                            </svg>
                            Sair
                        </Link>
                    </div>
                </aside>

                <main className={styles.pageContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
