import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import TheLayout from './layout/TheLayout';
import Home from './pages/home';
import SignIn from './pages/auth/signin';
import About from './pages/about';
import BoatDetails from './pages/BoatDetails';
import SelectPassenger from './pages/SelectPassenger';
import PlaceLocated from './pages/PlaceLocated';
import ConfirmAddress from './pages/ConfirmAddress';

const App = () => {
  return (
    <>
      <Routes>
        {/* {authState.access_token ? */}
          <Fragment>
            <Route path="*" element={<TheLayout />}>
              <Route index element={<Home />}/>
              <Route path="about" element={<About/>}/>
              <Route path="boat-details" element={<BoatDetails/>}/>
              <Route path="select-passenger" element={<SelectPassenger/>}/>
              <Route path="place-located" element={<PlaceLocated/>}/>
              <Route path="confirm-address" element={<ConfirmAddress/>}/>
            </Route>
          </Fragment>
          :
           <Route path="/signin" element={<SignIn />} />
        {/* } */}
      </Routes>
    </>
  );
}

export default App;
