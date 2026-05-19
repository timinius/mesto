import logoSrc from "../images/logo.svg";

function Header({ onLogoClick }) {
  return (
    <header className="header page__section">
      <img
        src={logoSrc}
        alt="Логотип проекта место"
        className="logo header__logo"
        onClick={onLogoClick}
        style={{ cursor: "pointer" }}
      />
    </header>
  );
}

export default Header;
