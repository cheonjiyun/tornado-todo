import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body, p, button {
        margin: 0;
        padding: 0;
    }
    body {
        height: 100vh;
        max-height: ${(props: { innerHeight: number }) => props.innerHeight};
        font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    } 
    input, button{        
        font-family: "Pretendard Variable";
    }
`;
