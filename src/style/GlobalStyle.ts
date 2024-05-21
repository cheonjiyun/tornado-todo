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
    button{
        border: 0;
        background: none;
    }

    @keyframes showSmooth {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }

    @keyframes outSmooth {
        from{
            opacity: 1;
        }
        to{
            opacity: 0;
        }
    }


    @keyframes upSmooth {
        from{
            transform: translateY(100%);
        }
        to{
            transform: translateY(0);
        }
        
    }

    @keyframes downSmooth {
        from{
            transform: translateY(0);
        }
        to{
            transform: translateY(100%);
        }
        
    }
`;
