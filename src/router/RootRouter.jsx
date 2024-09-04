import { Route, Routes } from 'react-router-dom';
import NotFoundPage from "./NotFoundPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import LandingPage from "./LandingPage.jsx";
import LoginPage from "../components/LoginPage.jsx";
import Dashboard from "../components/Dashboard.jsx";



const RootRouter = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute element={<LandingPage children={undefined} />} />}>
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RootRouter;