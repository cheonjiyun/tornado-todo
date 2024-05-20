import { useEffect, useState } from "react";
import { LoginFirst } from "./LoginFirst";
import { LoginInputPassword } from "./LoginInputPassword";
import { Signup } from "./Signup";
import { useNavigate } from "react-router-dom";
import { LoginSuccess } from "./LoginSuccess";
import { auth } from "../../firebase/firebase";
import { User } from "firebase/auth";
export const Login = () => {
    const navigate = useNavigate();

    const [loginEmailData, setEmail] = useState<string>("");
    const [loginState, setLoginState] = useState<
        "first" | "inputPassword" | "signUp" | "loginSuccess"
    >("first");

    const [isLogin, setLogin] = useState<User | null>(null);
    useEffect(() => {
        setLogin(auth.currentUser);
        navigate("/");
    }, []);

    console.log(isLogin);

    return (
        <div>
            {loginState === "first" && (
                <LoginFirst
                    goBefore={() => navigate(-1)}
                    setEmail={(newEmail: string) => setEmail(newEmail)}
                    goNext={(page) => setLoginState(page)}
                />
            )}
            {loginState === "inputPassword" && (
                <LoginInputPassword
                    goBefore={() => setLoginState("first")}
                    goNext={() => setLoginState("loginSuccess")}
                />
            )}
            {loginState === "signUp" && (
                <Signup
                    goBefore={() => setLoginState("first")}
                    emailData={loginEmailData}
                    goNext={() => setLoginState("loginSuccess")}
                />
            )}
            {loginState === "loginSuccess" && <LoginSuccess />}
        </div>
    );
};
