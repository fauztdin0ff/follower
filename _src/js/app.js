import * as flsFunctions from "./modules//functions.js";

flsFunctions.isWebp();


/*-------------------------------------------кнопки "Войти" и "Регистрация"----------------------------------------------*/
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const popups = document.querySelectorAll('.popup');
let isPopupOpen = false;

function togglePopup(popup) {
  if (popup) {
    const isOpen = popup.classList.contains('show');
    popups.forEach(p => p.classList.remove('show'));
    popup.classList.toggle('show', !isOpen);
    isPopupOpen = !isOpen;
    document.body.classList.toggle('popup', isPopupOpen);
    const popupId = isPopupOpen ? popup.id : '';
    history.pushState(null, null, `#${popupId}`);
  }
}

function closePopups() {
  popups.forEach(p => p.classList.remove('show'));
  isPopupOpen = false;
  document.body.classList.remove('popup');
  history.pushState(null, null, '#');
}

if (loginButton) {
  loginButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const loginPopup = document.getElementById('login');
    togglePopup(loginPopup);
  });
}

if (registerButton) {
  registerButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const registerPopup = document.getElementById('register');
    togglePopup(registerPopup);
  });
}

document.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() !== 'label') {
    closePopups();
  }
});

popups.forEach(popup => {
  popup.addEventListener('click', event => event.stopPropagation());
});

const closeButtons = document.querySelectorAll('.close-popup');
closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    closePopups();
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const popupId = location.hash.substr(1);
  const popup = document.getElementById(popupId);
  if (popup && popup.classList.contains('popup')) {
    togglePopup(popup);
  }
});

window.addEventListener('popstate', () => {
  if (isPopupOpen) {
    closePopups();
  }
});

/*--------------------------------------------Подменю после авторизации---------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".account-authorized");
  const submenu = document.querySelector(".account-authorized__submenu");

  if (button && submenu) {
    button.addEventListener("click", function () {
      if (window.innerWidth <= 767) {
        button.classList.toggle("mobile-open");
        if (button.classList.contains("mobile-open")) {
          submenu.style.display = "block";
        } else {
          submenu.style.display = "none";
        }
      }
    });
  }
});

/*--------------------------------------------САЙДБАР---------------------------------------------*/
const openSidebarButton = document.getElementById("open-sidebar");
const sidebar = document.getElementById("sidebar");
const body = document.body;
let isSidebarOpen = false;

if (openSidebarButton && sidebar) {
  function toggleSidebar() {
    sidebar.classList.toggle("show");
    isSidebarOpen = !isSidebarOpen;
    body.classList.toggle("lock", isSidebarOpen);
  }

  openSidebarButton.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleSidebar();
  });

  document.addEventListener("click", function (event) {
    if (isSidebarOpen && !sidebar.contains(event.target) && event.target !== openSidebarButton) {
      toggleSidebar();
    }
  });

  sidebar.addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

/*--------------------------------------------Services Табы---------------------------------------------*/
const socialMediaSelect = document.getElementById('socialMediaSelect');
const youtubeTabs = document.getElementById('youtubeTabs');
const youtubeTabsSelect = document.getElementById('youtubeTabsSelect');
const instagramTabsSelect = document.getElementById('instagramTabsSelect');
const telegramTabsSelect = document.getElementById('telegramTabsSelect');
const tiktokTabsSelect = document.getElementById('tiktokTabsSelect');
const vkontakteTabsSelect = document.getElementById('vkontakteTabsSelect');
const twitchTabsSelect = document.getElementById('twitchTabsSelect');
const discordTabsSelect = document.getElementById('discordTabsSelect');
const quantityInput = document.getElementById('quantityInput');
const amountInput = document.getElementById('amountInput');
const additionalTextContainer2 = document.getElementById('additionalTextContainer2');

