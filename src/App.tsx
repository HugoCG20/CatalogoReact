import { useState, useEffect } from "react";
import axios from "axios";

// Componentes
import Card from "./components/Card";
import Search from "./components/Search";
import FilterCategory from "./components/FilterCategory";
import ModalCart from "./components/ModalCart";

import type {
    Product,
    ProductCategory,
    Category,
    Data,
} from "./interfaces/product";

const instance = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
        "x-custom-header": "authorized",
    },
});

type CartItem = {
    name?: string;
    price: number;
    quantity: number;
};

function App() {
    const [data, setData] = useState<Data>({
        custom_products: { json_data: [] },
        category_list: {},
        products: [],
    });

    const [categorySelected, setCategory] = useState(17);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        instance
            .get("/api")
            .then((response: { data: Data }) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error: unknown) => {
                console.error("Error al cargar las facturas:", error);
                setLoading(false);
            });
    }, []);

    const handleSelect = (element: number) => {
        setCategory(element);
    };

    const handleSearch = (search: string) => {
        setSearch(search);
    };

    const numberFormat = (num: number) => {
        return new Intl.NumberFormat("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(num) || 0);
    };

    // Función para agregar producto al carrito
    const addToCart = (productId?: number, productName?: string, productPrice?: number) => {
        if (!productName || productPrice == undefined) return;
        setCart((prev) => {
            const exists = prev.find((item) => item.name == productName);
            if (exists) {
                return prev.map((item) =>
                    item.name == productName
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { id: productId, name: productName, price: productPrice, quantity: 1 }];
            }
        });
    };

    // Función para eliminar producto al carrito
    const removeCart = (productName?: string) => {
        if (!productName) return;
        setCart((prev) => prev.filter((item) => item.name != productName));
    };

    const renderProducts = () => {
        return (data.custom_products.json_data as Category[])
            .filter((category: Category) => category.path === categorySelected)
            .flatMap((category: Category) => {
                const filteredChildren = category.children
                    .filter((productCategory: ProductCategory) => {
                        return data.products.some((dataProduct: Product) => {
                            return (
                                dataProduct.id === String(productCategory.path) &&
                                (dataProduct.producto_nombre
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                    String(
                                        numberFormat(
                                            Number(dataProduct.precio_pvp)
                                        )
                                    )
                                        .toLowerCase()
                                        .includes(search.toLowerCase()))
                            );
                        });
                    })
                    .map((value: ProductCategory, key: number) => {
                        const result = data.products.find(
                            (dataProduct: Product) =>
                                dataProduct.id === String(value.path)
                        );

                        const priceNumber = Number(result?.precio_pvp) || 0;
                        const idNumber = Number(result?.id);

                        return (
                            <div className="col-6 col-md-3 mb-4" key={`${key}`}>
                                <Card
                                    // Aquí pasamos onAdd con la función que añade al carrito
                                    name={result?.producto_nombre}
                                    image={decodeURIComponent(result?.img[0]?.path ?? "")}
                                    price={numberFormat(priceNumber)}
                                    onAdd={() => addToCart(idNumber, result?.producto_nombre, priceNumber)}
                                />
                            </div>
                        );
                    });
                if (filteredChildren.length <= 0) {
                    return (
                        <div className="col-12 col-md-12">
                            <div className="card h-100 shadow">
                                <div className="card-body text-center">
                                    <h5 className="card-title">
                                        No existe el producto especificado
                                    </h5>
                                </div>
                            </div>
                        </div>
                    );
                }
                return filteredChildren;
            });
    };

    if (loading) return <div className="text-center">Cargando...</div>;

    return (
        <div className="container mt-4">
            {/* Aquí pasamos el carrito a ModalCart */}
            <ModalCart cart={cart} onRemove={removeCart} />
            <FilterCategory
                onSelect={handleSelect}
                categories={Object.values(data.category_list) as { id: number; nombre: string }[]}
                currency={categorySelected}
            />
            <Search onSearch={handleSearch} />
            <div className="row">{renderProducts()}</div>
        </div>
    );
}

export default App;
