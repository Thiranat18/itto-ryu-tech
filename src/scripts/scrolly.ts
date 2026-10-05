// Home scroll story. The page is complete without this file: it only runs when motion is allowed, adds
// html.js-scrolly once GSAP has loaded, and sets every starting state itself.
// Desktop (901px+ wide, 720px+ tall): each chapter pins and its timeline is scrubbed by the scroll position.
// Anything smaller: no pins; each animation plays once when it enters the viewport.
// Timing fractions follow the approved prototype (reference/HomeScroll.dc.html in the brief).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type El = HTMLElement | SVGElement;
const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)!;
const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [
  ...root.querySelectorAll<T>(sel),
];
const OUT = 'power2.out'; // the prototype's ease: 1 − (1 − t)³
const BRUSH = 'power2.inOut'; // a brush speeds up, then slows into the stop
const WASHI = '#FAF8F3';
const KINARI = '#F2EEE4';
const LINE = '#DDD6C8';
// Strokes have pathLength="1". The gap is longer than the path and the start offset sits past it, so an undrawn
// stroke shows nothing at all, not even the dot of its round cap.
const UNDRAWN = { strokeDasharray: '1 1.1', strokeDashoffset: 1.05 };

const motionOk = !matchMedia('(prefers-reduced-motion: reduce)').matches;
const open = document.querySelector<HTMLElement>('.ch-open');
if (motionOk && open) start(open);

