# АльГранд72 — сайт зоогостиницы

Премиальный одностраничный сайт зоогостиницы «АльГранд72» (Тюмень).

## Стек

- Vite + React + TypeScript
- GSAP + ScrollTrigger
- Lucide React
- Google Fonts: Literata + Manrope

## Запуск

Из-за кириллицы в пути Windows удобнее работать из копии `C:\Users\popoo\Desktop\algrand72-site` (или установить зависимости через зеркало):

```bash
npm install --registry=https://registry.npmmirror.com
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

Исходники также лежат в папке проекта на рабочем столе; `node_modules` подключены junction’ом к `algrand72-site`.

## Форма заявки

Открывает диалог VK (`vk.me/algrand72`) и копирует текст заявки в буфер обмена.
