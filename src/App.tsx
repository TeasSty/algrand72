import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import {
  contacts,
  faq,
  media,
  pillars,
  prices,
  reel,
  reviews,
  steps,
} from './data'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { href: '#residence', label: 'Резиденция' },
  { href: '#journey', label: 'Путь' },
  { href: '#guests', label: 'Гости' },
  { href: '#stay', label: 'Условия' },
  { href: '#inquire', label: 'Заявка' },
]

function messageFrom(form: Record<string, string>) {
  return [
    'Здравствуйте! Хочу рассчитать стоимость передержки.',
    `Имя: ${form.name || '—'}`,
    `Телефон: ${form.phone || '—'}`,
    `Питомец: ${form.pet || '—'}`,
    `Даты: ${form.dates || '—'}`,
    `Комментарий: ${form.comment || '—'}`,
  ].join('\n')
}

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reelRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    pet: 'собака',
    dates: '',
    comment: '',
  })

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 28,
        opacity: 0.15,
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
        delay: 0.15,
      })

      gsap.to('.hero-media img', {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.utils.toArray<HTMLElement>('.chapter-line').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0.2,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      const track = reelRef.current
      if (track) {
        const getScroll = () =>
          -(track.scrollWidth - window.innerWidth + 48)

        gsap.to(track, {
          x: getScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: '.reel-pin',
            start: 'top top',
            end: () => `+=${track.scrollWidth * 0.85}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }

      gsap.from('.inquire-layout > *', {
        y: 36,
        opacity: 0.2,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.inquire', start: 'top 70%' },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(messageFrom(form))
    } catch {
      /* clipboard may be blocked */
    }
    window.open(contacts.vkMessage, '_blank', 'noopener,noreferrer')
  }

  return (
    <div ref={rootRef}>
      <a className="skip" href="#inquire">
        К заявке
      </a>

      <header className={`site-header ${solid ? 'is-solid' : ''}`}>
        <div className="header-row">
          <a className="brand" href="#top">
            АльГранд72
            <span>Зоогостиница · Тюмень</span>
          </a>
          <nav className="nav-desktop" aria-label="Навигация">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="header-right">
            <a className="phone-link" href={contacts.phoneHref}>
              {contacts.phone}
            </a>
            <a className="btn btn-light" href="#inquire">
              Заявка
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-label="Открыть меню"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Меню">
          <button
            className="close"
            type="button"
            aria-label="Закрыть"
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={contacts.phoneHref}>{contacts.phone}</a>
        </div>
      ) : null}

      <main id="top">
        {/* FULL-BLEED HERO */}
        <section className="hero">
          <div className="hero-media" aria-hidden="false">
            <img src={media.hero.src} alt={media.hero.alt} />
            <div className="hero-shade" />
          </div>
          <div className="hero-content">
            <p className="kicker">Private pet residence · Тюмень</p>
            <h1 className="display-xl">
              Пока вы в отъезде,
              <br />
              о них заботятся дома
            </h1>
            <p className="body-lg">
              Отдельные комнаты без клеток и вольеров. Ежедневные фото и видео.
              Тихая домашняя атмосфера на Юности, 50.
            </p>
            <div className="cta-row">
              <a className="btn btn-light" href="#inquire">
                Рассчитать стоимость
                <ArrowRight size={18} />
              </a>
              <a className="text-link" href="#stay">
                Условия размещения
              </a>
            </div>
            <div className="hero-meta">
              <span>Без клеток и вольеров</span>
              <span>Рейтинг 5,0 · 2ГИС</span>
              <span>Круглосуточно</span>
            </div>
          </div>
        </section>

        {/* TYPOGRAPHIC PILLARS */}
        <section className="pillars" id="pillars">
          <div className="wrap">
            <div className="pillars-intro chapter-line">
              <div>
                <p className="kicker">Почему сюда возвращаются</p>
                <h2 className="display-lg">Три принципа резиденции</h2>
              </div>
              <p className="body-lg" style={{ color: 'rgba(241,235,225,0.7)' }}>
                Не отель-конвейер. Формат, в котором питомец живёт в своей
                комнате — спокойно, без клеток.
              </p>
            </div>
            <div className="pillars-list">
              {pillars.map((p) => (
                <article className="pillar chapter-line" key={p.n}>
                  <span className="n">{p.n}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BROKEN GRID RESIDENCE */}
        <section className="residence" id="residence">
          <div className="wrap residence-grid">
            <div className="residence-copy chapter-line">
              <p className="kicker">О резиденции</p>
              <h2 className="display-lg">Комната вместо клетки</h2>
              <p className="body-lg">
                АльГранд72 в мкр. Антипино: кошки и собаки размещаются в
                отдельных просторных номерах. Можно заранее приехать и
                посмотреть пространство.
              </p>
              <ul>
                <li>Индивидуальные номера, без боксов и вольеров</li>
                <li>Своя территория для выгула вдали от дорог</li>
                <li>Мелкие породы отдельно от крупных</li>
                <li>Кошкам — тихие комнаты с окном</li>
              </ul>
            </div>
            <figure className="residence-main chapter-line">
              <img
                src={media.residenceMain.src}
                alt={media.residenceMain.alt}
              />
            </figure>
            <figure className="residence-side chapter-line">
              <img
                src={media.residenceSide.src}
                alt={media.residenceSide.alt}
              />
            </figure>
            <p className="residence-note chapter-line">
              Несколько питомцев одного владельца можно разместить вместе — так
              спокойнее переживать разлуку.
            </p>
          </div>
        </section>

        {/* JOURNEY */}
        <section className="journey" id="journey">
          <div className="wrap">
            <div className="journey-head chapter-line">
              <div>
                <p className="kicker">Как проходит передержка</p>
                <h2 className="display-lg">От заявки до встречи</h2>
              </div>
              <p className="body-lg">
                Прозрачный маршрут: сначала договариваемся о питомце, затем вы
                видите каждый день через фото и видео.
              </p>
            </div>
            <div className="journey-steps">
              {steps.map((s) => (
                <article className="journey-step chapter-line" key={s.n}>
                  <span className="n">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="journey-visual chapter-line">
              <figure>
                <img src={media.grounds.src} alt={media.grounds.alt} />
              </figure>
              <figure>
                <img src={media.intimacy.src} alt={media.intimacy.alt} />
              </figure>
            </div>
          </div>
        </section>

        {/* HORIZONTAL REEL */}
        <section className="guests" id="guests">
          <div className="guests-head chapter-line">
            <div>
              <p className="kicker">Наши гости</p>
              <h2 className="display-lg">Кадры из жизни резиденции</h2>
            </div>
            <a
              className="btn btn-ghost"
              href={contacts.vk}
              target="_blank"
              rel="noreferrer"
            >
              VK
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="reel-pin">
            <div className="reel-track" ref={reelRef}>
              {reel.map((item) => (
                <figure className="reel-item" key={item.src + item.label}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span>{item.label}</span>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* STAY CONDITIONS — editorial, not cards */}
        <section className="stay" id="stay">
          <div className="wrap">
            <div className="stay-head chapter-line">
              <p className="kicker">Условия</p>
              <h2 className="display-lg">Собаки и кошки</h2>
              <p className="body-lg">
                Стоимость зависит от питомца и сроков. При длительном
                размещении — скидки. Точную сумму посчитаем в заявке.
              </p>
            </div>
            <div className="stay-split">
              <div className="stay-col chapter-line">
                <p className="kicker">Собаки</p>
                <h3>Индивидуальный номер</h3>
                <span className="stay-price">{prices.dogs}</span>
                <ul>
                  <li>Отдельный номер без клетки</li>
                  <li>Выгул на своей территории</li>
                  <li>Мелкие отдельно от крупных</li>
                  <li>Крупные: {prices.dogsLarge}</li>
                  <li>Средние и мелкие: {prices.dogsMedium}</li>
                  <li>Две собаки вместе: {prices.twoDogs}</li>
                </ul>
              </div>
              <div className="stay-col chapter-line">
                <p className="kicker">Кошки</p>
                <h3>Тихая комната с окном</h3>
                <span className="stay-price">{prices.cats}</span>
                <ul>
                  <li>Отдельные комнаты без клеток</li>
                  <li>Высокие потолки, можно когтеточку</li>
                  <li>Окно — наблюдать за улицей</li>
                  <li>Без соседства с крупными собаками</li>
                  <li>Диапазон: {prices.catsRange}</li>
                  <li>Кошка + собака: {prices.catAndDog}</li>
                </ul>
              </div>
            </div>
            <div className="stay-extra chapter-line">
              <article>
                <strong>Осмотр</strong>
                <span>Приезжайте заранее посмотреть номера</span>
              </article>
              <article>
                <strong>Отчёты</strong>
                <span>Фото и видео каждый день проживания</span>
              </article>
              <article>
                <strong>Связь</strong>
                <span>Основной канал — VK, также телефон</span>
              </article>
            </div>
          </div>
        </section>

        {/* VOICES */}
        <section className="voices" id="voices">
          <div className="wrap">
            <div className="voices-head chapter-line">
              <div>
                <p className="kicker">Отзывы</p>
                <h2 className="display-lg">Голоса владельцев</h2>
              </div>
              <a
                className="text-link"
                href={contacts.map}
                target="_blank"
                rel="noreferrer"
              >
                5,0 в 2ГИС
              </a>
            </div>
            <div className="voices-stack">
              {reviews.map((r) => (
                <article className="voice chapter-line" key={r.name}>
                  <blockquote>«{r.text}»</blockquote>
                  <footer>
                    <span>{r.name}</span>
                    <span>{r.source}</span>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq" id="faq">
          <div className="wrap faq-layout">
            <div className="chapter-line">
              <p className="kicker">FAQ</p>
              <h2 className="display-lg">Перед бронированием</h2>
              <p className="body-lg">
                Нет ответа — напишите в VK или позвоните.
              </p>
            </div>
            <div>
              {faq.map((item, i) => (
                <div
                  className={`faq-item chapter-line ${openFaq === i ? 'open' : ''}`}
                  key={item.q}
                >
                  <button
                    type="button"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="a">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INQUIRE */}
        <section className="inquire" id="inquire">
          <div className="wrap inquire-layout">
            <div>
              <p className="kicker">Заявка</p>
              <h2 className="display-lg">Подберём номер и рассчитаем стоимость</h2>
              <p className="body-lg">
                Форма откроет диалог VK. Текст заявки скопируется в буфер —
                вставьте его в сообщение.
              </p>
              <div className="cta-row">
                <a className="btn btn-light" href={contacts.phoneHref}>
                  {contacts.phone}
                </a>
                <a
                  className="btn btn-ghost"
                  href={contacts.vkMessage}
                  target="_blank"
                  rel="noreferrer"
                >
                  Написать в VK
                </a>
              </div>
            </div>
            <form className="form" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Имя</label>
                  <input
                    id="name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="pet">Питомец</label>
                  <select
                    id="pet"
                    value={form.pet}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, pet: e.target.value }))
                    }
                  >
                    <option value="собака">Собака</option>
                    <option value="кошка">Кошка</option>
                    <option value="несколько">Несколько</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="dates">Даты</label>
                  <input
                    id="dates"
                    required
                    placeholder="12–20 мая"
                    value={form.dates}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, dates: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="comment">Комментарий</label>
                <textarea
                  id="comment"
                  placeholder="Порода, возраст, особенности"
                  value={form.comment}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, comment: e.target.value }))
                  }
                />
              </div>
              <button className="btn btn-light" type="submit">
                Отправить в VK
                <ArrowRight size={18} />
              </button>
              <p className="form-note">
                Текст заявки копируется — вставьте в открывшийся диалог.
              </p>
            </form>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap contact-grid">
            <div className="contact-card chapter-line">
              <p className="kicker">Контакты</p>
              <h2 className="display-lg">Приезжайте познакомиться</h2>
              <div className="contact-lines">
                <a href={contacts.phoneHref}>
                  <span>Телефон</span>
                  <strong>{contacts.phone}</strong>
                </a>
                <a href={contacts.vk} target="_blank" rel="noreferrer">
                  <span>VK</span>
                  <strong>vk.com/algrand72</strong>
                </a>
                <a href={contacts.instagram} target="_blank" rel="noreferrer">
                  <span>Instagram</span>
                  <strong>@algrand_zoohotel_tyumen</strong>
                </a>
                <p>
                  <span>Адрес</span>
                  <strong>{contacts.address}</strong>
                </p>
                <p>
                  <span>Режим</span>
                  <strong>{contacts.hours}</strong>
                </p>
              </div>
            </div>
            <iframe
              className="map chapter-line"
              title="АльГранд72 на карте"
              src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A57.113065%2C%22lon%22%3A65.713377%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22tyumen%22%7D%2C%22org%22%3A%2270000001084068988%22%7D"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-row">
          <p>
            <strong>АльГранд72</strong> · частная зоогостиница, Тюмень
          </p>
          <p>
            <a href={contacts.phoneHref}>{contacts.phone}</a>
            {' · '}
            <a href={contacts.vk} target="_blank" rel="noreferrer">
              VK
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
