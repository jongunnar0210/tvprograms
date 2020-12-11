//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [programs, set_programs] = useState([]);

  useEffect(() => {
    axios.get("/programs/stod2/2020-12-10").then(response => {
      //console.log(response.data[1].isltitill);
      set_programs(response.data);
    });
  }, []);

  return (
    <div className="App">
      <ul>
        {programs.map((p, index) => <li key={index}>{p.isltitill} {p.upphaf}</li>)}
      </ul>
    </div>
  );
}

export default App;
