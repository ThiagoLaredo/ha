import './ProjectCard.css';

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  technologies?: string[];
  actionLabel?: string;
};

const ProjectCard = ({
  title,
  description,
  link,
  technologies,
  actionLabel = 'Ver projeto',
}: ProjectCardProps) => {
  return (
    <article className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {technologies && technologies.length > 0 && (
        <ul className="project-card__tags">
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      )}
      <a href={link} target="_blank" rel="noreferrer">
        {actionLabel}
      </a>
    </article>
  );
};

export default ProjectCard;
