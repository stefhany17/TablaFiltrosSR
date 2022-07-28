import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {


  const traerPersonajes = async (state) => {
    const personajeData = await axios.get('https://rickandmortyapi.com/api/character')

    state(personajeData.data.results)
  }

  const [personaje, setPersonaje] = useState(null)

  const [especie, setEspecie] = useState(false)
  const [genero, setGenero] = useState(false)

  useEffect(() => {
    traerPersonajes(setPersonaje)
  }, [])




  function filtroStatus(valor) {
    if (valor === "Alive") {
      let vivos = personaje.filter(e => e.status === 'Alive')
      setPersonaje(vivos)
    }
    else if (valor === "Dead") {
      let muertos = personaje.filter(e => e.status === 'Dead')
      setPersonaje(muertos)
    }
    else if (valor === "desconocido") {
      let desconocido = personaje.filter(e => e.status === 'unknown')
      setPersonaje(desconocido)
    }

  }

  function filtroEspecie(valor) {
    if (valor === "Human") {
      let humano = personaje.filter(e => e.species === 'Human')
      setPersonaje(humano)
    }
    else if (valor === "Alien") {
      let alienigena = personaje.filter(e => e.species === 'Alien')
      setPersonaje(alienigena)
    }

  }

  function filtroGenero(valorx) {

    if (valorx === "Male") {
      let hombre = personaje.filter(e => e.gender === 'Male')
      setPersonaje(hombre)
    }
    else if (valorx === "Female") {
      let mujer = personaje.filter(e => e.gender === 'Female')
      setPersonaje(mujer)
    }

  }
  let i=0
  function addFilter(){
    i++
    if(i===1){
      setEspecie(true)
      setGenero(false)
    }
    if(i===2){
      setEspecie(true)
      setGenero(true)
    }
  }
  return (
    <div className="App">

      <h1>Rick and morty </h1>
      <h3>Prueba técnica Stefhany Rodríguez Alvarado</h3>
      <div className="Filtros">
        <div className="FiltroStatus">
          <h5>Filtro status</h5>
          <button onClick={() => filtroStatus("Alive")}>Alive</button>
          <button onClick={() => filtroStatus("Dead")}>Dead</button>
          <button onClick={() => filtroStatus("desconocido")}>Unknown</button>
        </div>

        {
          genero ? <div className="FiltroGenero">
          <h5>Filtro genero</h5>
          <button onClick={() => filtroGenero("Female")}>Female</button>
          <button onClick={() => filtroGenero("Male")}>Male</button>
        </div>:""
        }

        {
          especie ? <div className="FiltroEspecie">
          <h5>Filtro especies</h5>
          <button onClick={() => filtroEspecie("Human")}>Human</button>
          <button onClick={() => filtroEspecie("Alien")}>Alien</button>
        </div>:""
        }
        <div className='Adicionales'>
        <button onClick={()=>addFilter()}>AddFiltro</button>
        <button onClick={()=>traerPersonajes(setPersonaje)}>Reset-Tabla</button>

        </div>
      </div>

      <hr></hr>
      <div className="Tablita">

        <table>
          <thead>
            <tr>
              <th>Id</th><th>Nombre</th><th>Estado</th><th>Especie</th><th>Genero</th>
            </tr>
          </thead>
          {personaje !== null ? (personaje.map(p => (

            <tr key={p.id}>
              <td>{p.id}</td><td>{p.name}</td><td>{p.status}</td><td>{p.species}</td><td>{p.gender}</td>
            </tr>


          ))
          ) : ('no hay personajes')}
        </table>
      </div>



    </div>

  );
}

export default App;
