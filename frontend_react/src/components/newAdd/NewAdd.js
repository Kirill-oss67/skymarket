import React, { useContext } from "react";
import MainContext from "../../context/MainContext";
import AddCard from "../addCard/AddCard";

function NewAdd() {
  const { addAd, setAds, ads, isLoading, setIsLoading } =
    useContext(MainContext);

  function handleAddAd(data) {
    setIsLoading(true);
    addAd(data)
      .then((newAd) => {
        setAds([newAd, ...ads]);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setTimeout(() => setIsLoading(false), 500));
  }
  return (
    <main className="main">
      <AddCard handleAddAd={handleAddAd} isLoading={isLoading} />
    </main>
  );
}

export default NewAdd;
