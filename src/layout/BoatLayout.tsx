import { Outlet } from "react-router-dom";
import Header from "../pages/common/Header";

const BoatLayout = () => {
    return (
        <div className="layout-wrapper d-flex h-100 flex-column">
            <header className="sticky-top" style={{ zIndex: 10 }}>
                <Header />
            </header>
            <main><Outlet /></main>
        </div>
    )
}

export default BoatLayout;