type Props = {
    cart: {
        id?: number;
        name?: string;
        price: GLfloat;
        quantity: number;
    }[];
    onRemove: (name?: string) => void;
};

function ModalCart({ cart, onRemove }: Props) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <button type="button" className="btn btn-success mb-4 w-100" data-bs-toggle="modal" data-bs-target="#cartModal">
                Ver Carrito
            </button>

            <div className="modal fade" id="cartModal" aria-labelledby="cartModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cartModalLabel">Carrito de Compras</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody id="cartItems">
                                    {cart.map((product, id) => (
                                        <tr className="align-middle" key={id}>
                                            <td>{product.id} {product.name}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.price * product.quantity} €</td>
                                            <td>
                                            <button className="btn btn-sm btn-danger" onClick={() => onRemove(product.name)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                        </tr>
                                    ))}
                                    <tr className="align-middle">
                                        <td className="text-end" colSpan={2}><strong>Total:</strong></td>
                                        <td>{total} €</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Seguir comprando</button>
                            <button type="button" className="btn btn-success">Finalizar compra</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCart