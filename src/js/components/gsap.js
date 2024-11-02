import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin,);


// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis({
  smooth: true,
  smoothWheel: true,
  lerp: .1, // Можно настроить скорость плавного скролла
});

// Listen for the 'scroll' event and log the event data to the console
lenis.on('scroll', (e) => {
  console.log(e);
});

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);



// Создаем таймлайн
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".about__wrapper", // Селектор элемента, при достижении которого запускается анимация
    start: "top 80%",           // Начинает анимацию, когда элемент в верхней части экрана
    once: true,                  // Анимация запускается только один раз
    toggleActions: "play none none none" // Стандартные действия
  }
});



// Анимация для третьего элемента
timeline.to(".about__item:nth-child(3)", {
  duration: 1, // Длительность изменения opacity
  opacity: 1, // Конечное значение opacity
  onStart: () => {
    // Устанавливаем начальное значение opacity 0 перед началом анимации
    gsap.set(".about__item:nth-child(3)", { opacity: 0 });
  },
}, "0"); // Начинает через 2 секунды

// Движение для третьего элемента
timeline.to(".about__item:nth-child(3)", {
  duration: 2, // Длительность движения
  motionPath: {
    path: "M0.5 0.5L44.5 48.5L97 92.5L159 131L206.5 149.5L250 160L293 166.5",
    align: "self",
  },
}, ".5"); // Начинает через 3 секунды

// Анимация для четвертого элемента
timeline.to(".about__item:nth-child(4)", {
  duration: 2, // Длительность изменения opacity
  opacity: 1, // Конечное значение opacity
  onStart: () => {
    // Устанавливаем начальное значение opacity 0 перед началом анимации
    gsap.set(".about__item:nth-child(4)", { opacity: 0 });
  },
}, "1"); // Начинает немного позже 3-го элемента

// Движение для четвертого элемента
timeline.to(".about__item:nth-child(4)", {
  duration: 2, // Длительность движения
  motionPath: {
    path: "M1 0.5L58 9L140 16L189.5 18.5L229 21H278H326.5",
    align: "self",
  },
}, "1.5");

timeline.to(".about__item:nth-child(5)", {
  duration: 1, // Длительность изменения opacity
  opacity: 1, // Конечное значение opacity
  onStart: () => {
    // Устанавливаем начальное значение opacity 0 перед началом анимации
    gsap.set(".about__item:nth-child(5)", { opacity: 0 });
  },
}, "2"); // Начинает немного позже 3-го элемента

// Движение для четвертого элемента
timeline.to(".about__item:nth-child(5)", {
  duration: 2, // Длительность движения
  motionPath: {
    path: "M0.5 76.5L63.5 45.5L131 25L167 16.5L216 9L259 4.5L314 1",
    align: "self",
  },
}, "2.5");


timeline.to(".about__item:nth-child(6)", {
  duration: 1, // Длительность изменения opacity
  opacity: 1, // Конечное значение opacity
  onStart: () => {
    // Устанавливаем начальное значение opacity 0 перед началом анимации
    gsap.set(".about__item:nth-child(6)", { opacity: 0 });
  },
}, "3.5");
timeline.to(".about__item:nth-child(7)", {
  duration: 1, // Длительность изменения opacity
  opacity: 1, // Конечное значение opacity
  onStart: () => {
    // Устанавливаем начальное значение opacity 0 перед началом анимации
    gsap.set(".about__item:nth-child(7)", { opacity: 0 });
  },
}, "3.5");
timeline.to(".about__item:nth-child(6)", {
  duration: 2,
  motionPath: {
    path: "M1 71.5L36.5 69L73 65L118 52.5L167 34.5L190 22.5L212.5 0.5",
    align: "self",
  },
}, "4"); // Начинает сразу после движения первых трех
timeline.to(".about__item:nth-child(7)", {
  duration: 2,
  motionPath: {
    path: "M1 1L37.5 3.5L81.5 9.5L118.5 15.5L144 21.5L181 34.5",
    align: "self",
  },
}, "4.5"); // Начинает сразу после движения первых трех



