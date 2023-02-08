/* Quando trabalhos com algo dinâmico, trocando de valor conforme alguma ação, utilizamos o estado "useState" */
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";

import api from "./services/api";

function App() {
  /*Input : "Qual o valor do estado "
    setInput : "Passar um valor novo para esse estado" */
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    // 45157000/json/

    if (input === "") {
      alert("Preencha algum CEP");
      return;
    }

    // try é o que você quer fazer, caso dê errado, cai no catch
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
      console.log(response.data);
    } catch {
      alert("Ops,erro ao buscar");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title"> Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          /* Pegando tudo o que digitou dentro do input, e passsando para o useState */
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>
      <div>
        {/* Estamos acessando o nosso "cep" e verificando se tem algo lá dentro */}
        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2> CEP: {cep.cep}</h2>

            <span>Rua/Av : {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              Cidade: {cep.localidade} - {cep.uf}
            </span>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
