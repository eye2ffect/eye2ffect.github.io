/* ================================================================
   Projects v3 — with image fallback & demo modal
   ================================================================ */

$(document).ready(function () {
  render_projects('all');
});

var projects_data = [
  {
    image: 'assets/images/Omuk.png',
    link: 'https://github.com/eye2ffect/OMock',
    title: 'OMock 오목',
    demo: false,
    technologies: ['Java', 'Swing', 'Minimax', 'AI'],
    description: '사용자와 대결할 수 있는 Java Swing 기반 오목 AI 구현 프로젝트입니다. Minimax 알고리즘을 핵심 로직으로 적용해 보드 상태를 평가하고, 상대의 공격을 방어하거나 자신의 5목을 완성하는 최적의 수를 선택합니다.',
    categories: ['Personal project'],
    icon: 'fa-chess-board'
  },
  {
    image: 'assets/images/Pill_solution.png',
    link: 'https://github.com/eye2ffect/PROJECT-pill_solution-Fronet',
    title: 'Pill Solution',
    demo: false,
    technologies: ['Team Project', 'UI', 'Web App'],
    description: '팀 프로젝트로 진행한 Pill Solution입니다. 약 관리와 알림 흐름을 중심으로 협업해 기능을 구현했습니다.',
    categories: ['Team Project'],
    icon: 'fa-pills'
  },
  {
    image: 'assets/images/ray.webp',
    link: 'https://github.com/eye2ffect/raytracing-in-one-weekend-cuda',
    title: 'CUDA 기반 레이트레이싱 렌더러',
    demo: false,
    technologies: ['C++', 'CUDA', 'Ray Tracing'],
    description: 'CUDA 병렬 처리와 메모리 최적화를 통해 렌더링 성능을 개선하고, 결과를 GitHub 레포지토리로 공유했습니다.',
    categories: ['featured', 'Personal project'],
    icon: 'fa-tv'
  },
  {
    image: 'assets/images/image.png',
    link: 'https://github.com/eye2ffect/Unity-VR-Fire-Evacuation',
    title: 'VR·Unity·GPT AI 학교 화재 대피훈련',
    demo: 'https://www.youtube.com/embed/MZpwtlP9eL4',
    technologies: ['Unity', 'VR', 'GPT AI'],
    description: 'VR 환경에서 화재 상황을 안전하게 체험하고 GPT AI와 상호작용하며 대피 절차를 학습하는 교육 프로젝트입니다.',
    categories: ['featured', 'Team Project'],
    icon: 'fa-vr-cardboard'
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
