// education.js

// 1. Education and Certification Data
const academicData = [
    {
        id: 1,
        degree: "Bachelor of Science in Information Technology",
        major: "",
        university: "City College of Calamba",
        location: "Calamba, Laguna, Philippines",
        year: "2024 - Present",
        description: "Focused on software development, network administration, and database management. Expected graduation in the year 2028."
    },
    {
        id: 2,
        degree: "Senior High School Diploma",
        major: "Technical-Vocational-Livelihood (TVL) Track - Information and Communication Technology (ICT) Strand",
        university: "Kapayapaan Integrated School",
        location: "Calamba, Laguna, Philippines",
        year: "2020 - 2022",
        description: "Specialized in advanced mathematics and computer science fundamentals."
    },
    {
        id: 3,
        degree: "Junior High School Diploma",
        major: "",
        university: "Kapayapaan Integrated School",
        location: "Calamba, Laguna, Philippines",
        year: "2018 - 2022", // Note: Check if this should be 2016-2018 or 2018-2020 based on standard PH schooling, but kept as provided.
        description: "Completed basic education with a focus on foundational subjects and extracurricular activities."
    },
    {
        id: 4,
        degree: "Elementary School Diploma",
        major: "",
        university: "San Ramon Elementary School",
        location: "Calamba, Laguna, Philippines",
        year: "2017 - 2018",
        description: "Completed basic education with strong academic foundations."
    }
];

const certificationData = [
    {
        id: 1,
        title: "Computer System Services (CSS) NC II",
        issuer: "TESDA",
        year: "May 18, 2024",
        credentialId: "",
        icon: "fa-network-wired"
    },
    {
        id: 2,
        title: "Cisco Packet Tracer: Getting Started",
        issuer: "Cisco Networking Academy",
        year: "January 31, 2025",
        credentialId: "",
        icon: "fa-server"
    },
    {
        id: 3,
        title: "Exploring Networking with Cisco Packet Tracer",
        issuer: "Cisco Networking Academy",
        year: "February 18, 2025",
        credentialId: "",
        icon: "fa-server"
    },
    {
        id: 4,
        title: "Effective Speaking and Listening",
        issuer: "Wadhwani Foundation",
        year: "October 21, 2024",
        credentialId: "",
        icon: "fa-id-card"
    },
    {
        id: 5,
        title: "Self-Presentation",
        issuer: "Wadhwani Foundation",
        year: "October 21, 2024",
        credentialId: "",
        icon: "fa-id-card"
    },
    {
        id: 6,
        title: "Self-Management",
        issuer: "Wadhwani Foundation",
        year: "November 28, 2024",
        credentialId: "",
        icon: "fa-id-card"
    },
    {
        id: 7,
        title: "Interpersonal Skills",
        issuer: "Wadhwani Foundation",
        year: "December 1, 2024",
        credentialId: "",
        icon: "fa-id-card"
    }
];

// 2. Select DOM Elements
const academicTimeline = document.getElementById('academicTimeline');
const certGrid = document.getElementById('certGrid');

// 3. Render Academic Timeline
function renderAcademic() {
    if (!academicTimeline) return; // Safety check
    
    academicTimeline.innerHTML = '';
    
    academicData.forEach((item) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        // Conditionally render major if it exists
        const majorHtml = item.major ? `<p class="timeline-major">${item.major}</p>` : '';

        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-year">${item.year}</span>
                <h3>${item.degree}</h3>
                ${majorHtml}
                <p class="timeline-school"><i class="fas fa-university"></i> ${item.university} <span class="location-sep">|</span> <i class="fas fa-map-marker-alt"></i> ${item.location}</p>
                <p class="timeline-desc">${item.description}</p>
            </div>
        `;
        academicTimeline.appendChild(timelineItem);
    });
}

// 4. Render Certifications Grid
function renderCertifications() {
    if (!certGrid) return; // Safety check
    
    certGrid.innerHTML = '';

    certificationData.forEach(item => {
        const certCard = document.createElement('div');
        certCard.className = 'cert-card';
        
        // Only show the credential ID span if it actually exists and is not empty
        const credentialIdHtml = item.credentialId 
            ? `<span class="cert-id" title="Credential ID"><i class="fas fa-hashtag"></i> ${item.credentialId}</span>` 
            : '';

        certCard.innerHTML = `
            <div class="cert-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <h3 class="cert-title">${item.title}</h3>
            <p class="cert-issuer">${item.issuer}</p>
            <div class="cert-details">
                <span><i class="far fa-calendar"></i> ${item.year}</span>
                ${credentialIdHtml}
            </div>
        `;
        certGrid.appendChild(certCard);
    });
}

// 5. Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderAcademic();
    renderCertifications();
});
