import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import MainContext from "../../context/MainContext";
import Promo from "../promo/Promo";
import Preloader from "../preloader/Preloader";
import Cards from "../cards/Cards";

function Main(props) {
  const [pageQty, setPageQty] = useState(0);
  const [ad, setAd] = useState("");
  const [adsDefault, setAdsDefault] = useState([]);
  const [page, setPage] = useState(props.location.search?.split("=")[1] || 1);
  let { user } = useContext(AuthContext);
  let {
    ads,
    setAds,
    setIsLoading,
    isLoading,
    getHiddenAds,
    getAds,
    getAdsTitle,
    getHiddenAdsTile,
  } = useContext(MainContext);

  useEffect(() => {
    setIsLoading(true);
    user && ad
      ? getHiddenAdsTile(page, ad)
          .then((response) => {
            setAds(response.data.results);
            setPageQty(Math.round(response.data.count / 4));
          })
          .catch((error) => console.log("error", error))
          .finally(() => setTimeout(() => setIsLoading(false), 500))
      : user
      ? getHiddenAds(page)
          .then((response) => {
            setAds(response.data.results);
            setPageQty(Math.round(response.data.count / 4));
          })
          .catch((error) => console.log("error", error))
          .finally(() => setTimeout(() => setIsLoading(false), 500))
      : ad.length
      ? getAdsTitle(ad, page)
          .then((data) => {
            setAdsDefault(data.results);
            setPageQty(Math.round(data.count / 4));
          })
          .catch((error) => console.log("error", error))
          .finally(() => setTimeout(() => setIsLoading(false), 500))
      : getAds(page)
          .then((data) => {
            setAdsDefault(data.results);
            setPageQty(Math.round(data.count / 4));
          })
          .catch((error) => console.log("error", error))
          .finally(() => setTimeout(() => setIsLoading(false), 500));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, user, ad, props.history]);

  useEffect(() => {
    setPage(props.location.search?.split("=")[1] || 1);
  }, [ad.length, props.location.search]);

  const allAds = user ? ads : adsDefault;
  return (
    <main className="main">
      <Promo
        pageQty={pageQty}
        setPage={setPage}
        page={page}
        ad={ad}
        setAd={setAd}
        user={user}
      />
      {isLoading ? (
        <Preloader />
      ) : allAds.length === 0 ? (
        <p className="error-paragraph">По Вашему запросу ничего не найденно</p>
      ) : (
        <Cards ads={user ? ads : adsDefault} />
      )}
    </main>
  );
}

export default Main;
