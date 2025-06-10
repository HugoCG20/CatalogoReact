import { useState, useEffect } from "react";
import axios from "axios";

// Componentes
import Card from "./components/Card";
import Search from "./components/Search";
import FilterCategory from "./components/FilterCategory";

import type {
    Product,
    ProductCategory,
    Category,
    Data,
} from "./interfaces/product";

const instance = axios.create({
    baseURL: "/", // Compatible con proxy
    headers: {
        "Content-Type": "application/json",
        "x-custom-header": "authorized", // Encabezado personalizado
    },
});

function App() {
    const [data, setData] = useState<Data>({
        custom_products: { json_data: [] },
        category_list: {},
        products: [],
    });

    const [categorySelected, setCategory] = useState(17); // Estado para almacenar las categorias
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true); // Estado para manejar
    useEffect(() => {
        // Cargar el JSON de facturas desde la ruta del proxy
        instance
            .get("/api")
            .then((response: { data: Data }) => {
                setData(response.data); // Actualiza el estado con los datos recibidos
                setLoading(false); // Desactiva el estado de loading
            })
            .catch((error: unknown) => {
                console.error("Error al cargar las facturas:", error);
                setLoading(false); // Desactiva el estado de loading
            });
    }, []);

    const handleSelect = (element: number) => {
        setCategory(element); // Actualiza las categorias
        console.log(element);
    };

    const handleSearch = (search: string) => {
        setSearch(search);
        console.log(search);
    };

    const numberFormat = (num: number) => {
        return new Intl.NumberFormat("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(num) || 0);
    };

    const renderProducts = () => {
        return (data.custom_products.json_data as Category[])
            .filter((category: Category) => category.path === categorySelected)
            .flatMap((category: Category) => {
                const filteredChildren = category.children
                    .filter((productCategory: ProductCategory) => {
                        return data.products.some((dataProduct: Product) => {
                            return (
                                dataProduct.id ===
                                    String(productCategory.path) &&
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
                        return (
                            <div className="col-6 col-md-3 mb-4" key={`${key}`}>
                                <Card
                                    // id={Number(result?.id || 0)}
                                    name={result?.producto_nombre}
                                    image={decodeURIComponent(
                                        result?.img[0]?.path ?? ""
                                    )}
                                    price={
                                        numberFormat(
                                            Number(result?.precio_pvp)
                                        ) ?? 0.0
                                    }
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
            <ModalCart />
            <FilterCategory
                onSelect={handleSelect}
                categories={
                    Object.values(data.category_list) as {
                        id: number;
                        nombre: string;
                    }[]
                }
                currency={categorySelected}
            />
            <Search onSearch={handleSearch} />
            <div className="row">{renderProducts()}</div>
        </div>
    );
}

export default App;
