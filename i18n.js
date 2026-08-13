"use strict";

/* ==========================================================================
   Локализация интерфейса (RU / UA / EN)

   Все переводимые строки живут в одном словаре STRINGS. Чтобы добавить
   ещё один язык, достаточно добавить ключ (например "de") со всеми теми
   же полями — остальной код (t(), applyStaticTranslations()) ничего не
   знает о конкретных языках и трогать не нужно.
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
    btnHint: "Подсказать",
    filterGroupAriaLabel: "Голосовой фильтр",
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
    filters: {
      normal: "Обычный",
      squeaky: "Писклявый",
      robot: "Робот",
    },
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
    cheatLines: {
      kitchen: [
        "Меня открывают только когда голодно, а слушают — никогда.",
        "Я видела все твои ночные набеги на холодильник в 3 часа ночи.",
        "Ты моешь посуду раз в неделю, а меня винишь, что я грязная.",
        "Я знаю твой заказ из доставки наизусть — ты знаешь мой день рождения?",
      ],
      bag: [
        "Я таскаю твою жизнь на себе, а ты даже молнию мою не чинишь.",
        "Внутри меня три чека, зарядка без провода и надежда на диету.",
        "Ты ищешь меня по утрам так, будто я прячусь специально. Может быть.",
        "Я слышала все твои телефонные разговоры и молчу. Пока.",
      ],
      bathroom: [
        "Я видел тебя в самые честные моменты дня. И в самые долгие.",
        "Ты покупаешь новые баночки, а меня не докручиваешь до конца.",
        "Я знаю твой настоящий цвет волос. Все знают, но я — точно.",
        "Ты поёшь, когда думаешь, что никто не слышит. Я слышу каждый раз.",
      ],
      desk: [
        "Я лежу тут с прошлого вторника, потому что «потом уберу».",
        "Ты обещаешь мне порядок каждый понедельник. Уже год.",
        "Я видел все твои дедлайны в последнюю минуту. Все до единого.",
        "Подо мной три кабеля от несуществующих устройств.",
      ],
      jacket: [
        "Я застрял тут с зимы, и никто меня не хватился.",
        "Я знаю, сколько мелочи ты теряешь каждый месяц. Это неприлично много.",
        "Ты находишь меня и удивляешься, будто я сам сюда залез.",
        "Я пахну твоими духами и чужим кофе. Не спрашивай.",
      ],
      fridge: [
        "Меня купили «на диету», а съели за один вечер.",
        "Я стою рядом с просрочкой, которую ты боишься открыть.",
        "Ты клянёшься, что доешь меня завтра. Ты клянёшься это неделю.",
        "Я видел, как ты ешь стоя, прямо у открытой дверцы, в три часа ночи.",
      ],
      underBed: [
        "Я тут живу с прошлого переезда, и мы оба делаем вид, что меня нет.",
        "Ты теряешь носки, а я их коллекционирую молча.",
        "Я слышал все твои разговоры с самим собой перед сном.",
        "Однажды меня найдут при уборке и удивятся: «а это что тут делает?»",
      ],
      car: [
        "Я слышал все твои концерты за рулём. Пой тише, пожалуйста.",
        "Ты паркуешься так, будто я невидимка. Спасибо, что цел.",
        "Я знаю твой самый долгий разговор по громкой связи. Личное, конечно.",
        "Подо мной живёт мелочь, чек с заправки и одна забытая перчатка.",
      ],
      shoeShelf: [
        "Меня купили «для особого случая» и не надевали ни разу.",
        "Я стою рядом с твоими любимыми кроссовками и завидую молча.",
        "Ты обещал мне долгую жизнь, а сам ходишь в одном и том же.",
        "Я знаю точно, сколько раз ты передумал меня выкинуть.",
      ],
      chargerDrawer: [
        "Я заряжаю устройство, которого у тебя больше нет. Уже три года.",
        "Ты хранишь меня «на всякий случай» с 2016 года.",
        "Я лежу рядом с проводом, который никуда не подходит. Как и я.",
        "Каждый раз ты ищешь именно «тот самый» провод. Я — не он. Опять.",
      ],
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
    btnHint: "Підказати",
    filterGroupAriaLabel: "Голосовий фільтр",
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
    filters: {
      normal: "Звичайний",
      squeaky: "Писклявий",
      robot: "Робот",
    },
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
    cheatLines: {
      kitchen: [
        "Мене відчиняють, лише коли голодно, а слухають — ніколи.",
        "Я бачила всі твої нічні набіги на холодильник о третій ночі.",
        "Ти миєш посуд раз на тиждень, а винуватиш мене, що я брудна.",
        "Я знаю твоє замовлення з доставки напам'ять — а ти знаєш мій день народження?",
      ],
      bag: [
        "Я тягаю твоє життя на собі, а ти навіть блискавку мою не лагодиш.",
        "Всередині мене три чеки, бездротова зарядка і надія на дієту.",
        "Ти шукаєш мене вранці так, ніби я ховаюся навмисно. Може, й так.",
        "Я чула всі твої телефонні розмови і мовчу. Поки що.",
      ],
      bathroom: [
        "Я бачила тебе в найчесніші миті дня. І в найдовші.",
        "Ти купуєш нові баночки, а мене не докручуєш до кінця.",
        "Я знаю твій справжній колір волосся. Всі знають, але я — точно.",
        "Ти співаєш, коли думаєш, що ніхто не чує. Я чую щоразу.",
      ],
      desk: [
        "Я лежу тут з минулого вівторка, бо «потім приберу».",
        "Ти обіцяєш мені порядок щопонеділка. Вже рік.",
        "Я бачив усі твої дедлайни в останню хвилину. Усі до одного.",
        "Піді мною три кабелі від неіснуючих пристроїв.",
      ],
      jacket: [
        "Я застряг тут з зими, і ніхто мене не хватився.",
        "Я знаю, скільки дрібних ти губиш щомісяця. Це непристойно багато.",
        "Ти знаходиш мене і дивуєшся, ніби я сам сюди заліз.",
        "Я пахну твоїми парфумами і чужою кавою. Не питай.",
      ],
      fridge: [
        "Мене купили «на дієту», а з'їли за один вечір.",
        "Я стою поруч із простроченим, яке ти боїшся відкрити.",
        "Ти клянешся, що доїси мене завтра. Ти клянешся це вже тиждень.",
        "Я бачив, як ти їси стоячи, просто біля відчинених дверцят, о третій ночі.",
      ],
      underBed: [
        "Я тут живу з минулого переїзду, і ми обоє вдаємо, що мене немає.",
        "Ти губиш шкарпетки, а я їх мовчки колекціоную.",
        "Я чув усі твої розмови сам із собою перед сном.",
        "Одного разу мене знайдуть під час прибирання і здивуються: «а це що тут робить?»",
      ],
      car: [
        "Я чув усі твої концерти за кермом. Співай тихіше, будь ласка.",
        "Ти паркуєшся так, ніби я невидиме. Дякую, що цілий.",
        "Я знаю твою найдовшу розмову через гучний зв'язок. Особисте, звісно.",
        "Піді мною живе дрібняк, чек із заправки й одна забута рукавичка.",
      ],
      shoeShelf: [
        "Мене купили «для особливого випадку» і жодного разу не взули.",
        "Я стою поруч із твоїми улюбленими кросівками і мовчки заздрю.",
        "Ти обіцяв мені довге життя, а сам ходиш в одному й тому ж.",
        "Я точно знаю, скільки разів ти передумував мене викинути.",
      ],
      chargerDrawer: [
        "Я заряджаю пристрій, якого в тебе вже немає. Вже три роки.",
        "Ти зберігаєш мене «про всяк випадок» з 2016 року.",
        "Я лежу поруч із дротом, який нікуди не підходить. Як і я.",
        "Щоразу ти шукаєш саме «той самий» дріт. Я — не він. Знову.",
      ],
    },
  },

  en: {
    title: "It Would Tell On You",
    tagline: "A party game about things that know way too much about you",
    startRules:
      "Grab a random object from your room and voice out loud what it " +
      "really thinks about its owner. You'll have 10 seconds.",
    btnStart: "Grab an Object",
    roundLabel: "Round",
    categoryLabel: "Grab something from this category",
    categoryRules:
      "Pick up the first thing you see and imagine: if it could talk — " +
      "what would it say about you?",
    btnRecord: "Record Line",
    btnHint: "Hint",
    filterGroupAriaLabel: "Voice filter",
    micError:
      "Couldn't get microphone access. Allow it in your browser settings " +
      "and try again.",
    recordingLabel: "Speak as:",
    recBadge: "Recording",
    btnCancel: "Cancel",
    playbackLabel: "Line from:",
    ariaPlay: "Play",
    ariaPause: "Pause",
    btnSend: "Send",
    btnNext: "Next Round",
    toastSend: "Clip ready to send! 🎉",
    langSwitchAriaLabel: "Interface language",
    filters: {
      normal: "Normal",
      squeaky: "Squeaky",
      robot: "Robot",
    },
    categories: {
      kitchen: "something in the kitchen",
      bag: "something in your bag",
      bathroom: "something in the bathroom",
      desk: "something on your desk",
      jacket: "something in a jacket pocket",
      fridge: "something in the fridge",
      underBed: "something under the bed",
      car: "something in the car",
      shoeShelf: "something on the shoe shelf",
      chargerDrawer: "something in the charger drawer",
    },
    cheatLines: {
      kitchen: [
        "I only get opened when you're hungry, never to be listened to.",
        "I've seen every 3am fridge raid you've ever pulled.",
        "You wash dishes once a week and blame me for being dirty.",
        "I know your delivery order by heart — do you know my birthday?",
      ],
      bag: [
        "I carry your whole life around and you won't even fix my zipper.",
        "Inside me: three receipts, a dead charger, and one dead diet plan.",
        "You dig through me every morning like I'm hiding on purpose. Maybe I am.",
        "I've heard every phone call you've ever made. I'm staying quiet. For now.",
      ],
      bathroom: [
        "I've seen you at your most honest moments of the day. And the longest ones.",
        "You keep buying new bottles and never screw my lid on properly.",
        "I know your real hair color. Everyone does, but I know for sure.",
        "You sing when you think no one's listening. I hear every single time.",
      ],
      desk: [
        "I've been sitting here since last Tuesday because 'I'll clean it later'.",
        "You promise me tidiness every Monday. It's been a year.",
        "I've watched every deadline you've ever crushed at the last minute.",
        "Under me live three cables to devices that don't exist anymore.",
      ],
      jacket: [
        "I've been stuck in here since winter and nobody noticed.",
        "I know exactly how much loose change you lose every month. It's embarrassing.",
        "You find me and act surprised, like I crawled in here myself.",
        "I smell like your perfume and someone else's coffee. Don't ask.",
      ],
      fridge: [
        "I was bought 'for the diet' and eaten in one evening.",
        "I stand next to the leftovers you're too scared to open.",
        "You swear you'll finish me tomorrow. You've sworn that for a week.",
        "I've watched you eat standing up, door wide open, at 3am.",
      ],
      underBed: [
        "I've lived here since your last move and we both pretend I don't.",
        "You keep losing socks. I've been quietly collecting them.",
        "I've heard every conversation you've had with yourself before bed.",
        "One day someone will find me while cleaning and go 'wait, what is this doing here?'",
      ],
      car: [
        "I've heard every concert you've performed behind the wheel. Sing quieter, please.",
        "You park like I'm invisible. Thanks for staying in one piece.",
        "I know your longest hands-free call ever. Personal stuff, obviously.",
        "Under me live loose change, a gas station receipt, and one forgotten glove.",
      ],
      shoeShelf: [
        "I was bought 'for a special occasion' and never worn once.",
        "I stand next to your favorite sneakers, quietly jealous.",
        "You promised me a long life, then kept wearing the same pair anyway.",
        "I know exactly how many times you almost threw me out.",
      ],
      chargerDrawer: [
        "I charge a device you don't even own anymore. Three years running.",
        "You've kept me 'just in case' since 2016.",
        "I lie next to a cable that fits nothing. Same, honestly.",
        "Every time, you dig for 'that one cable'. It's never me. Again.",
      ],
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
 * 2. Иначе — язык браузера: начинается с "uk" -> украинский,
 *    начинается с "ru" -> русский.
 * 3. Во всех остальных случаях (в т.ч. язык браузера не определён) —
 *    английский по умолчанию.
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

  const normalized = browserLangs.map((lang) => String(lang || "").toLowerCase());

  if (normalized.some((lang) => lang.startsWith("uk"))) {
    return "uk";
  }
  if (normalized.some((lang) => lang.startsWith("ru"))) {
    return "ru";
  }
  return "en";
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
  document.documentElement.lang = currentLang;
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
