import { useEffect, useState } from "react"

function App() {
  const [enable, setEnable]  = useState(false)
  const [position, setPosition] = useState({x:0, y:0})

  useEffect(()=>{
    console.log(`Efecto: ${enable}`)

    const handleMove = (event)=>{
      const { clientX, clientY} = event
      setPosition({x: clientX, y: clientY})
    }
    if(enable){
      window.addEventListener('pointermove', handleMove)//el evento seguira suscrito con el estado en false
    }

    //Limpiar
    //Esto se ejecuta cuando el componente se desmonta y
    //Cuando cambian las dependencias, antes de ejecutar el efecto de nuevo
    return ()=>{
      console.log('cleanup')
      window.removeEventListener('pointermove',handleMove)
    }

  },[enable])

  return (
    <main>
      <div style={{
        position:"absolute",
        backgroundColor:"#09f",
        borderRadius:"50%",
        opacity:0.8,
        pointerEvents: "none",
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}/>
      <button onClick={()=>{setEnable(!enable)}}>
        {enable ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

export default App
