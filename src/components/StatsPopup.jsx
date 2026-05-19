import Popup from "./Popup.jsx";

const formatDate = (date) =>
  date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function StatsPopup({ isOpen, onClose, cards }) {
  const hasCards = cards && cards.length > 0;

  const uniqueAuthors = hasCards
    ? [...new Map(cards.map((card) => [card.owner._id, card.owner])).values()]
    : [];

  return (
    <Popup
      name="info"
      isOpen={isOpen}
      onClose={onClose}
      contentClass="popup__content_content_info"
    >
      <h3 className="popup__title">Статистика пользователей</h3>
      {hasCards && (
        <>
          <dl className="popup__info">
            <div className="popup__info-item">
              <dt className="popup__info-term">Всего карточек:</dt>
              <dd className="popup__info-description">{cards.length}</dd>
            </div>
            <div className="popup__info-item">
              <dt className="popup__info-term">Первая создана:</dt>
              <dd className="popup__info-description">
                {formatDate(new Date(cards[cards.length - 1].createdAt))}
              </dd>
            </div>
            <div className="popup__info-item">
              <dt className="popup__info-term">Последняя создана:</dt>
              <dd className="popup__info-description">
                {formatDate(new Date(cards[0].createdAt))}
              </dd>
            </div>
          </dl>
          <h4 className="popup__text">Авторы карточек:</h4>
          <ul className="popup__list">
            {uniqueAuthors.map((user) => (
              <li
                key={user._id}
                className="popup__list-item popup__list-item_type_badge"
                style={{ backgroundImage: `url(${user.avatar})` }}
                title={user.name}
              />
            ))}
          </ul>
        </>
      )}
    </Popup>
  );
}

export default StatsPopup;
