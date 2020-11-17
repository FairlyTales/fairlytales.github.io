var link = document.querySelector(".login-link");
var map_link = document.querySelector(".js-map");
var map_link_footer = document.querySelector(".main-footer__map");
var login_popup = document.querySelector(".modal-login");
var map = document.querySelector(".modal-map");
var overlay = document.querySelector(".modal-overlay");
var close = document.querySelector(".modal-close");
var close_map = document.querySelector(".modal-close--map");
var login = login_popup.querySelector("[name=login]");
var password = login_popup.querySelector("[name=password]");
var form = login_popup.querySelector("form");
var storage_login = localStorage.getItem("login");
var isStorageSupport = true;
var storage = "";

// проверяем работает ли в данный момент localStorage, на реальных сайтах он обычно работает, а вот на локальных (которые лежат у нас диске) нет, это и проверяем
try {
  storage_login = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

// открываем окно входа, накладываем оверлей на страницу, вставляем в поле логина сохранённый в localStorage логин, если он есть и ставим фокус на поле пароля, если его нет - ставим фокус на поле логина
link.addEventListener("click", function (evt) {
  evt.preventDefault();
  login_popup.classList.add("js-modal-show");
  overlay.classList.add("js-overlay-show");
  login.focus();
  if (storage_login) {
    login.value = storage_login;
    password.focus();
  } else {
    login.focus();
  }
});

// открываем карту с кнопки "как проехать"
map_link.addEventListener("click", function (evt) {
  evt.preventDefault();
  map.classList.add("js-modal-show");
  overlay.classList.add("js-overlay-show");
});

// открываем карту с ссылки "как нас найсти?" в футере
map_link_footer.addEventListener("click", function (evt) {
  evt.preventDefault();
  map.classList.add("js-modal-show");
  overlay.classList.add("js-overlay-show");
});

// закрываем модалку входа
close.addEventListener("click", function (evt) {
  evt.preventDefault();
  login_popup.classList.remove("js-modal-show");
  overlay.classList.remove("js-overlay-show");
  login_popup.classList.remove("js-modal-error");
});

// закрываем модалку карты (отдельная функция, т.к. у кнопки закрытия карты есть свой собственный css класс, если бы он был таким же как и у модалки входа, то эта функция была би избыточной)
close_map.addEventListener("click", function (evt) {
  evt.preventDefault();
  map.classList.remove("js-modal-show");
  overlay.classList.remove("js-overlay-show");
});

// накладываем оверлей (затенение фона) при открытии модалок
overlay.addEventListener("click", function (evt) {
  evt.preventDefault();
  map.classList.remove("js-modal-show");
  login_popup.classList.remove("js-modal-show");
  overlay.classList.remove("js-overlay-show");
  login_popup.classList.remove("js-modal-error");
});

// сообщаем пользователю об ошибке если он ввёл не все данные перед нажатием кнопки "отправить" и если localStorage работает, то записываем в него логин
form.addEventListener("submit", function (evt) {
  if (!login.value || !password.value) {
    evt.preventDefault();
    login_popup.classList.add("js-modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login_value);
    }
  }
});

// закрываем модалки при нажатии на "Esc"
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode == 27) {
    if (login_popup.classList.contains("js-modal-show")) {
      evt.preventDefault();
      login_popup.classList.remove("js-modal-show");
      overlay.classList.remove("js-overlay-show");
      login_popup.classList.remove("js-modal-error");
    }

    if (map.classList.contains("js-modal-show")) {
      map.classList.remove("js-modal-show");
      overlay.classList.remove("js-overlay-show");
    }
  }
});
