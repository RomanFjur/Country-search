// Создание массива со странами
const countries = [
  {
    label: 'Australia',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/800px-Flag_of_Australia.svg.png'
  },
  {
    label: 'Albania',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/800px-Flag_of_Albania.svg.png'
  },
  {
    label: 'Belarus',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Flag_of_Belarus_%281918%2C_1991%E2%80%931995%29.svg/800px-Flag_of_Belarus_%281918%2C_1991%E2%80%931995%29.svg.png'
  },
  {
    label: 'Japan',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/800px-Flag_of_Japan.svg.png'
  }
];

// Объявление переменных: блок в котором будут отображаться список стран и строка поиска
let countryList = document.querySelector('.country-list'),
    searchInput = document.querySelector('.search');

// Переменные для дальнейшего создания элементов страницы
let countryLink,
    countryTitle,
    countryImage,
    countryDesc,
    countryLinkArrow,
    insideLinkDiv;

// Радио-кнопки (для дальнейшего использования в переключении стиля поиска)
let radioChange = document.querySelector('#onChange'),
    radioSubmit = document.querySelector('#onSubmit');

// Перебор массива со странами с дальнейшей генерацией элементов html-страницы (списка стран)

function sortCountries (array) {

}

let sortedCountries = [];

function createCountriesInfo (label, link) {
  countryTitle.textContent = label;
  countryDesc.textContent = `en.wikipedia.org/wiki/${label}`;
  countryLink.href = `https://${countryDesc.textContent}`;
  countryImage.src = link;
  countryImage.alt = label;
  countryLinkArrow.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="10.806" height="17.5" viewBox="0 0 10.806 17.5">
    <path id="ic_chevron_right_24px" d="M10.646,6,8.59,8.056l6.679,6.694L8.59,21.444,10.646,23.5l8.75-8.75Z" transform="translate(-8.59 -6)" fill="#333"/>
    </svg>
  `;
}

function renderCountries (array) {
  for (var i = 0; i < array.length; i++) {
    countryLink = document.createElement('a');
    countryTitle = document.createElement('p');
    countryImage = document.createElement('img');
    countryDesc = document.createElement('p');
    insideLinkDiv = document.createElement('div');
    countryLinkArrow = document.createElement('div');

    createCountriesInfo (array[i].label, array[i].link);

    countryLink.classList.add('country-link');
    countryTitle.classList.add('country-title');
    countryDesc.classList.add('country-desc');
    countryImage.classList.add('country-flag');
    countryLinkArrow.classList.add('country-link__arrow');

    countryList.append(countryLink);
    countryLink.append(countryImage);
    countryLink.append(insideLinkDiv);
    countryLink.append(countryLinkArrow);
    insideLinkDiv.append(countryTitle);
    insideLinkDiv.append(countryDesc);
  }
}

renderCountries (countries);

// Создание массивов ссылок (стран) и названий стран
let links = Array.from(document.querySelectorAll('.country-link')),
    titles = Array.from(document.querySelectorAll('.country-title'));

// Кнопка "Ок"
const searchButton = document.querySelector('.search-button');

// События смены состояния checked у radio-button-ов

function renderCountriesList () {
  let regexp = new RegExp(`^${searchInput.value}`, `i`);

  links.forEach((item) => {
    item.remove();
  });

  for (let j = 0; j < links.length; j++) {
    if (regexp.test(countries[j].label)) {
      countryList.append(links[j]);
    }
  }
}

function handleOnChangePress () {
  if (radioChange.hasAttribute('checked')) {
    return;
  }

  radioSubmit.removeAttribute('checked');
  radioChange.setAttribute('checked', 'checked');

  searchInput.addEventListener('input', renderCountriesList);
  searchButton.removeEventListener('click', renderCountriesList);
}

function handleOnSubmitPress () {
  if (radioSubmit.hasAttribute('checked')) {
    return;
  }

  radioChange.removeAttribute('checked');
  radioSubmit.setAttribute('checked', 'checked');

  searchButton.addEventListener('click', renderCountriesList);
  searchInput.removeEventListener('input', renderCountriesList);
}

radioChange.addEventListener('click', handleOnChangePress);
radioSubmit.addEventListener('click', handleOnSubmitPress);

if (radioChange.hasAttribute('checked')) {
  searchInput.addEventListener('input', renderCountriesList);
  searchButton.removeEventListener('click', renderCountriesList);
} else {
  searchButton.addEventListener('click', renderCountriesList);
  searchInput.removeEventListener('input', renderCountriesList);
}

// Проверка на checked и поиск из списка стран (ДОРАБОТАТЬ!)

// Задачи:
// 1. Написать функцию в которой мы создаем list-item по параметрам (label, link); +-
// 2. Добавить сортировку по алфавитному порядку; ---
// 3. Чистить контейнер по изменению и отрисовывать элементы заного; +
// 4. renderCoutries - принимает массив элементов и рендерит страны; +-
// 5. Функцию управления handleOnChangePress и handleOnSubmitPress (удаление противоположного ивента) и проверка; +
// 6. Чистые функции!!!
// 7. Закончить с окном внизу "JSON"
