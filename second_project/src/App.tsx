import React from 'react';
import './App.css';
import {useState} from 'react';
//custom hook
function useInput(initialValue:string){
const [value,setValue] =useState(initialValue)
  return[
    {value, onChange : (event: { target: { value: React.SetStateAction<string>; }; })=> setValue(event.target.value)} //set function
      ,()=>setValue(initialValue) //cleanup function
  ]
}


function App() {
  const txtTitle=React.createRef<HTMLInputElement>();//creates an uncontrolled component where state is not managed
  const hexColor= React.createRef<HTMLInputElement>();
  const [titleStateExample,setTitle] = useState("");//creates a controlled component where we are managing state
  const [hexStateExample,setHex] = useState("#000000");
  const [titleProps,resetTitle] = useInput("");//uses custom hook
  const [hexProps,resetHex] = useInput("#000000");
  function submit(e: { preventDefault: () => void; }) {
    e.preventDefault();//stops page from refreshing
    const title = txtTitle.current?.value
    const hex= hexColor.current?.value
    const titleState=titleStateExample
    const hexState=hexStateExample
    alert("Hex: "+hex +"and title: " +title)
    alert("Hex:"+hexState +"and title: " +titleState)
    // @ts-ignore
    alert(`Hex:${hexProps.value}and title: ${titleProps.value}`)
    setHex("")
    setTitle("")
    // @ts-ignore
    resetHex();
    // @ts-ignore
    resetTitle()
    if(txtTitle.current != undefined)
      txtTitle.current.value=""

    if(hexColor.current != undefined)
        hexColor.current.value="";
  }

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div className="App">
    <form onSubmit={submit}>
      <input ref={txtTitle} type="text" placeholder="color title ..."/>
      <input ref={hexColor} type="color"/>
      <button>add</button>
    </form>
      <form onSubmit={submit}>
        <input value={titleStateExample} onChange={event => setTitle(event.target.value)} type="text" placeholder="color title ..."/>
        <input value={hexStateExample} onChange={event => setHex(event.target.value)}  type="color"/>
        <button>add</button>
      </form>
      <form onSubmit={submit}>
        <input value={titleProps.value} onChange={event => titleProps.onChange(event.target.value)} type="text" placeholder="color title ..."/>
        <input value={hexProps.value} onChange={event => hexProps.onChange(event.target.value)}  type="color"/>
        <button>add</button>
      </form>
    </div>
  );
}

export default App;