document.addEventListener("DOMContentLoaded", () => {
  const items = gsap.utils.toArray('.all__item');
  const allContent = document.querySelector('.all__content');
  const allWrapper = document.querySelector('.all__wrapper');

  // Устанавливаем начальное состояние: все элементы с низкой прозрачностью
  gsap.set(items, { opacity: 0.2 });

  // Получаем высоты для использования в ScrollTrigger
  const contentHeight = allContent.offsetHeight;
  const wrapperHeight = allWrapper.offsetHeight;

  // Увеличиваем длину прокрутки
  const scrollLength = contentHeight - wrapperHeight + 1500; // Добавляем 1000 пикселей для большей плавности

  // Создаем общий ScrollTrigger
  ScrollTrigger.create({
    trigger: allWrapper,
    start: 'top top', // Начинаем, когда верх обертки достигает верхней части окна
    end: () => `+=${scrollLength}`, // Длина прокрутки до конца контента
    pin: true,
    scrub: 0.5, // Плавность прокрутки (увеличиваем значение для большей плавности)

    onUpdate: (self) => {
      const progress = self.progress; // Текущий прогресс
      const currentIndex = Math.round(progress * (items.length - 1)); // Индекс текущего элемента
      const maxIndex = items.length - 1;

      items.forEach((item, index) => {
        if (index === currentIndex) {
          gsap.to(item, { opacity: 1, duration: 1, scale: 1 }); // Увеличиваем длительность выделения
        } else if (index === currentIndex - 1 || index === currentIndex + 1) {
          gsap.to(item, { opacity: 0.2, duration: 1, scale: 0.7 });
        } else {
          gsap.to(item, { opacity: 0.1, duration: 1, scale: 0.7 });
        }
      });

      // Сдвигаем контент вверх
      gsap.to(allContent, {
        yPercent: -60 * progress, // Прокрутка контента
        ease: "none"
      });
    }
  });
});
































document.addEventListener("DOMContentLoaded", () => {
  const svg = gsap.timeline({
    scrollTrigger: {
      trigger: ".shaman", // Селектор элемента, при достижении которого запускается анимация
      start: "top +400",           // Начинает анимацию, когда элемент в верхней части экрана
      once: true,                  // Анимация запускается только один раз
    }
  });
  svg.fromTo(".shaman__svg",
    { opacity:0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1 },

  );
  // Создаем таймлайн для анимации шамана
  const createShamanAnimation = () => {
    const cub = gsap.timeline({ repeat: -1, repeatDelay: 0 }); // Зацикливаем анимацию

    // Анимация движения
    cub.to(".shaman__svg", {
      duration: 10,
      ease: "linear",
      motionPath: {
        path: "M73 88L261 1L435.5 71L441.5 75.5L445.5 80.5L448.5 84.5L521.5 236L523 240V244V249.5L521.5 254.5L471.5 410L463 434.5L459.5 438.5L457 441.5L452.5 445L448 447L439 451L270 529L266 530H259.5L256 529L90 462L84.5 459L79.5 454L76 448.5L2 298L1 290.5V285L2 280.5L60 100.5L64 95.5L69.5 90L73 88Z",
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
      onUpdate: function () {
        const x = gsap.getProperty(".shaman__svg", "x");
        const y = gsap.getProperty(".shaman__svg", "y");
        updateTail(x, y); // Обновляем хвост
      },
    });

    // Запускаем анимацию изображений
    const shamanImages = document.querySelectorAll(".shaman__img");
    const initialDelay = 1.5; // Задержка перед первой картинкой

    shamanImages.forEach((img, index) => {
      gsap.fromTo(img,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          delay: initialDelay + index * 1.2,
          ease: "power1.out"
        }
      );
    });
  };

  // Связываем анимацию с прокруткой
  ScrollTrigger.create({
    trigger: ".shaman__wrapper", // Элемент, при достижении которого запускается анимация
    start: "top +600", // Начало анимации, когда верх элемента достигает 80% высоты окна
    once: true, // Запускается только один раз
    onEnter: createShamanAnimation // Запускаем анимацию при входе в видимость
  });

  // Длина хвоста и другие функции остаются без изменений
  const snakeLength = 300; // Длина хвоста в количестве сегментов
  const points = []; // Массив для хранения координат хвоста
  const snakeSVG = document.getElementById("snakeSVG");

  function updateTail(x, y) {
    points.push({ x, y });

    // Ограничиваем длину хвоста до snakeLength
    if (points.length > snakeLength) {
      points.shift(); // Убираем самый старый сегмент
    }

    // Очищаем старые сегменты хвоста
    snakeSVG.innerHTML = "";

    // Формируем d-атрибут для одного пути хвоста
    const pathData = points.map((point, index) => {
      return `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`; // Начинаем с первой точки и соединяем
    }).join(' ');

    // Создаем путь для хвоста
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData); // Устанавливаем путь
    path.setAttribute("stroke-width", 3);
    path.setAttribute("fill", "none");

    // Создаем линейный градиент
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "snakeGradient");
    gradient.setAttribute("gradientUnits", "userSpaceOnUse");
    gradient.setAttribute("x1", points[0].x);
    gradient.setAttribute("y1", points[0].y);
    gradient.setAttribute("x2", points[points.length - 1].x);
    gradient.setAttribute("y2", points[points.length - 1].y);

    // Добавляем стопы градиента
    points.forEach((_, index) => {
      const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
      stop.setAttribute("offset", `${(index / (points.length - 1)) * 100}%`); // Устанавливаем смещение
      stop.setAttribute("stop-color", "#004FDF");
      stop.setAttribute("stop-opacity", `${index / (points.length - 1)}`); // Затухание: прозрачный в начале, непрозрачный в конце
      gradient.appendChild(stop);
    });

    // Добавляем градиент в SVG
    snakeSVG.appendChild(gradient);

    // Устанавливаем градиент как цвет обводки
    path.setAttribute("stroke", "url(#snakeGradient)");
    snakeSVG.appendChild(path); // Добавляем путь в SVG
  }
});









