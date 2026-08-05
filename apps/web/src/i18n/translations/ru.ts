import type { TranslationMap } from '../types'

const ru: TranslationMap =  {
    'nav.settings': 'Настройки', 'nav.about': 'О сервисе',
    'hero.note': 'Это shappire. Она скачивает ваши видео — поблагодарите её.',
    'hero.placeholder': 'Вставьте ссылку для сохранения', 'hero.process': 'Обработать', 'hero.processing': 'Обработка...',
    'hero.auto': 'авто', 'hero.audio': 'аудио', 'hero.mute': 'без звука', 'hero.ready': 'Файл готов', 'hero.download': 'Скачать', 'hero.newLink': 'Новая ссылка',
    'footer.before': 'Продолжая, вы соглашаетесь с', 'footer.terms': 'условиями', 'footer.middle': 'и', 'footer.ethics': 'правилами использования',
    'settings.kicker': 'НАСТРОЙТЕ', 'settings.title': 'Настройки', 'settings.language': 'Язык', 'settings.languageAuto.title': 'Автоматический выбор', 'settings.languageAuto.description': 'Использовать язык браузера, если перевод доступен.', 'settings.languagePreferred.title': 'Предпочитаемый язык', 'settings.languagePreferred.description': 'Используется, когда автоматический выбор выключен.',
    'settings.video': 'Видео', 'settings.quality': 'Качество', 'settings.codec': 'Кодек (YouTube)', 'settings.gifs': 'Конвертировать GIF',
    'settings.audio': 'Аудио', 'settings.format': 'Формат', 'settings.bitrate': 'Битрейт', 'settings.tiktok': 'Полное аудио TikTok',
    'settings.file': 'Файл', 'settings.filename': 'Имя файла', 'settings.metadata': 'Удалить метаданные',
    'settings.max': 'Максимум', 'settings.compatible': 'H.264 (совместимый)', 'settings.bestQuality': 'AV1 (лучшее качество)', 'settings.balanced': 'VP9 (баланс)',
    'settings.best': 'Лучшее', 'settings.basic': 'Базовый', 'settings.pretty': 'Красивый', 'settings.classic': 'Классический', 'settings.detailed': 'Подробный',
    'about.kicker': 'О SHAPPIRE', 'about.title.1': 'Создан для того,', 'about.title.2': 'что важно сохранить.',
    'about.lead': 'Shappire — простой инструмент для превращения ссылок в готовые файлы. Без аккаунта, без отвлечений и с контролем каждой загрузки.',
    'about.one.title': 'Без лишнего', 'about.one.body': 'Вставьте ссылку, выберите режим и обработайте файл за несколько шагов.',
    'about.two.title': 'По-вашему', 'about.two.body': 'Настраивайте видео, аудио и файл для каждой загрузки.',
    'about.three.title': 'Без шума', 'about.three.body': 'Опыт, сосредоточенный на медиа, которое вы хотите сохранить.',
    'about.inspiration.title': 'Идея, которой стоит расти.', 'about.inspiration.one': 'Shappire вдохновлён идеями и внимательным подходом', 'about.inspiration.two': 'Как и Cobalt, мы верим, что полезные инструменты должны помогать людям без оплаты — от дизайнеров до тех, кто хочет сохранить песню, видео или воспоминание.', 'about.inspiration.three': 'Мы не хотим присваивать заслуги Cobalt или его разработчиков. Мы искренне уважаем и ценим этот проект. Наша цель — развивать идею взаимности, помогать другим и со временем расширить Shappire далеко за пределы загрузки видео.',
    'about.community.title': 'Сообщество важнее барьеров.', 'about.community.one': 'Мы также ценим независимые инициативы: бразильских создателей Hydra Launcher, Steam Tools, Stremio и многие другие проекты. У каждого своя ниша, но идея общая — помогать сообществу.', 'about.community.two': 'Когда цифровой опыт становится недоступным из-за непомерной стоимости услуг крупных компаний, технологии могут открывать более доступные пути к обучению, творчеству и культуре.',
    'terms.label': 'УСЛОВИЯ ИСПОЛЬЗОВАНИЯ', 'terms.title': 'Используйте ответственно.',
    'terms.intro': 'Используя Shappire, вы соглашаетесь использовать инструмент в соответствии с применимым законодательством и правами на доступный контент.',
    'terms.one.title': 'Разрешённое использование', 'terms.one.body': 'Используйте Shappire только для контента, которым владеете, на который имеете разрешение или к которому имеете законный доступ.',
    'terms.two.title': 'Ответственность', 'terms.two.body': 'Вы отвечаете за отправленные ссылки, полученные файлы и использование обработанного контента.',
    'terms.three.title': 'Доступность', 'terms.three.body': 'Инструмент может обновляться, ограничиваться или изменяться для сохранения работы и безопасности сервиса.',
    'ethics.label': 'ЭТИКА ИСПОЛЬЗОВАНИЯ', 'ethics.title': 'Интернет заслуживает заботы.',
    'ethics.intro': 'Shappire упрощает доступ к медиа, не поощряя нарушение прав, злоупотребление платформами или ненадлежащее распространение.',
    'ethics.one.title': 'Уважайте авторов', 'ethics.one.body': 'Не используйте инструмент, чтобы вредить авторам, удалять авторство или распространять работы без разрешения.',
    'ethics.two.title': 'Не злоупотребляйте', 'ethics.two.body': 'Не используйте автоматизацию, чрезмерный объём запросов или ссылки для обхода защиты платформ.',
    'ethics.three.title': 'Защищайте людей', 'ethics.three.body': 'Никогда не обрабатывайте и не распространяйте личный, чувствительный или полученный без согласия контент.',
    'error.connection': 'Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен.', 'error.unsupported': 'Эта ссылка не поддерживается.', 'error.invalid': 'Некорректный URL. Проверьте ссылку.', 'error.missing': 'Сначала вставьте ссылку.', 'error.request': 'Некорректный запрос.', 'error.fetch': 'Не удалось получить контент.', 'error.empty': 'Контент не найден.', 'error.unavailable': 'Видео недоступно.', 'error.live': 'Прямые трансляции нельзя скачать.', 'error.long': 'Видео слишком длинное.', 'error.post': 'Публикация недоступна.', 'error.private': 'Публикация приватная.', 'error.login': 'Для видео требуется вход в YouTube.', 'error.service': 'Сервис не поддерживается.', 'error.generic': 'Внутренняя ошибка. Попробуйте ещё раз.',
  }

