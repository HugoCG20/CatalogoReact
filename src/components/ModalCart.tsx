import { tlf, showPriceModal, showPriceMessage } from "../settings/setting";
import numberFormat from "../utils/helpers";

type Props = {
    cart: {
        id?: number;
        name?: string;
        price: number;
        quantity: number;
    }[];
    onRemove: (name?: string) => void;
};

function ModalCart({ cart, onRemove }: Props) {
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Construir mensaje de WhatsApp
    const pedidoMsg = cart
        .map(
            (item) =>
                `• ${item.name} x ${item.quantity} ${
                    showPriceMessage
                        ? `= ${numberFormat(item.price * item.quantity)}€`
                        : ""
                }
            `
        )
        .join("%0A");
    const msg = `Hola, quiero hacer el siguiente pedido:%0A%0A${pedidoMsg}${
        showPriceMessage ? `%0A%0ATotal: ${numberFormat(total)}€` : ""
    }`;
    console.log(tlf);
    // Número de WhatsApp (cambia por el tuyo, formato internacional sin +)
    const waLink = `https://wa.me/${tlf}?text=${msg}`;

    return (
        <>
            <button
                type="button"
                className="btn btn-success mb-4 w-100"
                data-bs-toggle="modal"
                data-bs-target="#cartModal"
            >
                <i className="bi bi-bag-fill"></i> Ver Carrito{" "}
                {cart.length > 0 ? (
                    <span className="badge text-bg-danger">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                ) : (
                    ""
                )}
            </button>

            <div
                className="modal fade"
                id="cartModal"
                aria-labelledby="cartModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cartModalLabel">
                                Carrito de Pedido
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Cerrar"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        {showPriceModal ?? <th>Precio</th>}
                                    </tr>
                                </thead>
                                <tbody id="cartItems">
                                    {cart.map((product, id) => (
                                        <tr className="align-middle" key={id}>
                                            <td>{product.name}</td>
                                            <td>{product.quantity}</td>
                                            {showPriceModal ?? (
                                                <td>
                                                    {numberFormat(
                                                        product.price *
                                                            product.quantity
                                                    )}{" "}
                                                    €
                                                </td>
                                            )}
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        onRemove(product.name)
                                                    }
                                                >
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {showPriceModal ?? (
                                        <tr className="align-middle">
                                            <td
                                                className="text-end"
                                                colSpan={2}
                                            >
                                                <strong>Total:</strong>
                                            </td>
                                            <td>{numberFormat(total)} €</td>
                                            <td></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Volver
                            </button>
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-success"
                            >
                                Enviar pedido por WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalCart;
