import { useParams } from 'react-router-dom';
import mockPedidos from '../../../data/mockPedidos.js';
import PedidoAguardandoAprovacao from '../PedidoAguardandoAprovacao/PedidoAguardandoAprovacao.jsx';
import PedidoAguardandoConclusao from '../PedidoAguardandoConclusao/PedidoAguardandoConclusao.jsx';

export default function PedidoDetalhe() {
    const { id } = useParams();
    const pedido = mockPedidos.find((item) => item.id === id);

    if (!pedido) {
        return <p>Pedido não encontrado.</p>;
    }

    if (pedido.status === 'Aprovado') {
        return <PedidoAguardandoConclusao pedido={pedido} />;
    }

    return <PedidoAguardandoAprovacao pedido={pedido} />;
}
