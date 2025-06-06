type Props = {
    categories: any;
    onSelect: (element: string) => void; // Función opcional
}

function FiltroCategorias({ categories, onSelect }: Props) {
    return (
        <select className="form-select form-select-lg mb-4" aria-label=".form-select-lg example" onChange={(e) => onSelect(e.target.value)}>
            <option selected value={""}>Seleccione una categoría</option>
            {categories.map((category: any, i: number) => (
                <option key={i} value={category.display}>{category.display}</option>
            ))}
        </select>
    )
}

export default FiltroCategorias