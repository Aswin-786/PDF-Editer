import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';
import { Uploads } from './components/Uploads';
import { RecoilRoot } from 'recoil';
import InitUser from './components/InitUser';
import UserDetails from './components/UserDetails';


function App() {
  return (
    <RecoilRoot>
      <InitUser />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={'/user'} element={<User />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/upload'} element={<Uploads />} />
          <Route path={"/user/:userId"} element={<UserDetails />} />
        </Route>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
