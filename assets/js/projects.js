$(document).ready(() => {
    render_projects('featured');
})

let render_projects = (slug) => {
    let projects_area = $('.projects-wrapper');

    $('.white-button').removeClass('white-button-hover');
    $(`#${slug}`).addClass('white-button-hover');

    let projects_obj = [
        {
            image: 'assets/images/collage.jpg',
            link: 'https://github.com/eye2ffect/3D-Platformer',
            title: '3D Platformer Game',
            demo: false,
            technologies: ['Unity', 'C#', 'Blender'],
            description: "Unity 엔진을 사용하여 제작한 3D 플랫포머 게임입니다. 플레이어 컨트롤, 물리 시스템, 레벨 디자인을 구현했습니다.",
            categories: ['featured', 'Personal project']
        },
        {
            image: 'assets/images/mobile-landscape.jpg',
            link: 'https://github.com/eye2ffect/OpenGL-Engine',
            title: 'OpenGL Rendering Engine',
            demo: false,
            technologies: ['C++', 'OpenGL', 'GLSL'],
            description: "C++과 OpenGL을 사용하여 제작한 실시간 렌더링 엔진입니다. 셰이더 프로그래밍과 3D 그래픽스 파이프라인을 구현했습니다.",
            categories: ['featured', 'Personal project']
        },
        {
            image: 'assets/images/mentors.jpg',
            link: 'https://github.com/eye2ffect/Team-RPG-Project',
            title: 'Team RPG Project',
            demo: false,
            technologies: ['Unity', 'C#', 'SQLite'],
            description: "팀원들과 함께 제작한 RPG 게임입니다. 캐릭터 시스템, 인벤토리, 퀘스트 시스템을 담당했습니다.",
            categories: ['featured', 'Team Project']
        },
        {
            image: 'assets/images/soot-spirits.png',
            link: 'https://github.com/eye2ffect/Shader-Studies',
            title: 'Shader Programming Studies',
            demo: false,
            technologies: ['HLSL', 'Unity', 'Shadergraph'],
            description: "다양한 시각 효과를 구현하며 셰이더 프로그래밍을 학습한 프로젝트입니다.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/koalamate.png',
            link: 'https://github.com/eye2ffect/AI-Behavior-Tree',
            title: 'AI Behavior Tree System',
            demo: false,
            technologies: ['C++', 'Unity', 'Behavior Tree'],
            description: "게임 AI를 위한 행동 트리 시스템을 구현했습니다. NPC의 복잡한 행동 패턴을 제어할 수 있습니다.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/data-destroyer.png',
            link: 'https://github.com/eye2ffect/Physics-Engine',
            title: 'Physics Engine Implementation',
            demo: false,
            technologies: ['C++', 'Mathematics', 'Physics'],
            description: "강체 역학을 기반으로 한 3D 물리 엔진을 C++로 구현했습니다. 충돌 검출과 응답 시스템을 포함합니다.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/raspberry-pi-monitor.png',
            link: 'https://github.com/eye2ffect/VR-Experience',
            title: 'VR Game Prototype',
            demo: false,
            technologies: ['Unity', 'SteamVR', 'C#'],
            description: "VR 헤드셋을 위한 인터랙티브 게임 프로토타입입니다. 손 추적과 물리 상호작용을 구현했습니다.",
            categories: ['Team Project']
        },
        {
            image: 'assets/images/python-chat.png',
            link: 'https://github.com/eye2ffect/Network-Game',
            title: 'Network Multiplayer Game',
            demo: false,
            technologies: ['C++', 'Socket Programming', 'Networking'],
            description: "실시간 멀티플레이어 게임을 위한 네트워크 시스템을 구현했습니다. 클라이언트-서버 아키텍처를 사용했습니다.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/elementary.png',
            link: 'https://github.com/eye2ffect/Game-Editor',
            title: 'Game Editor Tool',
            demo: false,
            technologies: ['C++', 'Qt', 'OpenGL'],
            description: "게임 개발을 위한 레벨 에디터 도구입니다. 드래그 앤 드롭 방식으로 게임 오브젝트를 배치할 수 있습니다.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/old-lcd.jpg',
            link: 'https://github.com/eye2ffect/Retro-Game',
            title: 'Retro Arcade Game',
            demo: false,
            technologies: ['C', 'Assembly', 'Pixel Art'],
            description: "8비트 스타일의 복고풍 아케이드 게임입니다. 클래식한 게임플레이와 픽셀 아트 스타일을 구현했습니다.",
            categories: ['Personal project']
        }
    ];

    let projects = projects_obj.filter(project_obj => {
        if(slug == 'all') {
            return true;
        }
        return project_obj.categories.includes(slug);
    });

    let projects_html = projects.map(project_obj => {
        return `
        <div class="project-card">
            <div class="project-image">
                <img src="${project_obj.image}" alt="${project_obj.title}">
            </div>
            <div class="project-content">
                <div class="project-title">
                    <span>${project_obj.title}</span>
                    ${project_obj.demo ? `<a href="${project_obj.demo}" target="_blank">Live Demo</a>` : ''}
                </div>
                <p class="paragraph-text-normal">${project_obj.description}</p>
                <div class="project-technologies">
                    ${project_obj.technologies.map(tech => `<span class="project-technology">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project_obj.link}" target="_blank">GitHub</a>
                </div>
            </div>
        </div>
        `;
    }).join('');

    projects_area.html(projects_html);
}

let selected = (slug) => {
    render_projects(slug);
}
