import { Outlet, Link } from 'react-router-dom';
import styles from './AppLayout.module.css';
import logoImgSrc from '../assets/logo-full.png';
import avatarImgSrc from '../assets/avatar.png';

export function AppLayout() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logoArea}>
                    <img src={logoImgSrc} alt="Passe Adiante" className={styles.logoImg} />                </div>
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
                        <Link to="/app/dashboard" className={styles.navLink}>
                            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M10 21H5C3.89543 21 3 20.1046 3 19V12.2969C3 11.7852 3.19615 11.2929 3.54809 10.9215L10.5481 3.53257C11.3369 2.69989 12.663 2.69989 13.4519 3.53257L20.4519 10.9215C20.8038 11.2929 21 11.7852 21 12.2969V19C21 20.1046 20.1046 21 19 21H14M10 21V15.5C10 15.2239 10.2239 15 10.5 15H13.5C13.7761 15 14 15.2239 14 15.5V21M10 21H14" stroke="#1F1F22" stroke-width="1.5" />
                            </svg>
                            Dashboard
                        </Link>
                        <Link to="/app/usuarios" className={styles.navLink}>
                            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M5 20V19C5 15.134 8.13401 12 12 12C15.866 12 19 15.134 19 19V20" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />                            </svg>
                            Usuários
                        </Link>
                        <Link to="/app/items" className={styles.navLink}>
                            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M16 6.27975C16 6.88118 15.7625 7.45883 15.3383 7.88611C14.3619 8.87007 13.415 9.89605 12.4021 10.8443C12.17 11.0585 11.8017 11.0507 11.5795 10.8268L8.6615 7.88611C7.7795 6.99725 7.7795 5.56225 8.6615 4.67339C9.55218 3.77579 11.0032 3.77579 11.8938 4.67339L11.9999 4.78027L12.1059 4.67345C12.533 4.24286 13.1146 4 13.7221 4C14.3297 4 14.9113 4.24284 15.3383 4.67339C15.7625 5.10073 16 5.67835 16 6.27975Z" stroke="#131927" stroke-width="1.5" stroke-linejoin="round" />
                                <path d="M18 20L21.8243 16.1757C21.9368 16.0632 22 15.9106 22 15.7515V10.5C22 9.67157 21.3284 9 20.5 9C19.6716 9 19 9.67157 19 10.5V15" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18 16L18.8581 15.1419C18.949 15.051 19 14.9278 19 14.7994C19 14.6159 18.8963 14.4482 18.7322 14.3661L18.2893 14.1447C17.5194 13.7597 16.5894 13.9106 15.9807 14.5193L15.0858 15.4142C14.7107 15.7893 14.5 16.298 14.5 16.8284V20" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 20L2.17574 16.1757C2.06321 16.0632 2 15.9106 2 15.7515V10.5C2 9.67157 2.67157 9 3.5 9C4.32843 9 5 9.67157 5 10.5V15" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 16L5.14187 15.1419C5.05103 15.051 5 14.9278 5 14.7994C5 14.6159 5.10366 14.4482 5.26776 14.3661L5.71067 14.1447C6.48064 13.7597 7.41059 13.9106 8.01931 14.5193L8.91421 15.4142C9.28929 15.7893 9.5 16.298 9.5 16.8284V20" stroke="#131927" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Doações
                        </Link>
                        <Link to="/app/pedidos" className={styles.navLink}>
                            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M12 22C17.3552 22 21.7272 17.7905 21.9877 12.4999C22.0013 12.2241 21.7761 12 21.5 12H12.5C12.2239 12 12 11.7761 12 11.5V2.5C12 2.22386 11.7759 1.9987 11.5001 2.01228C6.20948 2.27276 2 6.64479 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1F1F22" stroke-width="1.5" />
                                <path d="M21.9846 9.49991C21.7367 5.47997 18.52 2.26332 14.5001 2.01538C14.2245 1.99838 14 2.22386 14 2.5V9.5C14 9.77614 14.2239 10 14.5 10H21.5C21.7761 10 22.0016 9.77553 21.9846 9.49991Z" stroke="#1F1F22" stroke-width="1.5" />                            </svg>
                            Solicitações
                        </Link>
                    </nav>

                    <div>
                        <Link to="/" className={styles.logoutLink}>
                            <svg className={styles.icon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M5.75 9.75L14.75 9.75M12.75 11.75L14.75 9.75L12.75 7.75M10.75 13.75L10.75 16.75C10.75 17.8546 9.85457 18.75 8.75 18.75L2.75 18.75C1.64543 18.75 0.75 17.8546 0.75 16.75L0.750001 2.75C0.750001 1.64543 1.64543 0.75 2.75 0.75L8.75 0.75C9.85457 0.75 10.75 1.64543 10.75 2.75L10.75 5.75" stroke="#1F1F22" stroke-width="1.5" stroke-linecap="round" />
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