import React from "react";
import { useEffect, useState } from "react";

const TrafficLight = () => {
  const [color, setColor] = useState("red");
  const [colorsArray, setColorsArray] = useState(["red", "yellow", "green"])
  
  const [intervalId, setIntervalId] = useState(null); 
  const [isChanging, setIsChanging] = useState(false); 
  const [inputColor, setInputColor] = useState("");

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
     
    </div>
  );
};

export default TrafficLight;