document.addEventListener("DOMContentLoaded", () => {

  const pers = gsap.timeline({
    scrollTrigger: {
      trigger: ".top", // Селектор элемента, при достижении которого запускается анимация
      start: "top +300",           // Начинает анимацию, когда элемент в верхней части экрана
      once: true,                  // Анимация запускается только один раз
    }
  });
  const pers2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".top", // Селектор элемента, при достижении которого запускается анимация
      start: "top +300",
      end: "+=2500",           // Начинает анимацию, когда элемент в верхней части экрана
      scrub: 1,
    }
  });
  pers2.fromTo(".top__radial--one",
    { y: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { y: 600, duration: 1 }, // Конечное состояние: полная непрозрачность, смещение по y 0
  );
  pers2.fromTo(".top__radial--two",
    { y: 0, rotate:180 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { y: -600, duration: 1 },
    "<" // Конечное состояние: полная непрозрачность, смещение по y 0
  );




  pers.to(".top__grup--one", {
    duration: 1, // Длительность изменения opacity
    opacity: 1, // Конечное значение opacity

    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".top__grup--one", { opacity: 0, });
    },
  }, "1"); // Начинает через 2 секунды
  pers.to(".top__grup--two", {
    duration: 1, // Длительность изменения opacity
    opacity: 1, // Конечное значение opacity

    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".top__grup--two", { opacity: 0, });
    },
  }, "1.5");

  pers.to(".top__grup--three", {
    duration: 1, // Длительность изменения opacity
    opacity: 1, // Конечное значение opacity

    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".top__grup--three", { opacity: 0, });
    },
  }, "2");
  pers.to(".top__accent", {
    duration: 2, // Длительность изменения opacity
    opacity: 1, // Конечное значение opacity
    scale: 1,
    y: 0,
    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".top__accent", { scale: 0.3, y: -100, opacity: 0. });
    },
  }, "3"); // Начинает через 2 секунды

});










document.addEventListener("DOMContentLoaded", () => {

  const seo = gsap.timeline({
    scrollTrigger: {
      trigger: ".seo", // Селектор элемента, при достижении которого запускается анимация
      start: "top +600",           // Начинает анимацию, когда элемент в верхней части экрана
      once: true,                  // Анимация запускается только один раз
      toggleActions: "play none none none"

    }
  });
  seo.to(".seo__arrow-wrapper", {
    maxWidth: "447px", // Конечное значение
    duration: 2,       // Длительность анимации
    ease: "power1.inOut" // Упрощенная анимация

  }, "1");
  seo.to(".seo__col:nth-child(1)", {
    duration: 1,
    opacity: 1,
    y: 0,
    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".seo__col:nth-child(1)", { opacity: 0, y: 100 });
    },
  }, "0.5"); // Начинает через 2 секунды
  seo.to(".seo__col:nth-child(2)", {
    duration: 1, // Длительность изменения opacity
    opacity: 1, // Конечное значение opacity
    y: 0,
    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".seo__col:nth-child(2)", { opacity: 0, y: 100 });
    },
  }, "1");

  seo.to(".seo__col:nth-child(3)", {
    duration: 1, // Длительность изменения opacity
    opacity: 1, // Конечное значение opacity
    y: 0,
    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".seo__col:nth-child(3)", { opacity: 0, y: 100 });
    },
  }, "1.5");
  seo.to(".seo__col:nth-child(4)", {
    duration: 1, // Длительность изменения opacity
    opacity: 1, // Конечное значение opacity
    y: 0,
    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".seo__col:nth-child(4)", { opacity: 0, y: 100 });
    },
  }, "2");
  seo.to(".seo__col:nth-child(5)", {
    duration: 1, // Длительность изменения opacity
    opacity: 1, // Конечное значение opacity
    y: 0,
    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".seo__col:nth-child(5)", { opacity: 0, y: 100 });
    },
  }, "2.5");
  seo.to(".seo__col:nth-child(6)", {
    duration: 1, // Длительность изменения opacity
    opacity: 1, // Конечное значение opacity
    y: 0,
    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".seo__col:nth-child(6)", { opacity: 0, y: 100 });
    },
  }, "3");
  seo.to(".seo__col:nth-child(7)", {
    duration: 1, // Длительность изменения opacity
    opacity: 1, // Конечное значение opacity
    y: 0,
    onStart: () => {
      // Устанавливаем начальное значение opacity 0 перед началом анимации
      gsap.set(".seo__col:nth-child(7)", { opacity: 0, y: 100 });
    },
  }, "3.5");







});









