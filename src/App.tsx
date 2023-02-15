import { Fragment, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/signin';
import About from './pages/about';
import BoatInfo from './pages/BoatInfo';
import SelectPassenger from './pages/SelectPassenger';
import PlaceLocated from './pages/PlaceLocated';
import { GlobalContext } from './context/Provider';
import BoatListing from './pages/BoatListing';
import AmenitiesOffer from './pages/AmenitiesOffer';
import SafetyQuestions from './pages/SafetyQuestions';
import BoatPrice from './pages/BoatPrice';
import BoatDetails from './pages/BoatDetails';
import EditImage from './pages/EditImage';
import EditAmenities from './pages/EditAmenities';
import Inquiry from './pages/Inquiry';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import ProviderCalender from './pages/ProviderCalender';
import MainLayout from './layout/MainLayout';
import BoatLayout from './layout/BoatLayout';
import AddPhotos from './pages/AddPhotos';
import EditBoatDetails from './pages/EditBoatDetails';

const App = () => {
  const { authState } = useContext(GlobalContext)
  return (
    <Routes>
      {authState?.access_token ?
        <Fragment>
          <Route path="boat/*" element={<BoatLayout />}>
            <Route path="add/info" element={<BoatInfo />} />
            <Route path="passengers" element={<SelectPassenger />} />
            <Route path=":id/place" element={<PlaceLocated />} />
            <Route path=":id/amenities" element={<AmenitiesOffer />} />
            <Route path=":id/photos" element={<AddPhotos />} />
            <Route path=":id/safety-question" element={<SafetyQuestions />} />
            <Route path=":id/price" element={<BoatPrice />} />
          </Route>

          <Route path="*" element={<MainLayout />}>
            <Route index element={<BoatListing />} />
            <Route path="inquiry/:type/:page" element={<Inquiry />} />
            <Route path="boat/:id/inquiry" element={<BoatDetails />} />
            <Route path="boat/:id/inquiry/edit" element={<EditBoatDetails />} />
            <Route path="boat/:id/photos/edit" element={<EditImage />} />
            <Route path="boat/:id/amenities/edit" element={<EditAmenities />} />
            <Route path="calender" element={<ProviderCalender />} />

            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="about" element={<About />} />

          </Route>
        </Fragment>
        :
        <Route index element={<SignIn />} />
      }
    </Routes>
  );
}

export default App;
