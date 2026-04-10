import Nav from "./components/basics/Nav";
import Form from "./components/Form";
import Condicional from "./components/Condicional";
import Lista from "./components/Lista";
function App() {
  const array = ['React', 'Vue', 'Angular'] 
  return (
    <div className="App">
      <h1>Rederização de listas</h1>
      <Lista itens={array}/>
  </div>
);
}

export default App;