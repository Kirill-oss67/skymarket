import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);
  const BASE_URL = "http://127.0.0.1:8000/api";

  const history = useHistory();
  //login
  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch(`${BASE_URL}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
      window.location.reload();
    } else if (response.status === 500) {
      console.log("Неполадки на сервере");
    } else if (response.status === 401) {
      console.log("введен неккоректный email или пароль");
    } else {
      console.log(response.status);
    }
  };
  //registration
  const register = async (e) => {
    e.preventDefault();
    let response = await fetch(`${BASE_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        phone: e.target.phone.value,
      }),
    });

    if (response.status === 201) {
      history.push("/sign-in");
    } else if (response.status === 500) {
      console.log("Неполадки на сервере");
    } else {
      console.log(response.status);
    }
  };
  //send link to the email
  const sendLink = async (email) => {
    return await fetch(`${BASE_URL}/users/reset_password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
  };
  //change password
  const changePassword = (data) => {
    return fetch(`${BASE_URL}/users/reset_password_confirm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    register: register,
    sendLink: sendLink,
    changePassword: changePassword,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
