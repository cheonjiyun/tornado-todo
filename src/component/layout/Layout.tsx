import { Outlet } from "react-router-dom";
import { Nav } from "../nav/Nav";

export const Layout = () => {
    return (
        <>
            <Outlet />
            <Nav />
        </>
    );
};
