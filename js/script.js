//Добавление option в select years
for (let year = 2022; year >= 1920; year--) {
  let options = document.createElement("OPTION");
  document.getElementById("year").appendChild(options).innerHTML = year;
}

//Добавление option в select date
for (let date = 1; date <= 31; date++) {
  let options = document.createElement("OPTION");
  document.getElementById("date").appendChild(options).innerHTML = date;
}

//=====================Работа с формой=====================

//Объявление повторно используемых в будущем переменных
let form = document.querySelector('#myForm');
let formInputs = document.querySelectorAll('input');
let email = document.querySelector('input[name="Email"]');
let password = document.querySelector('input[name="Password"]');
let help = document.querySelector('.help');
let helpPass = document.querySelector('.helpPass');
let helpConf = document.querySelector('.helpConf');

//Слушать взаимодействие с input
form.addEventListener("input", inputHandler);

//Реагировать на выбранный input
function inputHandler({target}){

//Если input содержит проверку
  if (target.hasAttribute("data-reg")){
    inputCheck(target);
  }

  function inputCheck(el){
//Значение элемента
    const inputValue = el.value;
//Получение значения аттрибута 
    const inputReg = el.getAttribute("data-reg");
//Создание регулярного выражения для сопоставления с шаблоном
    const reg = new RegExp(inputReg);

//Если выбран input[name="email"]
    if(el == email){
      if(reg.test(inputValue)){
        el.classList.remove('error');
      } else{
        el.classList.add('error');
      }
    }

//Если выбран input[name="password"]
    if(el == password){
      if(reg.test(inputValue)){
        el.classList.remove('error');
        help.style.display = 'none'; 
        document.querySelector('.password').classList.remove('space_pass');
        // document.querySelector('.password').style.marginBottom = '16px';
      } else{
        el.classList.add('error');
        help.style.display = 'block';

//Добавление адаптивности только для ширины < 800px при появлении ошибки
        document.querySelector('.password').classList.add('space_pass');
        // document.querySelector('.password').style.marginBottom = '70px';
      }
    }
  }
  let submitButton = document.querySelector('input[name="Submit"]');

//Блокировка кнопки в случае неправильно введенных значений
   if (email.classList.contains('error') || password.classList.contains('error')){
    submitButton.setAttribute("disabled", "disabled");
    submitButton.style.opacity = "0.7";
} else{
    submitButton.removeAttribute("disabled", "disabled");
    submitButton.style.opacity = "1";
}
}

form.addEventListener('submit', function(evt){

//Удаление стандартных команд для действия
  evt.preventDefault();

//Создание коллекции данных
  let formData = {
    name: document.querySelector('input[name="FirstName"]').value,
    lastName: document.querySelector('input[name="LastName"]').value,
    nationality: document.getElementById('nation').value,
    email: email.value,
    day: document.getElementById('date').value,
    month: document.getElementById('month').value,
    year: document.getElementById('year').value,
    gender: document.querySelector('input[name="Gender"]:checked').value,
    password: password.value,
    confPassword: document.querySelector('input[name="ConfirmPassword"]').value
  };

//Запрос без перезагрузки страницы
  let request = new XMLHttpRequest();

//Добавление события загрузки
  request.addEventListener('load', function(){
    console.log(request.response);
    alert('Регистрация прошла успешно');
//Очистка формы после успешной отправки
    form.reset(); 
  });

//Инициализация запроса
  request.open('POST', 'https://balanyuknikita.ru/send copy.php', true);
//Задание значения заголовка HTTP
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
//Отправка запроса и кодировка компонентов
  request.send('name=' + encodeURIComponent(formData.name) + 
    '&lastName=' + encodeURIComponent(formData.lastName) + 
    '&nationality=' + encodeURIComponent(formData.nationality) + 
    '&email=' +  encodeURIComponent(formData.email) + 
    '&day=' +  encodeURIComponent(formData.day) + 
    '&month=' +  encodeURIComponent(formData.month) + 
    '&year=' +  encodeURIComponent(formData.year) + 
    '&gender=' +  encodeURIComponent(formData.gender) + 
    '&password=' +  encodeURIComponent(formData.password) + 
    '&confPassword=' +  encodeURIComponent(formData.confPassword));
});
