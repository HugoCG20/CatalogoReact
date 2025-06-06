import Card from "./components/Card";
import Buscador from "./components/Buscador";
import FiltroCategorias from "./components/FiltroCategorias";
import datos from "./Json/nuevo133.json";
import { useState } from "react";

const productos = datos.custom_products.json_data;
const datosProductos = datos.products;

type Props = {

}

function App({ }: Props) {
  const [category, setCategory] = useState(datos.current_category); // Estado para almacenar las categorias

  const handleSelect = (element: number) => {
    setCategory(element); // Actualiza las categorias
    console.log(element);
  };

  return (
    <div className="container mt-4">
      <FiltroCategorias onSelect={handleSelect} categories={productos} />
      <Buscador />
      <div className="row">
        {productos
          .filter((producto: any) => producto.path == category)
          .flatMap((producto: any, i: number) =>
            producto.children.map((value: any, j: number) => (
              <div className="col-6 col-md-3 mb-4" key={`${i}-${j}`}>
                <Card
                  name={value.display}
                  image="https://ev4doc.s3.eu-west-1.amazonaws.com/efrain/documentos/efrain/catalogo//3b16a90edf854929fefdfe10c4de51a8.jpg"
                  price={value.path}
                />
              </div>
            ))
          )}
      </div>
    </div>
  );
}

export default App