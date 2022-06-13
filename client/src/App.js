import EditTransaction from "./components/EditTransaction";
import NewTransaction from "./components/NewTransaction";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import NewCategory from "./components/NewCategory";
import EditCategory from "./components/EditCategory";

const { BrowserRouter, Routes, Route } = require("react-router-dom");

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/newtransaction" element={<NewTransaction/>}/>
      <Route path="/edittransaction/:id" element={<EditTransaction/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/newcategory" element={<NewCategory/>}/>
      <Route path="/editcategory/:id" element={<EditCategory/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
