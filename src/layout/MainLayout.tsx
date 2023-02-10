import { Outlet } from "react-router-dom";
import Header from "../pages/common/Header";
import Footer from "../pages/common/Footer"

const MainLayout = () => {
    return (
        <div className="layout-wrapper d-flex h-100 flex-column">
            <header className="sticky-top" style={{ zIndex: 10 }}>
                <Header />
            </header>
            <main><Outlet /></main>
            <footer className="mt-auto">
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout;