export type Language = 'ru' | 'en';
export type Theme = 'dark' | 'light';

export const translations = {
  en: {
    // Header
    app_title: 'Animation Studio Academy',
    app_short: 'Studio Academy',
    day_badge: 'DAY {day} / 365',
    active_mission: 'Mission:',
    streak_label: '{days}d streak',
    xp_label: '{xp} XP',
    focus_mode: 'Focus Mode',
    install_app: 'Install App',
    installed: 'Installed',
    role_student: 'Student: Director',
    role_dad: 'Dad: Technical Lead',

    // Navigation
    nav_today: "Today's Mission",
    nav_curriculum: '52-Week Curriculum',
    nav_tutorials: 'Tutorial Library',
    nav_studio: 'Studio Pipeline',
    nav_skills: 'Skill Tree',
    nav_filmstudy: 'Film Study',
    nav_opportunities: 'Opportunities & Fests',
    nav_aitools: 'AI Tool Watch',
    nav_portfolio: 'Studio Portfolio',
    nav_parent: 'Dad Dashboard',
    nav_files: 'My Studio Files',
    nav_rule_title: 'Studio Rule #1:',
    nav_rule_desc: '"20% learning, 80% making. Every lesson produces a real movie asset."',

    // Today View - 8 Steps
    today_hero_badge: 'TODAY · DAY {day} OF 365',
    today_phase_week: 'Phase {phase} · Week {week}',
    today_skill_label: 'Skill:',
    today_time_label: 'Time:',
    today_result_label: 'Film Result:',
    today_xp_reward: '+{xp} XP upon completion',
    today_qna_show: 'View 7 Core Director Questions',
    today_qna_hide: 'Hide 7 Core Director Questions',
    quick_start_title: 'START IN 10 SECONDS',
    save_as_label: 'SAVE AS:',
    view_folder_guide: 'Open Studio Files Guide',

    // 8 Steps
    step_1_today: '1. WHAT TO LEARN',
    step_2_why: '2. WHY (FOR OUR SHORT FILM)',
    step_3_learn: '3. EXACT TUTORIAL',
    step_4_watch: '4. WHAT PART TO WATCH',
    step_5_do: '5. WHAT TO DO (PRACTICE)',
    step_6_result: '6. EXPECTED RESULT & SAVE AS',
    step_7_check: '7. CHECKLIST',
    step_8_complete: '8. COMPLETE DAY {day} ✓',
    day_completed_btn: 'DAY COMPLETED · +{xp} XP RECORDED',

    open_lesson: 'OPEN LESSON',
    official_source_badge: '⭐ OFFICIAL VERIFIED SOURCE',
    practice_ratio: '20% Learning · 80% Making',
    save_in_project_folder: 'Save inside your project folder',
    upload_proof_label: 'UPLOAD PROOF / RESULT',
    upload_cta: 'Select export (PNG, MP4, .blend) or Take Photo',
    upload_sub: 'iPad camera / Photo library ready',
    celebration_title: 'DAY COMPLETED!',
    celebration_desc: 'Great job! Your movie asset has been archived.',

    // 7 Core Questions
    q1: '1. What do I learn today?',
    q2: '2. Where is the lesson?',
    q3: '3. What do I make?',
    q4: '4. How long should it take?',
    q5: '5. What file should I save?',
    q6: '6. What comes next?',
    q7: '7. How does this help our film?',

    // Curriculum
    curriculum_badge: '365-DAY ROADMAP',
    curriculum_meta: '52 Weekly Modules · 12 Phases',
    curriculum_title: 'Full Academy Curriculum',
    curriculum_desc: 'From Digital Artist to Director of an Original Animated Short Film (10–20 min). Every single week produces a tangible visual movie artifact.',
    update_curriculum_btn: 'UPDATE UPCOMING CURRICULUM',
    phase_goal: 'PHASE {phase} GOAL',
    target_deliverable: 'Target Deliverable:',
    week_milestone: 'WEEKLY MILESTONE ARTIFACT:',
    go_to_day: 'Go To Day',

    // Tutorial Library
    tut_badge: 'LINK SAFETY & QUALITY STANDARDS',
    tut_verified_only: '100% VERIFIED URLS ONLY',
    tut_title: 'Studio Tutorial Library',
    tut_desc: 'Curated official training from Blender Studio, Procreate, Blackmagic DaVinci Resolve, DeepMind Veo, and Runway Academy. Never invented links.',
    tut_search_placeholder: 'Search tutorials by skill, tool, or source...',
    open_official_lesson: 'OPEN OFFICIAL LESSON',

    // Studio Hub
    studio_badge: 'PRODUCTION PIPELINE',
    studio_sub: 'YOUNG DIRECTOR DASHBOARD',
    studio_title: 'Studio Production Hub',
    studio_desc: 'Professional shot tracking, Kazakh Character IP Bibles, Production Provenance for festivals, and 4K Cinema mastering preparations.',
    tab_shots: 'Shot Tracker',
    tab_characters: 'Characters IP',
    tab_projects: 'Film Projects',
    tab_provenance: 'Provenance & AI Disclosure',
    tab_cinema: 'From YouTube to Cinema',

    // Common
    prev_day: 'Previous Day',
    next_day: 'Next Day',
    offline_badge: 'Offline Studio Mode',
    offline_text: 'All progress is stored locally in your browser storage. Remember to export a backup periodically.',
  },
  ru: {
    // Header
    app_title: 'Animation Studio Academy',
    app_short: 'Академия Анимации',
    day_badge: 'ДЕНЬ {day} / 365',
    active_mission: 'Миссия:',
    streak_label: '{days} дн. подряд',
    xp_label: '{xp} XP',
    focus_mode: 'Фокус-режим',
    install_app: 'Установить',
    installed: 'Установлено',
    role_student: 'Студент: Режиссёр',
    role_dad: 'Папа: Техлид',

    // Navigation
    nav_today: 'Миссия на сегодня',
    nav_curriculum: 'Программа 52 недели',
    nav_tutorials: 'Библиотека уроков',
    nav_studio: 'Пайплайн студии',
    nav_skills: 'Дерево навыков',
    nav_filmstudy: 'Киноразбор (Film Study)',
    nav_opportunities: 'Фестивали и шансы',
    nav_aitools: 'Радар AI инструментов',
    nav_portfolio: 'Портфолио студии',
    nav_parent: 'Панель папы',
    nav_files: 'Файлы студии',
    nav_rule_title: 'Правило студии #1:',
    nav_rule_desc: '"20% теории, 80% практики. Каждый урок создаёт настоящий файл для мультфильма."',

    // Today View - 8 Steps
    today_hero_badge: 'СЕГОДНЯ · ДЕНЬ {day} ИЗ 365',
    today_phase_week: 'Фаза {phase} · Неделя {week}',
    today_skill_label: 'Навык:',
    today_time_label: 'Время:',
    today_result_label: 'Результат для фильма:',
    today_xp_reward: '+{xp} XP за выполнение',
    today_qna_show: 'Показать 7 главных вопросов режиссёра',
    today_qna_hide: 'Скрыть 7 главных вопросов режиссёра',
    quick_start_title: 'НАЧАТЬ ЗА 10 СЕКУНД',
    save_as_label: 'СОХРАНИТЬ КАК:',
    view_folder_guide: 'Открыть гид по папкам',

    // 8 Steps
    step_1_today: '1. ЧТО ИЗУЧАЕМ',
    step_2_why: '2. ЗАЧЕМ (ДЛЯ НАШЕГО МУЛЬТФИЛЬМА)',
    step_3_learn: '3. ТОЧНЫЙ УРОК',
    step_4_watch: '4. ЧТО ИМЕННО СМОТРЕТЬ',
    step_5_do: '5. ЧТО СДЕЛАТЬ (ПРАКТИКА)',
    step_6_result: '6. ЧТО ДОЛЖНО ПОЛУЧИТЬСЯ И КУДА СОХРАНИТЬ',
    step_7_check: '7. ЧЕК-ЛИСТ',
    step_8_complete: '8. ЗАВЕРШИТЬ ДЕНЬ {day} ✓',
    day_completed_btn: 'ДЕНЬ ЗАВЕРШЁН · +{xp} XP НАЧИСЛЕНО',

    open_lesson: 'ОТКРЫТЬ УРОК',
    official_source_badge: '⭐ ОФИЦИАЛЬНЫЙ ПРОВЕРЕННЫЙ ИСТОЧНИК',
    practice_ratio: '20% Обучение · 80% Практика',
    save_in_project_folder: 'Сохрани файл в папку проекта',
    upload_proof_label: 'ЗАГРУЗИТЬ РЕЗУЛЬТАТ / ФОТО',
    upload_cta: 'Выбрать файл (PNG, MP4, .blend) или сфотографировать',
    upload_sub: 'Поддержка камеры iPad и медиатеки',
    celebration_title: 'ДЕНЬ УСПЕШНО ЗАВЕРШЁН!',
    celebration_desc: 'Молодец! Новый визуальный результат добавлен в студийный архив.',

    // 7 Core Questions
    q1: '1. Что я сегодня изучаю?',
    q2: '2. Где находится урок?',
    q3: '3. Что именно нужно сделать?',
    q4: '4. Сколько времени это займёт?',
    q5: '5. Какой файл/результат должен появиться?',
    q6: '6. Что мы будем делать дальше?',
    q7: '7. Как это поможет нашему будущему фильму?',

    // Curriculum
    curriculum_badge: 'ГОДОВАЯ КАРТА (365 ДНЕЙ)',
    curriculum_meta: '52 недели · 12 фаз создания фильма',
    curriculum_title: 'Полная программа Академии',
    curriculum_desc: 'Путь от художника Procreate до режиссёра оригинального короткометражного фильма (10–20 мин). Каждая неделя даёт готовый визуальный артефакт.',
    update_curriculum_btn: 'ОБНОВИТЬ БУДУЩУЮ ПРОГРАММУ',
    phase_goal: 'ЦЕЛЬ ФАЗЫ {phase}',
    target_deliverable: 'Главный результат фазы:',
    week_milestone: 'АРТЕФАКТ НЕДЕЛИ:',
    go_to_day: 'Перейти к дню',

    // Tutorial Library
    tut_badge: 'СТАНДАРТ БЕЗОПАСНОСТИ ССЫЛОК',
    tut_verified_only: 'ТОЛЬКО 100% ПРОВЕРЕННЫЕ ССЫЛКИ',
    tut_title: 'Библиотека уроков студии',
    tut_desc: 'Официальные курсы Blender Studio, Procreate Handbook, Blackmagic DaVinci Resolve, DeepMind Veo и Runway Academy. Без выдуманных ссылок.',
    tut_search_placeholder: 'Поиск уроков по навыку, программе или источнику...',
    open_official_lesson: 'ОТКРЫТЬ ОФИЦИАЛЬНЫЙ УРОК',

    // Studio Hub
    studio_badge: 'ПРОИЗВОДСТВЕННЫЙ ПАЙПЛАЙН',
    studio_sub: 'ПАНЕЛЬ УПРАВЛЕНИЯ РЕЖИССЁРА',
    studio_title: 'Студийный Production Hub',
    studio_desc: 'Трекер шотов, Библия казахских персонажей, провенанс для фестивалей и подготовка 4K мастеринга для кинотеатров.',
    tab_shots: 'Трекер шотов',
    tab_characters: 'Персонажи IP',
    tab_projects: 'Проекты фильмов',
    tab_provenance: 'Провенанс и AI Disclosure',
    tab_cinema: 'От YouTube до Кинотеатра',

    // Common
    prev_day: 'Предыдущий день',
    next_day: 'Следующий день',
    offline_badge: 'Локальный режим студии',
    offline_text: 'Все уроки и прогресс сохраняются локально в хранилище браузера. Рекомендуется периодически делать бэкап.',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
