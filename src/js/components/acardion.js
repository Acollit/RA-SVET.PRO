document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll(".quest__item");

  items.forEach(el => {
    el.addEventListener('click', (e) => {
      const self = e.currentTarget;
      const btn = self.querySelector(".quest__btn");
      const text = self.querySelector(".quest__text");
      const title = self.querySelector(".quest__name");
      // Закрываем все остальные элементы
      items.forEach(item => {
        if (item !== self) {
          const otherText = item.querySelector(".quest__text");
          const otherBtn = item.querySelector(".quest__btn");
          const otherTitle = item.querySelector(".quest__name");
          otherText.classList.remove('quest__text--active');
          item.classList.remove('quest__item--active');
          otherBtn.classList.remove('quest__btn--active');
          otherTitle.classList.remove('quest__name--active');
          otherText.style.maxHeight = null;
        }
      });

      // Переключаем состояние текущего элемента
      text.classList.toggle('quest__text--active');
      self.classList.toggle('quest__item--active');
      btn.classList.toggle('quest__btn--active');
      title.classList.toggle('quest__name--active');
      if (text.classList.contains('quest__text--active')) {
        text.style.maxHeight = text.scrollHeight + 'px';
      } else {
        text.style.maxHeight = null;
      }
    });
  });
});




