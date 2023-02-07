import { Outlet } from "react-router-dom";

const TheLayout = () => {
    return (
        <div className="layout-wrapper d-flex h-100 flex-column">
            <header>Header</header>
            <main><Outlet /></main>
            <footer className="mt-auto">Footer</footer>
        </div>
    )
}

export default TheLayout;