import './Contact.css';

const Contact = () => {
  return (
    <main className="contact-page" aria-labelledby="contact-title">
      <section className="contact-page__shell">
        <header className="contact-page__header">
          <h1 id="contact-title">Contato</h1>
          <p>
            Fale com a gente para tirar duvidas, compartilhar seu projeto e iniciar
            uma conversa.
          </p>
        </header>

        <form className="contact-form" action="#" method="post">
          <label className="contact-form__field" htmlFor="name">
            <span>Nome</span>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </label>

          <label className="contact-form__field" htmlFor="email">
            <span>Email</span>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </label>

          <label className="contact-form__field" htmlFor="brand">
            <span>Marca ou empresa</span>
            <input id="brand" name="brand" type="text" autoComplete="organization" />
          </label>

          <label className="contact-form__field" htmlFor="message">
            <span>Mensagem</span>
            <textarea id="message" name="message" rows={6} required />
          </label>

          <button className="contact-form__submit" type="submit">
            Enviar mensagem
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
