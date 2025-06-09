type Props = {
    // id: number;
    name?: string;
    image?: string;
    price: number | string;
};

function Card({
    // id,
    name,
    image,
    price,
}: Props) {
    return (
        <div className="card h-100 shadow">
            <img src={image} className="card-img-top" alt={name} />
            <div className="card-body text-center">
                <h5 className="card-title">
                    {name}
                    {/* <strong>ID:{id}</strong> */}
                </h5>
                <p className="card-text">{price} €</p>
                <button type="button" className="btn btn-primary">
                    Añadir pedido
                </button>
            </div>
        </div>
    );
}

export default Card;
