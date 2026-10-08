import { useEffect, useState } from 'react';
import './Contact.css';

const content = {
  pt: {
    title: 'Contato',
    intro: 'Fale com a gente para tirar duvidas, compartilhar seu projeto e iniciar uma conversa.',
    nameLabel: 'Nome',
    emailLabel: 'E-mail',
    brandLabel: 'Marca ou empresa',
    messageLabel: 'Mensagem',
    submit: 'Enviar mensagem',
  },
  en: {
    title: 'Contact',
    intro: 'Get in touch to ask questions, share your project and start a conversation.',
    nameLabel: 'Name',
    emailLabel: 'Email',
    brandLabel: 'Brand or company',
    messageLabel: 'Message',
    submit: 'Send message',
  },
} as const;

const Contact = () => {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  useEffect(() => {
    const updateLanguage = () => {
      const htmlLang = document.documentElement.lang.toLowerCase();
      setLanguage(htmlLang.startsWith('en') ? 'en' : 'pt');
    };

    updateLanguage();

    const observer = new MutationObserver(updateLanguage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  const text = content[language];

  return (
    <main className="contact-page" aria-labelledby="contact-title">
      <section className="contact-page__shell">
        <header className="contact-page__header">
          <h1 id="contact-title">{text.title}</h1>
          <p>{text.intro}</p>
        </header>

        <form className="contact-form" action="#" method="post">
          <label className="contact-form__field" htmlFor="name">
            <span>{text.nameLabel}</span>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </label>

          <label className="contact-form__field" htmlFor="email">
            <span>{text.emailLabel}</span>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </label>

          <label className="contact-form__field" htmlFor="brand">
            <span>{text.brandLabel}</span>
            <input id="brand" name="brand" type="text" autoComplete="organization" />
          </label>

          <label className="contact-form__field" htmlFor="message">
            <span>{text.messageLabel}</span>
            <textarea id="message" name="message" rows={6} required />
          </label>

          <button className="contact-form__submit" type="submit">
            {text.submit}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
