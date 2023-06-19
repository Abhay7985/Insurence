import { Outlet } from "react-router-dom";
import BoatHeader from "../pages/common/BoatHeader";
import Header from "../pages/common/Header";

const BoatLayout = () => {
    return (
        <div className="layout-wrapper d-flex flex-column h-100 overflow-auto">
            <header className="sticky-top" style={{ zIndex: 10 }}>
                <BoatHeader />
            </header>
            <main className="boat-main-layout h-100"><Outlet /></main>
        </div>
    )
}

export default BoatLayout;