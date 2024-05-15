import { Outlet, useLocation } from "react-router-dom";
import { NavMobile, PlusButton } from "../nav/NavMobile";
import { useEffect, useState } from "react";
import { Todo } from "../../pages/Todo";
import styled from "styled-components";
import { Calendar } from "../../pages/Calendar";
import { NavDestop } from "../nav/NavDestop";

export const Layout = () => {
    // 높이
    const [innerHeight, setInnerHight] = useState<number>(0);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setInnerHight(window.innerHeight);
        }
    }, []);

    // 데스크탑 구분
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //
    const location = useLocation();

    return (
        <>
            {windowWidth > 1024 ? (
                <Desktop $innerHeight={innerHeight}>
                    <DesktopLeft>
                        <Todo />
                        <PlusButtonContainer>
                            <PlusButton />
                        </PlusButtonContainer>
                    </DesktopLeft>
                    <DesktopRight>
                        {location.pathname === "/" ? <Calendar /> : <Outlet />}
                        <NavDestop />
                    </DesktopRight>
                </Desktop>
            ) : (
                <>
                    {" "}
                    <Outlet />
                    <NavMobile />
                </>
            )}
        </>
    );
};

type DesktopProps = {
    $innerHeight: number;
};

const Desktop = styled.div<DesktopProps>`
    display: flex;
    height: 100vh;
    max-height: ${(props) => props.$innerHeight};
`;

const DesktopLeft = styled.div`
    position: relative;
    width: 38%;
`;

const PlusButtonContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -50%);
`;

const DesktopRight = styled.div`
    position: relative;
    width: 62%;
`;