Object.assign(ru, {
  'nav.tools': 'Инструменты',
  'tools.image.name': 'Конвертер изображений',
  'tools.image.description': 'Конвертируйте изображения между форматами с оптимальным качеством.',
  'image.kicker': 'ИНСТРУМЕНТЫ', 'image.title': 'Конвертер изображений', 'image.lead': 'Конвертируйте изображения на сервере без постоянного хранения.',
  'image.drop': 'Перетащите изображение сюда', 'image.dropHint': 'PNG, JPG, WebP, GIF, BMP или TIFF · до 20 МБ', 'image.select': 'Выбрать изображение', 'image.remove': 'Удалить',
  'image.output': 'Выходной формат', 'image.quality': 'Качество', 'image.convert': 'Конвертировать', 'image.converting': 'Конвертация...',
  'image.original': 'Оригинал', 'image.converted': 'Готово', 'image.download': 'Скачать изображение', 'image.reset': 'Конвертировать другое', 'image.ready': 'Изображение готово',
  'image.invalid': 'Выберите поддерживаемое изображение до 20 МБ.', 'image.previewUnavailable': 'Предпросмотр этого формата недоступен в браузере.',
})

Object.assign(ru, {
  'image.info': 'Сведения о файле', 'image.formats': 'Поддерживаемые форматы', 'image.settings': 'Настройки конвертации',
  'image.keepAspect': 'Сохранять пропорции', 'image.resize': 'Изменить размер', 'image.width': 'Ширина', 'image.height': 'Высота',
  'image.dimensions': 'Размеры', 'image.type': 'Тип', 'image.before': 'До', 'image.after': 'После', 'image.savings': 'экономии', 'image.processing': 'Подготавливаем изображение...',
})

Object.assign(ru, {
  'tools.emoji.name': 'Копировать эмодзи', 'tools.emoji.description': 'Находите и копируйте эмодзи клавиатуры одним кликом.',
  'emoji.kicker': 'ИНСТРУМЕНТЫ', 'emoji.title': 'Копировать эмодзи', 'emoji.lead': 'Нажмите на эмодзи, чтобы скопировать и использовать где угодно.', 'emoji.copied': 'Скопировано',
  'emoji.faces': 'Лица', 'emoji.hands': 'Жесты', 'emoji.nature': 'Природа', 'emoji.objects': 'Объекты', 'emoji.symbols': 'Символы',
})

