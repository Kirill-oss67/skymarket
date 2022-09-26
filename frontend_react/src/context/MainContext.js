import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import useAxios from "../utils/useAxios";
import AuthContext from "./AuthContext";

const MainContext = createContext();

export default MainContext;

export const MainContextStates = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [isPopupNavigatorOpen, setIsPopupNavigatorOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isEditPhotoPopupOpen, setIsEditPhotoPopupOpen] = useState(false);
  const [isUserPhotoPopupOpen, setIsUserPhotoPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const api = useAxios();
  let { authTokens } = useContext(AuthContext);
  const BASE_URL = "http://127.0.0.1:8000/api";
  const BASE_URL_OPEN = `${BASE_URL}/ads/?`;
  const BASE_URL_ADS = `/api/ads/?`;

  //Open/close navigation when page's size max-width 840px

  const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  const handleResponseData = (res) => {
    if (res.ok) {
      return res.data;
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  const handleOpenPopup = () => {
    setIsPopupNavigatorOpen(true);
  };

  const handleOpenEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const handleOpenEditPhotoPopup = () => {
    setIsEditPhotoPopupOpen(true);
  };
  const handleOpenUserPhotoPopup = () => {
    setIsUserPhotoPopupOpen(true);
  };

  const closePopup = () => {
    setIsEditPopupOpen(false);
    setIsEditPhotoPopupOpen(false);
    setIsUserPhotoPopupOpen(false);
    setIsPopupNavigatorOpen(false);
  };
  //user
  const getUserInfo = async () => {
    return await api.get(`${BASE_URL}/users/me/`);
  };

  const updateUser = async (data) => {
    return await fetch(`${BASE_URL}/users/me/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
      }),
    }).then(handleResponse());
  };
  const updateUserPhoto = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    return await axios
      .patch(`${BASE_URL}/users/me/`, formData, {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then(handleResponse);
  };
  //comments
  const getComments = async (ad_pk) => {
    return await api.get(`${BASE_URL}/ads/${ad_pk}/comments/`);
  };

  const getComment = async (adId, commentId) => {
    return await api.get(`${BASE_URL}/ads/${adId}/comments/${commentId}/`);
  };

  const addComment = async (id, text) => {
    return await fetch(`${BASE_URL}/ads/${id}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(text),
    }).then(handleResponse);
  };

  const editComment = async (adId, commentId, data) => {
    return await fetch(`${BASE_URL}/ads/${adId}/comments/${commentId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(data),
    }).then(handleResponse);
  };

  const deleteComment = async (adId, commentId) => {
    return await fetch(`${BASE_URL}/ads/${adId}/comments/${commentId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
  };
  //ads
  const getHiddenAds = (page) => {
    return api.get(BASE_URL_ADS + `page=${page}`);
  };

  const getHiddenAdsTile = (page, ad) => {
    return api.get(BASE_URL_ADS + `page=${page}&title=${ad}`);
  };

  const getUsersAds = async (page) => {
    return await api.get(`${BASE_URL}/ads/me/?page=${page}`);
  };

  const getAd = async (id) => {
    return await api.get(`${BASE_URL}/ads/${id}/`);
  };

  const getAds = (page) => {
    return fetch(BASE_URL_OPEN + `page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  };

  const getAdsTitle = (ad, page) => {
    return fetch(BASE_URL_OPEN + `title=${ad}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  };

  //add new ad
  const addAd = async ({ image, title, price, description }) => {
    const url = "http://127.0.0.1:8000/api/ads/";
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", `${title}`);
    formData.append("price", `${price}`);
    formData.append("description", `${description}`);

    return await await axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then(handleResponseData);
  };

  //edit ad
  const editAdd = async (id, data) => {
    return await fetch(`${BASE_URL}/ads/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(data),
    }).then(handleResponse);
  };

  const editAddPhoto = async (id, image) => {
    const formData = new FormData();
    formData.append("image", image);
    return await axios
      .patch(`${BASE_URL}/ads/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then(handleResponse);
  };

  //delite add
  const deleteAdd = async (id) => {
    return await fetch(`${BASE_URL}/ads/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
  };

  const mainData = {
    ads: ads,
    isLoading: isLoading,
    isEditPopupOpen: isEditPopupOpen,
    isEditPhotoPopupOpen: isEditPhotoPopupOpen,
    isUserPhotoPopupOpen: isUserPhotoPopupOpen,
    isPopupNavigatorOpen: isPopupNavigatorOpen,
    setAds: setAds,
    getAdsTitle: getAdsTitle,
    setIsLoading: setIsLoading,
    getUsersAds: getUsersAds,
    getUserInfo: getUserInfo,
    updateUser: updateUser,
    updateUserPhoto: updateUserPhoto,
    getHiddenAds: getHiddenAds,
    getHiddenAdsTile: getHiddenAdsTile,
    getAds: getAds,
    getComments: getComments,
    getComment: getComment,
    addComment: addComment,
    editComment: editComment,
    deleteComment: deleteComment,
    getAd: getAd,
    addAd: addAd,
    editAdd: editAdd,
    editAddPhoto: editAddPhoto,
    deleteAdd: deleteAdd,
    handleOpenEditPopup: handleOpenEditPopup,
    handleOpenEditPhotoPopup: handleOpenEditPhotoPopup,
    handleOpenUserPhotoPopup: handleOpenUserPhotoPopup,
    handleOpenPopup: handleOpenPopup,
    closePopup: closePopup,
  };

  return (
    <MainContext.Provider value={mainData}>{children}</MainContext.Provider>
  );
};
