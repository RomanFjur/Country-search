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
  },
  {
    label: 'Bolivia',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Bolivia_%28state%29.svg/800px-Flag_of_Bolivia_%28state%29.svg.png'
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

function createCountriesInfo (label, link) {
  countryLink = document.createElement('a');
  countryTitle = document.createElement('p');
  countryImage = document.createElement('img');
  countryDesc = document.createElement('p');
  insideLinkDiv = document.createElement('div');
  countryLinkArrow = document.createElement('div');

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

let links;

function renderCountries (array) {
  if (array != countries) {
    links.forEach((item) => {
      item.remove();
    });
  }

  if (array == countries) {
    for (let i = 0; i < array.length; i++) {
      createCountriesInfo (array[i].label, array[i].link);
    }
  }

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < countries.length; j++) {
      if (array[i] == countries[j].label) {
        createCountriesInfo (countries[j].label, countries[j].link);
      }
    }
  }

  links = Array.from(document.querySelectorAll('.country-link'));
}

renderCountries (countries);

// Кнопка "Ок"
const searchButton = document.querySelector('.search-button');

// События смены состояния checked у radio-button-ов

function renderCountriesList () {
  let regexp = new RegExp(`^${searchInput.value}`, `i`);

  let sortArray = [];

  for (let j = 0; j < countries.length; j++) {
    if (regexp.test(countries[j].label)) {
      sortArray.push(countries[j].label);
    }
  }
  sortArray.sort();
  renderCountries(sortArray);
}

function handleOnChangePress () {
  if (radioChange.hasAttribute('checked')) {
    return;
  }

  radioSubmit.removeAttribute('checked');
  radioChange.setAttribute('checked', 'checked');

  searchInput.addEventListener('input', renderCountriesList);
  searchButton.removeEventListener('click', renderCountriesList);
  searchButton.style.display = 'none';
}

function handleOnSubmitPress () {
  if (radioSubmit.hasAttribute('checked')) {
    return;
  }

  radioChange.removeAttribute('checked');
  radioSubmit.setAttribute('checked', 'checked');

  searchButton.style.display = 'block';
  searchButton.addEventListener('click', renderCountriesList);
  searchInput.removeEventListener('input', renderCountriesList);
}

radioChange.addEventListener('click', handleOnChangePress);
radioSubmit.addEventListener('click', handleOnSubmitPress);


//переделать потом!
if (radioChange.hasAttribute('checked')) {
  searchInput.addEventListener('input', renderCountriesList);
  searchButton.removeEventListener('click', renderCountriesList);
  searchButton.style.display = 'none';
} else {
  searchButton.addEventListener('click', renderCountriesList);
  searchInput.removeEventListener('input', renderCountriesList);
}

// Проверка на checked и поиск из списка стран (ДОРАБОТАТЬ!)

// Задачи:
// 1. Написать функцию в которой мы создаем list-item по параметрам (label, link); +
// 2. Добавить сортировку по алфавитному порядку; +
// 3. Чистить контейнер по изменению и отрисовывать элементы заного; +
// 4. renderCoutries - принимает массив элементов и рендерит страны; +
// 5. Функцию управления handleOnChangePress и handleOnSubmitPress (удаление противоположного ивента) и проверка; +
// 6. Чистые функции!!!
// 7. Закончить с окном внизу "JSON"