Object.assign(ru, {
  'emoji.search': 'Поиск эмодзи по названию', 'emoji.total': 'эмодзи', 'emoji.loading': 'Загрузка полного каталога...', 'emoji.showMore': 'Показать ещё', 'emoji.categories': 'Категории эмодзи',
  'emoji.categories.all': 'Все', 'emoji.categories.smileys': 'Смайлики и эмоции', 'emoji.categories.people': 'Люди и тело', 'emoji.categories.animals': 'Животные и природа', 'emoji.categories.food': 'Еда и напитки', 'emoji.categories.travel': 'Путешествия и места', 'emoji.categories.activities': 'Активности', 'emoji.categories.objects': 'Объекты', 'emoji.categories.symbols': 'Символы', 'emoji.categories.flags': 'Флаги', 'emoji.categories.components': 'Компоненты',
})

Object.assign(ru, {
  'image.from': 'Конвертировать из:', 'image.to': 'В:', 'image.searchFormat': 'Поиск формата', 'image.sourceMismatch': 'Выбранный исходный формат не соответствует загруженному файлу.',
})

Object.assign(ru, {
  'image.crop': 'Обрезать', 'image.cropHint': 'Перетащите на изображение, чтобы выбрать область обрезки.',
  'image.filename': 'Имя файла', 'image.filenamePlaceholder': 'имя-файла',
})

Object.assign(ru, {
  'tools.media.name': 'Конвертер медиа', 'tools.media.description': 'Конвертируйте видео и аудио между форматами, сжимайте, обрезайте.',
  'media.kicker': 'ИНСТРУМЕНТЫ', 'media.title': 'Конвертер медиа', 'media.lead': 'Конвертируйте, сжимайте, обрезайте и преобразуйте видео и аудио.',
  'media.drop': 'Перетащите видео или аудио сюда', 'media.dropHint': 'MP4, WebM, MKV, AVI, MOV, MP3, WAV, FLAC, OGG · до 200 МБ',
  'media.select': 'Выбрать файл', 'media.settings': 'Настройки конвертации', 'media.outputFormat': 'Формат вывода',
  'media.convert': 'Конвертировать', 'media.converting': 'Конвертация...', 'media.download': 'Скачать', 'media.reset': 'Конвертировать другой',
  'media.filename': 'Имя файла', 'media.invalid': 'Загрузите поддерживаемый файл до 200 МБ.', 'media.failed': 'Ошибка конвертации.',
})

Object.assign(ru, {
  'tools.directory.kicker': 'ИНСТРУМЕНТЫ', 'tools.directory.title': 'Все инструменты', 'tools.directory.lead': 'Всё что нужно в одном месте.',
  'tools.json.name': 'JSON Tools', 'tools.json.description': 'Форматирование, минификация, валидация и конвертация JSON.',
  'tools.jwt.name': 'JWT Decoder', 'tools.jwt.description': 'Декодирование JWT токенов.',
  'tools.regex.name': 'Regex Tester', 'tools.regex.description': 'Тестирование регулярных выражений.',
  'tools.uuid.name': 'UUID Generator', 'tools.uuid.description': 'Генерация случайных UUID v4.',
  'tools.hash.name': 'Hash Generator', 'tools.hash.description': 'Генерация MD5, SHA-1, SHA-256, SHA-512.',
  'tools.base64.name': 'Base64', 'tools.base64.description': 'Кодирование и декодирование Base64.',
  'tools.url.name': 'URL Encoder', 'tools.url.description': 'Кодирование и декодирование URL.',
})

Object.assign(ru, { 'image.dropHint': 'PNG, JPG, WebP, GIF, SVG, BMP, TIFF, ICO · до 20 МБ' })

Object.assign(ru, {
  'footer.processed': 'обработанных файлов',
  'media.fileReady': 'ФАЙЛ ГОТОВ', 'media.remove': 'Удалить', 'media.readyToConvert': 'Готов к конвертации', 'media.chooseAction': 'ВЫБЕРИТЕ ДЕЙСТВИЕ', 'media.chooseActionLead': 'Выберите, как преобразовать этот файл.',
  'media.mode.convert': 'Конвертировать', 'media.mode.convert.description': 'Измените формат файла', 'media.mode.audio': 'Извлечь аудио', 'media.mode.audio.description': 'Сохраните только звук', 'media.mode.compress': 'Сжать', 'media.mode.compress.description': 'Уменьшите размер файла', 'media.mode.resize': 'Изменить размер', 'media.mode.resize.description': 'Настройте ширину и высоту', 'media.mode.cut': 'Обрезать фрагмент', 'media.mode.cut.description': 'Выберите начало и конец', 'media.mode.fps': 'Изменить FPS', 'media.mode.fps.description': 'Настройте плавность видео', 'media.mode.bitrate': 'Изменить битрейт', 'media.mode.bitrate.description': 'Задайте скорость потока', 'media.mode.gif': 'В GIF', 'media.mode.gif.description': 'Превратите фрагмент в GIF',
  'media.compression': 'Сжатие', 'media.compressionHint': '0 = без потерь, 51 = максимальное сжатие. По умолчанию: 28', 'media.dimensions': 'Размеры', 'media.width': 'Ширина', 'media.height': 'Высота', 'media.cutRange': 'Начало и конец фрагмента', 'media.cutHint': 'Формат: ЧЧ:ММ:СС или секунды (например, 90)', 'media.videoBitrate': 'Битрейт видео', 'media.audioBitrate': 'Битрейт аудио',
})

