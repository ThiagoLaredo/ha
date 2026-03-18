import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { getProjects } from '../services/projects';
import type { Project } from '../types/project';
import './Portfolio.css';

const Portfolio = () => {
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
		<section className="portfolio-page" aria-labelledby="portfolio-title">
			<div className="portfolio-page__container">
				<h1 id="portfolio-title">Portfólio</h1>
				<p className="portfolio-page__intro">
					Conheça alguns dos projetos desenvolvidos pela nossa equipe.
				</p>

				{loading && <p>Carregando projetos...</p>}
				{error && <p>Erro: {error}</p>}

				{!loading && !error && (
					<div className="portfolio-grid">
						{projects.map((project) => (
							<ProjectCard
								key={project.id}
								title={project.title}
								description={project.description}
								link={project.link}
								technologies={project.technologies}
								actionLabel="Acessar projeto"
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Portfolio;
