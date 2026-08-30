import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../../services/ordersService.js';
import PedidoAguardandoAprovacao from '../PedidoAguardandoAprovacao/PedidoAguardandoAprovacao.jsx';
import PedidoAguardandoConclusao from '../PedidoAguardandoConclusao/PedidoAguardandoConclusao.jsx';

export default function PedidoDetalhe() {
    const { id } = useParams();
    const [pedido, setPedido] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        getOrder(id)
            .then((data) => {
                if (!cancelled) setPedido(data);
            })
            .catch(() => {
                if (!cancelled) setError('Não foi possível carregar o pedido.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error || !pedido) {
        return <p>{error ?? 'Pedido não encontrado.'}</p>;
    }

    if (pedido.status === 'APPROVED') {
        return <PedidoAguardandoConclusao pedido={pedido} />;
    }

    return <PedidoAguardandoAprovacao pedido={pedido} />;
}
