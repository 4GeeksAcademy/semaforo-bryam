import React from "react";
import { useEffect, useState } from "react";

const TrafficLight = () => {
  const [color, setColor] = useState("red");
  const [colorsArray, setColorsArray] = useState(["red", "yellow", "green"])
  
  const [intervalId, setIntervalId] = useState(null); 
  const [isChanging, setIsChanging] = useState(false); 
  const [inputColor, setInputColor] = useState("");


  const colorMapping = {
    "morado": "purple",
    "púrpura": "purple",
    "purple": "purple"
  };

  useEffect(() => {
      return () => {
          if (intervalId) clearInterval(intervalId);   
      };
  }, [intervalId]);

  function addColor(newColor) {
    const normalizedColor = colorMapping[newColor.toLowerCase()] || newColor.toLowerCase();
    if (!normalizedColor.trim()) {
      alert("Necesitas escribir un color válido.");
      return;
    }
    if (colorsArray.includes(newColor)) {
      alert("Este color ya existe.");
      return;
    }
      setColorsArray([...colorsArray, newColor])
      setInputColor("")
  }

  function changeColor() {
      if (isChanging) return; 
      setIsChanging(true);

      const id = setInterval(() => {
          setColor((prevColor) => {
              const currentIndex = colorsArray.indexOf(prevColor);
              const nextIndex = (currentIndex + 1) % colorsArray.length;
              return colorsArray[nextIndex];
          });
      }, 1000);

      setIntervalId(id); 
  }

  function stopColorChange() {
      if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
          setIsChanging(false); 
      }
  }
  return (
    <div className="container">
      <div className="semaforo mt-3">
        {colorsArray.map((colorItem, index) => (
          <div
          key={colorItem + index}
          className={`circle ${colorItem} mt-3 ${color === colorItem ? "active" : ""}`}
          onClick={() => {
            setColor(colorItem);
            stopColorChange(); // Se detiene el ciclo automático al hacer clic
          }}
        ></div>
        ))}
      </div>
      <div className="controls">
        <button onClick={changeColor}>Iniciar Cambio</button>
        <button onClick={stopColorChange}>Detener Cambio</button>
      </div>
      <div className="add-color">
        <input
          type="text"
          value={inputColor}
          onChange={(e) => {setInputColor(e.target.value);
            document.documentElement.style.setProperty('--user-color', e.target.value);
          }}
          placeholder="Ingresa un color"
        />
        <button onClick={() => addColor(inputColor)}>Agregar Color</button>
      </div>
    </div>
  );
};

export default TrafficLight;