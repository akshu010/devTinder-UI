import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import ErrorPage from "./Components/ErrorPage";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import ForgotPassword from "./Components/ForgotPassword";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/changePassword" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connection" element={<Connections />} />
              <Route path="/request" element={<Requests />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