// Общий обработчик для всех select-элементов
function handleSelectChange(selectElement) {
  calculateAmount();
  showAdditionalTextForSelect(selectElement);
}
//Табы платформы
if (socialMediaSelect) {
  socialMediaSelect.addEventListener('change', function () {
    const selectedOption = socialMediaSelect.value;
    hideAllTabs();
    if (selectedOption === 'youtube') {
      youtubeTabs.classList.add('show');
      updateMinMax(youtubeTabsSelect.options[youtubeTabsSelect.selectedIndex]);
    } else if (selectedOption === 'instagram') {
      instagramTabs.classList.add('show');
      updateMinMax(instagramTabsSelect.options[instagramTabsSelect.selectedIndex]);
    } else if (selectedOption === 'telegram') {
      telegramTabs.classList.add('show');
      updateMinMax(telegramTabsSelect.options[telegramTabsSelect.selectedIndex]);
    } else if (selectedOption === 'tiktok') {
      tiktokTabs.classList.add('show');
      updateMinMax(tiktokTabsSelect.options[tiktokTabsSelect.selectedIndex]);
    } else if (selectedOption === 'vkontakte') {
      vkontakteTabs.classList.add('show');
      updateMinMax(vkontakteTabsSelect.options[vkontakteTabsSelect.selectedIndex]);
    } else if (selectedOption === 'twitch') {
      twitchTabs.classList.add('show');
      updateMinMax(twitchTabsSelect.options[twitchTabsSelect.selectedIndex]);
    } else if (selectedOption === 'discord') {
      discordTabs.classList.add('show');
      updateMinMax(discordTabsSelect.options[discordTabsSelect.selectedIndex]);
    }
    handleSelectChange(this);

    const selectedTabSelect = selectElements.find(selectEl => selectEl.id === `${selectedOption}TabsSelect`);
    if (selectedTabSelect) {
      showAdditionalTextForSelect(selectedTabSelect);
    }
  });
}


const selectElements = [
  youtubeTabsSelect,
  instagramTabsSelect,
  telegramTabsSelect,
  tiktokTabsSelect,
  vkontakteTabsSelect,
  twitchTabsSelect,
  discordTabsSelect
];

selectElements.forEach(selectElement => {
  if (selectElement) {
    selectElement.addEventListener('change', function () {
      handleSelectChange(this);
    });
  }
});

function hideAllTabs() {
  if (youtubeTabs) youtubeTabs.classList.remove('show');
  if (instagramTabs) instagramTabs.classList.remove('show');
  if (telegramTabs) telegramTabs.classList.remove('show');
  if (tiktokTabs) tiktokTabs.classList.remove('show');
  if (vkontakteTabs) vkontakteTabs.classList.remove('show');
  if (twitchTabs) twitchTabs.classList.remove('show');
  if (discordTabs) discordTabs.classList.remove('show');
}

function calculateAmount() {
  if (!socialMediaSelect || !quantityInput) return;

  const selectedService = socialMediaSelect.value;
  let selectedType;

  if (selectedService === 'youtube') {
    selectedType = youtubeTabsSelect.value;
  } else if (selectedService === 'instagram') {
    selectedType = instagramTabsSelect.value;
  } else if (selectedService === 'telegram') {
    selectedType = telegramTabsSelect.value;
  } else if (selectedService === 'tiktok') {
    selectedType = tiktokTabsSelect.value;
  } else if (selectedService === 'vkontakte') {
    selectedType = vkontakteTabsSelect.value;
  } else if (selectedService === 'twitch') {
    selectedType = twitchTabsSelect.value;
  } else if (selectedService === 'discord') {
    selectedType = discordTabsSelect.value;
  }


  const quantity = parseInt(quantityInput.value, 10);

  const prices = {
    youtube: {
      likes: 18000,
      likesVip: 44000,
      viewsCheap: 20000,
      views: 52000,
      viewsVip: 112000,
      subscribers: 280000,
      subscribersVip: 570000,
      combo: 600000,
      commentaries: 1000000,
    },
    instagram: {
      likesCheap: 12000,
      likes: 18000,
      likesVip: 60000,
      subscribersCheap: 24000,
      subscribers: 36000,
      subscribersVip: 165000,
      viewsVideo: 40000,
      viewsHistory: 12000,
      combo: 18000,
      repost: 22000,
    },
    telegram: {
      viewsHistory: 24000,
      viewsPostCheap: 8000,
      viewsPost: 34000,
      subscribers: 20000,
      subscribersVip: 88000,
      subscribersWoman: 65000,
      reaction: 10000,
      repost: 24000,
    },
    tiktok: {
      subscribersCheap: 66000,
      subscribers: 96000,
      subscribersVip: 150000,
      views: 14000,
      viewsVip: 66000,
      likesCheap: 12000,
      likes: 28000,
      likesVip: 96000,
      liveView15: 222000,
      liveView30: 350000,
      liveView60: 555000,
      combo: 600000,
    },
    vkontakte: {
      likes: 20000,
      likesVip: 55000,
      viewsVideo: 12000,
      subscribers: 50000,
      subscribersVip: 100000,
      subscribersWoman: 150000,
    },
    twitch: {
      subscribers: 20000,
    },
    discord: {
      subscribers: 270000,
      members: 235000,
    },
  };

  const price = prices[selectedService][selectedType];
  if (!isNaN(quantity)) {
    const totalAmount = (price * quantity) / 1000;
    amountInput.value = `${totalAmount} сум`;
  } else {
    amountInput.value = "";
  }
}

function showAdditionalTextForSelect(selectElement) {
  const selectedOption = selectElement.value;
  if (additionalTextContainer2) {
    additionalTextContainer2.textContent = getAdditionalText(selectedOption);
  }
}

function getAdditionalText(optionValue) {
  const additionalTexts = {
    youtube: {
      likes: 'Лайки бюджетные. Старт до 10 мин. Скорость до 100к в сутки. Без списаний',
      likesVip: 'VIP лайки. Старт до 10 мин. Скорость до 500к в сутки. Без списаний. ♻ Восстановление и гарантия 30 дней.',
      viewsCheap: 'Просмотры бюджетные. Старт до 1 часа. Просмотры из России и СНГ. Время просмотра от 15 до 50 секунд. Скорость до 500 в сутки.♻ Гарантия и восстановление по кнопке 30 дней.',
      views: 'Старт 0-30 мин. Скорость до 1000 в сутки. Просмотры из России и СНГ. Источник: рекомендации. Без гарантии. Возможны списания. Среднее время завершения: 42 ч. 33 мин.',
      viewsVip: 'Premium просмотры живые. Время старта: 0-60 мин. Скорость: до 300 / день. Удержание (~ время просмотра) от 5 минут до 20 мин. 100% реальный трафик. ♻ Гарантия 60 дней.Количество должно быть кратно 1000!',
      subscribers: 'Быстрый старт. Скорость до 7k в сутки. ♻ Гарантия и восстановление 30 дней. Возможны списания. Никакие претензии не принимаются. Счётчик подписчиков должен быть обязательно открыт.',
      subscribersVip: 'Моментальный старт. Скорость до 1000 в сутки. Подписчики России и Украины. Канал должен иметь не менее 2 видео. Источник: поиск Youtube (ваш канал будет найден в поиске) Возможны списания. ♻ Гарантия и восстановление 60 дней. Бонус: вы получите +100-150 просмотров и несколько лайков',
      combo: 'Подписчики + просмотры + лайки. Старт до 24 часов. Скорость до 500 в сутки. Помимо подписчиков, вы получаете так же просмотры и лайки от них. Способствует увеличению рейтинга канала в поиске. ♻ Гарантия и восстановление 30 дней. Счётчик подписчиков должен быть обязательно открыт',
      commentaries: 'Premuim комментарии русские живые. Реальные комментарии под видео от живых пользователей (RU)',
    },
    instagram: {
      likesCheap: 'Лайки бюджетные. Русские аккаунты высокого качества.',
      likes: 'Лайки (живые с охватом). Быстрый старт. Скорость до 2к в сутки. Лайки на фото/видео от реальных русскоязычных пользователей. Без списаний.',
      likesVip: 'Лайки Premium, живые с охватом. Старт 1-30 мин. Скорость до 300 в сутки. Лучшая услуга на данный момент. Супер-высокое качество! Высокий шанс попадания в ТОП. Лайки на фото/видео от живых русскоязычных пользователей. С лайками так же добавляется охват и прочая статистика.Работают всегда!',
      subscribersCheap: 'Подписчики бюджетные. Быстрый старт. Скорость до 30k в сутки. Высокое качество, большинство реальных пользователей. Практически без списаний.',
      subscribers: 'Подписчики реальные. Быстрый старт. Скорость до 15к в сутки. Высокое качество. Большинство профилей зарегистрированы давно и имеют большой возраст. Присутствуют русские пользователи. Без списаний. ♻ ᴀʀ Гарантия и автоматическое восстановление отписок 30 дней.',
      subscribersVip: 'Подписчики Premium живые. Быстрый старт. Скорость до 1к в сутки. Живые, реальные пользователи. Русскоязычные. Все с аватаром и публикациями. Плавное добавление. Работают всегда! Возможны отписки, т.к. пользователи живые. ♻ Гарантия и восстановление 30 дней. С аудиторией добавляется статистика (посещения и пр.) Подписчики с приложений. Тематики порно/ставки/заработок/наркотики/накрутка - запрещены. Заказы будут отменяться.',
      viewsVideo: 'Просмотры видео бюджетные',
      viewsHistory: 'Просмотры историй (+ посещения). Быстрый старт. Скорость до 20к в сутки. Вместе с просмотрами добавляются визиты и взаимодействия.',
      combo: 'Посещения + охват + впечатления. Указывать только Username или прямую ссылку на историю. Старт 0-1 час. Скорость до 20к в сутки. Статистика обновляется через несколько часов. Доставляется в последнюю историю, если заказано по имени пользователя, или в конкретную историю, если вы заказали ссылку на историю',
      repost: 'Репост ⟮ поделиться постом ⟯. Добавление репостов в статистику поста. Быстрый старт. Скорость до 1 миллиона в сутки. Указывать ссылку на пост.',
    },
    telegram: {
      viewsHistory: 'Быстрый старт. Скорость до 100к в сутки. Указывать ссылку на историю',
      viewsPostCheap: 'Моментальный старт. Скорость до 1 млн. в сутки. Указывать ссылку на пост. Просмотры добавляются с русских ip адресов. (в статистику не попадают) Можно так же указывать ссылку на канал. В этом случае просмотры будут распределены на 10-20 последних постов. После выполнения можно заказать повторно. Максимальное кол-во не ограничено.',
      viewsPost: 'Быстрый старт. Низкая скорость. Реальные просмотры. Просмотры на последние 100 постов на канале. Обратите внимание: если в постах присутствуют изображения, то каждое фото будет определено системой, как отдельный пост.',
      subscribers: 'Старт 0-1 час. Скорость до 200к в сутки. Аккаунты высокого качества. Гарантия 3 дня. Запрещенные тематики, а так же новые и пустые каналы не поддерживаются.',
      subscribersVip: 'Быстрый старт. Скорость до 300k в сутки. Высокое качество. Без списаний. Гарантия 30 дней.',
      subscribersWoman: 'Старт 0-1 час. Скорость до 10к в сутки. Аккаунты с русскими именами и с аватарками женского пола. Вместе с подписчиками вы так же получаете просмотры из поиска. Без списаний.',
      reaction: 'Позитивные реакции под постом.',
      repost: 'Быстрый старт. Скорость до 50000 в сутки. Добавление репостов на указанную публикацию с аккаунтов из разных стран. Попадают в статистику канала. Среднее время завершения: 12 ч. 32 мин.',
    },
    tiktok: {
      subscribersCheap: 'Быстрый старт. Скорость до 2к в сутки. Хорошее качество. Без гарантии.',
      subscribers: 'Быстрый старт. Скорость до 50k в сутки. Высокое качество, реальные аккаунты. Гарантия 30 дней.',
      subscribersVip: 'Старт в течение 10 мин, высокая скорость. Гарантия 30 дней. Все профили живые, российские, с аватаром и постами. Скорость до 2к в сутки.',
      views: 'Старт 0-10 мин. Скорость до 1 миллиона в сутки. Реальные просмотры.',
      viewsVip: 'Моментальный старт. Скорость до 30к в сутки. Живые просмотры от пользователей из России и СНГ.',
      likesCheap: 'Быстрый старт. Скорость до 30k в сутки. Без списаний. Гарантия 30 дней.',
      likes: 'Быстрый старт. Скорость до 50k в сутки. ♻ Гарантия и восстановление 30 дней',
      likesVip: 'Быстрый старт. Лайки от русскоязычных аккаунтов. Качество микс, ~1k/сутки',
      liveView15: 'Старт 0-5 мин. Стабильные. Вводить ссылку на аккаунт или на сам эфир. Остаются в течение 15 минут.',
      liveView30: 'Старт 0-5 мин. Стабильные. Вводить ссылку на аккаунт или на сам эфир. Остаются в течение 30 минут.',
      liveView60: 'Старт 0-5 мин. Стабильные. Вводить ссылку на аккаунт или на сам эфир. Остаются в течение 60 минут.',
      combo: 'Комплексное решение. Быстрый старт. Скорость до 2к в сутки. Живые пользователи. Каждый пользователь находит ваше видео в поиске, досматривает его до конца, ставит лайк и подпишется. Выводит профиль в рекомендацию.',
    },
    vkontakte: {
      likes: 'Моментальный старт. Скорость до 10k в сутки. Среднее время завершения: 51 ч. 25 мин.',
      likesVip: 'Живые лайки. Моментальный старт. Скорость до 10k в сутки.',
      viewsVideo: 'Поддерживаются видео загруженные на платформу ВКонтакте с данных платформ: YouTube, Instagram, ok.ru, Vimeo, Coub, 1tv, Rutube, Pladform и других ресурсов. Среднее время завершения: 3 ч. 6 мин.',
      subscribers: 'Быстрые подписчики бюджетные',
      subscribersVip: 'Старт до 2 часов. Скорость до 1000 в сутки. Уникальная услуга! Гарантия 40 дней. Высокое качество (собак до 5%). Живые подписчики с приложений (не скрипт и не вирус). Живая аудитория в друзья, подписчики смотрят посты, проявляют активность, идеальный вариант для быстрого набора подписчиков, так же поднимается охват. Тематики порно/ставки/заработок/наркотики/накрутка - запрещены. Заказы будут отменяться.',
      subscribersWoman: 'Женский пол - Живые вступившие в группы/паблики.',
    },
    twitch: {
      subscribers: 'Старт 0-1 час. Скорость до 100к в сутки. Без гарантии.',
    },
    discord: {
      subscribers: 'Старт до 5 часов. Скорость до 2к в сутки. Пример ссылки: User#1234 Ccылка должна быть безлимитной по времени. Без списаний.', members: 'Участники в сервер ( с фото )',
    },
  };

  const selectedService = socialMediaSelect.value;
  return additionalTexts[selectedService][optionValue] || '';
}

