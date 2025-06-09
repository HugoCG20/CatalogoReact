import Card from "./components/Card";
import Buscador from "./components/Buscador";
import FiltroCategorias from "./components/FiltroCategorias";
import data from "./Json/nuevo133.json";
import { useState } from "react";

const products = data.custom_products.json_data;
const dataCategoryList = data.category_list;
const dataProducts = data.products;

function App() {
    const [categorySelected, setCategory] = useState(data.current_category); // Estado para almacenar las categorias
    const [search, setSearch] = useState("");

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
        return products
            .filter((category) => category.path == categorySelected)
            .flatMap((category) =>
                category.children
                    .filter((productCategory) => {
                        return dataProducts.some((dataProduct) => {
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
                    .map((value, key) => {
                        const result = dataProducts.find(
                            (dataProduct) =>
                                dataProduct.id === String(value.path)
                        );
                        return (
                            <div className="col-6 col-md-3 mb-4" key={`${key}`}>
                                <Card
                                    // id={Number(result?.id || 0)}
                                    name={result?.producto_nombre_atributo}
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
                    })
            );
    };

    return (
        <div className="container mt-4">
            <FiltroCategorias
                onSelect={handleSelect}
                categories={Object.values(dataCategoryList)}
                currency={data.current_category}
            />
            <Buscador onSearch={handleSearch} />
            <div className="row">{renderProducts()}</div>
        </div>
    );
}

export default App;