document.addEventListener("DOMContentLoaded", () => {
  const algoritm = gsap.timeline({
    scrollTrigger: {
      trigger: ".algoritm", // Селектор элемента, при достижении которого запускается анимация
      start: "top +50",
      end: "+=2500",           // Начинает анимацию, когда элемент в верхней части экрана
      pin: true,
      scrub: 1,
    }
  });
  algoritm.fromTo(".algoritm__wrapper",
    { y: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { y: -500, duration: 1 } // Конечное состояние: полная непрозрачность, смещение по y 0
  );
});


document.addEventListener("DOMContentLoaded", () => {
  const algoritm = gsap.timeline({
    scrollTrigger: {
      trigger: ".trafic",
      start: "top +250",
      once: true,
      toggleActions: "play none none none",

    }
  });
  algoritm.fromTo(".trafic__img",
    { y: 300 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { y: 0, duration: 1 } // Конечное состояние: полная непрозрачность, смещение по y 0
  );
});



document.addEventListener("DOMContentLoaded", () => {
  const price = gsap.timeline({
    scrollTrigger: {
      trigger: ".price__content", // Селектор элемента, при достижении которого запускается анимация
      start: "top +100",
      end: "+=2000",           // Начинает анимацию, когда элемент в верхней части экрана
      pin: true,
      scrub: 1,
    }
  });

  price.fromTo(".price__circle--one",
    { x: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { x: 600 }, // Конечное состояние: полная непрозрачность, смещение по y 0
  );
  price.fromTo(".price__circle--two",
    { x: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { x: -600 },
    "<" // Конечное состояние: полная непрозрачность, смещение по y 0
  );
  price.fromTo(".price__line",
    { opacity: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1 } // Конечное состояние: полная непрозрачность, смещение по y 0
  );


  price.fromTo(".price__main",
    { scale: 1 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { scale: 5 } // Конечное состояние: полная непрозрачность, смещение по y 0
  );
});








function createPulseAnimation(element, delay, opacity) {
  gsap.fromTo(
    element,
    { scale: 1, opacity: opacity },
    {
      scale: 1.5,            // Размер увеличения пульса
      opacity: 0,          // Исчезновение к концу анимации
      duration: 2,       // Длительность каждого пульса
      ease: "power1.out",  // Плавное затухание
      repeat: -1,          // Бесконечный повтор
      delay: delay         // Задержка для наложения анимаций
    }
  );
}

// Запуск анимации для каждой пульсации с задержкой
createPulseAnimation(".options__pulse--one", 0, 0.3);
createPulseAnimation(".options__pulse--two", 0.5, 0.2);
createPulseAnimation(".options__pulse--three", 1, 0.1);












document.addEventListener("DOMContentLoaded", () => {
  const options = gsap.timeline({
    scrollTrigger: {
      trigger: ".options", // Селектор элемента, при достижении которого запускается анимация
      start: "top +300",
      end: "+=2000",           // Начинает анимацию, когда элемент в верхней части экрана

    }
  });

  options.fromTo(".options__subtitle--one",
    { opacity: 0, },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1, duration: 1 }, // Конечное состояние: полная непрозрачность, смещение по y 0
  );
  const path = document.querySelector(".options__lines path");
  const pathLength = path.getTotalLength();

  // Настройка начального состояния пути
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  options.to(path, {
    strokeDashoffset: 0,   // Отображаем весь путь    // Длительность анимации
    ease: "power4.inOut",
    duration: 6.5,

  }, "<.1");

  options.fromTo(".options__subtitle--two",
    { opacity: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1, duration: 1.5 }, // Конечное состояние: полная непрозрачность, смещение по y 0
    "<2.3"
  );


  options.fromTo(".options__wrapper",
    { opacity: 0 },
    { opacity: 1, duration: 1 },
    "<1.5"
  );
  options.fromTo(".options__item:nth-child(5)",
    { opacity: 0 },
    { opacity: 1, },
    "<1"
  );
  options.fromTo(".options__item:nth-child(6)",
    { opacity: 0 },
    { opacity: 1, },
    "<1"
  );
  options.fromTo(".options__item:nth-child(7)",
    { opacity: 0 },
    { opacity: 1, },
    "<1"
  );
  options.fromTo(".options__item:nth-child(8)",
    { opacity: 0 },
    { opacity: 1, },
    "<1"
  );
  options.fromTo(".options__item:nth-child(9)",
    { opacity: 0 },
    { opacity: 1, },
    "<1"
  );


});



document.addEventListener("DOMContentLoaded", () => {
  const meeting = gsap.timeline({
    scrollTrigger: {
      trigger: ".meeting", // Селектор элемента, при достижении которого запускается анимация
      start: "top +400",

    }
  });



  meeting.to(".meeting__on", {
    maxWidth: "355px", // Конечное значение
    duration: 1,       // Длительность анимации
    ease: "power1.inOut" // Упрощенная анимация

  });




});



document.addEventListener("DOMContentLoaded", () => {
  const othcet = gsap.timeline({
    scrollTrigger: {
      trigger: ".othcet", // Селектор элемента, при достижении которого запускается анимация
      start: "top +200",         // Начинает анимацию, когда элемент в верхней части экрана
    }
  });

  othcet.fromTo(".othcet__img",
    { opacity: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1, duration: 1 }, // Конечное состояние: полная непрозрачность, смещение по y 0
  );
  othcet.fromTo(".othcet__item:nth-child(1)",
    { opacity: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1, duration: 1 },

  );
  othcet.fromTo(".othcet__item:nth-child(2)",
    { opacity: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1, duration: 1 } // Конечное состояние: полная непрозрачность, смещение по y 0
  );


  othcet.fromTo(".othcet__item:nth-child(3)",
    { opacity: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1, duration: 1 } // Конечное состояние: полная непрозрачность, смещение по y 0
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const count = gsap.timeline({
    scrollTrigger: {
      trigger: ".count", // Селектор элемента, при достижении которого запускается анимация
      start: "top +400",         // Начинает анимацию, когда элемент в верхней части экрана
    }
  });
  const counter = document.querySelector(".count__subprice--one");
  count.to(counter, {
    textContent: 90000,    // На какое значение анимировать
    duration: 3,                  // Длительность анимации
    ease: "power1.out",           // Тип плавности
    snap: { textContent: 1 },     // Округление до целого числа
    onUpdate: function () {
      const formattedNumber = Math.floor(this.targets()[0].textContent).toLocaleString('ru-RU').replace(',', ' ');
      counter.textContent = formattedNumber;
    }
  });

  const counter2 = document.querySelector(".count__subprice--two");
  count.to(counter2, {
    textContent: 45,    // На какое значение анимировать
    duration: 3,                  // Длительность анимации
    ease: "power1.out",           // Тип плавности
    snap: { textContent: 1 },     // Округление до целого числа

  }, "<");


});



document.addEventListener("DOMContentLoaded", () => {
  const othcet = gsap.timeline({
    scrollTrigger: {
      trigger: ".was", // Селектор элемента, при достижении которого запускается анимация
      start: "top +200",         // Начинает анимацию, когда элемент в верхней части экрана
    }
  });

  othcet.fromTo(".was__phone",
    { y: 300 , opacity: 0, },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { y: 0, opacity: 1, duration: 1, }, // Конечное состояние: полная непрозрачность, смещение по y 0
  );
  othcet.fromTo(".was__item:nth-child(1)",
    { opacity: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1, duration: 1 },

  );
  othcet.fromTo(".was__item:nth-child(2)",
    { opacity: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1, duration: 1 } // Конечное состояние: полная непрозрачность, смещение по y 0
  );


  othcet.fromTo(".was__item:nth-child(3)",
    { opacity: 0 },      // Начальное состояние: прозрачность 0, смещение по y на 100
    { opacity: 1, duration: 1 } // Конечное состояние: полная непрозрачность, смещение по y 0
  );
});
