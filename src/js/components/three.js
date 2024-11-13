//window.onload = function () {
//var shadowRoot = document.querySelector('spline-viewer').shadowRoot;
//shadowRoot.querySelector('#logo').remove();
//}

import { Application } from '@splinetool/runtime';

const canvasElements = [
  { element: document.querySelector('.shild__3d'), modelUrl: 'https://draft.spline.design/WRn1FdR8fX0ysLV5/scene.splinecode' },
  { element: document.querySelector('.hero__3d'), modelUrl: 'https://draft.spline.design/D5R1SJF-hx7hdwsL/scene.splinecode' }
];

function setupApp(canvasInfo) {
  if (!canvasInfo.element) return;

  const app = new Application(canvasInfo.element);

  app.load(canvasInfo.modelUrl)
    .then(() => {
      app.setSize(canvasInfo.element.clientWidth, canvasInfo.element.clientHeight);
      app.stop(); // Начинаем с приостановленным рендером

      // Создаём IntersectionObserver после загрузки
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            app.play(); // Рендер активен только при видимости
          } else {
            app.stop();  // При скрытии рендер останавливается
          }
        });
      });

      observer.observe(canvasInfo.element);
    })
    .catch((error) => {
      console.error('Error loading model:', error); // Логирование ошибки загрузки
    });
}

// Настраиваем приложение для каждого canvas
canvasElements.forEach(setupApp);







