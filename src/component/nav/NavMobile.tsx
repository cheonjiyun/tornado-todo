import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { variable } from "../../style/variable";

export const NavMobile = () => {
    const navigate = useNavigate();

    const changePage = (pageName: string) => {
        navigate(pageName);
    };

    const location = useLocation();

    // 네이버게이션 몇번째인지
    const selectOrder = () => {
        if (location.pathname === "/") {
            return 0;
        } else if (location.pathname === "/calendar") {
            return 1;
        } else if (location.pathname === "/category") {
            return 2;
        } else if (location.pathname === "/setting") {
            return 3;
        }
        return -1;
    };

    return (
        <Navigation $selectedLocation={selectOrder()}>
            <NavMenu onClick={() => changePage("/")} selected={location.pathname === "/"}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 10.5C3.17 10.5 2.5 11.17 2.5 12C2.5 12.83 3.17 13.5 4 13.5C4.83 13.5 5.5 12.83 5.5 12C5.5 11.17 4.83 10.5 4 10.5ZM4 4.5C3.17 4.5 2.5 5.17 2.5 6C2.5 6.83 3.17 7.5 4 7.5C4.83 7.5 5.5 6.83 5.5 6C5.5 5.17 4.83 4.5 4 4.5ZM4 16.5C3.17 16.5 2.5 17.18 2.5 18C2.5 18.82 3.18 19.5 4 19.5C4.82 19.5 5.5 18.82 5.5 18C5.5 17.18 4.83 16.5 4 16.5ZM8 19H20C20.55 19 21 18.55 21 18C21 17.45 20.55 17 20 17H8C7.45 17 7 17.45 7 18C7 18.55 7.45 19 8 19ZM8 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H8C7.45 11 7 11.45 7 12C7 12.55 7.45 13 8 13ZM7 6C7 6.55 7.45 7 8 7H20C20.55 7 21 6.55 21 6C21 5.45 20.55 5 20 5H8C7.45 5 7 5.45 7 6Z"
                        fill="currentColor"
                    />
                </svg>
                <p>할일</p>
            </NavMenu>
            <NavMenu
                onClick={() => changePage("/calendar")}
                selected={location.pathname === "/calendar"}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z"
                        fill="currentColor"
                    />
                </svg>
                <p>달력</p>
            </NavMenu>
            <PlusButton></PlusButton>
            <NavMenu
                onClick={() => changePage("/category")}
                selected={location.pathname === "/category"}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 3H4C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4V10C3 10.2652 3.10536 10.5196 3.29289 10.7071C3.48043 10.8946 3.73478 11 4 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V4C11 3.73478 10.8946 3.48043 10.7071 3.29289C10.5196 3.10536 10.2652 3 10 3ZM20 3H14C13.7348 3 13.4804 3.10536 13.2929 3.29289C13.1054 3.48043 13 3.73478 13 4V10C13 10.2652 13.1054 10.5196 13.2929 10.7071C13.4804 10.8946 13.7348 11 14 11H20C20.2652 11 20.5196 10.8946 20.7071 10.7071C20.8946 10.5196 21 10.2652 21 10V4C21 3.73478 20.8946 3.48043 20.7071 3.29289C20.5196 3.10536 20.2652 3 20 3ZM10 13H4C3.73478 13 3.48043 13.1054 3.29289 13.2929C3.10536 13.4804 3 13.7348 3 14V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H10C10.2652 21 10.5196 20.8946 10.7071 20.7071C10.8946 20.5196 11 20.2652 11 20V14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13ZM17 13C17.7826 13 18.548 13.2296 19.2014 13.6603C19.8549 14.091 20.3676 14.7039 20.6761 15.4232C20.9846 16.1424 21.0753 16.9363 20.9371 17.7066C20.7988 18.4769 20.4376 19.1898 19.8983 19.7568C19.3589 20.3239 18.665 20.7202 17.9026 20.8968C17.1402 21.0734 16.3427 21.0225 15.6089 20.7503C14.8752 20.4782 14.2374 19.9967 13.7745 19.3657C13.3117 18.7346 13.0441 17.9816 13.005 17.2L13 17L13.005 16.8C13.0563 15.775 13.4996 14.809 14.2432 14.1017C14.9868 13.3944 15.9738 13 17 13Z"
                        fill="currentColor"
                    />
                </svg>
                <p>카테고리</p>
            </NavMenu>
            <NavMenu
                onClick={() => changePage("/setting")}
                selected={location.pathname === "/setting"}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.4783 12.54C19.5183 12.24 19.5383 11.93 19.5383 11.6C19.5383 11.28 19.5183 10.96 19.4683 10.66L21.4983 9.08C21.5858 9.0079 21.6456 8.9077 21.6675 8.79647C21.6894 8.68524 21.672 8.56987 21.6183 8.47L19.6983 5.15C19.6418 5.04957 19.5516 4.97238 19.4436 4.93211C19.3356 4.89184 19.2168 4.8911 19.1083 4.93L16.7183 5.89C16.2183 5.51 15.6883 5.19 15.0983 4.95L14.7383 2.41C14.7206 2.29553 14.6625 2.19121 14.5744 2.11598C14.4863 2.04075 14.3742 1.9996 14.2583 2H10.4183C10.1783 2 9.98834 2.17 9.94834 2.41L9.58834 4.95C8.99834 5.19 8.45834 5.52 7.96834 5.89L5.57834 4.93C5.35834 4.85 5.10834 4.93 4.98834 5.15L3.07834 8.47C2.95834 8.68 2.99834 8.94 3.19834 9.08L5.22834 10.66C5.17834 10.96 5.13834 11.29 5.13834 11.6C5.13834 11.91 5.15834 12.24 5.20834 12.54L3.17834 14.12C3.09087 14.1921 3.0311 14.2923 3.00922 14.4035C2.98733 14.5148 3.0047 14.6301 3.05834 14.73L4.97834 18.05C5.09834 18.27 5.34834 18.34 5.56834 18.27L7.95834 17.31C8.45834 17.69 8.98834 18.01 9.57834 18.25L9.93834 20.79C9.98834 21.03 10.1783 21.2 10.4183 21.2H14.2583C14.4983 21.2 14.6983 21.03 14.7283 20.79L15.0883 18.25C15.6783 18.01 16.2183 17.69 16.7083 17.31L19.0983 18.27C19.3183 18.35 19.5683 18.27 19.6883 18.05L21.6083 14.73C21.7283 14.51 21.6783 14.26 21.4883 14.12L19.4783 12.54ZM12.3383 15.2C10.3583 15.2 8.73834 13.58 8.73834 11.6C8.73834 9.62 10.3583 8 12.3383 8C14.3183 8 15.9383 9.62 15.9383 11.6C15.9383 13.58 14.3183 15.2 12.3383 15.2Z"
                        fill="currentColor"
                    />
                </svg>

                <p>설정</p>
            </NavMenu>
        </Navigation>
    );
};

