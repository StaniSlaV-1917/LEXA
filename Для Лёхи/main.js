// Инициализация Splide галереи
document.addEventListener('DOMContentLoaded', function(){
  new Splide('#splide-gallery', {
    type:'loop',
    perPage:1,
    autoplay:true,
    pauseOnHover:true,
    gap:18,
    pagination:true,
    arrows:true
  }).mount();
});

// Тоггл темы неон/градиент
function toggleTheme(){
  const neon = getComputedStyle(document.documentElement).getPropertyValue('--neon').trim();
  if (neon === "#9b5cff") {
    document.documentElement.style.setProperty('--neon', '#3b14ffff');
    document.documentElement.style.setProperty('--neon-2', '#b31cffff');
    document.body.style.setProperty('--current-bg', 
      'linear-gradient(135deg, var(--neon) 0%, #383c44 30%, var(--bg) 65%, var(--neon-2) 100%)'
    );
  } else {
    document.documentElement.style.setProperty('--neon', '#9b5cff');
    document.documentElement.style.setProperty('--neon-2', '#7f2cff');
    document.body.style.setProperty('--current-bg',
      'radial-gradient(1200px 600px at 10% 10%, rgba(155,92,255,0.06), transparent 6%), radial-gradient(900px 450px at 90% 90%, rgba(127,44,255,0.04), transparent 6%), #050007'
    );
  }
}


// Карта (инициализация по клику)
let mapInited = false;
function initMap() {
  if (mapInited) return;
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;
  mapInited = true;
  const map = L.map('map').setView([58.0105, 56.2294], 12);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
const places = [
  { name: 'Качалка (ЦУМ)', coords: [58.0114, 56.2363] },
  { name: 'Дом', coords: [57.9832, 56.1870] },
  { name: 'Учёба (ПГМУ)', coords: [58.0059, 56.2292] }
];
  places.forEach(p =>
    L.marker(p.coords).addTo(map).bindPopup(`<b>${p.name}</b>`)
  );
  setTimeout(() => map.invalidateSize(), 600);
  map.scrollWheelZoom.disable();
  map.on('focus', function() { map.scrollWheelZoom.enable(); });
  mapContainer.tabIndex = "0";
  mapContainer.style.cursor = "pointer";
  mapContainer.addEventListener('mouseleave', () => { map.scrollWheelZoom.disable(); });
}
document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById('map');
  if (mapContainer) {
    mapContainer.addEventListener('click', initMap);
    mapContainer.title = "Нажми для активации интерактивной карты";
    mapContainer.style.filter='grayscale(0.2)';
    mapContainer.addEventListener('mouseenter',()=>{
      mapContainer.style.boxShadow='0 0 40px var(--neon)';
    });
    mapContainer.addEventListener('mouseleave',()=>{
      mapContainer.style.boxShadow='';
    });
  }
});

// Музыкальный плеер
const tracks = [
  {name: 'Quest Pistols Show – Разные', src: 'assets/audio/Quest Pistols Show - Разные.mp3'},
  {name: 'Виталя Джа - Похуй молодой', src: 'assets/audio/Виталя Джа - Похуй молодой.mp3'},
  {name: 'Abbas Bağırov feat. Elçin Əzizов - Belle', src: 'assets/audio/Abbas Bağırov feat. Elçin Əzizov - Belle.mp3'}
];
let currentTrack = 0;
const audio = document.getElementById('player');
const trackLabel = document.getElementById('trackName');
function loadTrack(i){
  const t = tracks[i];
  audio.src = t.src;
  trackLabel.textContent = t.name;
  audio.play();
}
function nextSong(){currentTrack=(currentTrack+1)%tracks.length;loadTrack(currentTrack);}
function prevSong(){currentTrack=(currentTrack-1+tracks.length)%tracks.length;loadTrack(currentTrack);}
function togglePlay(){audio.paused?audio.play():audio.pause();}
audio.addEventListener('ended', nextSong);
loadTrack(currentTrack);

// Соцсети, форма, переходы
function openContact(){ location.href='#contact' }
function sendForm(e){
  e.preventDefault();
  const name = document.getElementById('f_name').value.trim();
  const email = document.getElementById('f_email').value.trim();
  const msg = document.getElementById('f_msg').value.trim();
  if(!name || !email || !msg){ alert('Заполните все поля'); return }
  alert('Сообщение отправлено (симуляция) — спасибо!');
  e.target.reset();
}
function fakeOpen(id){
  const links = {
    vk: 'https://vk.com/a.polusmak',
    tg: 'https://t.me/polslone',
    ig: 'https://instagram.com/',
    tt: 'https://tiktok.com/'
  };
  window.open(links[id]||"#", '_blank');
}
// Вертикальный Swiper для новостей
document.addEventListener("DOMContentLoaded", function(){
  new Swiper('#news-swiper', {
    direction: 'vertical',
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    effect: 'slide'
  });
});

