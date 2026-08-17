import { useEffect, useState } from 'react';
import './ProjectCard.css';

type ProjectCardProps = {
  title: string;
  description: string;
  image?: string;
  priority?: boolean;
  link: string;
  technologies?: string[];
  actionLabel?: string;
};

const buildOptimizedVariants = (image?: string) => {
  if (!image || !image.startsWith('/images/portfolio/')) {
    return null;
  }

  const fileName = image.split('/').pop();
  if (!fileName) {
    return null;
  }

  const baseName = fileName.replace(/\.[^/.]+$/, '');

  return {
    webp: `/optimized/portfolio/${baseName}-640.webp 640w, /optimized/portfolio/${baseName}-960.webp 960w, /optimized/portfolio/${baseName}-1280.webp 1280w`,
    jpg: `/optimized/portfolio/${baseName}-640.jpg 640w, /optimized/portfolio/${baseName}-960.jpg 960w, /optimized/portfolio/${baseName}-1280.jpg 1280w`,
    fallback: `/optimized/portfolio/${baseName}-960.jpg`,
  };
};

const ProjectCard = ({
  title,
  description,
  image,
  priority = false,
  link,
  technologies,
  actionLabel = 'Ver projeto',
}: ProjectCardProps) => {
  const variants = buildOptimizedVariants(image);
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [image]);

  return (
    <article className="project-card">
      {image && !hasImageError && (
        <div className="project-card__media">
          <picture>
            {variants?.webp && <source type="image/webp" srcSet={variants.webp} sizes="(max-width: 900px) 100vw, 33vw" />}
            {variants?.jpg && <source type="image/jpeg" srcSet={variants.jpg} sizes="(max-width: 900px) 100vw, 33vw" />}
            <img
              src={variants?.fallback ?? image}
              alt={title}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={priority ? 'high' : 'low'}
              onError={() => setHasImageError(true)}
            />
          </picture>
        </div>
      )}
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
