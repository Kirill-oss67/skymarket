import React from "react";
import MediaQuery from "react-responsive";
import Navigation from "../navigation/Navigation";

function Button({ logOut, text, className, user }) {
  return (
    <div className="nav-container">
      <MediaQuery and minWidth={1000}>
        {user ? (
          <>
            <Navigation user={user} />
            <button className={className} type="button" onClick={logOut}>
              {text}
            </button>
          </>
        ) : (
          <button className={className} type="button" onClick={logOut}>
            {text}
          </button>
        )}
      </MediaQuery>
      <MediaQuery and maxWidth={999}>
        <button className={className} type="button" onClick={logOut}>
          {text}
        </button>
      </MediaQuery>
    </div>
  );
}

export default Button;
