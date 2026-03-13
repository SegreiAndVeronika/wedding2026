// ПОКА МИНИМАЛЬНО, ПОТОМ ДОБАВИМ АНИМАЦИИ

// Пример: можно добавить плавное появление элементов при загрузке
document.addEventListener('DOMContentLoaded', function() {
  // Здесь потом будут анимации появления
  console.log('Сайт загружен, первый экран готов!');
});

// ===== КАЛЕНДАРЬ (СЕНТЯБРЬ 2026) =====
const calendarDays = document.getElementById('calendarDays');
if (calendarDays) {
  calendarDays.innerHTML = ''; // очищаем перед заполнением

  const daysInMonth = 30;
  const firstDayIndex = 2; // 1 сентября 2026 — вторник

  // Пустые ячейки перед 1-м числом
  for (let i = 1; i < firstDayIndex; i++) {
    const empty = document.createElement('span');
    empty.className = 'calendar-day empty';
    calendarDays.appendChild(empty);
  }

  // Заполняем дни (ТОЛЬКО ЧИСЛА, БЕЗ СЕРДЕЧКА)
  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement('span');
    day.className = 'calendar-day';
    day.textContent = d; // только число
    calendarDays.appendChild(day);
  }
}
const flower = document.querySelector('.third-page-flower');
window.addEventListener('scroll', () => {
  const rotate = window.scrollY * 0.2; // чувствительность
  flower.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
});


// ===== КНОПКА ПОКАЗА ФОРМЫ =====
const toggleBtn = document.getElementById('toggleFormBtn');
const rsvpForm = document.getElementById('rsvpForm');

if (toggleBtn && rsvpForm) {
  toggleBtn.addEventListener('click', () => {
    if (rsvpForm.style.display === 'none' || rsvpForm.style.display === '') {
      rsvpForm.style.display = 'block';
    } else {
      rsvpForm.style.display = 'none';
    }
  });
}

// ===== ОТПРАВКА ФОРМЫ В GOOGLE ТАБЛИЦУ =====
const rsvpFormElement = document.getElementById('rsvpForm');

if (rsvpFormElement) {
  rsvpFormElement.addEventListener('submit', function(e) {
    e.preventDefault(); // не даём странице перезагрузиться

    // Собираем данные из формы
    const formData = new FormData(rsvpFormElement);

    // Собираем все выбранные напитки в одну строку
    const drinks = [];
    document.querySelectorAll('input[name="drinks"]:checked').forEach(cb => {
      drinks.push(cb.value);
    });

    // Добавляем напитки в formData одной строкой
    formData.delete('drinks'); // удаляем старые отдельные записи
    formData.append('drinks', drinks.join(', ')); // добавляем одну строку

    // ТВОЙ УНИКАЛЬНЫЙ URL (который ты получил)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwc7h815Ht_zVxEv926_NhtNcjsSxQ9hDbQlIgSJfCLtrwDxbBH-LhaoBGe5JUXk0IotA/exec';

    // Показываем, что отправка идёт
    const messageDiv = document.getElementById('form-message') || createMessageDiv();
    messageDiv.innerHTML = 'Отправка...';
    messageDiv.className = 'form-message loading';

    // Отправляем данные
    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        messageDiv.innerHTML = 'Спасибо! Ваш ответ записан. До встречи!';
        messageDiv.className = 'form-message success';
        rsvpFormElement.reset(); // очищаем форму
      } else {
        messageDiv.innerHTML = 'Ошибка. Попробуйте ещё раз.';
        messageDiv.className = 'form-message error';
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      messageDiv.innerHTML = 'Ошибка отправки. Проверьте интернет.';
      messageDiv.className = 'form-message error';
    });
  });
}

// Функция для создания блока с сообщением, если его нет в HTML
function createMessageDiv() {
  const form = document.getElementById('rsvpForm');
  const div = document.createElement('div');
  div.id = 'form-message';
  div.className = 'form-message';
  form.appendChild(div);
  return div;
}
 
// ПОТОМ ЗДЕСЬ БУДУТ:
// - вращение цветов
// - появление элементов при скролле
// - таймер

// - форма
