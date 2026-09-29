import { useEffect, useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { getProjects } from '../services/projects';
import type { Project } from '../types/project';
import './Portfolio.css';

const SEGMENTS = ['Todos', 'Artes e Cultura', 'Beleza e Saúde', 'Design', 'Moda e Lifestyle'] as const;
const SERVICES = ['Todos', 'Marcas', 'Eventos', 'Produto', 'Mídia'] as const;

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
		imageSizes: '(max-width: 900px) 100vw, 50vw',
	};
};

const Portfolio = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');
	const [selectedSegments, setSelectedSegments] = useState<Array<Exclude<(typeof SEGMENTS)[number], 'Todos'>>>([]);
	const [selectedServices, setSelectedServices] = useState<Array<Exclude<(typeof SERVICES)[number], 'Todos'>>>([]);

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

	const toggleSegment = (segment: (typeof SEGMENTS)[number]) => {
		if (segment === 'Todos') {
			setSelectedSegments([]);
			return;
		}

		setSelectedSegments((currentSegments) =>
			currentSegments.includes(segment)
				? currentSegments.filter((currentSegment) => currentSegment !== segment)
				: [...currentSegments, segment]
		);
	};

	const toggleService = (service: (typeof SERVICES)[number]) => {
		if (service === 'Todos') {
			setSelectedServices([]);
			return;
		}

		setSelectedServices((currentServices) =>
			currentServices.includes(service)
				? currentServices.filter((currentService) => currentService !== service)
				: [...currentServices, service]
		);
	};

	const visibleProjects = useMemo(
		() =>
			projects.filter((project) => {
				const matchesSegment = selectedSegments.length === 0 || selectedSegments.includes(project.segment);
				const matchesService = selectedServices.length === 0 || selectedServices.includes(project.service);

				return matchesSegment && matchesService;
			}),
		[projects, selectedSegments, selectedServices]
	);

	return (
		<section className="portfolio-page" aria-labelledby="portfolio-title">
			<div className="portfolio-page__container">
				<h1 id="portfolio-title">Cases</h1>

				<div className="portfolio-filters" aria-label="Filtros de cases">
					<div className="portfolio-filters__group">
						<span className="portfolio-filters__label">SEGMENTO</span>
						<div className="portfolio-filters__options">
							{SEGMENTS.map((segment) => (
								<button
									key={segment}
									type="button"
									className={`portfolio-filter ${
										(segment === 'Todos' && selectedSegments.length === 0) || selectedSegments.includes(segment as Exclude<(typeof SEGMENTS)[number], 'Todos'>)
											? 'is-active'
											: ''
									}`}
									onClick={() => toggleSegment(segment)}
								>
									{segment}
								</button>
							))}
						</div>
					</div>

					<div className="portfolio-filters__group">
						<span className="portfolio-filters__label">SERVIÇO</span>
						<div className="portfolio-filters__options">
							{SERVICES.map((service) => (
								<button
									key={service}
									type="button"
									className={`portfolio-filter ${
										(service === 'Todos' && selectedServices.length === 0) || selectedServices.includes(service as Exclude<(typeof SERVICES)[number], 'Todos'>)
											? 'is-active'
											: ''
									}`}
									onClick={() => toggleService(service)}
								>
									{service}
								</button>
							))}
						</div>
					</div>
				</div>

				{loading && <p>Carregando projetos...</p>}
				{error && <p>Erro: {error}</p>}

				{!loading && !error && visibleProjects.length === 0 && <p>Nenhum case encontrado com esses filtros.</p>}

				{!loading && !error && visibleProjects.length > 0 && (
					<div className="portfolio-grid">
						{visibleProjects.map((project, index) => (
							<ProjectCard
								key={project.id}
								title={project.title}
								description={project.description}
								image={project.image}
								priority={index === 0}
								link={project.link}
								variant="cases"
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Portfolio;
