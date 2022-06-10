import EditExpense from "./components/EditExpense";
import NewTransaction from "./components/NewTransaction";
import Home from "./pages/Home";
import Login from "./pages/Login";

const { BrowserRouter, Routes, Route } = require("react-router-dom");

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/newexpense" element={<NewTransaction/>}/>
      <Route path="/editexpense/:id" element={<EditExpense/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
