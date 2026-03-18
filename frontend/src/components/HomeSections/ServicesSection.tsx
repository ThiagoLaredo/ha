import './ServicesSection.css';

const services = [
  'Criação de sites institucionais',
  'Landing pages para campanhas',
  'Design de interfaces (UI)',
  'Manutenção e evolução contínua',
];

const ServicesSection = () => {
  return (
    <section className="home-section home-section--light" aria-labelledby="services-title">
      <div className="home-section__container">
        <h2 id="services-title">O que fazemos</h2>
        <ul className="services-list">
          {services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServicesSection;
