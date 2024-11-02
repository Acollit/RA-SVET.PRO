const scrollContainer = document.querySelector('.panel__scroll');
const image = document.querySelector('.panel__img');

let isDragging = false;
let startX, scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  scrollContainer.classList.add('active');
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseleave', () => {
  isDragging = false;
  scrollContainer.classList.remove('active');
});

scrollContainer.addEventListener('mouseup', () => {
  isDragging = false;
  scrollContainer.classList.remove('active');
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return; // Остановить, если не перетаскиваем
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // Скорость прокрутки
  scrollContainer.scrollLeft = scrollLeft - walk;
});

// Избегаем перетаскивания изображения
image.addEventListener('dragstart', (e) => {
  e.preventDefault(); // Запретить перетаскивание
});

// Отключаем перетаскивание по умолчанию на изображении
image.style.userSelect = 'none'; // Отключить выделение текста/изображения


