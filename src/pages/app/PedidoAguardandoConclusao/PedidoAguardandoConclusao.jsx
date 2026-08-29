import { useNavigate } from 'react-router-dom';
import styles from './PedidoAguardandoConclusao.module.css';

export default function PedidoAguardandoConclusao({ pedido }) {
    const navigate = useNavigate();

    function handleConcluir() {
        // Sem persistência real ainda, isso é escopo da integração com a API (#44).
        navigate('/app/pedidos');
    }

    function handleCancelar() {
        navigate('/app/pedidos');
    }

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Pedido: #{pedido.id}</h2>

            <div className={styles.content}>
                <div className={styles.mediaColumn}>
                    <div className={styles.imagePlaceholder}>
                        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none">
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6b7280" />
                            <circle cx="8.5" cy="8.5" r="1.5" stroke="#6b7280" />
                            <path d="M21 15l-5-5L5 21" stroke="#6b7280" />
                        </svg>
                    </div>
                    <p className={styles.solicitanteInfo}>
                        Solicitante: {pedido.usuario}<br />
                        Email: {pedido.email}
                    </p>
                </div>

                <div className={styles.formColumn}>
                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>Item Solicitado:</span>
                        <div className={styles.fieldBox}>{pedido.item}</div>
                    </div>

                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>Status:</span>
                        <div className={styles.fieldBox}>{pedido.status}</div>
                    </div>

                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>Data:</span>
                        <div className={`${styles.fieldBox} ${styles.fieldBoxDisabled}`}>{pedido.data}</div>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button type="button" className={styles.approveButton} disabled>
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Aprovar
                </button>
                <button type="button" className={styles.cancelButton} onClick={handleCancelar}>
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
                    </svg>
                    Cancelar
                </button>
                <button type="button" className={styles.completeButton} onClick={handleConcluir}>
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M2 13l4 4L14 9" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 13l4 4L22 9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Concluir
                </button>
            </div>
        </div>
    );
}