type NavigationPropsType = {
    $selectedLocation: number;
};

const Navigation = styled.nav<NavigationPropsType>`
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    border-top: 1px solid #ebebeb;

    &::after {
        content: "";
        position: absolute;
        top: -1px;
        ${(props) =>
            props.$selectedLocation === 0 || props.$selectedLocation === 1
                ? `left: calc((100vw - 4rem) / 4 * ${props.$selectedLocation})`
                : `left: calc((100vw - 4rem) / 4 * ${props.$selectedLocation} + 4rem)`}; // 빨간색 선이 위치할 곳

        width: calc((100vw - 4rem) / 4); // 버튼 하나가 차지하는 가로 크기
        height: 1px;
        background-color: ${variable.navSelectedColor};

        transition: left 0.3s; // 빨간색 선 트랜지션
    }
`;

type NavMenuPropsType = {
    selected: boolean;
};

const NavMenu = styled.nav<NavMenuPropsType>`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 64px;
    font-size: 16px;
    color: ${(props) => (props.selected ? variable.navSelectedColor : variable.navDefaultColor)};
    flex-grow: 1;
    flex-basis: 62px;
    cursor: pointer;

    transition: color 0.2s;
`;

export const PlusButton = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    top: -50%;
    width: 4rem;
    height: 4rem;
    background-color: ${variable.primaryColor};
    border-radius: 100%;
    transition: transform 0.3s;
    cursor: pointer;
    z-index: 1;

    &:hover {
        transform: scale(120%);
    }

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 2px;
        background-color: #f0f5f8;
        transform: translate(-50%, -50%);
        border-radius: 16px;
    }

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 16px;
        background-color: #f0f5f8;
        transform: translate(-50%, -50%);
        border-radius: 16px;
    }
`;
