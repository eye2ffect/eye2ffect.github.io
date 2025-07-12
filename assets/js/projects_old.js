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
            demo: false,
            technologies: ['Unity', 'C#', 'Blender'],
            description: "Unity 엔진을 사용하여 제작한 3D 플랫포머 게임입니다. 플레이어 컨트롤, 물리 시스템, 레벨 디자인을 구현했습니다.",
            categories: ['featured', 'Personal project']
        },
        {
            image: 'assets/images/graphics-engine.jpg',
            link: 'https://github.com/eye2ffect/OpenGL-Engine',
            title: 'OpenGL 렌더링 엔진',
            demo: false,
            technologies: ['C++', 'OpenGL', 'GLSL'],
            description: "C++과 OpenGL을 사용하여 제작한 실시간 렌더링 엔진입니다. 셰이더 프로그래밍과 3D 그래픽스 파이프라인을 구현했습니다.",
            categories: ['featured', 'Personal project']
        },
        {
            image: 'assets/images/team-game.jpg',
            link: 'https://github.com/eye2ffect/Team-RPG-Project',
            title: '팀 프로젝트 RPG 게임',
            demo: false,
            technologies: ['Unity', 'C#', 'SQLite'],
            description: "팀원들과 함께 제작한 RPG 게임입니다. 캐릭터 시스템, 인벤토리, 퀘스트 시스템을 담당했습니다.",
            categories: ['featured', 'Team Project']
        },
        {
            image: 'assets/images/shader-study.jpg',
            link: 'https://github.com/eye2ffect/Shader-Studies',
            title: '셰이더 프로그래밍 연습',
            demo: false,
            technologies: ['HLSL', 'Unity', 'Shadergraph'],
            description: "다양한 시각 효과를 구현하며 셰이더 프로그래밍을 학습한 프로젝트입니다.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/ai-game.jpg',
            link: 'https://github.com/eye2ffect/AI-Behavior-Tree',
            title: 'AI 행동 트리 시스템',
            demo: false,
            technologies: ['C++', 'Unity', 'Behavior Tree'],
            description: "게임 AI를 위한 행동 트리 시스템을 구현했습니다. NPC의 복잡한 행동 패턴을 제어할 수 있습니다.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/physics-engine.jpg',
            link: 'https://github.com/eye2ffect/Physics-Engine',
            title: '물리 엔진 구현',
            demo: false,
            technologies: ['C++', 'Mathematics', 'Physics'],
            description: "강체 역학을 기반으로 한 3D 물리 엔진을 C++로 구현했습니다. 충돌 검출과 응답 시스템을 포함합니다.",
            categories: ['Personal project']
        },
        {
            image: 'assets/images/vr-game.jpg',
            link: 'https://github.com/eye2ffect/VR-Experience',
            title: 'VR 게임 프로토타입',
            demo: false,
            technologies: ['Unity', 'SteamVR', 'C#'],
            description: "VR 헤드셋을 위한 인터랙티브 게임 프로토타입입니다. 손 추적과 물리 상호작용을 구현했습니다.",
            categories: ['Team Project']
        }
    ];
        {
            image: 'assets/images/soot-spirits.png',
            link: 'https://github.com/abhn/Soot-Spirits',
            title: 'Soot Spirits',
            demo: 'https://sootspirits.github.io',
            technologies: ['Jekyll', 'CSS3'],
            description: "A simple responsive two column Jekyll theme. Great for personal blog and basic portfolio website.",
            categories: ['webdev']
        },
        {
            image: 'assets/images/python-chat.png',
            link: 'https://www.nagekar.com/2014/12/lan-group-messenger-in-python.html',
            title: 'Terminal Group Chat',
            demo: false,
            technologies: ['Python', 'Sockets'],
            description: "Simple terminal group chat based on native sockets using Python.",
            categories: ['native']
        },
        {
            image: 'assets/images/old-lcd.jpg',
            link: 'https://www.nagekar.com/2018/05/reusing-old-laptop-lcd-panel.html',
            title: 'Reusing Old LCD Panel',
            demo: false,
            technologies: ['DIY'],
            description: "Reusing a dead laptop's LCD panel as a secondary monitor.",
            categories: ['diy']
        },
        {
            image: 'assets/images/nextcloud-enc.png',
            link: 'https://www.nagekar.com/2017/08/private-cloud-part-2.html',
            title: 'Encrypted Self-Hosted Cloud',
            demo: false,
            technologies: ['NextCloud', 'GnuPG'],
            description: "Self hosted encrypted cloud setup with Nextcloud and GnuPG.",
            categories: ['diy', 'security']
        },
        {
            image: 'assets/images/google-cloud-backup.png',
            link: 'https://www.nagekar.com/2018/05/encrypted-backup-with-duplicity.html',
            title: 'Encrypted Backups - Google Cloud',
            demo: false,
            technologies: ['NextCloud', 'Duplicity'],
            description: "Create automated encrypted incremental backups of data. Sync everything securely to Google Cloud.",
            categories: ['diy', 'security']
        },
        {
            image: 'assets/images/pi-cloud.jpg',
            link: 'https://www.nagekar.com/2016/01/how-to-private-local-cloud-using-raspberrypi.html',
            title: 'Local Cloud - Raspberry Pi',
            demo: false,
            technologies: ['FTP', 'DIY'],
            description: "Host a local cloud server with a Raspberry Pi and a spare hard disk. Access data instantaneously on any device on the network.",
            categories: ['diy']
        },
        {
            image: 'assets/images/koalamate.png',
            link: 'https://github.com/abhn/koalamate',
            title: 'Koalamate',
            demo: false,
            technologies: ['Electron', 'Javascript'],
            description: "A cross-platform desktop application that serves as a Wolfram Alpha query place and notes taker.",
            categories: ['native']
        },
    ]

    let projects = [];
    if(slug == 'all') {
        projects = projects_obj.map(project_mapper);
    } 
    else {
        projects = projects_obj.filter(project => project.categories.includes(slug)).map(project_mapper);
    }
    projects_area.hide().html(projects).fadeIn();
}

let project_mapper = project => {
    return `
        <div class="wrapper">
                
            <div class="card radius shadowDepth1">

                ${project.image ? 
                    `<div class="card__image border-tlr-radius">
                        <a href="${project.link}">
                            <img src="${project.image}" alt="image" id="project-image" class="border-tlr-radius">
                        </a>
                    </div>`           
                : ''}

        
                <div class="card__content card__padding">
        
                    <article class="card__article">
                        <h2><a href="${project.link}">${project.title}</a></h2>
        
                        <p class="paragraph-text-normal">${project.description} ${project.demo ? `<a href="${project.demo}">Demo</a>` : ''}</p>
                    </article>

                                
                    <div class="card__meta">
                        ${project.technologies.map(tech =>
                            `<span class="project-technology paragraph-text-normal">${tech}</span>`
                        ).join('')}
                    </div>

                </div>
            </div>
        </div>
    `
}

let selected = (slug) => {
    render_projects(slug);
}