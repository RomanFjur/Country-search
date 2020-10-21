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
const countryList = document.querySelector('.country-list'),
      searchInput = document.querySelector('.search');

// Переменные для рендера списка стран
let countryLink,
    countryTitle,
    countryImage,
    countryDesc,
    countryLinkArrow,
    insideLinkDiv;

// Радио-кнопки (для дальнейшего использования в переключении стиля поиска)
const radioChange = document.querySelector('#onChange'),
      radioSubmit = document.querySelector('#onSubmit');

let countryLinks = [];


function createCountriesList (label, link) {
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

function renderCountries (array) {
  for (let i = 0; i < array.length; i++) {
    createCountriesList (array[i].label, array[i].link);
  }
  countryLinks = Array.from(document.querySelectorAll('.country-link'));
}

// Кнопки "Ок", "Get JSON string", "Reset" и область добавления JSON-строк
const searchButton = document.querySelector('.search-button');

let regexp;
let filteredCountries = [];
let sortedCountries = [];

function filterCountries(countries, inputValue) {
  filteredCountries = [];
  regexp = new RegExp(`^${inputValue}`, `i`);
  for (let j = 0; j < countries.length; j++) {
    if (regexp.test(countries[j].label)) {
      filteredCountries.push(countries[j]);
    }
  }
  return filteredCountries;
}

function sortCountries(arr) {
  let contriesNames = [];
  sortedCountries = [];

  for (var i = 0; i < arr.length; i++) {
    contriesNames.push(arr[i].label);
  }
  contriesNames.sort();
  for (var j = 0; j < arr.length; j++) {
    for (var k = 0; k < arr.length; k++) {
      if (contriesNames[j] == arr[k].label) {
        sortedCountries.push(arr[k]);
      }
    }
  }

  contriesNames = [];
  return sortedCountries;
}

function clearDOMCountries() {
  countryLinks.forEach(item => {
    item.remove();
  });
}

function handleInputChange() {
  clearDOMCountries();
  filterCountries(countries, searchInput.value);
  sortCountries(filteredCountries);
  renderCountries(sortedCountries);
}

function addOnChangeListener() {
  searchInput.addEventListener('input', handleInputChange);
  searchButton.removeEventListener('click', handleInputChange);
  searchButton.style.display = 'none';
}

function addOnSubmitListener() {
  searchButton.style.display = 'block';
  searchButton.addEventListener('click', handleInputChange);
  searchInput.removeEventListener('input', handleInputChange);
}


function handleOnChangePress () {
  if (radioChange.hasAttribute('checked')) {
    return;
  }

  radioSubmit.removeAttribute('checked');
  radioChange.setAttribute('checked', 'checked');

  addOnChangeListener();
}

function handleOnSubmitPress () {
  if (radioSubmit.hasAttribute('checked')) {
    return;
  }

  radioChange.removeAttribute('checked');
  radioSubmit.setAttribute('checked', 'checked');

  addOnSubmitListener();
}

// События смены состояния Checked у radio-button's
radioChange.addEventListener('click', handleOnChangePress);
radioSubmit.addEventListener('click', handleOnSubmitPress);

handleInputChange();

if (radioChange.hasAttribute('checked')) {
  addOnChangeListener();
} else {
  addOnSubmitListener();
}


let jsonStrings;

const jsonGetString = document.querySelector('.json'),
      jsonReset = document.querySelector('.reset'),
      jsonArea = document.querySelector('.json-area');


jsonGetString.addEventListener('click', () => {
  for (var i = 0; i < sortedCountries.length; i++) {
    let jsonLink = document.createElement('p');
    jsonLink.textContent = `${i + 1}. \'${JSON.stringify(sortedCountries[i])}\'`;
    jsonLink.classList.add('json-link');
    jsonArea.append(jsonLink);
    jsonStrings = Array.from(document.querySelectorAll('.json-link'));
  }
});


jsonReset.addEventListener('click', () => {
  jsonStrings.forEach((item) => {
    item.remove();
  });
});

// Первым делом продумывать алгоритм, шаг за шагом
// Не модифицировать аргументы функций!!!
// Не смешивать всё в кучу!!!



// !!!!!!!
// Задачи:
// 1. Записать значение
// 2. Взять значение пришедшее в Handler
// 3. Отфильтровать массив со странами 'filterCountries(countries, inputValue)' - возвращает новый массив
// 4. Отсортировать массив со странами 'sortCountries(countries)' - тоже возвращает новый массив
// 5. Очистка предыдущих результатов со страницы 'clearDOMCountries()'
// 6. Отрисовать массив на странице 'renderCoutries(countries)'

// 1). Забрать значение с инпута (value)
// 2). Фильтруем массив
// 3). Сортируем массив
// 4). записать значение в div
// last). JSON-строка отфильтрованного и отсортированного массива записана в jsonArea
