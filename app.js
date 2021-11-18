const form = document.querySelector('#text-form');
const textInput = document.querySelector('#text');
const output = document.querySelector('.output');
const lang = document.querySelector('#lang')

loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', getResult);

}

function getResult(e) {

  const result = document.createTextNode(`Дата та час виконання: ${new Date(getDeadLineTime())}, Ціна послуги: ${getPrice(textInput.value)} грн`);

  if (textInput.value === '') {
    alert('Add a text');
  }
  
  const h2 = document.createElement('h2');

  h2.appendChild(result);

  output.appendChild(h2);

  textInput.value = '';

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
  let ruSign = 1333;
  let enSign = 333;
  let startTime = 30;

  let signPerTime = lang.value == 'en'
    ? allSings.length * (60 / enSign) + startTime
    : allSings.length * (60 / ruSign) + startTime;
  
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

  let ruMinPrice = 50;
  let enMinPrice = 120;
  let ruSignPrice = 0.05;
  let enSignPrice = 0.12;


  let minPrice = (lang.value == 'en') ? enMinPrice : ruMinPrice;

  let signPrice = (lang.value == 'en') ? Number((allSings.length * enSignPrice).toFixed(10)) : Number((allSings.length * ruSignPrice).toFixed(10));
  
  return signPrice < minPrice ? minPrice : signPrice;
}