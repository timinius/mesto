function Card({ card, currentUserId, onPreviewPicture, onLike, onDelete }) {
  const isLiked = card.likes.some((like) => like._id === currentUserId);
  const isOwner = card.owner._id === currentUserId;

  return (
    <li className="places__item card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => onPreviewPicture(card)}
      />
      <div className="card__control">
        {isOwner && (
          <button
            type="button"
            className="card__control-button card__control-button_type_delete"
            onClick={() => onDelete(card)}
          />
        )}
      </div>
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes">
          <button
            type="button"
            className={`card__like-button ${isLiked ? "card__like-button_is-active" : ""}`}
            onClick={() => onLike(card, isLiked)}
          />
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
