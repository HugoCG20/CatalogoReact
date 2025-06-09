interface Product {
    id: string;
    producto_nombre: string;
    precio_pvp: number | string;
    img: { path: string }[];
}

interface ProductCategory {
    path: number;
}

interface Category {
    path: number;
    children: ProductCategory[];
}

interface Data {
    custom_products: {
        json_data: Category[];
    };
    category_list: Record<string, unknown>;
    products: Product[];
}

export type { Product, ProductCategory, Category, Data };