// Добавьте обработчик события input для поля quantityInput
if (quantityInput) {
  quantityInput.addEventListener('input', function () {
    calculateAmount();
  });
}


// Вызовите функцию showAdditionalTextForSelect при загрузке страницы, чтобы отобразить дополнительный текст для выбранного option второго select элемента
window.addEventListener('load', function () {
  if (youtubeTabsSelect) {
    showAdditionalTextForSelect(youtubeTabsSelect);
  }
});



//Ограничения мин и макс количества заказа
document.addEventListener("DOMContentLoaded", function () {
  const youtubeTabsSelect = document.getElementById("youtubeTabsSelect");
  if (youtubeTabsSelect) {
    youtubeTabsSelect.addEventListener("change", function () {
      updateMinMax(youtubeTabsSelect.options[youtubeTabsSelect.selectedIndex]);
    });
  }

  const instagramTabsSelect = document.getElementById("instagramTabsSelect");
  if (instagramTabsSelect) {
    instagramTabsSelect.addEventListener("change", function () {
      updateMinMax(instagramTabsSelect.options[instagramTabsSelect.selectedIndex]);
    });
  }

  const telegramTabsSelect = document.getElementById("telegramTabsSelect");
  if (telegramTabsSelect) {
    telegramTabsSelect.addEventListener("change", function () {
      updateMinMax(telegramTabsSelect.options[telegramTabsSelect.selectedIndex]);
    });
  }

  const tiktokTabsSelect = document.getElementById("tiktokTabsSelect");
  if (tiktokTabsSelect) {
    tiktokTabsSelect.addEventListener("change", function () {
      updateMinMax(tiktokTabsSelect.options[tiktokTabsSelect.selectedIndex]);
    });
  }

  if (vkontakteTabsSelect) {
    vkontakteTabsSelect.addEventListener("change", function () {
      updateMinMax(vkontakteTabsSelect.options[vkontakteTabsSelect.selectedIndex]);
    });
  }

  if (twitchTabsSelect) {
    twitchTabsSelect.addEventListener("change", function () {
      updateMinMax(twitchTabsSelect.options[twitchTabsSelect.selectedIndex]);
    });
  }

  if (discordTabsSelect) {
    discordTabsSelect.addEventListener("change", function () {
      updateMinMax(discordTabsSelect.options[discordTabsSelect.selectedIndex]);
    });
  }

  const quantityInput = document.getElementById("quantityInput");
  const minMaxValueSpan = document.querySelector(".minmax-value");

  function updateMinMax(selectedOption) {
    if (!selectedOption) {
      return;
    }

    const minmax = selectedOption.getAttribute("data-minmax").split("-");
    const minValue = parseInt(minmax[0]);
    const maxValue = parseInt(minmax[1]);

    if (quantityInput) {
      quantityInput.setAttribute("min", minValue);
      quantityInput.setAttribute("max", maxValue);
    }

    if (minMaxValueSpan) {
      const formattedOutput = `(мин. ${minValue.toLocaleString()}, макс. ${maxValue.toLocaleString()})`;
      minMaxValueSpan.textContent = formattedOutput;
    }
  }
});

