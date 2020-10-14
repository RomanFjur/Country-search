// Создание массива со странами
let countries = [
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
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_Belarus.svg/800px-Flag_of_Belarus.svg.png'
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
for (let i = 0; i < countries.length; i++) {
  countryLink = document.createElement('a');
  countryTitle = document.createElement('p');
  countryImage = document.createElement('img');
  countryDesc = document.createElement('p');
  insideLinkDiv = document.createElement('div');
  countryLinkArrow = document.createElement('div');

  countryTitle.textContent = countries[i].label;
  countryDesc.textContent = `en.wikipedia.org/wiki/${countries[i].label}`;
  countryLink.href = `https://${countryDesc.textContent}`;
  countryImage.src = countries[i].link;
  countryImage.alt = countries[i].label;
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

// Создание массивов ссылок (стран) и названий стран
let links = Array.from(document.querySelectorAll('.country-link')),
    titles = Array.from(document.querySelectorAll('.country-title'));

// Кнопка "Ок"
let searchButton = document.querySelector('.search-button');

// События смены состояния checked у radio-button-ов

radioChange.addEventListener('click', () => {
  radioSubmit.removeAttribute('checked');
  radioChange.setAttribute('checked', 'checked');
});

radioSubmit.addEventListener('click', () => {
  radioChange.removeAttribute('checked');
  radioSubmit.setAttribute('checked', 'checked');
});

// Проверка на checked и поиск из списка стран (ДОРАБОТАТЬ!)

if (radioChange.hasAttribute('checked')) { // Проверка на checked у первого radio-button
  searchInput.addEventListener('input', () => { // По вводу названия страны (в процессе ввода)
    let regexp = new RegExp(`${searchInput.value}`, `i`);

    for (let j = 0; j < links.length; j++) {
      if (!regexp.test(titles[j].textContent)) {
        links[j].style.display = 'none';
      } else {
        links[j].style.display = 'flex';
      }
    }
  });
} else { // Проверка на checked у второго (иначе) radio-button
  searchButton.addEventListener('click', () => { // По нажатию на кнопку "Ок"
    let regexp = new RegExp(`${searchInput.value}`, `i`);

    for (let j = 0; j < links.length; j++) {
      if (!regexp.test(titles[j].textContent)) {
        links[j].style.display = 'none';
      } else {
        links[j].style.display = 'flex';
      }
    }
  });
}
