import { Outlet } from "react-router-dom";
import Header from "../pages/common/Header";

const TheLayout = () => {
    return (
        <div className="layout-wrapper d-flex h-100 flex-column">
            <header className="sticky-top">
                <Header/>
            </header>
            <main><Outlet /></main>
            {/* <footer className="mt-auto">Footer</footer> */}
        </div>
    )
}

export default TheLayout;