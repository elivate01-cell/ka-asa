import { useState } from 'react';

type Lang = 'Yorùbá' | 'Igbo' | 'Hausa';
type Level = 'Beginner' | 'Intermediate' | 'Conversation';

const GREET: Record<Lang, { say: string; mean: string }> = {
  Yorùbá: { say: 'Kú iṣẹ́!', mean: 'well done on your work' },
  Igbo: { say: 'Daalù nù!', mean: 'thank you (to a group)' },
  Hausa: { say: 'Sannu dà zuwà!', mean: 'welcome, you have arrived' },
};

const ALPHA: Record<Lang, Array<{ g: string; ex: string; tone: string }>> = {
  Yorùbá: [
    { g: 'á', ex: 'ábá', tone: 'high tone' },
    { g: 'è', ex: 'èkó', tone: 'low tone' },
    { g: 'ọ́', ex: 'ọ̀jẹ́', tone: 'rising' },
    { g: 'ẹ', ex: 'ẹ̀wà', tone: 'open e' },
    { g: 'ṣ', ex: 'ṣòkòtò', tone: 'sh sound' },
    { g: 'gb', ex: 'gbà', tone: 'double stop' },
  ],
  Igbo: [
    { g: 'ị', ex: 'ịgbà', tone: 'dotted i' },
    { g: 'ọ', ex: 'ọ̀kụ̀', tone: 'dotted o' },
    { g: 'ụ', ex: 'ụlọ̀', tone: 'dotted u' },
    { g: 'ch', ex: 'chi', tone: 'breath ch' },
    { g: 'gb', ex: 'gbá', tone: 'double stop' },
    { g: 'ṅ', ex: 'ṅwá', tone: 'nasal' },
  ],
  Hausa: [
    { g: 'ɓ', ex: 'ɓàƙọ́', tone: 'implosive b' },
    { g: 'ƙ', ex: 'ƙàfị̄', tone: 'ejective k' },
    { g: 'ɗ', ex: 'ɗàyā', tone: 'implosive d' },
    { g: 'ƴ', ex: 'ƴaƴà', tone: 'hooked y' },
    { g: 'ʼy', ex: 'ʼyà', tone: 'glottal y' },
    { g: 'sh', ex: 'shā', tone: 'sh sound' },
  ],
};

const LESSONS: Record<Level, Array<{ t: string; mins: number; tag: string }>> = {
  Beginner: [
    { t: 'Greetings for the whole street', mins: 8, tag: 'audio' },
    { t: 'Counting kobo and cows', mins: 12, tag: 'audio' },
    { t: 'Naming the family photo', mins: 10, tag: 'quiz' },
    { t: 'Market words that save money', mins: 15, tag: 'audio' },
  ],
  Intermediate: [
    { t: 'Telling the doctor where it hurts', mins: 18, tag: 'dialogue' },
    { t: 'Past tense without panic', mins: 22, tag: 'grammar' },
    { t: 'Proverbs your aunt uses', mins: 14, tag: 'audio' },
    { t: 'Writing a text to dad', mins: 16, tag: 'quiz' },
  ],
  Conversation: [
    { t: 'Arguing about football, politely', mins: 25, tag: 'live circle' },
    { t: 'Story night: retell a folktale', mins: 30, tag: 'live circle' },
    { t: 'Debating the harmattan calendar', mins: 28, tag: 'live circle' },
    { t: 'Interviewing an elder', mins: 35, tag: 'project' },
  ],
};

