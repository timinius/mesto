import Card from "./Card.jsx";

function Main({
  currentUser,
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardPreview,
  onCardLike,
  onCardDelete,
}) {
  return (
    <main className="content">
      <section className="profile page__section">
        <div
          className="profile__image"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUserId={currentUser._id}
              onPreviewPicture={onCardPreview}
              onLike={onCardLike}
              onDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
