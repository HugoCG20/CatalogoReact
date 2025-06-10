import { showPriceCatalog } from "../settings/setting";

type Props = {
    //id: number;
    name?: string;
    image?: string;
    price: number | string;
    onAdd: () => void;
};

function Card({
    // id,
    name,
    image,
    price,
    onAdd,
}: Props) {
    return (
        <div className="card h-100 shadow">
            <img src={image} className="card-img-top" alt={name} />
            <div className="card-body text-center">
                <h5 className="card-title">{name}</h5>
                {showPriceCatalog ? (
                    <p className="card-text">{price} €</p>
                ) : (
                    <div className="mt-4"></div>
                )}
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onAdd}
                >
                    Añadir pedido
                </button>
            </div>
        </div>
    );
}

export default Card;
