//window.onload = function () {
  //var shadowRoot = document.querySelector('spline-viewer').shadowRoot;
  //shadowRoot.querySelector('#logo').remove();
//}

import { Application } from '@splinetool/runtime';

const canvas = document.querySelector('.shild__3d');
const canvas2 = document.querySelector('.hero__3d');
const app = new Application(canvas);
const app2 = new Application(canvas2);

app2.load('https://draft.spline.design/9ZAL6sEzmEwP2JQi/scene.splinecode').then(() => {

  app2.setSize(0, 0, 0); // Задай нужные размеры

});

app.load('https://draft.spline.design/Rn8G7pBrehG0XqLb/scene.splinecode').then(() => {

    app.setSize(0, 0, 0); // Задай нужные размеры

});
