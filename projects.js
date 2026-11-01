// projects.js - Uses shared projectsData from projects-data.js

// Select DOM Elements
const projectsContainer = document.getElementById('projectsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const techFilter = document.getElementById('techFilter');
const yearFilter = document.getElementById('yearFilter');
const resultsInfo = document.getElementById('resultsInfo');
const noResults = document.getElementById('noResults');

// Navigation Function
function viewProjectDetails(projectId) {
    window.location.href = `project-detail.html?id=${projectId}`;
}

// Function to Render Projects
function renderProjects(projects) {
    projectsContainer.innerHTML = '';
    
    if (projects.length === 0) {
        noResults.style.display = 'block';
        resultsInfo.textContent = 'Showing 0 projects';
        return;
    }
    
    noResults.style.display = 'none';
    resultsInfo.textContent = `Showing ${projects.length} project${projects.length !== 1 ? 's' : ''}`;
    
    projects.forEach(project => {
        // Use .trim() to remove trailing spaces from your data
        const techBadges = project.technologies.map(tech => `<span class="tech-badge">${tech.trim()}</span>`).join('');
        const statusClass = project.status.toLowerCase().replace(' ', '-');
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.onclick = () => viewProjectDetails(project.id);
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image.trim()}" alt="${project.title}" onerror="this.src='assets/BD_icon.PNG'">
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <span class="status-badge ${statusClass}">${project.status}</span>
                </div>
                <div class="project-meta">
                    <span><i class="far fa-calendar"></i> ${project.year}</span>
                    <span><i class="far fa-user"></i> ${project.role}</span>
                </div>
                <p class="project-category">${project.category}</p>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${techBadges}
                </div>
                <button class="btn-view-details">View Project Details <i class="fas fa-arrow-right"></i></button>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Function to Filter and Search Projects
function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedStatus = statusFilter.value;
    const selectedTech = techFilter.value;
    const selectedYear = yearFilter.value;
    
    const filtered = projectsData.filter(project => {
        // Clean up data strings (your data has trailing spaces like "2026 ")
        const projYear = project.year.trim();
        const projStatus = project.status.trim();
        const projCategory = project.category.trim();
        const projTitle = project.title.toLowerCase();
        const projDesc = project.description.toLowerCase();
        const projTechs = project.technologies.map(t => t.trim());

        // 1. Search by name, tech, description, or year
        const matchesSearch = projTitle.includes(searchTerm) ||
            projTechs.some(tech => tech.toLowerCase().includes(searchTerm)) ||
            projDesc.includes(searchTerm) ||
            projYear.includes(searchTerm);
        
        // 2. Filter by Category
        const matchesCategory = selectedCategory === 'all' || projCategory === selectedCategory;
        
        // 3. Filter by Status
        const matchesStatus = selectedStatus === 'all' || projStatus === selectedStatus;
        
        // 4. Filter by Technology
        const matchesTech = selectedTech === 'all' || projTechs.includes(selectedTech);
        
        // 5. Filter by Year
        const matchesYear = selectedYear === 'all' || projYear === selectedYear;
        
        return matchesSearch && matchesCategory && matchesStatus && matchesTech && matchesYear;
    });
    
    renderProjects(filtered);
}

// Add Event Listeners
searchInput.addEventListener('input', filterProjects);
categoryFilter.addEventListener('change', filterProjects);
statusFilter.addEventListener('change', filterProjects);
techFilter.addEventListener('change', filterProjects);
yearFilter.addEventListener('change', filterProjects);

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    console.log('Projects data loaded:', projectsData);
    renderProjects(projectsData);
});