// Динамическая анимация портрета
document.addEventListener("DOMContentLoaded", function() {
  const portraitImg = document.querySelector('.portrait img');
  if (!portraitImg) return;

  let animationId;
  let isAnimating = true;
  let currentPhase = 0;
  const phases = [
    { scale: 1.05, rotation: 0, duration: 2000 },
    { scale: 1.15, rotation: 1.2, duration: 2000 },
    { scale: 1.08, rotation: -0.8, duration: 2000 },
    { scale: 1.12, rotation: 0.6, duration: 2000 }
  ];

  function animatePortrait() {
    if (!isAnimating) return;

    const phase = phases[currentPhase];
    const startTime = performance.now();
    const startScale = parseFloat(portraitImg.style.transform.match(/scale\(([^)]+)\)/) || [null, 1.05])[1];
    const startRotation = parseFloat(portraitImg.style.transform.match(/rotate\(([^)]+)deg\)/) || [null, 0])[1];

    function updateTransform(currentTime) {
      if (!isAnimating) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / phase.duration, 1);
      
      // Плавная интерполяция с easing
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentScale = startScale + (phase.scale - startScale) * easeProgress;
      const currentRotation = startRotation + (phase.rotation - startRotation) * easeProgress;
      
      portraitImg.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;

      if (progress < 1) {
        animationId = requestAnimationFrame(updateTransform);
      } else {
        currentPhase = (currentPhase + 1) % phases.length;
        // Небольшая пауза между фазами
        setTimeout(() => {
          if (isAnimating) {
            animatePortrait();
          }
        }, 200);
      }
    }

    animationId = requestAnimationFrame(updateTransform);
  }

  // Обработчики для паузы анимации при наведении
  const portrait = document.querySelector('.portrait');
  if (portrait) {
    portrait.addEventListener('mouseenter', () => {
      isAnimating = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });

    portrait.addEventListener('mouseleave', () => {
      isAnimating = true;
      animatePortrait();
    });
  }

  // Запуск анимации
  animatePortrait();
});

