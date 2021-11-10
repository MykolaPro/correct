const form = document.querySelector('#text-form');
const textInput = document.querySelector('#text');
const output = document.querySelector('.output');
const lang = document.querySelector('#lang')

loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', getResult);

}

function getResult(e) {
  if (textInput.value === '') {
    alert('Add a text');
  }
  
  const h2 = document.createElement('h2');

  h2.appendChild(document.createTextNode(`Дата та час виконання: ${new Date(getDeadLineTime())}, Ціна послуги: ${getPrice(textInput.value)} грн`));

  output.appendChild(h2);

  e.preventDefault();
}

// Deadline calculation

function getDeadLineTime() {

  const deadLineTime = getWorkTime(textInput.value);

  return calcWorkDays(deadLineTime);
}

function getWorkTime(text) {

  const allSings = text.replace(/\s/gm, '');

  let minTime = 60;

  let signPerTime = lang.value == 'en'
    ? allSings.length * (60 / 333) + 30
    : allSings.length * (60 / 1333) + 30;
  
  return signPerTime < minTime
    ? minTime
    : signPerTime;
}

// Time calculation including conditions

function calcWorkDays(workTime) {
  const unWorkMin = 900;
  const workMin = 540;
  const nowTime = new Date();

  const days = parseInt(workTime / workMin);
  const weeks = parseInt(days / 5);

  if (nowTime.getDay() === 6) {
    nowTime.setHours(10,00,0);
    nowTime.setMinutes(nowTime.getMinutes() + 2880);
  } else if (nowTime.getDay() === 0) {
    nowTime.setHours(10,00,0)
    nowTime.setMinutes(nowTime.getMinutes() + 1440);
  }

  let result = nowTime.setMinutes(nowTime.getMinutes() + workTime + (days * unWorkMin) + (weeks * 1440 * 2));

  if (nowTime.getHours() >= 19) {
    result = nowTime.setMinutes(nowTime.getMinutes() + unWorkMin);
  } else if (nowTime.getHours() < 10) {
    result = nowTime.setMinutes(nowTime.getMinutes() + 300);
  }

  return result;
}

// Price calculation

function getPrice(text) {

  const allSings = text.replace(/\s/gm);

  let minPrice = (lang.value == 'en') ? 120 : 50;

  let signPrice = (lang.value == 'en') ? Number((allSings.length * 0.12).toFixed(10)) : Number((allSings.length * 0.05.toFixed(10)));
  
  return signPrice < minPrice ? minPrice : signPrice;
}