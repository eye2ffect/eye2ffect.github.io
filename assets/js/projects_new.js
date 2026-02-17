$(document).ready(() => {
    render_projects('featured');
})

let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            image: 'assets/images/unity-game.jpg',
            link: 'https://github.com/eye2ffect/3D-Platformer',
            title: '3D 플랫포머 게임',
            demo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            technologies: ['Unity', 'C#', 'Blender'],
            description: "Unity 엔진을 사용하여 제작한 3D 플랫포머 게임. 플레이어 컨트롤, 물리 시스템, 레벨 디자인을 구현.",
            categories: ['featured', 'Personal project']
        },
        {
            image: 'assets/images/graphics-engine.jpg',
            link: 'https://github.com/eye2ffect/OpenGL-Engine',
            title: 'OpenGL 렌더링 엔진',
            demo: false,
            technologies: ['C++', 'OpenGL', 'GLSL'],
            description: "C++과 OpenGL을 사용한 실시간 렌더링 엔진. 셰이더 프로그래밍과 3D 그래픽스 파이프라인 구현.",
            categories: ['featured', 'Personal project']
        },
        {
            image: 'assets/images/team-game.jpg',
            link: 'https://github.com/eye2ffect/Team-RPG-Project',
            title: '팀 프로젝트 RPG 게임',
            demo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            technologies: ['Unity', 'C#', 'SQLite'],
            description: "팀원들과 함께 제작한 RPG 게임. 캐릭터 시스템, 인벤토리, 퀘스트 시스템 담당.",
            categories: ['featured', 'Team Project']
        },
        {
            image: 'assets/images/shader-study.jpg',
            link: 'https://github.com/eye2ffect/Shader-Studies',
            title: '셰이더 프로그래밍 연습',
            demo: false,
            technologies: ['HLSL', 'Unity', 'Shadergraph'],
            description: "다양한 시각 효과를 구현하며 셰이더 프로그래밍을 학습한 프로젝트.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/ai-game.jpg',
            link: 'https://github.com/eye2ffect/AI-Behavior-Tree',
            title: 'AI 행동 트리 시스템',
            demo: false,
            technologies: ['C++', 'Unity', 'Behavior Tree'],
            description: "게임 AI를 위한 행동 트리 시스템 구현. NPC의 복잡한 행동 패턴 제어.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/physics-engine.jpg',
            link: 'https://github.com/eye2ffect/Physics-Engine',
            title: '물리 엔진 구현',
            demo: false,
            technologies: ['C++', 'Mathematics', 'Physics'],
            description: "강체 역학 기반 3D 물리 엔진을 C++로 구현. 충돌 검출과 응답 시스템 포함.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/vr-game.jpg',
            link: 'https://github.com/eye2ffect/VR-Experience',
            title: 'VR 게임 프로토타입',
            demo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            technologies: ['Unity', 'SteamVR', 'C#'],
            description: "VR 헤드셋을 위한 인터랙티브 게임 프로토타입. 손 추적과 물리 상호작용 구현.",
            categories: ['Team Project']
        }
    ];

    let projects = projects_obj.filter(project_obj => {
        if(slug == 'all') return true;
        return project_obj.categories.includes(slug);
    });

    projects_area.fadeOut(200, function() {
        let projects_html = projects.map(project_obj => {
            let demoButton = project_obj.demo
                ? `<a href="javascript:void(0)" class="project-link demo-link" onclick="event.stopPropagation(); openVideoModal('${project_obj.title}', '${project_obj.demo}')"><i class="fas fa-play"></i> Demo</a>`
                : '';

            return `
            <div class="project-card" onclick="window.open('${project_obj.link}', '_blank')">
                <div class="project-image">
                    <img src="${project_obj.image}" alt="${project_obj.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <div class="project-title">
                        <span>${project_obj.title}</span>
                    </div>
                    <p class="paragraph-text-normal">${project_obj.description}</p>
                    <div class="project-technologies">
                        ${project_obj.technologies.map(tech => `<span class="project-technology">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project_obj.link}" target="_blank" class="project-link" onclick="event.stopPropagation()"><i class="fab fa-github"></i> Code</a>
                        ${demoButton}
                    </div>
                </div>
            </div>
            `;
        }).join('');

        projects_area.html(projects_html);

        projects_area.fadeIn(300, function() {
            document.querySelectorAll('.project-card').forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`;
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            });
        });
    });
}

// Video Modal
function openVideoModal(title, url) {
    document.getElementById('video-modal-title').textContent = title + ' - Demo';
    document.getElementById('video-modal-body').innerHTML = `<iframe src="${url}" allowfullscreen allow="autoplay"></iframe>`;
    document.getElementById('video-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    document.getElementById('video-modal').classList.remove('active');
    document.getElementById('video-modal-body').innerHTML = '';
    document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
    if (e.target.id === 'video-modal') closeVideoModal();
});

// Close modal on Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeVideoModal();
});

let selected = (slug) => {
    render_projects(slug);
}