// Модальные окна
const modalData = {
  training: {
    title: "Тренировки 💪",
    image: "assets/images/photo_2025-10-22_23-21-24.jpg",
    content: `
      <h3>Мой режим тренировок</h3>
      <p>Тренируюсь 5 раз в неделю, следуя четкому плану и не пропуская ни одной тренировки. Дисциплина — это основа всего!</p>
      
      <h3>Программа тренировок</h3>
      <ul>
        <li><strong>Понедельник:</strong> Грудь и трицепс</li>
        <li><strong>Вторник:</strong> Спина и бицепс</li>
        <li><strong>Среда:</strong> Ноги и ягодицы</li>
        <li><strong>Четверг:</strong> Плечи и пресс</li>
        <li><strong>Пятница:</strong> Функциональная тренировка</li>
      </ul>
      
      <h3>Достижения</h3>
      <p>Жим лёжа: 110 кг (личный рекорд)<br>
      Приседания: 140 кг<br>
      Становая тяга: 160 кг</p>
      
      <h3>Философия</h3>
      <p>"Каждая тренировка — это шаг к лучшей версии себя. Прогресс измеряется не только весами, но и постоянством."</p>
    `
  },
  profession: {
    title: "Профессия 🧑‍🎓",
    image: "assets/images/photo_2025-10-22_23-20-58.jpg",
    content: `
      <h3>Образование</h3>
      <p>Учусь в Пермском государственном медицинском университете на факультете фармацевтики. Специализация — ревизор фармацевтической деятельности.</p>
      
      <h3>Почему фармацевтика?</h3>
      <p>Выбрал эту профессию, потому что хочу помогать людям быть здоровыми. Фармацевт — это не просто продавец лекарств, а специалист, который разбирается в медицине и может дать грамотную консультацию.</p>
      
      <h3>Планы на будущее</h3>
      <ul>
        <li>Получить диплом с отличием</li>
        <li>Пройти интернатуру в крупной аптечной сети</li>
        <li>Получить сертификат по клинической фармакологии</li>
        <li>Открыть собственную аптеку</li>
      </ul>
      
      <h3>Успехи в учёбе</h3>
      <p>Средний балл: 4.8/5.0<br>
      Участвую в научных конференциях<br>
      Прошёл практику в городской аптеке №1</p>
    `
  },
  gym: {
    title: "Качалка 💪",
    image: "assets/images/photo_2025-10-22_23-21-24.jpg",
    content: `
      <h3>Мой зал</h3>
      <p>Тренируюсь в фитнес-центре "ЦУМ" в центре Перми. Современное оборудование, профессиональные тренеры и отличная атмосфера для роста.</p>
      
      <h3>Любимые упражнения</h3>
      <ul>
        <li><strong>Жим лёжа</strong> — мой коронный номер</li>
        <li><strong>Приседания со штангой</strong> — основа силы ног</li>
        <li><strong>Подтягивания</strong> — проверка функциональной силы</li>
        <li><strong>Становая тяга</strong> — король всех упражнений</li>
      </ul>
      
      <h3>Питание</h3>
      <p>Следую принципам правильного питания: 5-6 приёмов пищи в день, достаточное количество белка (2г на кг веса), сложные углеводы и полезные жиры.</p>
      
      <h3>Мотивация</h3>
      <p>"Каждый день в зале — это инвестиция в своё здоровье и будущее. Сильное тело = сильный дух!"</p>
    `
  },
  csgo: {
    title: "CS:GO 🔫",
    image: "assets/images/photo_2025-10-22_23-21-29.jpg",
    content: `
      <h3>Игровой опыт</h3>
      <p>Играю в CS:GO уже 3 года. Начинал с Silver, сейчас достиг звания Master Guardian. Постоянно работаю над улучшением навыков.</p>
      
      <h3>Любимые карты</h3>
      <ul>
        <li><strong>Dust2</strong> — классика, знаю каждый уголок</li>
        <li><strong>Mirage</strong> — тактическая карта</li>
        <li><strong>Inferno</strong> — сложная, но интересная</li>
        <li><strong>Cache</strong> — быстрые разборки</li>
      </ul>
      
      <h3>Роль в команде</h3>
      <p>Играю в основном как Entry Fragger — первым врываюсь на точку и создаю пространство для команды. Также хорошо владею AWP.</p>
      
      <h3>Достижения</h3>
      <p>Лучший K/D: 2.3<br>
      Максимальный рейтинг: Master Guardian II<br>
      Участвовал в локальных турнирах</p>
      
      <h3>Философия игры</h3>
      <p>"CS:GO — это не просто стрелялка, а шахматы с оружием. Каждое решение имеет значение, каждая секунда на счету."</p>
    `
  },
  hearthstone: {
    title: "Hearthstone 🃏",
    image: "assets/images/photo_2025-10-22_23-21-10.jpg",
    content: `
      <h3>Карточная стратегия</h3>
      <p>Играю в Hearthstone с 2018 года. Люблю создавать нестандартные колоды и экспериментировать с механиками игры.</p>
      
      <h3>Любимые классы</h3>
      <ul>
        <li><strong>Маг</strong> — контроль и комбо-колоды</li>
        <li><strong>Паладин</strong> — сбалансированная игра</li>
        <li><strong>Друид</strong> — быстрые агрессивные колоды</li>
        <li><strong>Жрец</strong> — нестандартные стратегии</p>
      </ul>
      
      <h3>Достижения</h3>
      <p>Максимальный ранг: Легенда<br>
      Коллекция: 95% карт<br>
      Любимый формат: Wild (Дикий)</p>
      
      <h3>Стратегия</h3>
      <p>Предпочитаю создавать собственные колоды, а не копировать мету. Люблю находить синергии между картами и создавать неожиданные комбинации.</p>
      
      <h3>Философия</h3>
      <p>"Hearthstone учит думать на несколько ходов вперёд и адаптироваться к ситуации. Это как шахматы, но с элементами случайности."</p>
    `
  },
  university: {
    title: "Университет 🧑‍🎓",
    image: "assets/images/photo_2025-10-22_23-20-58.jpg",
    content: `
      <h3>Пермский ГМУ</h3>
      <p>Учусь в одном из лучших медицинских университетов России. Факультет фармацевтики славится своими традициями и высоким уровнем подготовки специалистов.</p>
      
      <h3>Учебная программа</h3>
      <ul>
        <li><strong>Фармацевтическая химия</strong> — изучение лекарственных веществ</li>
        <li><strong>Фармакогнозия</strong> — лекарственные растения</li>
        <li><strong>Фармакология</strong> — действие лекарств на организм</li>
        <li><strong>Организация фармацевтической деятельности</strong> — управление аптекой</li>
      </ul>
      
      <h3>Практика</h3>
      <p>Проходил практику в городской аптеке №1, где изучал работу с рецептами, консультирование покупателей и ведение учёта лекарственных средств.</p>
      
      <h3>Научная деятельность</h3>
      <p>Участвую в студенческих конференциях, пишу курсовые работы по современным методам анализа лекарственных препаратов.</p>
      
      <h3>Планы</h3>
      <p>После окончания университета планирую получить дополнительное образование по клинической фармакологии и открыть собственную аптеку.</p>
    `
  }
};

// Функции для работы с модальным окном
function openModal(modalType) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalText = document.getElementById('modal-text');
  
  const data = modalData[modalType];
  if (!data) return;
  
  modalTitle.textContent = data.title;
  modalImage.innerHTML = `<img src="${data.image}" alt="${data.title}">`;
  modalText.innerHTML = data.content;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Блокируем скролл
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Возвращаем скролл
}

// Инициализация модальных окон
document.addEventListener('DOMContentLoaded', function() {
  // Обработчики для кликабельных блоков
  const clickableStats = document.querySelectorAll('.clickable-stat');
  clickableStats.forEach(stat => {
    stat.addEventListener('click', function() {
      const modalType = this.getAttribute('data-modal');
      openModal(modalType);
    });
  });
  
  // Обработчики для закрытия модального окна
  const modal = document.getElementById('modal');
  const closeBtn = document.querySelector('.modal-close');
  
  closeBtn.addEventListener('click', closeModal);
  
  // Закрытие по клику вне модального окна
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Закрытие по клавише Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
});