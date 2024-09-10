import "./App.css";
import { Navbar } from "./Component/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Shop } from "./Pages/Shop.jsx";
import { ShopCategory } from "./Pages/ShopCategory.jsx";
import { Product } from "./Pages/Product.jsx";
import { Cart } from "./Pages/Cart.jsx";
import { Footer } from "./Component/Footer/Footer.jsx";
import men_banner from "./Assets/banner_mens.png";
import women_banner from "./Assets/banner_women.png";
import kids_banner from "./Assets/banner_kids.png";
import { LoginSignup } from "./Pages/LoginSignup/LoginSignup.jsx";
import { Login } from "./Pages/LoginSignup/Login.jsx";
import { Checkout } from "./Pages/Checkout.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          ></Route>
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          ></Route>
          <Route
            path="/kids"
            element={<ShopCategory banner={kids_banner} category="kid" />}
          ></Route>
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />}></Route>
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/signup" element={<LoginSignup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