function updateMinMax(selectedOption) {
  const minmax = selectedOption.getAttribute("data-minmax").split("-");
  const minValue = parseInt(minmax[0]);
  const maxValue = parseInt(minmax[1]);
  const minMaxValueSpan = document.querySelector(".minmax-value");

  quantityInput.setAttribute("min", minValue);
  quantityInput.setAttribute("max", maxValue);

  const formattedOutput = `(мин. ${minValue.toLocaleString()}, макс. ${maxValue.toLocaleString()})`;
  minMaxValueSpan.textContent = formattedOutput;
}


/*--------------------------------------------PRICE BLOCK---------------------------------------------*/
const accordions = document.querySelectorAll('.accordion-item');

accordions.forEach(accordion => {
  accordion.addEventListener('click', () => {
    accordion.classList.toggle('active');
  });
});


/*-------------------------------------------CABINET ----------------------------------------------*/
// Получите ссылку на элемент canvas, если он существует
var canvasElement = document.getElementById('myPieChart');

// Если элемент существует, продолжите создание круговой диаграммы
if (canvasElement) {
  var ctx = canvasElement.getContext('2d');

  // Создайте данные для круговой диаграммы
  var data = {
    datasets: [{
      labels: ['Red', 'Orange', 'Yellow', 'Green'],
      data: [3, 2, 11, 1], // Здесь указываются значения для каждого сектора
      backgroundColor: ['#36A2EB', '#fffc50', 'rgb(67, 223, 75)', 'rgb(210, 66, 66)'] // Цвета для секторов
    }]
  };

  // Создайте круговую диаграмму
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data
  });
}



/*--------------------------------------------Восстановление пароля---------------------------------------------*/
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the form from actually submitting
  var resetBody = document.querySelector('.reset__body');
  var mailSend = document.querySelector('.mail-send');

  resetBody.style.display = 'none';
  mailSend.style.display = 'block';
}

/*--------------------------------------------Открыть закрыть просмотр пароля---------------------------------------------*/
const passwordInput = document.getElementById("new_password");
const confirmInput = document.getElementById("confirm_password");
const showPasswordButton = document.getElementById("showPasswordButton");
const showConfirmButton = document.getElementById("showConfirmButton");

if (passwordInput && confirmInput && showPasswordButton && showConfirmButton) {
  showPasswordButton.addEventListener("click", togglePasswordVisibility(passwordInput));
  showConfirmButton.addEventListener("click", togglePasswordVisibility(confirmInput));
}

function togglePasswordVisibility(inputElement) {
  return () => {
    if (inputElement.type === "password") {
      inputElement.type = "text";
    } else {
      inputElement.type = "password";
    }
  };
}

