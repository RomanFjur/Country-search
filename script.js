let countryes = [
  {
    label: 'Australia',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/23px-Flag_of_Australia_%28converted%29.svg.png'
  },
  {
    label: 'Albania',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/21px-Flag_of_Albania.svg.png'
  },
];

let countryList = document.querySelector('.country-list'),
    input = document.querySelector('.search');

let countryLi;
let countryLink;
let countryImage;

let radioChange = document.querySelector('.onChange'),
    radioSubmit = document.querySelector('.onSubmit');

for (var i = 0; i < countryes.length; i++) {
  countryLi = document.createElement('li');
  countryLink = document.createElement('a');
  countryImage = document.createElement('img');
  countryLink.textContent = countryes[i].label;
  countryImage.src = countryes[i].link;
  countryLi.classList.add('country');
  countryList.append(countryLi);
  countryLi.append(countryImage);
  countryLi.append(countryLink);
}

let list = Array.from(document.querySelectorAll('li'));
let links = Array.from(document.querySelectorAll('a'));

if (radioChange.checked) {
  input.addEventListener('input', () => {
    let filter = input.value;

    for (var j = 0; j < list.length; j++) {
      if (!links[j].textContent.includes(filter)) {
        list[j].style.display = 'none';
      } else {
        list[j].style.display = 'block';
      }
    }
  });
}
