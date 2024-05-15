import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import { useEffect, useState } from "react";
import { GlobalStyles } from "./style/GlobalStyle";

function App() {
    const [innerHeight, setInnerHight] = useState<number>(0);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setInnerHight(window.innerHeight);
        }
    }, []);

    return (
        <>
            <GlobalStyles innerHeight={innerHeight} />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
