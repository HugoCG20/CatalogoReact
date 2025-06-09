import { useState } from "react";

type Props = {
    categories: { id: number; nombre: string }[];
    onSelect: (element: number) => void;
    currency: number;
};

function FiltroCategorias({ categories, onSelect, currency }: Props) {
    const [categorySelected, setCategory] = useState(currency);
    return (
        <select
            className="form-select form-select-lg mb-4"
            aria-label=".form-select-lg example"
            value={categorySelected}
            onChange={(e) => {
                onSelect(Number(e.target.value));
                setCategory(Number(e.target.value));
            }}
        >
            {Object.entries(categories).map(([key, category]) => {
                return (
                    <option key={key} value={category.id}>
                        {category.nombre}
                    </option>
                );
            })}
        </select>
    );
}

export default FiltroCategorias;
