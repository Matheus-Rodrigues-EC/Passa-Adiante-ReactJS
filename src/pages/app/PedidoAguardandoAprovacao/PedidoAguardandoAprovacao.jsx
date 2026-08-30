import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PedidoAguardandoAprovacao.module.css';
import { updateOrderStatus } from '../../../services/ordersService.js';
import { statusLabel } from '../../../data/orderOptions.js';

export default function PedidoAguardandoAprovacao({ pedido }) {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const isPending = pedido.status === 'PENDING';

    function handleAprovar() {
        setSaving(true);
        setError(null);
        updateOrderStatus(pedido.id, 'APPROVED')
            .then(() => navigate('/app/pedidos'))
            .catch(() => {
                setError('Não foi possível aprovar o pedido.');
                setSaving(false);
            });
    }

    function handleCancelar() {
        setSaving(true);
        setError(null);
        updateOrderStatus(pedido.id, 'CANCELED')
            .then(() => navigate('/app/pedidos'))
            .catch(() => {
                setError('Não foi possível cancelar o pedido.');
                setSaving(false);
            });
    }

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Pedido: #{pedido.id.slice(0, 8)}</h2>

            {error && <p className={styles.errorMessage}>{error}</p>}

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
                        Solicitante: {pedido.user.name}<br />
                        Email: {pedido.user.email}
                    </p>
                </div>

                <div className={styles.formColumn}>
                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>Item Solicitado:</span>
                        <div className={styles.fieldBox}>{pedido.item.name}</div>
                    </div>

                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>Status:</span>
                        <div className={styles.fieldBox}>{statusLabel(pedido.status)}</div>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.approveButton}
                    onClick={handleAprovar}
                    disabled={!isPending || saving}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Aprovar
                </button>
                <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleCancelar}
                    disabled={!isPending || saving}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
                    </svg>
                    Cancelar
                </button>
                <button type="button" className={styles.completeButton} disabled>
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
