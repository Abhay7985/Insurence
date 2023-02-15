import { Outlet } from "react-router-dom";
import Header from "../pages/common/Header";
import Footer from "../pages/common/Footer"

const MainLayout = () => {
    return (<div id='pricing_tab' className="h-100">
        {/* <div id='pricing_tab'> */}
        <div className="layout-wrapper d-flex flex-column" id='photos_tab'   >
            <header className="sticky-top" style={{ zIndex: 10 }} >
                <Header />
            </header>
            <main><Outlet /></main>
            <footer className="mt-auto">
                <Footer />
            </footer>
        </div>
        {/* </div> */}
    </div>
    )
}

export default MainLayout;