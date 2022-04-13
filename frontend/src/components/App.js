import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as authApi from '../utils/authApi';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({ name: "Имя пользователя", about: "О себе"});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    api.getCards(token)
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => {
        console.log('err', err);
    })

    api.getUserInfo(token)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log('err', err);
    })
  }, [isLoggedIn]);

  useEffect(() => {
    tokenCheck()
  }, [isLoggedIn])

  useEffect(() => {
    if(isLoggedIn)
    history.push('/');
  }, [isLoggedIn])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    authApi.getUser(jwt)
      .then((res) => {
        if (res.data.email) {
          setUserEmail(res.data.email);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('jwt');
        }
      })
      .catch((err) => {
        console.log('err', err);
        localStorage.removeItem('jwt');
      });
  };

  function handleCardLike(card) {
    const jwt = localStorage.getItem('jwt');

    const isLiked = card.likes.some(id => id === currentUser._id); // проверяем, есть ли уже лайк на этой карточке
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.setLike(card._id, jwt)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
        })
        .catch((err) => {
          console.log('Ошибка', err);
      })
    } else {
      api.deleteLike(card._id, jwt)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => {
        console.log('Ошибка', err);
    })
    }
  }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem('jwt');

    api.deleteCard(card._id, jwt)
      .then(() => {
        const newCards = cards.filter((c) => card._id !== c._id )
        setCards(newCards)
      })
      .catch((err) => {
        console.log('err', err);
    })
  }
  
  function handleOpenPopupEditAvatar() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false)
  }

    function handleClosePopup(e) {
    if ( e.target === e.currentTarget ) {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(name, about) {
    const jwt = localStorage.getItem('jwt');

    api.editProfile(name, about, jwt)
    .then((res) => {
      setCurrentUser(res.data);
      setIsEditProfilePopupOpen(false);
    })
    .catch((err) => {
      console.log('err', err);
    })
  }

  function handleUpdateAvatar(link) {
    const jwt = localStorage.getItem('jwt');

    api.updateAvatar(link, jwt)
    .then((res) => {
      setCurrentUser(res.data);
      setIsEditAvatarPopupOpen(false);
    })
    .catch((err) => {
      console.log('err', err);
    })
  }

  function handleAddPlace(cardName, cardLink) {
    const jwt = localStorage.getItem('jwt');

    api.addNewCard(cardName, cardLink, jwt)
    .then((newCard) => {
      setCards([newCard.data, ...cards])
      setIsAddPlacePopupOpen(false);
    })
    .catch((err) => {
      console.log('err', err);
    })
  }
  
  function onLogin(data) {
    authApi
      .authorize(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token)
          setIsLoggedIn(true);
        } else {
          setIsSuccess(false)
          setIsInfoTooltipOpen(true)
        }
      })
      .catch((err) => {
        setIsSuccess(false)
        setIsInfoTooltipOpen(true)
        console.log('err', err);
      })

  }

  function onRegister(userInfo) {
    return authApi
      .register(userInfo)
      .then((res) => {
        if (res.data._id) {
          setIsSuccess(true)
          setIsInfoTooltipOpen(true)
          history.push('/sign-in');
        }
        else {
          setIsSuccess(false)
          setIsInfoTooltipOpen(true)
        }
      })
      .catch((err) => {
        console.log('err', err);
        setIsSuccess(false)
        setIsInfoTooltipOpen(true)
      })
  }

  function onLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
 
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        <Header userEmail={userEmail} onLogout={onLogout} onLogin={onLogin}/>
        <Switch>
          <ProtectedRoute
            exact 
            path="/"
            isLoggedIn={isLoggedIn}
            cards={cards} 
            onCardLike={handleCardLike} 
            onCardDelete={handleCardDelete} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleOpenPopupEditAvatar} 
            onCardClick={handleCardClick}
            component={Main}>
            
          </ProtectedRoute>
          <Route path="/sign-in">
            <Login onLogin ={onLogin}/>
          </Route>
          <Route path="/sign-up">
            <Register onRegister={onRegister}></Register>
          </Route>
        </Switch>
        <Footer/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleClosePopup} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handleClosePopup} onAddPlace={handleAddPlace}/>
        {/* <PopupWithForm name="delete-card" title="Вы уверены?" textButton="Да" isOpen={false} onClose={handleClosePopup}>
        </PopupWithForm> */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handleClosePopup} onUpdateAvatar={handleUpdateAvatar}>
        </EditAvatarPopup>
        <ImagePopup card={selectedCard} onClose={handleClosePopup}/>
        <InfoTooltip isOpen={isInfoTooltipOpen} isSuccess={isSuccess} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;