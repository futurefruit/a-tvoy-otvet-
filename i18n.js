"use strict";

/* ==========================================================================
   Локализация интерфейса (RU / UA)

   Все переводимые строки живут в одном словаре STRINGS. Чтобы добавить
   новый язык (например английский), достаточно добавить ключ "en" со
   всеми теми же полями — остальной код (t(), applyStaticTranslations())
   ничего не знает о конкретных языках и трогать не нужно.
   ========================================================================== */

const STRINGS = {
  ru: {
    title: "Он бы тебе сказал",
    tagline: "Вечеринка-игра про вещи, которые слишком много о тебе знают",
    startRules:
      "Достань случайный предмет из своей комнаты и озвучь голосом, " +
      "что он на самом деле думает о своём хозяине. У тебя будет 10 секунд.",
    btnStart: "Достать предмет",
    roundLabel: "Раунд",
    categoryLabel: "Достань что-нибудь из категории",
    categoryRules:
      "Возьми первый попавшийся предмет и представь: если бы он мог " +
      "говорить — что бы он сказал о тебе?",
    btnRecord: "Записать реплику",
    micError:
      "Не удалось получить доступ к микрофону. Разреши доступ в настройках " +
      "браузера и попробуй снова.",
    recordingLabel: "Говори за:",
    recBadge: "Запись",
    btnCancel: "Отменить",
    playbackLabel: "Реплика от лица:",
    ariaPlay: "Воспроизвести",
    ariaPause: "Пауза",
    btnSend: "Отправить",
    btnNext: "Следующий раунд",
    toastSend: "Клип готов к отправке! 🎉",
    langSwitchAriaLabel: "Выбор языка интерфейса",
    categories: {
      kitchen: "что-то на кухне",
      bag: "что-то в сумке",
      bathroom: "что-то в ванной",
      desk: "что-то на рабочем столе",
      jacket: "что-то в кармане куртки",
      fridge: "что-то в холодильнике",
      underBed: "что-то под кроватью",
      car: "что-то в машине",
      shoeShelf: "что-то на полке с обувью",
      chargerDrawer: "что-то в ящике с зарядками",
    },
  },

  uk: {
    title: "Він би тобі сказав",
    tagline: "Вечірка-гра про речі, які забагато знають про тебе",
    startRules:
      "Дістань випадкову річ зі своєї кімнати і скажи вголос, " +
      "що вона насправді думає про свого господаря. У тебе буде 10 секунд.",
    btnStart: "Дістати річ",
    roundLabel: "Раунд",
    categoryLabel: "Дістань щось із категорії",
    categoryRules:
      "Візьми першу-ліпшу річ і уяви: якби вона могла говорити — " +
      "що б вона сказала про тебе?",
    btnRecord: "Записати репліку",
    micError:
      "Не вдалося отримати доступ до мікрофона. Дозволь доступ у " +
      "налаштуваннях браузера і спробуй ще раз.",
    recordingLabel: "Говори за:",
    recBadge: "Запис",
    btnCancel: "Скасувати",
    playbackLabel: "Репліка від імені:",
    ariaPlay: "Відтворити",
    ariaPause: "Пауза",
    btnSend: "Надіслати",
    btnNext: "Наступний раунд",
    toastSend: "Кліп готовий до відправки! 🎉",
    langSwitchAriaLabel: "Вибір мови інтерфейсу",
    categories: {
      kitchen: "щось на кухні",
      bag: "щось у сумці",
      bathroom: "щось у ванній",
      desk: "щось на робочому столі",
      jacket: "щось у кишені куртки",
      fridge: "щось у холодильнику",
      underBed: "щось під ліжком",
      car: "щось у машині",
      shoeShelf: "щось на полиці для взуття",
      chargerDrawer: "щось у шухляді із зарядками",
    },
  },
};

const SUPPORTED_LANGS = Object.keys(STRINGS);
const DEFAULT_LANG = "ru";
const LANG_STORAGE_KEY = "obts_lang";

let currentLang = detectInitialLanguage();

/**
 * Определяет стартовый язык:
 * 1. Ручной выбор пользователя, сохранённый в window.storage — приоритет.
 * 2. Иначе — язык браузера: если начинается с "uk", украинский.
 * 3. Иначе — русский по умолчанию.
 */
function detectInitialLanguage() {
  const saved = window.storage.getItem(LANG_STORAGE_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) {
    return saved;
  }

  const browserLangs =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];

  const prefersUkrainian = browserLangs.some((lang) =>
    String(lang || "").toLowerCase().startsWith("uk")
  );

  return prefersUkrainian ? "uk" : DEFAULT_LANG;
}

function getLang() {
  return currentLang;
}

/** Достаёт перевод по ключу вида "categories.kitchen". */
function t(key) {
  const path = key.split(".");
  let node = STRINGS[currentLang];
  for (const part of path) {
    node = node ? node[part] : undefined;
  }
  if (node === undefined) {
    // Подстраховка: если в текущем языке чего-то не хватает, берём дефолтный.
    node = path.reduce((acc, part) => (acc ? acc[part] : undefined), STRINGS[DEFAULT_LANG]);
  }
  return node !== undefined ? node : key;
}

/** Переключает язык интерфейса мгновенно, без перезагрузки страницы. */
function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) {
    return;
  }
  currentLang = lang;
  window.storage.setItem(LANG_STORAGE_KEY, lang);
  applyStaticTranslations();
  document.dispatchEvent(new CustomEvent("app:languagechange", { detail: { lang } }));
}

/** Обновляет всё, что можно перевести декларативно через data-i18n[-attr]. */
function applyStaticTranslations() {
  document.documentElement.lang = currentLang === "uk" ? "uk" : "ru";
  document.title = t("title");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const spec = el.getAttribute("data-i18n-attr");
    spec.split(" ").forEach((pair) => {
      const [attr, key] = pair.split(":");
      if (attr && key) {
        el.setAttribute(attr, t(key));
      }
    });
  });

  updateLangSwitchUI();
}

function updateLangSwitchUI() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const isActive = btn.dataset.lang === currentLang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function initLangSwitch() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
}

applyStaticTranslations();
initLangSwitch();
