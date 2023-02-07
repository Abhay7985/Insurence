import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import TheLayout from './layout/TheLayout';
import Home from './pages/home';
import SignIn from './pages/auth/signin';
import About from './pages/about';

const App = () => {
  return (
    <>
      <Routes>
        {/* {authState.access_token ? */}
          <Fragment>
            <Route path="*" element={<TheLayout />}>
              <Route index element={<Home />}/>
              <Route path="about" element={<About/>}/>
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
