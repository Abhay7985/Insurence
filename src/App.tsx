import { Fragment, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import TheLayout from './layout/TheLayout';
import Home from './pages/home';
import SignIn from './pages/auth/signin';
import About from './pages/about';
import BoatDetails from './pages/BoatDetails';
import SelectPassenger from './pages/SelectPassenger';
import PlaceLocated from './pages/PlaceLocated';
import ConfirmAddress from './pages/ConfirmAddress';
import { GlobalContext } from './context/Provider';
import BoatListing from './pages/BoatListing';
import AminitiesOffer from './pages/AminitiesOffer';
import AddPhotos from './pages/AddPhotos';
import SafetyQuestions from './pages/SafetyQuestions';
import BoatPrice from './pages/BoatPrice';
import MorningPanormic from './pages/MorningPanormic';
import EditImage from './pages/EditImage';

const App = () => {
  const { authState } = useContext(GlobalContext)
  return (
    <>
      <Routes>
        {!authState?.access_token ?
          <Fragment>
            <Route path="*" element={<TheLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="boat-details" element={<BoatDetails />} />
              <Route path="select-passenger" element={<SelectPassenger />} />
              <Route path="place-located" element={<PlaceLocated />} />
              <Route path="confirm-address" element={<ConfirmAddress />} />
              <Route path="boat-listing" element={<BoatListing/>}/>
              <Route path="aminities-offer" element={<AminitiesOffer/>}/>
              <Route path="add-photos" element={<AddPhotos/>}/>
              <Route path="safety-question" element={<SafetyQuestions/>}/>
              <Route path="boat-price" element={<BoatPrice/>}/>
              <Route path="morning-panormic" element={<MorningPanormic/>}/>
              <Route path="edit-image" element={<EditImage/>}/>
            </Route>
          </Fragment>
          :
          <Route index element={<SignIn />} />
        }
      </Routes>
    </>
  );
}

export default App;
