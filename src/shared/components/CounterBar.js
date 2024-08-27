import React, { useState } from "react";
import "./CounterBar.css";

const CounterBar = ({
  counter: initialCounter,
  name,
  handleDelete,
  isTitle = false,
  handleDecrement,
  handleIncrement,
}) => {
  const [counter] = useState(initialCounter);
  return (
    <>
      <div className="counter-bar">
        <p className="text name">{isTitle?"Nome":name}</p>
        <p className="text value">{isTitle?"Valor":counter}</p>
        <div className="button-container">
          {isTitle ? (
            <p className="text header">Ajustes</p>
          ) : (
            <>
              <button className="button action" onClick={handleDecrement}>
                <i class="fa-solid fa-minus"></i>
              </button>
              <button className="button action" onClick={handleIncrement}>
                <i class="fa-solid fa-plus"></i>
              </button>
              <button className="button delete" onClick={handleDelete}>
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CounterBar;
