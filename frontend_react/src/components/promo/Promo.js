import React from "react";
import MediaQuery from "react-responsive";
import SearchForm from "../searchForm/SearchForm";
import PaginationComponent from "../paginationComponent/PaginationComponent";

function Promo({ pageQty, ad, setAd, user, setPage, page }) {
  return (
    <section className="promo">
      <MediaQuery minWidth={801}>
        <div className="promo__box">
          <div className="promo__title-box">
            <h2 className="promo__title">ADS-ONLINE</h2>
            <p className="promo__subtitle">
              Лучшая платформа для продажи вещей
            </p>
          </div>
          <SearchForm ad={ad} setAd={setAd} user={user} page={page} />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <h2 className="promo__title">ADS-ONLINE</h2>
        <p className="promo__subtitle">Лучшая платформа для продажи вещей</p>
        <SearchForm ad={ad} setAd={setAd} user={user} page={page} />
      </MediaQuery>
      <PaginationComponent pageQty={pageQty} setPage={setPage} page={page} />
    </section>
  );
}

export default Promo;