const MEETUPS = [
  ['SAT 08 NOV', 'Ibadan circle', 'Café one, Bodija · 4 PM'],
  ['SUN 16 NOV', 'Lagos mainland', 'Yaba library annex · 3 PM'],
  ['SAT 22 NOV', 'Abuja circle', 'Wuse 2 hub · 5 PM'],
  ['SUN 30 NOV', 'Enugu circle', 'Ogui Road hall · 4 PM'],
] as const;
export default function App() {
  const [lang, setLang] = useState<Lang>('Yorùbá');
  const [level, setLevel] = useState<Level>('Beginner');
  const [sent, setSent] = useState(false);
  const greet = GREET[lang];
  return (
    <div className="ka">
      <div className="top">
        <a className="brand" href="#top">KÀ <span>ÀSÀ</span></a>
        <nav className="tnav">
          <a href="#alphabet">Alphabet</a><a href="#lessons">Lessons</a><a href="#meetups">Meetups</a><a href="#volunteer">Volunteer</a>
        </nav>
        <a className="tcta" href="#volunteer">Teach a circle</a>
      </div>
      <header className="hero" id="top">
        <div>
          <p className="kick">Free community language lessons</p>
          <h1>Pick a language, <em>keep the tones.</em></h1>
          <p className="lede">Volunteer-taught circles for Yorùbá, Igbo and Hausa — with the tone marks left in, because that is where the meaning lives.</p>
          <div className="switch" role="tablist" aria-label="Language switcher">
            {(['Yorùbá', 'Igbo', 'Hausa'] as Lang[]).map((l) => (
              <button key={l} className={lang === l ? 'swbtn on' : 'swbtn'} onClick={() => setLang(l)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="saycard">
          <div className="say">{greet.say}</div>
          <div className="mean">“{greet.mean}”</div>
          <div className="lsw">NOW SPEAKING · {lang.toUpperCase()}</div>
        </div>
      </header>
      <section className="alphabet" id="alphabet">
        <div className="al-in">
          <div className="al-head"><h2>The {lang} letters people miss</h2><p>Tap-free sample board · six letters that carry the sound of home.</p></div>
          <div className="tiles">
            {ALPHA[lang].map((a) => (
              <div className="tile" key={a.g}>
                <span className="g">{a.g}</span>
                <span className="ex">{a.ex}</span>
                <span className="tone">{a.tone}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="levels" id="lessons">
        <h2 className="lvl-h">Lessons by level</h2>
        <div className="lvl-tabs" role="tablist" aria-label="Level tabs">
          {(['Beginner', 'Intermediate', 'Conversation'] as Level[]).map((l) => (
            <button key={l} className={level === l ? 'ltab on' : 'ltab'} onClick={() => setLevel(l)}>{l}</button>
          ))}
        </div>
        <div className="lgrid">
          {LESSONS[level].map((l) => (
            <article className="lcard" key={l.t}>
              <h3>{l.t}</h3>
              <div className="lmeta2"><span className="mins">{l.mins} min</span><span className="tagl">{l.tag}</span></div>
              <a className="lgo" href="#lessons">Open lesson →</a>
            </article>
          ))}
        </div>
      </section>
      <section className="meetups" id="meetups">
        <div className="m-head"><h2>Circles meeting this month</h2><p>Free, outdoors when the rain allows.</p></div>
        {MEETUPS.map((m) => (
          <div className="mrow" key={m[0] + m[1]}>
            <span className="mdate">{m[0]}</span>
            <span className="mname">{m[1]}</span>
            <span className="mvenue">{m[2]}</span>
            <a className="mgo" href="#volunteer">RSVP →</a>
          </div>
        ))}
      </section>
      <section className="volunteer" id="volunteer">
        <div className="v-in">
          <div>
            <p className="kick">VOLUNTEER PANEL</p>
            <h2>Speak it? Then teach a circle.</h2>
            <p className="vlede">Two hours a month is enough. We give you the lesson cards, a marker board and fifteen willing students — you bring the accent you grew up with.</p>
          </div>
          {sent ? (
            <div className="vsent">You are in! A circle coordinator writes to you this week.</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <label>Name<input required placeholder="Your name" /></label>
              <label>City<input required placeholder="e.g. Enugu" /></label>
              <label>Language you can teach<select required defaultValue="">
                <option value="" disabled>Choose</option>
                <option>Yorùbá</option><option>Igbo</option><option>Hausa</option>
              </select></label>
              <button type="submit">Join as a volunteer</button>
            </form>
          )}
        </div>
      </section>
      <footer className="foot">
        <span>© {new Date().getFullYear()} Kà Àsà Learning Project — tones kept, doors open.</span>
        <span>PED Forge template draft · batch-3</span>
      </footer>
    </div>
  );
}