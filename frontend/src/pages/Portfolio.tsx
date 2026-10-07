import { useEffect, useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { getProjects } from '../services/projects';
import type { Project, ProjectSegment, ProjectService } from '../types/project';
import './Portfolio.css';

const content = {
	pt: {
		intro: 'Seleção de trabalhos construídos na interseção entre estratégia, cultura, influência e negócio.',
		filtersLabel: 'Filtros de cases',
		segmentLabel: 'SEGMENTO',
		serviceLabel: 'SERVIÇO',
		segments: [
			{ label: 'Todos', value: null as ProjectSegment | null },
			{ label: 'Artes e Cultura', value: 'Artes e Cultura' as const },
			{ label: 'Beleza e Saúde', value: 'Beleza e Saúde' as const },
			{ label: 'Design', value: 'Design' as const },
			{ label: 'Moda e Lifestyle', value: 'Moda e Lifestyle' as const },
		],
		services: [
			{ label: 'Todos', value: null as ProjectService | null },
			{ label: 'Marcas', value: 'Marcas' as const },
			{ label: 'Eventos', value: 'Eventos' as const },
			{ label: 'Produto', value: 'Produto' as const },
			{ label: 'Mídia', value: 'Mídia' as const },
		],
		loading: 'Carregando projetos...',
		errorPrefix: 'Erro:',
		emptyState: 'Nenhum case encontrado com esses filtros.',
	},
	en: {
		intro: 'A selection of works built at the intersection of strategy, culture, influence and business.',
		filtersLabel: 'Case filters',
		segmentLabel: 'SEGMENT',
		serviceLabel: 'SERVICE',
		segments: [
			{ label: 'All', value: null as ProjectSegment | null },
			{ label: 'Arts & Culture', value: 'Artes e Cultura' as const },
			{ label: 'Beauty & Wellness', value: 'Beleza e Saúde' as const },
			{ label: 'Design', value: 'Design' as const },
			{ label: 'Fashion & Lifestyle', value: 'Moda e Lifestyle' as const },
		],
		services: [
			{ label: 'All', value: null as ProjectService | null },
			{ label: 'Brands', value: 'Marcas' as const },
			{ label: 'Events', value: 'Eventos' as const },
			{ label: 'Product', value: 'Produto' as const },
			{ label: 'Media', value: 'Mídia' as const },
		],
		loading: 'Loading projects...',
		errorPrefix: 'Error:',
		emptyState: 'No cases found with these filters.',
	},
} as const;

const getPreloadData = (image?: string): { href: string; imageSrcSet?: string; imageSizes?: string } | null => {
	if (!image) {
		return null;
	}

	return {
		href: image,
	};
};

const Portfolio = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');
	const [selectedSegments, setSelectedSegments] = useState<ProjectSegment[]>([]);
	const [selectedServices, setSelectedServices] = useState<ProjectService[]>([]);
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

		const firstWithImage = projects.find((project) => Boolean(project.images[0]));
		if (!firstWithImage?.images[0]) {
			return;
		}

		const preloadData = getPreloadData(firstWithImage.images[0]);
		if (!preloadData) {
			return;
		}

		const preloadLink = document.createElement('link');
		preloadLink.rel = 'preload';
		preloadLink.as = 'image';
		preloadLink.href = preloadData.href;

		document.head.appendChild(preloadLink);

		return () => {
			document.head.removeChild(preloadLink);
		};
	}, [loading, error, projects]);

	const toggleSegment = (segment: ProjectSegment | null) => {
		if (!segment) {
			setSelectedSegments([]);
			return;
		}

		setSelectedSegments((currentSegments) =>
			currentSegments.includes(segment)
				? currentSegments.filter((currentSegment) => currentSegment !== segment)
				: [...currentSegments, segment]
		);
	};

	const toggleService = (service: ProjectService | null) => {
		if (!service) {
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
	const text = useMemo(() => content[language], [language]);

	return (
		<section className="portfolio-page" aria-labelledby="portfolio-title">
			<div className="portfolio-page__container">
				<h1 id="portfolio-title">Cases</h1>
				<p className="portfolio-page__intro">
					{text.intro}
				</p>

				<div className="portfolio-filters" aria-label={text.filtersLabel}>
					<div className="portfolio-filters__group">
						<span className="portfolio-filters__label">{text.segmentLabel}</span>
						<div className="portfolio-filters__options">
							{text.segments.map((segment) => (
								<button
									key={segment.label}
									type="button"
									className={`portfolio-filter ${
										(!segment.value && selectedSegments.length === 0) || (!!segment.value && selectedSegments.includes(segment.value))
											? 'is-active'
											: ''
									}`}
									onClick={() => toggleSegment(segment.value)}
								>
									{segment.label}
								</button>
							))}
						</div>
					</div>

					<div className="portfolio-filters__group">
						<span className="portfolio-filters__label">{text.serviceLabel}</span>
						<div className="portfolio-filters__options">
							{text.services.map((service) => (
								<button
									key={service.label}
									type="button"
									className={`portfolio-filter ${
										(!service.value && selectedServices.length === 0) || (!!service.value && selectedServices.includes(service.value))
											? 'is-active'
											: ''
									}`}
									onClick={() => toggleService(service.value)}
								>
									{service.label}
								</button>
							))}
						</div>
					</div>
				</div>

				{loading && <p>{text.loading}</p>}
				{error && <p>{text.errorPrefix} {error}</p>}

				{!loading && !error && visibleProjects.length === 0 && <p>{text.emptyState}</p>}

				{!loading && !error && visibleProjects.length > 0 && (
					<div className="portfolio-grid">
						{visibleProjects.map((project, index) => (
							<ProjectCard
								key={project.id}
								title={project.title}
								description={project.description}
								image={project.images[0]}
								priority={index === 0}
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