Object.assign(ru, {
  'hero.eyebrow': 'просто, быстро, без шума', 'hero.description': 'Превращайте ссылки в файлы, готовые к сохранению. Видео, аудио, изображения и GIF в элегантном интерфейсе.', 'hero.inputLabel': 'Вставьте ссылку', 'hero.photo': 'Фото', 'hero.video': 'Видео',
})

Object.assign(ru, { 'media.trim': 'Обрежьте фрагмент', 'media.trimStart': 'Начало фрагмента', 'media.trimEnd': 'Конец фрагмента' })

Object.assign(ru, { 'media.timelineLoading': 'Подготавливаем шкалу времени...' })
Object.assign(ru, { 'media.trimInstruction': 'ПЕРЕТАЩИТЕ, ЧТОБЫ ЗАДАТЬ ФРАГМЕНТ' })
Object.assign(ru, { 'tools.directory.kicker': 'ИНСТРУМЕНТЫ', 'tools.directory.title': 'Всё в одном месте.', 'tools.directory.lead': 'Выберите инструмент и начните. Каждый из них решает задачу без лишнего.', 'tools.directory.all': 'Все инструменты', 'tools.directory.allDescription': 'Открыть полный каталог' })
Object.assign(ru, { 'tools.media.description': 'Конвертируйте, сжимайте и изменяйте размер видео и аудио.' })
Object.assign(ru, { 'tools.password.name': 'Генератор паролей', 'tools.password.description': 'Создавайте надёжные уникальные пароли за секунды.', 'password.kicker': 'ИНСТРУМЕНТЫ', 'password.title': 'Генератор паролей', 'password.lead': 'Создавайте надёжные приватные данные для входа.', 'password.length': 'Длина', 'password.upper': 'Заглавные буквы', 'password.lower': 'Строчные буквы', 'password.numbers': 'Цифры', 'password.symbols': 'Символы', 'password.avoidAmbiguous': 'Исключить похожие символы', 'password.generate': 'Создать новый пароль', 'password.copy': 'Копировать пароль', 'password.weak': 'Слабый', 'password.good': 'Хороший', 'password.strong': 'Надёжный', 'password.history': 'СОЗДАНО СЕЙЧАС' })
Object.assign(ru, { 'tools.shortener.name': 'Сокращатель ссылок', 'tools.shortener.description': 'Превращайте длинные URL в короткие ссылки для отправки.', 'shortener.kicker': 'ИНСТРУМЕНТЫ', 'shortener.title': 'Сокращатель ссылок', 'shortener.lead': 'Создавайте короткие прямые ссылки для отправки.', 'shortener.placeholder': 'Вставьте длинный URL', 'shortener.customPrefix': 'shappire/', 'shortener.customPlaceholder': 'свой код', 'shortener.create': 'Сократить ссылку', 'shortener.creating': 'Сокращаем...', 'shortener.ready': 'ССЫЛКА ГОТОВА', 'shortener.copy': 'Копировать', 'shortener.copied': 'Скопировано', 'shortener.history': 'НЕДАВНИЕ НА ЭТОМ УСТРОЙСТВЕ', 'shortener.failed': 'Не удалось сократить ссылку.' })
Object.assign(ru, { 'tools.pdf.name': 'PDF Tools', 'tools.pdf.description': 'Просматривайте, упорядочивайте, объединяйте и экспортируйте PDF.', 'pdf.kicker': 'ИНСТРУМЕНТЫ', 'pdf.title': 'PDF Tools', 'pdf.lead': 'Открывайте, упорядочивайте страницы, объединяйте и экспортируйте PDF в браузере.', 'pdf.open': 'Открыть PDF', 'pdf.openHint': 'Выберите один или несколько PDF до 40 МБ.', 'pdf.add': 'Добавить PDF', 'pdf.search': 'Поиск на странице', 'pdf.save': 'Экспорт PDF', 'pdf.pages': 'СТРАНИЦЫ', 'pdf.page': 'Страница', 'pdf.merge': 'Объединить файлы', 'pdf.found': 'Текст найден на странице.', 'pdf.notFound': 'Текст не найден на странице.', 'pdf.failed': 'Не удалось открыть PDF.' })

