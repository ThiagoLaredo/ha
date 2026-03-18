import './UnderConstruction.css';

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 6.75h16A1.25 1.25 0 0 1 21.25 8v8A1.25 1.25 0 0 1 20 17.25H4A1.25 1.25 0 0 1 2.75 16V8A1.25 1.25 0 0 1 4 6.75Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m3.5 8.25 7.646 5.57a1.5 1.5 0 0 0 1.708 0L20.5 8.25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect
      x="3.25"
      y="3.25"
      width="17.5"
      height="17.5"
      rx="5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle
      cx="12"
      cy="12"
      r="4.2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle cx="17.35" cy="6.65" r="1.2" fill="currentColor" />
  </svg>
);

const UnderConstruction = () => {
  return (
    <main className="construction-page">
      <picture className="construction-page__media" aria-hidden="true">
        <source
          type="image/webp"
          srcSet={[
            '/optimized/background-landing-640.webp 640w',
            '/optimized/background-landing-1024.webp 1024w',
            '/optimized/background-landing-1600.webp 1600w',
            '/optimized/background-landing-2200.webp 2200w',
          ].join(', ')}
          sizes="100vw"
        />
        <source
          type="image/jpeg"
          srcSet={[
            '/optimized/background-landing-640.jpg 640w',
            '/optimized/background-landing-1024.jpg 1024w',
            '/optimized/background-landing-1600.jpg 1600w',
            '/optimized/background-landing-2200.jpg 2200w',
          ].join(', ')}
          sizes="100vw"
        />
        <img
          className="construction-page__background"
          src="/optimized/background-landing-1600.jpg"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </picture>

      <div className="construction-page__overlay" />

      <section className="construction-page__content" aria-label="Site em construção">
        <img
          className="construction-page__logo construction-page__enter-item"
          src="/logo-branco.svg"
          alt="Helena Augusta logo"
        />

        <h1 className="construction-page__enter-item">Site em construção</h1>

        <div
          className="construction-page__socials construction-page__enter-item"
          aria-label="Canais de contato"
        >
          <a
            className="construction-page__icon-link"
            href="mailto:contato@helenaaugusta.com"
            aria-label="Enviar email para contato@helenaaugusta.com"
          >
            <EmailIcon />
          </a>

          <a
            className="construction-page__icon-link"
            href="https://www.instagram.com/helenaaugustacomunicacao/"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir Instagram da Helena Augusta"
          >
            <InstagramIcon />
          </a>
        </div>
      </section>
    </main>
  );
};

export default UnderConstruction;