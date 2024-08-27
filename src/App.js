import React, { useState, useEffect } from "react";
import CounterBar from "./shared/components/CounterBar";
import "./App.css";
import Swal from "sweetalert2";
import {
  createCounter,
  deleteCounter,
  getCounters,
  updateCounter,
} from "./api";

function App() {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    getCounters().then((data) => setCounters(data));
  }, []);

  const handleAddButton = () => {
    Swal.fire({
      title: "Criar novo contador",
      input: "text",
      inputPlaceholder: "Digite o nome do contador",
      showCancelButton: true,
      confirmButtonText: "Criar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        createCounter(result.value).then((data) =>
          setCounters([...counters, data])
        );
      }
    });
  };
  const handleIncrement = (id, value) => {
    updateCounter(id, value + 1).then((data) => {
      setCounters(
        counters.map((contador) => {
          if (contador.id === id) {
            return { ...contador, value: value + 1 };
          }
          return contador;
        })
      );
    });
  };

  const handleDecrement = (id, value) => {
    updateCounter(id, value - 1).then((data) => {
      setCounters(
        counters.map((contador) => {
          if (contador.id === id) {
            return { ...contador, value: value - 1 };
          }
          return contador;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="root">
        <h1 className="title">Contadores</h1>
        <div className="sheet">
          <CounterBar isTitle/>
          {counters &&
            counters.map((contador) => (
              <CounterBar
                handleIncrement={() => {
                  handleIncrement(contador.id, contador.value);
                }}
                handleDecrement={() => {
                  handleDecrement(contador.id, contador.value);
                }}
                handleDelete={() =>
                  deleteCounter(contador.id).then((data) => setCounters(data))
                }
                key={contador.id + Math.random() * 100}
                id={contador.id}
                counter={contador.value}
                name={contador.name}
              />
            ))}
        </div>
      </div>
      <button className="addButton" onClick={handleAddButton}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export default App;