Object.assign(ru, { 'tools.category.media': 'МЕДИА И ДОКУМЕНТЫ', 'tools.category.utilities': 'УТИЛИТЫ', 'tools.category.developer': 'РАЗРАБОТКА' })
Object.assign(ru, { 'tools.qr.name': 'Генератор QR-кодов', 'tools.qr.description': 'Создавайте и читайте QR-коды для ссылок, WiFi и контактов.', 'qr.kicker': 'ИНСТРУМЕНТЫ', 'qr.title': 'QR Tools', 'qr.lead': 'Создавайте, скачивайте и читайте QR-коды в одном месте.', 'qr.text': 'Текст', 'qr.link': 'Ссылка', 'qr.wifi': 'WiFi', 'qr.contact': 'Контакт', 'qr.textPlaceholder': 'Введите текст', 'qr.linkPlaceholder': 'https://example.com', 'qr.password': 'Пароль', 'qr.name': 'Имя', 'qr.phone': 'Телефон', 'qr.copy': 'Копировать', 'qr.download': 'Скачать PNG', 'qr.preview': 'ПРЕДПРОСМОТР', 'qr.reader': 'ЧТЕНИЕ QR-КОДА', 'qr.upload': 'Загрузить изображение', 'qr.notFound': 'QR-код не найден.', 'qr.sharePreview': 'ПРЕДПРОСМОТР ОТПРАВКИ', 'qr.discord': 'Discord', 'qr.twitter': 'Twitter / X', 'qr.empty': 'Ваше содержимое появится здесь.' })
Object.assign(ru, { 'tools.category.design': 'ДИЗАЙН И РЕДАКТОРЫ', 'tools.palette.name': 'Генератор палитры', 'tools.palette.description': 'Извлекайте палитру цветов из изображения.', 'palette.kicker': 'ДИЗАЙН И РЕДАКТОРЫ', 'palette.title': 'Палитра цветов', 'palette.lead': 'Загрузите изображение и найдите его основные цвета.', 'palette.upload': 'Загрузить изображение', 'palette.uploadHint': 'PNG, JPG, WebP и другие форматы.', 'palette.image': 'ЗАГРУЖЕННОЕ ИЗОБРАЖЕНИЕ' })
Object.assign(ru, { 'tools.category.discord': 'DISCORD TOOLS', 'discord.components.title': 'Components V2 Builder', 'discord.components.lead': 'Создавайте интерактивные сообщения, просматривайте блоки и экспортируйте готовый payload для бота.', 'discord.embed.title': 'Discord Embed Builder', 'discord.embed.lead': 'Создавайте полные embeds с предпросмотром, полями, медиа и экспортом для проекта.' })
Object.assign(ru, { 'faq.kicker': 'ПОДДЕРЖКА', 'faq.title': 'Частые вопросы.', 'faq.lead': 'Прямые ответы, чтобы пользоваться Shappire без лишних сложностей.', 'faq.helpTitle': 'Как мы можем помочь?', 'faq.helpLead': 'Выберите вопрос, чтобы увидеть ответ.', 'faq.downloadLink': 'Перейти к загрузкам', 'faq.q1.question': 'Как скачать?', 'faq.q1.answer': 'Вставьте ссылку в главное поле, выберите режим — автоматический, аудио или без звука — и нажмите «Обработать».', 'faq.q2.question': 'Какие платформы поддерживаются?', 'faq.q2.answer': 'TikTok, Twitter/X, Instagram, Bluesky, Facebook, Pinterest, SoundCloud, Vimeo, Twitch, Dailymotion, Bilibili, Streamable, Snapchat, Tumblr, Rutube, Loom, VK, OK и Newgrounds.', 'faq.q3.question': 'Почему YouTube не поддерживается?', 'faq.q3.answer': 'YouTube требует аутентификации для доступа к видео с серверов. Для этого нужны cookies аккаунта, токены сессии и дорогая инфраструктура, поэтому бесплатный и надёжный сервис невозможен. Для YouTube используйте yt-dlp на компьютере.', 'faq.q4.question': 'Сохраняется ли качество файлов?', 'faq.q4.answer': 'Да. Сохраняется наилучшее качество, доступное у источника. Также можно изменить настройки видео и аудио.', 'faq.q5.question': 'Нужна ли учётная запись?', 'faq.q5.answer': 'Нет. Shappire работает без регистрации, входа и отслеживания.', 'faq.q6.question': 'Сохраняются ли файлы на сервере?', 'faq.q6.answer': 'Нет. Файлы обрабатываются в реальном времени, а ссылка автоматически истекает через 90 секунд.' })
Object.assign(ru, { 'tools.color.name': 'Конвертер цветов', 'tools.color.description': 'Конвертируйте цвета между HEX, RGB, HSL и CMYK.', 'color.kicker': 'ДИЗАЙН И РЕДАКТОРЫ', 'color.title': 'Конвертер цветов', 'color.lead': 'Конвертируйте цифровые цвета и подготовьте значения для печати.', 'color.hex': 'HEX', 'tools.favicon.name': 'Генератор favicon', 'tools.favicon.description': 'Превратите изображение в favicon для своего сайта.', 'favicon.kicker': 'ДИЗАЙН И РЕДАКТОРЫ', 'favicon.title': 'Генератор favicon', 'favicon.lead': 'Загрузите изображение и экспортируйте основные размеры для веба.', 'favicon.upload': 'Загрузить изображение', 'favicon.hint': 'PNG, JPG, WebP и другие форматы изображений.' })
Object.assign(ru, {
  'coming.title': 'В разработке',
  'coming.description': 'Shappire работает над этим инструментом. Возвращайтесь скоро, чтобы использовать {tool}.',
  'coming.badge': 'В процессе разработки',
})

