let countryes = [
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

let countryList = document.querySelector('.country-list'),
    input = document.querySelector('.search');

let countryLi;
let countryLink;
let countryImage;
let insideLiDiv;
let linkDesc;

let radioChange = document.querySelector('.onChange'),
    radioSubmit = document.querySelector('.onSubmit');

for (var i = 0; i < countryes.length; i++) {
  countryLi = document.createElement('li');
  countryLink = document.createElement('a');
  countryImage = document.createElement('img');
  insideLiDiv = document.createElement('div');
  linkDesc = document.createElement('p');
  countryLink.textContent = countryes[i].label;
  countryImage.src = countryes[i].link;
  countryImage.classList.add('flag');
  countryLi.classList.add('country');
  countryLink.classList.add('country-link');
  countryList.append(countryLi);
  countryLi.append(countryImage);
  countryLi.append(insideLiDiv);
  insideLiDiv.append(countryLink);
  insideLiDiv.append(linkDesc);
}

let list = Array.from(document.querySelectorAll('li'));
let links = Array.from(document.querySelectorAll('a'));

if (radioChange.checked) {
  input.addEventListener('input', () => {
    let filter = input.value.toLowerCase();

    for (var j = 0; j < list.length; j++) {
      if (!links[j].textContent.toLowerCase().includes(filter)) {
        list[j].style.display = 'none';
      } else {
        list[j].style.display = 'flex';
      }
    }
  });
}

if (radioSubmit.checked) {
  let searchButton = document.querySelector('.search-button');

  searchButton.addEventListener('click', () => {
    let filter = input.value.toLowerCase();

    for (var j = 0; j < list.length; j++) {
      if (!links[j].textContent.toLowerCase().includes(filter)) {
        list[j].style.display = 'none';
      } else {
        list[j].style.display = 'flex';
      }
    }
  });
}
