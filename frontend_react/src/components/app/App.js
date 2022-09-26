import React, { useEffect, useContext } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import MainContext from "../../context/MainContext";
import Footer from "../footer/Footer";
import PopupNavigation from "../popopNavigation/PopupNavigation";
import Header from "../header/Header";
import Registration from "../registration/Registration";
import Login from "../login/Login";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Main from "../main/Main";
import UserProfile from "../userProfile/UserProfile";
import SinglePage from "../singlePage/SinglePage";
import NewAdd from "../newAdd/NewAdd";
import EmailLink from "../emailLink/EmailLink";
import ChangePassword from "../changePassword/ChangePassword";

function App() {
  const { closePopup, isPopupNavigatorOpen, handleOpenPopup } =
    useContext(MainContext);
  let history = useHistory();

  useEffect(() => {
    //обработчик закрытия попапов по нажатия на ESC и overlay
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    const handleCloseByOverlay = (evt) => {
      //обработчик для закртия popup по кнопке и overlay
      if (
        evt.target.classList.contains("popup_is-opened") ||
        evt.target.classList.contains("popup")
      ) {
        closePopup();
      }
    };

    document.addEventListener("click", handleCloseByOverlay);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("click", handleCloseByOverlay);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [closePopup]);

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("userPers");
    window.location.reload();
    history.push("/sign-in");
  };

  return (
    <div className="app">
      <Header onOpen={handleOpenPopup} logOut={logoutUser} />
      <Switch>
        <Route exact path="/sign-in" component={Login} />
        <Route exact path="/sign-up">
          <Registration />
        </Route>
        <Route exact path="/sign-in/email/" component={EmailLink} />
        <Route
          exact
          path="/password/reset/confirm/:Ng/:id/"
          component={ChangePassword}
        />
        <PrivateRoute exact path="/profile/" component={UserProfile} />
        <PrivateRoute exact path="/ads/:id" component={SinglePage} />
        <PrivateRoute exact path="/profile/ads/:id/" component={SinglePage} />
        <PrivateRoute exact path="/newAd" component={NewAdd} />
        <Route exact path="/" component={Main} />
      </Switch>
      <Footer />
      <PopupNavigation
        onClose={closePopup}
        isOpen={isPopupNavigatorOpen}
        logOut={logoutUser}
      />
    </div>
  );
}

export default App;