Object.assign(ru, {
  'tools.googleLens.name': 'Google Lens Search', 'tools.googleLens.description': 'Загрузите изображение и продолжите визуальный поиск в Google Lens.',
  'googleLens.kicker': 'ВИЗУАЛЬНЫЙ ПОИСК', 'googleLens.title': 'Google Lens Search.', 'googleLens.lead': 'Загрузите изображение и продолжите визуальный поиск в Google Lens.',
  'googleLens.dropTitle': 'Перетащите изображение сюда', 'googleLens.dropLead': 'или выберите файл на устройстве', 'googleLens.formats': 'JPEG, PNG или WebP — максимум 10 МБ', 'googleLens.choose': 'Выбрать изображение', 'googleLens.clear': 'Удалить изображение', 'googleLens.search': 'Искать с Google Lens', 'googleLens.loading': 'Подготовка поиска...', 'googleLens.open': 'Открыть Google Lens', 'googleLens.privacy': 'Изображение очищается, временно загружается и удаляется примерно через 15 минут. Google может обработать его после продолжения.',
  'googleLens.errors.image_required': 'Выберите изображение для поиска.', 'googleLens.errors.unsupported_image': 'Загрузите JPEG, PNG или WebP размером до 10 МБ.', 'googleLens.errors.invalid_image': 'Загруженный файл не является корректным изображением.', 'googleLens.errors.image_too_large': 'Изображение превышает допустимый лимит.', 'googleLens.errors.storage_not_configured': 'Визуальный поиск недоступен на этом сервере.', 'googleLens.errors.temporary_upload_failed': 'Не удалось подготовить временное изображение.', 'googleLens.errors.rate_limited': 'Достигнут лимит визуального поиска. Повторите позже.', 'googleLens.errors.internal_error': 'Не удалось подготовить поиск.',
})

Object.assign(ru, { 'googleLens.privacy': 'Изображение очищается, временно загружается и удаляется примерно через 3 минуты. Google может обработать его после продолжения.' })

