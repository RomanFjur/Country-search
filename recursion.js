let newObj = {};

// Не доделана!
function createOneLevelObject (obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      createOneLevelObject (obj[key]);
      delete obj[key];
    }
  }
  return Object.assign(newObj, obj);
}

let objectRoma = {
  name: 'Roma',
  surname: 'Zhminko',
  data: {
    name: 'Viktor',
    age: '28',
    sex: 'male',
    birth: {
      day: '05',
      month: '08',
      year: '1992'
    }
  }
};

console.log(createOneLevelObject (objectRoma));

export const flattenObject = (obj) => {
  let result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(obj)) {
    if (!(['number', 'boolean', 'string'].includes(typeof value))) {
      result = {
        ...result,
        ...flattenObject(obj[key]),
      };
    } else {
      result[key] = value;
    }
  }

  return result;
};
