import { useState } from 'react'
import './App.css'
import axios from 'axios';
import DogDisplay from './components/DogDisplay';
import { useEffect } from 'react';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = ACCESS_KEY;


function App() {
  const [inputs, setInputs] = useState({
    url: "https://thumbs.dreamstime.com/b/dog-dance-hind-legs-24081537.jpg",
    name: "",
    breed: "",
    life_span: "",
    width: "400",
    height: "150",
  });

  const fetchDog = (async) => {
    axios('/breeds?limit=10').then(async (res) => {
      console.log(res.data);
      const dog = res.data[Math.floor(Math.random() * (9 - 0 + 1))];
      fetchImage(dog);
    });
  }

  const fetchImage = (dog) => {
      axios("images/search?breed_ids=" + dog.id + "&limit=1").then(async (res) => {
        console.log(res.data);
        
        setInputs({
          name: dog.name,
          breed: dog.bred_for || dog.breed_group || 'Unknown',
          life_span: dog.life_span,
          url: res.data[0].url,
        });
      });  
  };


  useEffect(() => { 
    axios('/breeds?limit=10').then(async (res) => {
      console.log(res.data);
      const breed = res.data[Math.floor(Math.random() * (9 - 0 + 1))]; 
      setInputs({
        name: breed.name,
        breed: breed.origin,
        life_span: breed.life_span,
      });
    });
  }, []);
  
  return (
    <>
     <div className="App">
      <div className="dog-container">
        <h2> Discover a Dog </h2>
        <DogDisplay image={inputs.url} name={inputs.name} breed={inputs.breed} lifespan={inputs.life_span}> </DogDisplay>
        <button onClick={fetchDog}> Discover a Dog!</button>
      </div>
      
     </div>
    </>
  )
}

export default App