Object.assign(ru, {
  'home.persona.bubble': 'Это Shappire ашаД. Она носит очень милые очки и является причиной существования этого проекта — поблагодарите её.',
  'nav.downloader': 'Загрузчик',
  'home.kicker': 'SHAPPIRE TOOLS',
  'home.title': 'Простые инструменты для повседневного интернета.',
  'home.lead': 'Загрузка медиа, конвертеры файлов, инструменты для разработчиков, документы и Discord suite в одном месте.',
  'home.downloader': 'Загрузчик Медиа',
  'home.tools': 'Все Инструменты',
  'home.stats.platforms': '+20 Платформ',
  'home.stats.local': 'Локальная и серверная обработка',
  'home.stats.free': '100% Бесплатно',
  'home.pillars.zero.title': 'Без Регистрации',
  'home.pillars.zero.desc': '100% бесплатно и конфиденциально. Без входа и трекеров.',
  'home.pillars.fast.title': 'Сверхбыстро',
  'home.pillars.fast.desc': 'Локальная и серверная обработка на базе Sharp и FFmpeg.',
  'home.pillars.quality.title': 'Максимальное Качество',
  'home.pillars.quality.desc': 'Медиафайлы сохраняют оригинальное высокое качество.',
  'home.tools.badge': 'ИНСТРУМЕНТЫ',
  'home.tools.sectionTitle': 'Всё, что вам нужно, в одном месте.',
  'home.tools.sectionLead': 'Исследуйте полный каталог медиа-утилит, конвертеров и инструментов разработчика.',
  'home.tools.converter.title': 'Конвертер Изображений и Медиа',
  'home.tools.converter.description': 'Конвертируйте форматы (PNG, WebP, AVIF, MP4, MP3), обрезайте и настраивайте качество.',
  'home.tools.dev.title': 'Инструменты Разработчика',
  'home.tools.dev.description': 'Форматирование JSON, декодер JWT, тестер Regex, генераторы Hash и UUID.',
  'home.tools.pdf.title': 'PDF и Документы',
  'home.tools.pdf.description': 'Объединяйте PDF, разделяйте страницы и извлекайте части документов.',
  'home.tools.discord.title': 'Discord Suite',
  'home.tools.discord.description': 'Создавайте интерактивные Rich Embeds, таймштампы и форматирование.',
  'home.media.title': 'Загрузчик Медиа',
  'home.media.description': 'Скачивайте видео, аудио и клипы с более чем 20 поддерживаемых платформ.',
  'home.utility.title': 'Утилиты и Дизайн',
  'home.utility.description': 'Сокращатель ссылок, генератор QR-кодов, цветовые палитры и надежные пароли.',
  'home.platforms.title': 'ПОДДЕРЖИВАЕМЫЕ МЕДИА ПЛАТФОРМЫ',
})

Object.assign(ru, {
  'home.persona.alt': 'Талисман Shappire',
  'home.badges.popular': 'ПОПУЛЯРНОЕ', 'home.badges.converter': 'SHARP И FFMPEG', 'home.badges.dev': 'ИНСТРУМЕНТЫ DEV', 'home.badges.pdf': 'PDF СТУДИЯ', 'home.badges.discord': 'КОНСТРУКТОР DISCORD', 'home.badges.utilities': 'УТИЛИТЫ',
  'home.tags.hash': 'Хэш', 'home.tags.mergePdf': 'Объединить PDF', 'home.tags.splitPdf': 'Разделить PDF', 'home.tags.extract': 'Извлечь', 'home.tags.embedBuilder': 'Конструктор Embed', 'home.tags.timestamps': 'Метки времени', 'home.tags.shortener': 'Сокращатель', 'home.tags.palettes': 'Палитры', 'home.tags.passwords': 'Пароли',
  'home.features.kicker': 'Создано для простоты', 'home.features.title': 'Всё важное — в одном месте.', 'home.features.format.eyebrow': 'Умная конвертация', 'home.features.format.title': 'Выберите формат', 'home.features.format.description': 'От видео высокой четкости до легкого аудио, которое всегда с вами.', 'home.features.original': 'ОРИГИНАЛ', 'home.features.format.previewLabel': 'Ваш файл подготовлен', 'home.features.format.previewTitle': 'Готово к выбору', 'home.features.detected': 'Ссылка найдена', 'home.features.mediaFile': 'исходное-медиа', 'home.features.video': 'видео', 'home.features.audio': 'аудио', 'home.features.image': 'изображение', 'home.features.loop': 'цикл', 'home.features.quality.title': 'Качество сохранено', 'home.features.quality.description': 'Чёткие и ясные файлы — именно такими, какими они должны быть.', 'home.features.clean.title': 'Чисто по своей природе', 'home.features.clean.description': 'Без запутанных экранов. Только то, что нужно, когда это нужно.',
  'downloader.kicker': 'ЗАГРУЗЧИК МЕДИА', 'downloader.title.first': 'От ссылки', 'downloader.title.second': 'к файлу.', 'downloader.lead': 'Вставьте ссылку, чтобы подготовить видео, аудио, изображения и музыку за несколько шагов.', 'downloader.compatible': 'Видео, аудио, изображения и музыка', 'downloader.workspaceLabel': 'НОВЫЙ ЗАПРОС', 'downloader.workspaceTitle': 'Вставьте ссылку, чтобы начать', 'downloader.temporary': 'Обработка временная. Файл будет готов к загрузке сразу после завершения.',
})

