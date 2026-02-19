/* ================================================================
   Projects v3 — with image fallback & demo modal
   ================================================================ */

$(document).ready(function () {
  render_projects('all');
});

var projects_data = [
  {
    image: 'assets/images/graphics-engine.svg',
    link: 'https://github.com/eye2ffect/OpenGL-Engine',
    title: 'OpenGL 렌더링 엔진',
    demo: false,
    technologies: ['C++', 'OpenGL', 'GLSL'],
    description: 'C++과 OpenGL을 사용한 실시간 렌더링 엔진. 셰이더 프로그래밍과 그래픽스 파이프라인.',
    categories: ['featured', 'Personal project'],
    icon: 'fa-tv'
  },
  {
    image: 'assets/images/unity-game.svg',
    link: 'https://github.com/eye2ffect/3D-Platformer',
    title: '3D 플랫포머 게임',
    demo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    technologies: ['Unity', 'C#', 'Blender'],
    description: 'Unity 엔진 기반 3D 플랫포머. 플레이어 컨트롤, 물리 시스템, 레벨 디자인 구현.',
    categories: ['featured', 'Personal project'],
    icon: 'fa-cube'
  },
  {
    image: 'assets/images/vr-game.svg',
    link: 'https://github.com/eye2ffect/VR-Experience',
    title: 'VR 체험 프로토타입',
    demo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    technologies: ['Unity', 'SteamVR', 'C#'],
    description: 'VR 인터랙티브 체험. 손 추적과 물리 상호작용 구현.',
    categories: ['featured', 'Team Project'],
    icon: 'fa-vr-cardboard'
  },
  {
    image: 'assets/images/team-game.svg',
    link: 'https://github.com/eye2ffect/Team-RPG-Project',
    title: '팀 프로젝트 RPG',
    demo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    technologies: ['Unity', 'C#', 'SQLite'],
    description: '팀 기반 RPG 게임. 캐릭터 시스템, 인벤토리, 퀘스트 시스템 담당.',
    categories: ['featured', 'Team Project'],
    icon: 'fa-users'
  },
  {
    image: 'assets/images/physics-engine.svg',
    link: 'https://github.com/eye2ffect/Physics-Engine',
    title: '물리 엔진 구현',
    demo: false,
    technologies: ['C++', 'Math', 'Physics'],
    description: '강체 역학 기반 3D 물리 엔진. 충돌 검출과 응답 시스템.',
    categories: ['Personal project'],
    icon: 'fa-atom'
  },
  {
    image: 'assets/images/shader-study.svg',
    link: 'https://github.com/eye2ffect/Shader-Studies',
    title: '셰이더 프로그래밍',
    demo: false,
    technologies: ['HLSL', 'Unity', 'ShaderGraph'],
    description: '다양한 시각 효과를 구현하며 셰이더 프로그래밍을 학습한 프로젝트.',
    categories: ['Personal project'],
    icon: 'fa-paint-brush'
  },
  {
    image: 'assets/images/ai-game.svg',
    link: 'https://github.com/eye2ffect/AI-Behavior-Tree',
    title: 'AI 행동 트리 시스템',
    demo: false,
    technologies: ['C++', 'Unity', 'Behavior Tree'],
    description: '게임 AI 행동 트리 시스템 구현. NPC의 복잡한 행동 패턴 제어.',
    categories: ['Personal project'],
    icon: 'fa-brain'
  }
];

function render_projects(slug) {
  var area = $('.projects-wrapper');

  $('.white-button').removeClass('white-button-hover');
  $('#' + slug).addClass('white-button-hover');

  var filtered = projects_data.filter(function (p) {
    if (slug === 'all') return true;
    return p.categories.indexOf(slug) !== -1;
  });

  area.fadeOut(150, function () {
    var html = filtered.map(function (p) {
      var demoBtn = p.demo
        ? '<a href="javascript:void(0)" class="project-link demo-link" onclick="event.stopPropagation(); openVideoModal(\'' + p.title.replace(/'/g, "\\'") + '\', \'' + p.demo + '\')"><i class="fas fa-play"></i> Demo</a>'
        : '';

      // Image or icon placeholder
      var imageHtml;
      if (p.image) {
        imageHtml = '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">' +
          '<div class="project-image-placeholder" style="display:none;"><i class="fas ' + (p.icon || 'fa-code') + '"></i><span>' + p.title + '</span></div>';
      } else {
        imageHtml = '<div class="project-image-placeholder" style="display:flex;"><i class="fas ' + (p.icon || 'fa-code') + '"></i><span>' + p.title + '</span></div>';
      }

      return '<div class="project-card" onclick="window.open(\'' + p.link + '\', \'_blank\')">' +
        '<div class="project-image">' + imageHtml + '</div>' +
        '<div class="project-content">' +
          '<div class="project-title">' + p.title + '</div>' +
          '<p class="paragraph-text-normal">' + p.description + '</p>' +
          '<div class="project-technologies" style="margin-bottom:0;">' +
            p.technologies.map(function (t) { return '<span class="project-technology" onclick="event.stopPropagation();">' + t + '</span>'; }).join('') +
          '</div>' +
          '<div class="project-links">' +
            '<a href="' + p.link + '" target="_blank" class="project-link" onclick="event.stopPropagation()"><i class="fab fa-github"></i> Code</a>' +
            demoBtn +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    area.html(html);

    area.fadeIn(250, function () {
      document.querySelectorAll('.project-card').forEach(function (card, idx) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = 'opacity 0.35s ease-out ' + (idx * 0.05) + 's, transform 0.35s ease-out ' + (idx * 0.05) + 's';
        setTimeout(function () {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
      });
    });
  });
}

// Video Modal
function openVideoModal(title, url) {
  document.getElementById('video-modal-title').textContent = title + ' — Demo';
  document.getElementById('video-modal-body').innerHTML =
    '<iframe src="' + url + '" allowfullscreen allow="autoplay"></iframe>';
  document.getElementById('video-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  document.getElementById('video-modal').classList.remove('active');
  document.getElementById('video-modal-body').innerHTML = '';
  document.body.style.overflow = '';
}

document.addEventListener('click', function (e) {
  if (e.target.id === 'video-modal') closeVideoModal();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeVideoModal();
});

function selected(slug) {
  render_projects(slug);
}
