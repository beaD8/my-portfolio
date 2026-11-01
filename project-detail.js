// project-detail.js - Uses shared projectsData from projects-data.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Project detail page loaded');
    console.log('Projects data available:', projectsData);

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    console.log('Project ID from URL:', projectId);

    const container = document.getElementById('projectDetailContent');

    if (!container) {
        console.error('projectDetailContent element not found!');
        return;
    }

    // Find the project by ID
    const project = projectsData.find(p => p.id == projectId);

    console.log('Found project:', project);

    if (!project) {
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h2>Project Not Found</h2>
                <p>The project you're looking for doesn't exist or has been removed.</p>
                <a href="projects.html" class="btn-primary">Back to Projects</a>
            </div>
        `;
        return;
    }

    // Generate technology badges
    const techBadges = project.technologies.map(tech =>
        `<span class="tech-badge">${tech}</span>`
    ).join('');

    // Generate features list
    const featuresList = project.features.map(feature =>
        `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
    ).join('');

    // Generate screenshots
    const screenshots = project.screenshots.map(screenshot =>
        `<img src="${screenshot}" alt="${project.title} Screenshot" class="screenshot-image" onerror="this.src='assets/BD_icon.PNG'">`
    ).join('');

    // Status badge class
    const statusClass = project.status.toLowerCase().replace(' ', '-');

    // Build action buttons - only show if link exists and is not "#"
    let actionButtons = '';
    if (project.projectLink && project.projectLink !== '#') {
        actionButtons += `<a href="${project.projectLink}" target="_blank" class="btn-primary"><i class="fas fa-external-link-alt"></i> View Project</a>`;
    }
    if (project.githubLink && project.githubLink !== '#') {
        actionButtons += `<a href="${project.githubLink}" target="_blank" class="btn-secondary"><i class="fab fa-github"></i> Source Code</a>`;
    }
    if (project.demoLink && project.demoLink !== '#') {
        actionButtons += `<a href="${project.demoLink}" target="_blank" class="btn-secondary"><i class="fas fa-play"></i> Live Demo</a>`;
    }

    if (!actionButtons) {
        actionButtons = '<p class="no-links">No external links available for this project.</p>';
    }

    container.innerHTML = `
        <div class="project-detail-header">
            <div class="project-detail-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='assets/BD_icon.PNG'">
            </div>
            <div class="project-detail-info">
                <h1 class="project-detail-title">${project.title}</h1>
                <span class="status-badge ${statusClass}">${project.status}</span>
                <p class="project-detail-category">${project.category}</p>
                <p class="project-detail-year"><i class="far fa-calendar"></i> ${project.year}</p>
                <p class="project-detail-role"><i class="far fa-user"></i> ${project.role}</p>

                <div class="project-detail-tech">
                    <h3>Technologies Used</h3>
                    <div class="tech-badges">
                        ${techBadges}
                    </div>
                </div>

                <div class="project-detail-actions">
                    ${actionButtons}
                </div>
            </div>
        </div>

        <div class="project-detail-content">
            <div class="detail-section">
                <h2><i class="fas fa-info-circle"></i> Project Overview</h2>
                <p>${project.longDescription || project.description}</p>
            </div>

            <div class="detail-section">
                <h2><i class="fas fa-exclamation-triangle"></i> Problem</h2>
                <p>${project.problem}</p>
            </div>

            <div class="detail-section">
                <h2><i class="fas fa-lightbulb"></i> Solution</h2>
                <p>${project.solution}</p>
            </div>

            <div class="detail-section">
                <h2><i class="fas fa-star"></i> Key Features</h2>
                <ul class="features-list">
                    ${featuresList}
                </ul>
            </div>

            ${screenshots ? `
            <div class="detail-section">
                <h2><i class="fas fa-images"></i> Screenshots</h2>
                <div class="screenshots-gallery">
                    ${screenshots}
                </div>
            </div>
            ` : ''}
        </div>
    `;

    // Update page title
    document.title = `${project.title} | Beatryz Dagamac`;
});