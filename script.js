document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Safety check: only add listeners if elements exist on the page
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a navigation link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 2. Dark Mode Toggle with LocalStorage
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');

        // Check local storage for saved theme preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Switch icon and save preference to localStorage
            if (body.classList.contains('dark-mode')) {
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
                localStorage.setItem('theme', 'dark');
            } else {
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ==========================================
    // 3. Skill Bar Animation on Scroll
    // ==========================================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Only run this logic if we are on the Skills page (elements exist)
    if (skillBars.length > 0) {
        const observerOptions = {
            threshold: 0.2, // Trigger animation when 20% of the bar is visible
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    // Animate the width
                    entry.target.style.width = progress + '%';
                    entry.target.classList.add('animated');
                    
                    // Stop observing once animated to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        skillBars.forEach(bar => {
            // Ensure initial width is 0 so the CSS transition works
            bar.style.width = '0%'; 
            observer.observe(bar);
        });
    }

// ==========================================
// 4. CV Forced Download & Analytics Tracking
// ==========================================
const downloadBtn = document.getElementById('cvDownloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Stop the # from doing anything
        
        const fileUrl = 'assets/docs/Beatryz_Dagamac_CV.pdf';
        const fileName = 'Beatryz_Dagamac_CV.pdf';

        try {
            // Fetch the file as raw data (Works on GitHub Pages HTTPS)
            const response = await fetch(fileUrl);
            if (!response.ok) throw new Error('File not found');
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            // Create a hidden link and force the click
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName; // Forces the browser to save it
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);

            // Analytics Tracking
            console.log('CV Downloaded:', new Date().toISOString());

        } catch (error) {
            console.error('Download failed:', error);
            // Fallback: If fetch fails, open in new tab
            window.open(fileUrl, '_blank');
        }
    });
}

    // ==========================================
    // 5. Dynamic Featured Projects Rendering (NEW)
    // ==========================================
    // Targets the grid on the homepage. Falls back to .projects-grid if ID isn't found.
    const featuredGrid = document.getElementById('featured-projects-grid') || document.querySelector('.projects-grid');
    
    // Only run if the grid exists on the page AND the projectsData array is loaded from projects-data.js
    if (featuredGrid && typeof projectsData !== 'undefined') {
        
        // Get only the first 3 projects for the homepage
        const featuredProjects = projectsData.slice(0, 3);

        // Generate HTML for each project and inject it into the grid
        featuredGrid.innerHTML = featuredProjects.map(project => {
            return `
                <div class="project-card">
                    <div class="card-img">
                        <!-- Added onerror fallback in case an image path is still slightly off -->
                        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\'fas fa-laptop-code\\' style=\\'font-size: 3rem; color: var(--primary-color);\\'></i>';">
                    </div>
                    <div class="card-info">
                        <h3>${project.title}</h3>
                        <p>${project.category}</p>
                        <!-- Links to a future project details page using the project ID -->
                        <a href="project-detail.html?id=${project.id}" class="btn btn-outline" style="margin-top: 10px; display: inline-block; font-size: 0.85rem; padding: 5px 15px;">View Details</a>
                    </div>
                </div>
            `;
        }).join("");
    }

});