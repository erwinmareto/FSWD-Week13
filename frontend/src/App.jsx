import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Homepage.jsx";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <VStack minH="100vh" minW="100vw">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route
            path={"/add"}
            element={
              <PrivateRoute>
                <AddBook />
              </PrivateRoute>
            }
          />
          <Route
            path={"/edit/:id"}
            element={
              <PrivateRoute>
                <EditBook />
              </PrivateRoute>
            }
          />
          <Route path={"/login"} element={<LoginPage />} />
        </Routes>
      </Router>
    </VStack>
  );
}

export default App;