function start(open: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('js-scrolly');

  const ways = q('.ch-ways');
  const tools = q('.ch-tools');
  const prac = q('.ch-prac');
  const close = q('.ch-close');
  const foot = q('.foot');
  const chapters = [open, ways, tools, prac, close];
  const maxScroll = () => ScrollTrigger.maxScroll(window);

  const mm = gsap.matchMedia();

  // ---------- desktop: pinned chapters, scrubbed ----------
  mm.add('(min-width: 901px) and (min-height: 720px)', () => {
    const pin = (trigger: HTMLElement, screens: number, animation: gsap.core.Timeline, extra: ScrollTrigger.Vars = {}) => {
      const st = ScrollTrigger.create({
        trigger,
        start: 'top top',
        end: () => `+=${screens * innerHeight}`,
        pin: true,
        scrub: true,
        animation,
        invalidateOnRefresh: true,
        ...extra,
      });
      return st;
    };

    const stOpen = pin(open, 1, opening(gsap.timeline({ paused: true })));
    pin(ways, 1.67, writing(gsap.timeline({ paused: true })));

    // 具 Tools: the handscroll moves left while the chapter is pinned.
    const track = q('.track', tools);
    const view = q('.track-view', tools);
    const tiles = qa('.ink-tools, .tool-tile', track);
    const counter = q('[data-counter]', tools);
    const toolTiles = qa('.tool-tile', track);
    const distance = () => Math.max(0, track.scrollWidth - view.clientWidth);
    const toolsTl = gsap.timeline({ paused: true }).fromTo(track, { x: 0 }, { x: () => -distance(), duration: 1, ease: OUT });
    const unroll = (progress: number) => {
      const shift = -Number(gsap.getProperty(track, 'x'));
      const width = view.clientWidth;
      for (const tile of tiles) {
        if (tile.classList.contains('ink-tools')) continue;
        const x = tile.offsetLeft - shift;
        gsap.set(tile, { opacity: 0.25 + 0.75 * gsap.utils.clamp(0, 1, (width - x) / 300) });
      }
      const seen = gsap.utils.clamp(1, toolTiles.length, Math.ceil(progress * toolTiles.length + 0.001));
      counter.textContent = counter.dataset.format!.replace('{n}', String(seen).padStart(2, '0')).replace(
        '{total}',
        counter.dataset.total!,
      );
    };
    // 1.55 viewports for four tiles; more tiles get a longer pin so the scroll keeps the same pace.
    const stTools = pin(tools, 1.55 * (toolTiles.length / 4), toolsTl, {
      onUpdate: (self) => unroll(self.progress),
      onRefresh: (self) => unroll(self.progress),
    });

    pin(prac, 1, practice(gsap.timeline({ paused: true }), 'scrub'));
    pin(close, 0.67, closing(gsap.timeline({ paused: true }), 'scrub'));

    // The footer rises in over the last 320px of the page.
    gsap.fromTo(
      foot,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: OUT,
        scrollTrigger: {
          start: () => maxScroll() - 320,
          end: () => maxScroll() - 40,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: -1, // measured after the pins
        },
      },
    );

    // Keyboard: focus inside a pinned chapter scrolls to where that element is fully shown. The browser has already
    // scrolled the element into view when focusin fires, so work from scrollY, not from the last rendered frame.
    const progressAt = (st: ScrollTrigger) => gsap.utils.clamp(0, 1, (scrollY - st.start) / (st.end - st.start));
    // Only keyboard focus moves the page; a mouse click focuses the link too, and must just follow it.
    const byKeyboard = (e: FocusEvent) => (e.target as Element).matches(':focus-visible');
    const toOpenEnd = (e: FocusEvent) => {
      if (!byKeyboard(e)) return;
      if (progressAt(stOpen) < 0.72) scrollTo(0, stOpen.start + 0.72 * (stOpen.end - stOpen.start));
    };
    const toTile = (e: FocusEvent) => {
      tools.scrollLeft = 0; // for browsers without overflow: clip
      if (!byKeyboard(e)) return;
      const tile = (e.target as HTMLElement).closest<HTMLElement>('.ink-tools, .tool-tile');
      if (!tile) return;
      const total = distance();
      // The track's ease is power2.out: shift = total × (1 − (1 − p)³).
      const shift = total * (1 - (1 - progressAt(stTools)) ** 3);
      const need = tile.offsetLeft + tile.offsetWidth - view.clientWidth;
      const inside = scrollY >= stTools.start && scrollY <= stTools.end;
      if (inside && shift >= need && shift <= tile.offsetLeft) return;
      const p = total ? 1 - Math.cbrt(1 - gsap.utils.clamp(0, 1, need / total)) : 0;
      scrollTo(0, Math.ceil(stTools.start + p * (stTools.end - stTools.start)) + 1);
    };
    open.addEventListener('focusin', toOpenEnd);
    tools.addEventListener('focusin', toTile);

    return () => {
      open.removeEventListener('focusin', toOpenEnd);
      tools.removeEventListener('focusin', toTile);
    };
  });

  // ---------- small screens and short desktops: no pins, each animation plays once ----------
  mm.add('(max-width: 900px), (max-height: 719px)', () => {
    const once = (trigger: Element, animation: gsap.core.Animation, start = 'top 85%') =>
      ScrollTrigger.create({ trigger, start, once: true, animation });

    // The hero lines play at load; the bonsai draws in 1.6s when its tile comes into view.
    const hero = q('.hero', open);
    const heroTl = gsap.timeline({ paused: true, defaults: { ease: OUT } });
    heroTl
      .fromTo(q('.cut', hero), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.7 }, 0)
      .fromTo(q('.l2', hero), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.25)
      .fromTo(q('.hero-foot', hero), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.45);
    once(hero, heroTl, 'top bottom');
    const tree = bonsai(gsap.timeline({ paused: true }));
    once(q('.bonsai-tile', open), tree.timeScale(1 / 1.6), 'top 80%');

    once(q('.ways-title', ways), rise(q('.ways-title', ways), 24));
    for (const tile of qa('.way', ways)) once(tile, writeOnce(tile), 'top 70%');

    once(q('.tools-head', tools), rise(q('.tools-head', tools), 24));
    for (const tile of qa('.ink-tools, .tool-tile', tools)) once(tile, rise(tile, 28));

    once(q('.philo-art', prac), rise(q('.philo-art', prac), 30));
    const philo = q('.philo', prac);
    once(philo, practice(gsap.timeline({ paused: true }), 'time'), 'top 75%');

    once(q('.close-tile', close), closing(gsap.timeline({ paused: true }), 'time'), 'top 75%');
    once(foot, rise(foot, 36), 'top 95%');
  });

  // ---------- the rail: progress, chapters and the hanko (pinned story only) ----------
  mm.add('(min-width: 901px) and (min-height: 720px)', () => {
    const ink = q('.story-ink');
    const items = qa('.story-chapters li');
    const hanko = q('.hanko');
    // A chapter is current from the moment its top reaches the top of the screen (its pin starts).
    const starts = () =>
      chapters.map((c, i) => {
        const box = c.parentElement?.classList.contains('pin-spacer') ? c.parentElement : c;
        return i === 0 ? 0 : box.getBoundingClientRect().top + scrollY;
      });
    let marks = starts();
    const paint = (progress: number) => {
      gsap.set(ink, { scaleY: progress });
      const y = scrollY + 1;
      let now = 0;
      marks.forEach((m, i) => {
        if (y >= m) now = i;
      });
      items.forEach((li, i) => {
        li.classList.toggle('now', i === now);
        li.classList.toggle('next', i > now);
      });
    };
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => paint(self.progress),
      onRefresh: (self) => {
        marks = starts();
        paint(self.progress);
      },
    });
    // The hanko rests at 25% and stamps in over the last 160px.
    gsap.fromTo(
      hanko,
      { opacity: 0.25, scale: 1.25, rotation: -6 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: OUT,
        scrollTrigger: {
          start: () => maxScroll() - 160,
          end: () => maxScroll(),
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: -1, // measured after the pins
        },
      },
    );
  });

  // Crossing a breakpoint rebuilds the pins and ScrollTrigger returns to the top; bring the reader back to the
  // chapter they were reading. Rotations that keep the same chapter in view are left alone.
  const reading = () => {
    let k = open;
    for (const c of chapters) if (c.getBoundingClientRect().top <= innerHeight * 0.3) k = c;
    return k;
  };
  let anchor = open;
  addEventListener('scroll', () => (anchor = reading()), { passive: true });
  ScrollTrigger.addEventListener('matchMedia', () => {
    if (reading() === anchor) return;
    const box = anchor.parentElement?.classList.contains('pin-spacer') ? anchor.parentElement : anchor;
    scrollTo(0, box.getBoundingClientRect().top + scrollY);
  });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  // ---------- timelines (duration 1, positions are fractions of a chapter) ----------
  function seg(tl: gsap.core.Timeline, targets: gsap.TweenTarget, from: gsap.TweenVars, to: gsap.TweenVars, a: number, b: number, ease = OUT) {
    return tl.fromTo(targets, from, { ...to, duration: b - a, ease }, a);
  }

  // 序 Open: pot, trunk, the cut line, branches, line two, foliage, lede, cut mark, the pruned branch falls.
  function opening(tl: gsap.core.Timeline) {
    const hero = q('.hero', open);
    seg(tl, q('.scroll-hint', hero), { opacity: 1 }, { opacity: 0 }, 0.02, 0.1);
    seg(tl, q('.cut', hero), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1 }, 0.12, 0.36);
    seg(tl, q('.l2', hero), { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, 0.3, 0.42);
    seg(tl, q('.hero-foot', hero), { y: 24, opacity: 0 }, { y: 0, opacity: 1 }, 0.55, 0.7);
    bonsai(tl);
    return tl.set({}, {}, 1);
  }

  function bonsai(tl: gsap.core.Timeline) {
    const svg = q<SVGSVGElement>('.bonsai-scroll', open);
    const draw = (targets: Element[], a: number, b: number) =>
      seg(tl, targets, UNDRAWN, { strokeDashoffset: 0 }, a, b);
    seg(tl, [q('.ground', svg), q('.pot', svg)], { opacity: 0 }, { opacity: 1 }, 0.02, 0.08);
    draw([q('.trunk', svg)], 0.05, 0.3);
    draw([...qa('.branches .draw', svg), q('.pruned .draw', svg)], 0.24, 0.42);
    const pads = [q('.pruned .pad', svg), ...qa('.pads .pad', svg)];
    pads.forEach((pad, i) => {
      const final = Number(pad.getAttribute('opacity') ?? 1);
      seg(tl, pad, { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: final }, 0.4 + i * 0.04, 0.52 + i * 0.04);
    });
    seg(tl, q('.cut-mark', svg), { opacity: 0 }, { opacity: 1 }, 0.74, 0.8);
    seg(tl, q('.ghost', svg), { opacity: 0 }, { opacity: 1 }, 0.84, 0.95);
    tl.fromTo(
      q('.pruned', svg),
      { x: 0, y: 0, rotation: 0, opacity: 1, svgOrigin: '166 306' },
      { x: -30, y: 140, rotation: -28, opacity: 0, duration: 0.15, ease: OUT },
      0.8,
    );
    return tl.set({}, {}, 1);
  }

  // 道 Ways: each kanji written stroke by stroke in its real order (KanjiVG), one after another.
  function writing(tl: gsap.core.Timeline) {
    seg(tl, q('.ways-title', ways), { y: 24, opacity: 0 }, { y: 0, opacity: 1 }, 0, 0.1);
    seg(tl, qa('.way', ways), { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 0, 0.06);
    const windows: [number, number][] = [
      [0.08, 0.34],
      [0.4, 0.58],
      [0.64, 0.92],
    ];
    qa('.way', ways).forEach((tile, k) => write(tl, tile, ...windows[k]));
    return tl.set({}, {}, 1);
  }

  function write(tl: gsap.core.Timeline, tile: HTMLElement, a: number, b: number) {
    const strokes = qa<SVGPathElement>('.stroke', tile);
    const step = (b - a) / strokes.length;
    strokes.forEach((s, i) =>
      seg(tl, s, UNDRAWN, { strokeDashoffset: 0 }, a + i * step, a + (i + 0.82) * step, BRUSH),
    );
    // Writing paper: the tile turns kinari and shows the 田 guide while the kanji is written.
    tl.fromTo(tile, { backgroundColor: WASHI, borderColor: LINE }, { backgroundColor: KINARI, borderColor: KINARI, duration: 0.02, ease: 'none' }, a - 0.02);
    tl.to(tile, { backgroundColor: WASHI, borderColor: LINE, duration: 0.02, ease: 'none' }, b + 0.03);
    const guide = q('.guide', tile);
    seg(tl, guide, { opacity: 0.25 }, { opacity: 1 }, a - 0.04, a);
    tl.to(guide, { opacity: 0.4, duration: 0.03, ease: OUT }, b);
    seg(tl, q('.settle', tile), { opacity: 0 }, { opacity: 1 }, b, b + 0.03);
    seg(tl, q('.way-text', tile), { y: 16, opacity: 0 }, { y: 0, opacity: 1 }, b + 0.01, b + 0.06);
  }

  // Small screens: 0.12s per stroke, then the glyph settles and the words rise.
  function writeOnce(tile: HTMLElement) {
    const tl = gsap.timeline({ paused: true });
    const strokes = qa<SVGPathElement>('.stroke', tile);
    const guide = q('.guide', tile);
    tl.fromTo(tile, { backgroundColor: WASHI, borderColor: LINE }, { backgroundColor: KINARI, borderColor: KINARI, duration: 0.25, ease: 'none' }, 0);
    tl.fromTo(guide, { opacity: 0.25 }, { opacity: 1, duration: 0.25, ease: OUT }, 0);
    strokes.forEach((s, i) =>
      tl.fromTo(s, UNDRAWN, { strokeDashoffset: 0, duration: 0.12, ease: BRUSH }, 0.15 + i * 0.12),
    );
    const end = 0.15 + strokes.length * 0.12;
    tl.fromTo(q('.settle', tile), { opacity: 0 }, { opacity: 1, duration: 0.2, ease: OUT }, end);
    tl.to(guide, { opacity: 0.4, duration: 0.3, ease: OUT }, end);
    tl.to(tile, { backgroundColor: WASHI, borderColor: LINE, duration: 0.4, ease: 'none' }, end + 0.1);
    tl.fromTo(q('.way-text', tile), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, end + 0.05);
    return tl;
  }

  // 心 Practice: the art and words rise; each practice item draws its shu dash, then its text rises.
  function practice(tl: gsap.core.Timeline, mode: 'scrub' | 'time') {
    const philo = q('.philo', prac);
    if (mode === 'scrub') {
      seg(tl, q('.philo-art svg', prac), { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 0, 0.18);
      seg(tl, q('h2', philo), { y: 24, opacity: 0 }, { y: 0, opacity: 1 }, 0.04, 0.18);
      seg(tl, q('.body', philo), { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 0.16, 0.32);
      qa('.practice li', philo).forEach((li, i) => {
        const s = 0.36 + i * 0.18;
        seg(tl, q('.dash-mark', li), { scaleX: 0 }, { scaleX: 1 }, s, s + 0.07);
        seg(tl, q('span:last-child', li), { y: 16, opacity: 0 }, { y: 0, opacity: 1 }, s + 0.04, s + 0.14);
      });
      return tl.set({}, {}, 1);
    }
    tl.fromTo(q('h2', philo), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, 0);
    tl.fromTo(q('.body', philo), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, 0.15);
    qa('.practice li', philo).forEach((li, i) => {
      const s = 0.4 + i * 0.25;
      tl.fromTo(q('.dash-mark', li), { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: OUT }, s);
      tl.fromTo(q('span:last-child', li), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, s + 0.12);
    });
    return tl;
  }

  // 結 Close: Kiko rises, 明鏡止水 appears one character at a time, then the quote and its note.
  function closing(tl: gsap.core.Timeline, mode: 'scrub' | 'time') {
    const tile = q('.close-tile', close);
    const chars = qa('.close-tate span', tile);
    if (mode === 'scrub') {
      seg(tl, q('.close-kiko', tile), { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, 0, 0.28);
      chars.forEach((c, i) => seg(tl, c, { opacity: 0 }, { opacity: 1 }, 0.2 + i * 0.1, 0.34 + i * 0.1));
      seg(tl, q('.quote-text', tile), { y: 28, opacity: 0 }, { y: 0, opacity: 1 }, 0.36, 0.62);
      seg(tl, q('.quote-note', tile), { opacity: 0 }, { opacity: 1 }, 0.6, 0.8);
      return tl.set({}, {}, 1);
    }
    tl.fromTo(q('.close-kiko', tile), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, 0);
    chars.forEach((c, i) => tl.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: OUT }, 0.2 + i * 0.12));
    tl.fromTo(q('.quote-text', tile), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, 0.3);
    tl.fromTo(q('.quote-note', tile), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: OUT }, 0.6);
    return tl;
  }

  function rise(el: El, distance: number) {
    return gsap.fromTo(el, { y: distance, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT, paused: true });
  }
}
