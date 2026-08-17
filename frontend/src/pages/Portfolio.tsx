import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { getProjects } from '../services/projects';
import type { Project } from '../types/project';
import './Portfolio.css';

const getPreloadData = (image?: string) => {
	if (!image) {
		return null;
	}

	if (!image.startsWith('/images/portfolio/')) {
		return { href: image };
	}

	const fileName = image.split('/').pop();
	if (!fileName) {
		return null;
	}

	const baseName = fileName.replace(/\.[^/.]+$/, '');

	return {
		href: `/optimized/portfolio/${baseName}-960.jpg`,
		imageSrcSet:
			`/optimized/portfolio/${baseName}-640.webp 640w, ` +
			`/optimized/portfolio/${baseName}-960.webp 960w, ` +
			`/optimized/portfolio/${baseName}-1280.webp 1280w`,
		imageSizes: '(max-width: 900px) 100vw, 33vw',
	};
};

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

	useEffect(() => {
		if (loading || error || !projects.length) {
			return;
		}

		const firstWithImage = projects.find((project) => Boolean(project.image));
		if (!firstWithImage?.image) {
			return;
		}

		const preloadData = getPreloadData(firstWithImage.image);
		if (!preloadData) {
			return;
		}

		const preloadLink = document.createElement('link');
		preloadLink.rel = 'preload';
		preloadLink.as = 'image';
		preloadLink.href = preloadData.href;

		if (preloadData.imageSrcSet) {
			preloadLink.setAttribute('imagesrcset', preloadData.imageSrcSet);
		}

		if (preloadData.imageSizes) {
			preloadLink.setAttribute('imagesizes', preloadData.imageSizes);
		}

		document.head.appendChild(preloadLink);

		return () => {
			document.head.removeChild(preloadLink);
		};
	}, [loading, error, projects]);

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
						{projects.map((project, index) => (
							<ProjectCard
								key={project.id}
								title={project.title}
								description={project.description}
								image={project.image}
								priority={index === 0}
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
