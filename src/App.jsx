import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import ListCity from "./components/ListCity";
import Home from "./components/Home";

function App() {


  return (
    <>
      <BrowserRouter>
        <TopBar title="Weather app "></TopBar>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/list-city/:cityName/:lat/:lon" element={<ListCity />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
