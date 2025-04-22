import React, { useState } from "react";

const Home = () => {
  const[colors, setColors] = useState("red")

  const randonLidth =() => {
    const colores = [ "redLigth", "greenLigth", "yellowLigth",]
    const random = colores [Math.floor (Math.random()* colores.length)]
    setColors(random)
  }
  
  const handleClick = (val) => {
    setColors (val)
  }

  return (
    <div className="conteiner-fluid">
      <div className="Semaforo"></div>
        <div className="semaforoContainer">
          <div className={`redLigth ${colors === "redLigth" ? "iluminar" : " "}`} onClick={()=>handleClick('redLigth')}></div>
          <div className={`yellowLigth ${colors === "yellowLigth" ? "iluminar" : " "}`} onClick={()=>handleClick('yellowLigth')}></div>
          <div className={`greenLigth ${colors === "greenLigth" ? "iluminar" : " "}`} onClick={()=>handleClick('greenLigth')}></div> </div>
    
    
    </div>
    
  );
};

export default Home;