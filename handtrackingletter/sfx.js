// 手指信的音效。全部用浏览器自带的发声器(Web Audio)当场合成,没有声音文件。试听间和程序都读这一份。
(() => {
  let ac = null;
  function ctx() { if (!ac) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ac = new C(); } if (ac.state === 'suspended') ac.resume().catch(() => {}); return ac; }
  // 一个音:波形、起止频率、开始时间、时长、音量
  function tone(a, type, f0, f1, t, dur, vol, out) {
    const o = a.createOscillator(), g = a.createGain(); o.type = type; o.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.9);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out || a.destination); o.start(t); o.stop(t + dur + 0.02);
  }
  // 一团气声:带通滤过的噪声
  function puff(a, t, dur, freq, q, vol, out) {
    const n = a.sampleRate * dur, b = a.createBuffer(1, n, a.sampleRate), d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain(); s.buffer = b; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(out || a.destination); s.start(t); s.stop(t + dur + 0.02);
  }
  const N = { C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5, G6: 1568, B6: 1975.5 };
  window.LH_SFX = {
    heart: [
      { id: 'pop', name: '泡泡 pop', note: '一声软软的 pop,尾巴带一点亮', play: (a, t) => { tone(a, 'sine', 480, 920, t, 0.16, 0.5); tone(a, 'sine', N.E6, N.E6, t + 0.06, 0.35, 0.12); tone(a, 'sine', N.B6, N.B6, t + 0.1, 0.3, 0.07); } },
      { id: 'chime', name: '风铃两声', note: '两颗高音,像小铃铛碰了一下', play: (a, t) => { tone(a, 'sine', N.E6, N.E6, t, 0.6, 0.25); tone(a, 'sine', N.G6, N.G6, t + 0.09, 0.7, 0.22); tone(a, 'triangle', N.E5, N.E5, t, 0.4, 0.06); } },
      { id: 'pluck', name: '竖琴一拨', note: '一下拨弦,低一点、暖一点', play: (a, t) => { tone(a, 'triangle', N.A5, N.A5, t, 0.5, 0.35); tone(a, 'sine', N.A5 * 2, N.A5 * 2, t, 0.3, 0.12); tone(a, 'sine', N.E5, N.E5, t + 0.02, 0.45, 0.1); } },
    ],
    rose: [
      { id: 'harp', name: '竖琴上行', note: '三个音往上走,像花一朵朵开', play: (a, t) => { [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => { tone(a, 'triangle', f, f, t + i * 0.09, 0.7, 0.22); tone(a, 'sine', f * 2, f * 2, t + i * 0.09, 0.35, 0.06); }); } },
      { id: 'bloom', name: '轻轻绽开', note: '一阵很软的气声往上扬,底下垫一个和弦', play: (a, t) => { puff(a, t, 0.7, 900, 1.2, 0.18); puff(a, t + 0.15, 0.6, 2400, 1.5, 0.08); [N.C5, N.E5, N.G5].forEach(f => tone(a, 'sine', f, f * 1.01, t + 0.1, 1.1, 0.07)); } },
      { id: 'bells', name: '小铃铛三下', note: '三下清脆的小铃,节奏快一点', play: (a, t) => { [N.E6, N.G6, N.B6].forEach((f, i) => { tone(a, 'sine', f, f, t + i * 0.12, 0.45, 0.2); tone(a, 'sine', f * 2.01, f * 2.01, t + i * 0.12, 0.2, 0.05); }); } },
    ],
    kiss: [
      { id: 'mwah', name: 'mwah', note: '一声唇音:先一下轻轻的吸,再一个 pop', play: (a, t) => { puff(a, t, 0.09, 1400, 2.5, 0.25); tone(a, 'sine', 420, 140, t + 0.07, 0.12, 0.55); puff(a, t + 0.07, 0.05, 700, 1, 0.12); } },
      { id: 'smack', name: '脆一点的 smack', note: '更短更脆,像亲在玻璃上', play: (a, t) => { puff(a, t, 0.04, 2200, 3, 0.3); tone(a, 'sine', 650, 180, t + 0.02, 0.08, 0.6); } },
      { id: 'kisschime', name: 'mwah 加一点亮', note: '唇音之后跟一颗很轻的高音', play: (a, t) => { puff(a, t, 0.09, 1400, 2.5, 0.22); tone(a, 'sine', 420, 140, t + 0.07, 0.12, 0.5); tone(a, 'sine', N.G6, N.G6, t + 0.2, 0.45, 0.1); } },
    ],
  };
  // ---- 真实采样(2026-11-11 20:46 她点头下载的 Freesound 预览,CC0 的不用署名,by 的要在文案写作者)。
  // 播的时候只放前 cut 秒并淡出,试听间听到的就是程序里放的长度。
  // 她 2026-11-11 20:55 在试衣间选定的三个(都是 CC0,不用署名)。其余 39 个候选没进 vault,留在临时目录。
  window.LH_SAMPLES = [
    { kind: 'kiss', id: 's536335', file: 'sfx/kiss_536335.mp3', title: 'Cartoon Kiss_cjohnstone.wav', user: 'trijohnstone', lic: 'cc0', dur: 1.5, cut: 1.5 },
    { kind: 'heart', id: 's618961', file: 'sfx/heart_618961.mp3', title: 'Cute Bounce Jump.wav', user: 'Hemplock', lic: 'cc0', dur: 0.3, cut: 0.3 },
    { kind: 'rose', id: 's610703', file: 'sfx/rose_610703.mp3', title: 'Good answer harp glissando.wav', user: 'oggraphics', lic: 'cc0', dur: 6.7, cut: 3.5 },
  ];
  const bufs = {};
  async function sampleBuf(a, file) {
    if (bufs[file]) return bufs[file];
    const r = await fetch(file, { cache: 'force-cache' }); if (!r.ok) throw new Error(file); const ab = await r.arrayBuffer();
    return (bufs[file] = await a.decodeAudioData(ab));
  }
  function playSample(a, t, sm, vol) {
    sampleBuf(a, sm.file).then(buf => {
      const src = a.createBufferSource(), g = a.createGain(); src.buffer = buf; const now = Math.max(t, a.currentTime + 0.005), cut = Math.min(sm.cut || 9, buf.duration), fade = Math.min(0.35, cut * 0.4);
      g.gain.setValueAtTime(vol || 0.9, now); g.gain.setValueAtTime(vol || 0.9, now + cut - fade); g.gain.linearRampToValueAtTime(0.0001, now + cut);
      src.connect(g).connect(a.destination); src.start(now); src.stop(now + cut + 0.02);
    }).catch(() => {});
  }
  for (const sm of window.LH_SAMPLES) {
    window.LH_SFX[sm.kind].splice(window.LH_SFX[sm.kind].filter(x => x.sample).length, 0, { id: sm.id, name: sm.title.replace(/\.(wav|aiff?|ogg|flac|mp3)$/i, ''), note: `${sm.user} · ${sm.lic === 'cc0' ? 'CC0 随便用' : 'CC-BY 要署名'} · 放前 ${sm.cut.toFixed(1)} 秒`, sample: true, play: (a, t) => playSample(a, t, sm) });
  }
  // 合成的三个排到最后,标成「合成」
  for (const k of Object.keys(window.LH_SFX)) window.LH_SFX[k].forEach(x => { if (!x.sample) x.note = '合成 · ' + x.note; });
  window.LH_SFX_DEFAULT = { heart: 's618961', rose: 's610703', kiss: 's536335' };
  window.LH_sfxPick = function () { let p = Object.assign({}, window.LH_SFX_DEFAULT); try { Object.assign(p, JSON.parse(localStorage.getItem('lovehand-sfx') || '{}')); } catch (e) {} return p; };
  window.LH_playSfx = function (kind, id) {
    const a = ctx(); if (!a) return; const list = window.LH_SFX[kind] || []; const want = id || window.LH_sfxPick()[kind];
    const s = list.find(x => x.id === want) || list[0]; if (s) s.play(a, a.currentTime + 0.01);
  };
  window.LH_sfxWarm = () => ctx();
})();
