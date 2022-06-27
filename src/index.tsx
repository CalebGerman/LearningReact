import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const lakeList =["Longview","TableRock","Little Lake"];
const gitHubApiRoot="https://api.github.com/users/"
function HelloWorld(properties: any){
    console.log(Object.keys(properties))
    return <h1>Hello World {properties.library} {properties.message}</h1>;
}
function App({lakes}: {lakes:string[]}){
    //map is like select in linq
    //array destructuring give name to array indexes
    //hook is a function that allows you to add functionally to the component
    //use state is a built-in hook we can use to handle state
    // status and second value function to change state
    const [status, setStatus] =useState("Open")//state when app opens
    const [manager,setManager]=useState("Caleb")
    const [year,setYear]=useState(2022)
    if(lakes.length<=0)
        return (
            <>
                <div>
                    <h1>year: {year}</h1>
                    <button onClick={()=>setYear(year+1)}>Add Year</button>
                    <button onClick={()=>setYear(year-1)}>Minus Year</button>
                </div>
                <div>
                    <h1>manager: {manager}</h1>
                    <button onClick={()=>setManager("Caleb")}>Caleb</button>
                    <button onClick={()=>setManager("Ally")}>Ally</button>
                </div>
                <div>
                    <h1>Status: {status}</h1>
                    <button onClick={()=>setStatus("Closed")}>Closed</button>
                    <button onClick={()=>setStatus("Open")}>Open</button>
                </div>
            </>
      )

    return(
        <div>
            <HelloWorld library="React" message="have fun"/>
            <HelloAgain name="Caleb" age={23} />
            <ul>
                { lakes.map(lake =><li>{lake}</li>)}
            </ul>
        </div>

    )
}
function HelloAgain({name ,age} :{name:string,age:number}){

    return <div style={{color: "red"}}>
        <h1> Hello {name} you are {age} years old</h1>
    </div>
}
function FavortitePhrases(){

    const [val,setVal]=useState("");
    const [val2,setVal2]=useState("");
    //use effect does stuff outside of rendering to dom logging and alerts are an example
    //use effect params 1(function with side effects 2 dependency array
    useEffect(()=> console.log("field One:"+val),[val])//only fire if state of val changes
    useEffect(()=> console.log("field two"+val2),[val2])
    return(
    <>
    <label>
        Favorite Phrase:
    </label>
    <input value={val} onChange={e=>setVal(e.target.value)}/>
    <br />
        <label>
            Second Phrase:
        </label>
        <input value={val2} onChange={e=>setVal2(e.target.value)}/>
    </>);
}
function GitHubUser({username}:{username:string}){
const [data,setData]=useState(null);
useEffect(()=> {
fetch('https://api.github.com/users/'+username)
    .then(res=>res.json())
    .then(setData)
    .catch(console.error)
},[])

    if(data){
        return(
            <div>
            <h1>{data['login']}</h1>
            <img src={data['avatar_url']} width={100} />
            </div>);
    }
    return null;
}

ReactDOM.render(
    //<App lakes={lakeList}></App>
    <div>
        <App lakes={[]}></App>
       <FavortitePhrases></FavortitePhrases>
        <GitHubUser username={"canismajor88"} ></GitHubUser>
    </div>
    ,document.getElementById("root"))


