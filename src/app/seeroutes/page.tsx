import React from 'react'

const ubicaciones = {
    FirstRoute: 'Pisos Picados',
    SecondRoute: 'Balsa Botin',
    ThirdRoute: 'Ciudad Comercial',
  };


const seeroutes = () => {
    return (
        <div>
          <h1>Mirar rutas</h1>
          <p>Ruta 1: {ubicaciones.FirstRoute}</p>
          <p>Ruta 2: {ubicaciones.SecondRoute}</p>
          <p>Ruta 3: {ubicaciones.ThirdRoute}</p>
        </div>
      );
    };


export default seeroutes;

