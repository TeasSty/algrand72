/** Respect Vite `base` (GitHub Pages `/algrand72/`) */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const contacts = {
  phone: '+7 (996) 322-13-66',
  phoneHref: 'tel:+79963221366',
  vk: 'https://vk.com/algrand72',
  vkMessage: 'https://vk.me/algrand72',
  instagram: 'https://www.instagram.com/algrand_zoohotel_tyumen',
  address: 'ул. Юности, 50, мкр. Антипино, Тюмень',
  map: 'https://2gis.ru/tyumen/firm/70000001084068988',
  hours: 'Круглосуточно',
}

export const prices = {
  cats: 'от 700 ₽',
  dogs: 'от 900 ₽',
  catsRange: '700–1 000 ₽ / сутки',
  dogsLarge: '900–1 100 ₽ / сутки',
  dogsMedium: 'от 900 ₽ / сутки',
  dogsSmall: 'от 900 ₽ / сутки',
  catAndDog: '1 200 ₽ / сутки',
  twoDogs: '1 400 ₽ / сутки',
}

/** Art-directed registry — roles, no near-duplicates */
export const media = {
  hero: {
    src: asset('images/scene-02.jpg'),
    alt: 'Гость на территории АльГранд72',
  },
  residenceMain: {
    src: asset('images/guest-01.jpg'),
    alt: 'Индивидуальная комната без клетки',
  },
  residenceSide: {
    src: asset('images/guest-08.jpg'),
    alt: 'Знакомство с гостем в номере',
  },
  grounds: {
    src: asset('images/scene-01.jpg'),
    alt: 'Прогулка на территории',
  },
  intimacy: {
    src: asset('images/guest-10.jpg'),
    alt: 'Номер с лежаком и мисками',
  },
}

export const reel = [
  { src: asset('images/guest-08.jpg'), alt: 'Гость в номере', label: 'Номер' },
  { src: asset('images/guest-06.jpg'), alt: 'Крупный гость', label: 'Крупные' },
  { src: asset('images/guest-13.jpg'), alt: 'Кошка', label: 'Кошки' },
  { src: asset('images/guest-02.jpg'), alt: 'Отдых в лежанке', label: 'Отдых' },
  { src: asset('images/scene-01.jpg'), alt: 'Прогулка', label: 'Двор' },
  { src: asset('images/guest-16.jpg'), alt: 'Гость', label: 'Гости' },
  { src: asset('images/guest-14.jpg'), alt: 'Гость', label: 'Момент' },
]

export const pillars = [
  {
    n: '01',
    title: 'Без клеток',
    text: 'Отдельные просторные номера. Без боксов, клеток и вольеров.',
  },
  {
    n: '02',
    title: 'Ежедневные отчёты',
    text: 'Фото и видео о дне питомца — пока вы в отъезде.',
  },
  {
    n: '03',
    title: 'Свой ритм',
    text: 'Кормление, выгул и характер обсуждаем до заезда.',
  },
]

export const reviews = [
  {
    name: 'Майя Линкер',
    source: '2ГИС',
    text: 'Оставляем здесь нашего бигля уже второй раз. Постоянные видеоотчёты — за собаку не переживаешь. Есть выгул в компании с другими хвостиками.',
  },
  {
    name: 'Алена Пронькина',
    source: '2ГИС',
    text: 'Чисто. У каждого своя комнатка с прозрачной дверью — без клеток. Видео присылали каждый день без напоминаний.',
  },
  {
    name: 'Татьяна Ахметшина',
    source: '2ГИС',
    text: 'Отдельная чистая комната с окном и вентиляцией. Каждый день фото и видео. Учитывают особенности каждого хвостика.',
  },
]

export const faq = [
  {
    q: 'Как забронировать?',
    a: 'Напишите в VK или позвоните: даты, вид питомца и коротко о характере — подберём номер и рассчитаем стоимость.',
  },
  {
    q: 'Что взять с собой?',
    a: 'Список уточняйте при бронировании. Обычно: привычный корм, лежанка или плед с запахом дома, ветеринарный паспорт.',
  },
  {
    q: 'Можно ли посмотреть гостиницу?',
    a: 'Да. Можно заранее приехать и посмотреть комнаты лично.',
  },
  {
    q: 'Как получать фото и видео?',
    a: 'Во время проживания присылаем ежедневные фото- и видеоотчёты.',
  },
  {
    q: 'Несколько питомцев?',
    a: 'Питомцев одного владельца можно разместить вместе. Есть тарифы для двух собак и для кошки с собакой.',
  },
]

export const steps = [
  { n: '01', title: 'Заявка', text: 'VK или звонок: даты и особенности питомца.' },
  { n: '02', title: 'Условия', text: 'Кормление, выгул, привычки — всё заранее.' },
  { n: '03', title: 'Заезд', text: 'Можно приехать посмотреть. Помогаем освоиться.' },
  { n: '04', title: 'Отчёты', text: 'Ежедневные фото и видео о проживании.' },
  { n: '05', title: 'Выезд', text: 'Забираете питомца. Остаёмся на связи.' },
]