Object.assign(ru, {
  'downloader.analysis.label': 'АНАЛИЗ ССЫЛКИ',
  'downloader.analysis.title': 'Подготавливаем медиа.',
  'downloader.analysis.identifying': 'Определяем источник и тип контента…',
  'downloader.analysis.preparing': 'Подготавливаем файл к загрузке…',
  'downloader.analysis.ready': 'Предпросмотр найден.',
  'downloader.preview.ready': 'Готово к загрузке',
  'downloader.preview.download': 'Подготовить загрузку',
  'downloader.preview.change': 'Использовать другую ссылку',
})

Object.assign(ru, {
  'thanks.kicker': 'БЛАГОДАРНОСТИ', 'thanks.title.first': 'Создано при', 'thanks.title.second': 'поддержке сообщества.', 'thanks.lead': 'Те, кто поддержал больше всего, находятся выше. У каждого человека одно место с суммой всех пожертвований.', 'thanks.loading': 'Загрузка поддержки', 'thanks.total': 'Всего поддержано', 'thanks.empty': 'Первые благодарности появятся здесь.', 'thanks.cta': 'Поддержать Shappire',
  'nav.donate': 'Поддержать',
  'donate.kicker': 'ПОДДЕРЖИТЕ SHAPPIRE', 'donate.title.first': 'ПОДДЕРЖАТЬ', 'donate.title.second': 'SHAPPIRE',
  'donate.lead': 'Пожертвования поддерживают инфраструктуру, обработку и развитие Shappire. Эта страница принимает PIX-платежи для пользователей из Бразилии.',
  'donate.impact.infrastructure.title': 'Инфраструктура', 'donate.impact.infrastructure.description': 'Серверы, временное хранилище и обработка, которые поддерживают работу инструментов.',
  'donate.impact.development.title': 'Разработка', 'donate.impact.development.description': 'Новые инструменты, улучшения производительности и более частые исправления.',
  'donate.impact.open.title': 'Открытый доступ', 'donate.impact.open.description': 'Проект без обязательных аккаунтов, искусственных ограничений и платных тарифов.',
  'donate.ranking': 'Посмотреть рейтинг поддержавших', 'donate.checkout.label': 'ВАШЕ ПОЖЕРТВОВАНИЕ', 'donate.checkout.title': 'Выберите сумму', 'donate.checkout.other': 'Другая сумма',
  'donate.checkout.public': 'Хочу появиться в благодарностях', 'donate.checkout.nickname': 'Ник', 'donate.checkout.nicknamePlaceholder': 'Как вас назвать?', 'donate.checkout.photo': 'Ссылка на фото', 'donate.checkout.optional': 'необязательно', 'donate.checkout.privacy': 'Ваше имя и фото будут показаны публично, только если вы выберете эту опцию.',
  'donate.checkout.creating': 'Создание PIX...', 'donate.checkout.submit': 'Поддержать', 'donate.errors.create': 'Не удалось создать PIX-платеж.', 'donate.errors.copy': 'Не удалось скопировать PIX-код.',
  'donate.success.kicker': 'ПОЖЕРТВОВАНИЕ ПОДТВЕРЖДЕНО', 'donate.success.title': 'Спасибо за поддержку Shappire.', 'donate.success.public': 'Ваша поддержка уже добавлена на страницу благодарностей.', 'donate.success.private': 'Ваша поддержка помогает Shappire работать.', 'donate.success.link': 'Посмотреть благодарности',
  'donate.pix.kicker': 'PIX СОЗДАН', 'donate.pix.change': 'Изменить сумму', 'donate.pix.instructions': 'Отсканируйте QR-код в банковском приложении', 'donate.pix.lead': 'Страница обновится автоматически после подтверждения платежа.', 'donate.pix.copied': 'Код скопирован', 'donate.pix.copy': 'Скопировать PIX-код', 'donate.pix.waiting': 'Ожидание подтверждения PIX',
  'donate.details.voluntary.title': 'ДОБРОВОЛЬНАЯ ПОДДЕРЖКА', 'donate.details.voluntary.description': 'Shappire работает для всех. Поддержка необязательна, и любая сумма важна.',
  'donate.details.pix.title': 'PIX ДЛЯ БРАЗИЛИИ', 'donate.details.pix.description': 'Платёж создаётся платёжной организацией и подтверждается на этой странице.',
  'donate.details.ranking.title': 'ПРИЗНАНИЕ', 'donate.details.ranking.description': 'Если вы решите появиться в списке, ваш ник накапливает сумму поддержки и поднимается в рейтинге сообщества.',
})

export default ru
