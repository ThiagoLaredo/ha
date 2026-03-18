import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../ProjectCard/ProjectCard';
import { getProjects } from '../../services/projects';
import type { Project } from '../../types/project';
import './RecentWorksSection.css';

const RecentWorksSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getProjects()
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="home-section home-section--light" aria-labelledby="recent-works-title">
      <div className="home-section__container">
        <h2 id="recent-works-title">Trabalhos recentes</h2>
        {loading && <p className="recent-works-feedback">Carregando projetos...</p>}
        {error && <p className="recent-works-feedback">Erro: {error}</p>}

        {!loading && !error && (
          <>
            <div className="recent-works-grid">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  link={project.link}
                />
              ))}
            </div>
            <div className="recent-works-footer">
              <Link className="recent-works-all" to="/portfolio">
                Ver todos
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RecentWorksSection;
