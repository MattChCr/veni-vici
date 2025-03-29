import '../App.css'


const DogDisplay = (props) => {

  return (
    <>
      <img src={props.image} width='600px' border-radius='4em'></img>
      <div className="display-container">
         <button> {props.name} </button>
         <button> {props.breed} </button>
         <button> {props.lifespan} </button>
      </div>  
    </>
  )
}

export default DogDisplay