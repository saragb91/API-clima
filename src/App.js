import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header'
import Form from './components/Form'
import Weather from './components/Weather'
import Error from './components/Error'

function App() {
  //State del formulario
const [search, saveSearch] = useState({
    city: "",
    country: "",
  });

const [consult, saveConsult] = useState(false)
const [result, saveResult] = useState({})
const [error, saveError] = useState(false)

const {city,country}= search

useEffect(()=>{
const consultAPI= async () =>{
if(consult){

  const appId = process.env.REACT_APP_API_KEY

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`

  const answer= await fetch(url)
  const result= await answer.json()

saveResult(result)
saveConsult(false)

//Detecta si hubo resultados correctos en la consulta
if(result.cod==="404"){
  saveError(true)
}else{
  saveError(false)
}
}
}
consultAPI()
//eslint-disable-next-line
},[consult]);

let component
if(error){
component= <Error message= 'No hay resultados' />
}else{
component= <Weather result={result} />
}

  return (
    <Fragment>
      <Header
      title='Clima React App'
      >
      </Header>
<div className='container-form'>
  <div className='container'>
    <div className='row'>
      <div className='col m6 s12'>
        <Form 
        search={search}
        saveSearch={saveSearch}
        saveConsult={saveConsult}
        />
      </div>
      <div className='col m6 s12'>
      {component}
      </div>
    </div>
  </div>
</div>

    </Fragment>
  );
}

export default App;
