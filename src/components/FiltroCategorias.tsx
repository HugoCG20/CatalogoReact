type Props = {
    categories: any;
    onSelect: (element: number) => void; // Función opcional
}

function FiltroCategorias({ categories, onSelect }: Props) {
    return (
        <select className="form-select form-select-lg mb-4" aria-label=".form-select-lg example" onChange={(e) => onSelect(Number(e.target.value))}>
            {categories.map((category: any, i: number) => (
                <option key={i} value={category.path}>{category.display}</option>
            ))}
        </select>
    )
}

export default FiltroCategorias