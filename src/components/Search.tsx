type Props = {
    onSearch: (search: string) => void;
};

function Search({ onSearch }: Props) {
    return (
        <input
            className="form-control me-2 mb-4"
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}

export default Search;
