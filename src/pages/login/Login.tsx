import { useState } from "react";
import { LoginFirst } from "./LoginFirst";
import { LoginInputPassword } from "./LoginInputPassword";
import { Signup } from "./Signup";
import { useNavigate } from "react-router-dom";
import { LoginSuccess } from "./LoginSuccess";

export const Login = () => {
    const navigate = useNavigate();

    const [loginData, setDate] = useState({ email: "", paasword: "" });
    const [loginState, setLoginState] = useState<
        "first" | "inputPassword" | "signUp" | "loginSuccess"
    >("first");

    return (
        <div>
            {loginState === "first" && (
                <LoginFirst
                    onBefore={() => navigate(-1)}
                    setData={(data) => setDate(data)}
                    onNext={(page) => setLoginState(page)}
                />
            )}
            {loginState === "inputPassword" && (
                <LoginInputPassword
                    onBefore={() => setLoginState("first")}
                    onNext={() => setLoginState("loginSuccess")}
                />
            )}
            {loginState === "signUp" && (
                <Signup
                    onBefore={() => setLoginState("first")}
                    onNext={() => setLoginState("loginSuccess")}
                />
            )}
            {loginState === "loginSuccess" && <LoginSuccess />}
        </div>
    );
};
