import './App.css'
import "./styles/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetails from './pages/ProductDetails';

function App() {

  return (
    <>
    <Header />
    <main>
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Container>
    </main>
    <Footer />
    </>
  )
}

export default App
