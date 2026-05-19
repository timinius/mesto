import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import EditProfilePopup from "./components/EditProfilePopup.jsx";
import AddPlacePopup from "./components/AddPlacePopup.jsx";
import EditAvatarPopup from "./components/EditAvatarPopup.jsx";
import ImagePopup from "./components/ImagePopup.jsx";
import StatsPopup from "./components/StatsPopup.jsx";
import {
  getUserInfo,
  getCardList,
  setUserInfo,
  updateAvatar,
  addCard,
  deleteCardRequest,
  changeLikeCardStatus,
} from "./utils/api.js";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isStatsPopupOpen, setIsStatsPopupOpen] = useState(false);
  const [statsCards, setStatsCards] = useState([]);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [isCardLoading, setIsCardLoading] = useState(false);

  useEffect(() => {
    Promise.all([getUserInfo(), getCardList()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsStatsPopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsProfileLoading(true);
    setUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsProfileLoading(false));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsAvatarLoading(true);
    updateAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsAvatarLoading(false));
  };

  const handleAddPlace = ({ name, link }) => {
    setIsCardLoading(true);
    addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsCardLoading(false));
  };

  const handleCardLike = (card, isLiked) => {
    changeLikeCardStatus(card._id, isLiked)
      .then((updatedCard) => {
        setCards((state) =>
          state.map((c) => (c._id === updatedCard._id ? updatedCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    deleteCardRequest(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  const handleLogoClick = () => {
    getCardList()
      .then((cardsData) => {
        setStatsCards(cardsData);
        setIsStatsPopupOpen(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page__content">
      <Header onLogoClick={handleLogoClick} />
      <Main
        currentUser={currentUser}
        cards={cards}
        onEditProfile={() => setIsEditProfilePopupOpen(true)}
        onAddPlace={() => setIsAddPlacePopupOpen(true)}
        onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
        onCardPreview={setSelectedCard}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        isLoading={isProfileLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        isLoading={isCardLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isAvatarLoading}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <StatsPopup
        isOpen={isStatsPopupOpen}
        onClose={closeAllPopups}
        cards={statsCards}
      />
    </div>
  );
}

export default App;
