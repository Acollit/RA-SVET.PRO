## Структура папок и файлов

```
├── gulp/                         # Все настройки Gulp-сборки, разделенные по отдельным файлам
├── src/                          # Исходники
│   ├── js                        # Скрипты
│   │   └── main.js               # Главный скрипт
│   │   ├── _vars.js              # файл с переменными проекта
│   │   ├── _functions.js         # файл с готовыми функциями на js
│   │   ├── _components.js        # файл с подключениями компонентов
│   │   ├── components            # js-компоненты
│   ├── scss                      # Стили сайта (препроцессор sass в scss-синтаксисе)
│   │   └── main.scss             # Главный файл стилей
│   │   └── vendor.scss           # Файл для подключения стилей библиотек из папки vendor
│   │   └── _fonts.scss           # Файл для подключения шрифтов (можно использовать миксин)
│   │   └── _mixins.scss          # Файл для подключения миксинов из папки mixins
│   │   └── _vars.scss            # Файл для написания css- или scss-переменных
│   │   └── _settings.scss        # Файл для написания глобальных стилей
│   │   ├── components            # scss-компоненты
│   │   ├── mixins                # папка для сохранения готовых scss-компонентов
│   │   ├── vendor                # папка для хранения локальных css-стилей библиотек
│   ├── partials                  # папка для хранения html-частей страницы
│   ├── img                       # папка для хранения картинок
│   │   ├── svg                   # специальная папка для преобразования svg в спрайт
│   ├── resources                 # папка для хранения иных ассетов - php, видео-файлы, favicon и т.д.
│   │   ├── fonts                 # папка для хранения шрифтов в формате woff2
│   └── index.html                # Главный html-файл
└── gulpfile.js                   # Результирующий файл с настройками Gulp
└── package.json                  # файл с настройками сборки и установленными пакетами
└── .editorconfig                 # файл с настройками форматирования кода
└── .ecrc                         # файл с настройками пакета editorconfig-checker (исключает ненужные папки)
└── .stylelintrc.json             # файл с настройками stylelint
└── .stylelintignore              # файл с исключениями для stylelint
└── .htmlhintrc                   # файл с настройками htmlhint
└── README.md                     # документация сборки
```


## npm-скрипты

Вызывать различные Gulp-задачи нужно __только__ через npm-команды, т.к. обычные Gulp-команды работают неполноценно.

* `npm run stylelint` — команда, запускающая проверку всех scss-файлов на соответствие stylelint.
* `npm run style-fix` — проверка и одновременный фикс scss-файлов на соответствие stylelint. Лично я сам все исправляю вручную, боясь, что автофикс что-то сломает.
* `npm run code` — команда, запускающая проверку всех файлов на соответствие editorconfig.
* `npm run dev` — базовая команда, которая запускает Gulp в режиме разработки.
* `npm run build` — команда, запускающая продакшн-версию сборки. В эту команду также включена проверка stylelint и editorconfig, и если файлы не соответсвуют правилам - ваш проект не соберется.
* `npm run cache` — команда, которую стоит запускать после npm run build__, если вам нужно загрузить новые файлы на хостинг без кэширования.
* `npm run backend` — команда для бэкенд-сборки проекта. Она лишена ненужных вещей из dev-сборки, но не сжата, для удобства бэкендера.
* `npm run zip` — команда собирает ваш готовый код в zip-архив.

