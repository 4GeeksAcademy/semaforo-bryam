import React from "react";
import { useEffect, useState } from "react";

const TrafficLight = () => {
  const [color, setColor] = useState("red");
  const [colorsArray, setColorsArray] = useState(["red", "yellow", "green"])
  
  const [intervalId, setIntervalId] = useState(null); 
  const [isChanging, setIsChanging] = useState(false); 

  useEffect(() => {
      return () => {
          if (intervalId) clearInterval(intervalId);   
      };
  }, [intervalId]);

  function addColor(newColor) {
    if (!newColor.trim()) {
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
      <div className="Container">
          <div className="Semaforo">
              {colorsArray.map((colorArray) => {
                  return (
                      <div className={`${colorArray} mt-3 ${color === colorArray ? "active" : ""}`}
                          onClick={() => setColor(colorArray)}
                          style={{
                              backgroundColor: colorArray, "border-radius": "100%",
                              width: "100px",
                              height: "100px"
                          }}
                      ></div>)})}    
          </div>
      </div >
  )
}

export default TrafficLight;