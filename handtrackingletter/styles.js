// 手指信的字体表和配色表。试听间(style.html)和程序(index.html)都读这一份,她点哪套存的是名字,颜色从这里取。
window.LH_FONTS = [
  { id: 'poppins', name: 'Poppins', note: '最像 CapCut Classic 的候选之一,圆一点', css: 'Poppins, "Helvetica Neue", sans-serif', w: 700 },
  { id: 'montserrat', name: 'Montserrat', note: '另一个像 Classic 的,方正一点', css: 'Montserrat, "Helvetica Neue", sans-serif', w: 800 },
  { id: 'helvetica', name: 'Helvetica Neue', note: '最经典的粗黑体', css: '"Helvetica Neue", Helvetica, Arial, sans-serif', w: 700 },
  { id: 'avenir', name: 'Avenir Next', note: '干净,稍细一点的骨架', css: '"Avenir Next", Avenir, sans-serif', w: 700 },
  { id: 'futura', name: 'Futura', note: '几何感,字母是圆和三角', css: 'Futura, "Century Gothic", sans-serif', w: 700 },
  { id: 'nunito', name: 'Nunito', note: '圆头,最可爱的一个', css: 'Nunito, "Arial Rounded MT Bold", sans-serif', w: 800 },
];
var LH_DARK = '#3E211E', LH_CREAM = '#FFF4E6';
// words 顺序:I · love · you · so · much。每项 [填充, 描边]。
// 她 2026-11-11 定:I 紫、love 红;描边不用白,用这一套自己的另一个颜色:紫字深红边、红字黄边、蓝字棕边、黄字棕边、棕字黄边(像她给的 NewJeans 手势参考)。
window.LH_PALS = [
  // 她的调色板原样(2026-11-11 17:20 她定:就要这套;17:23 much 换成 Vino Oscuro;18:27 她再调:love 红亮一点不要偏棕 #8E0E12,you 亮一点 #6FAEC2,much 改成不荧光的绿配黄边;18:41 五个字各亮一点点;18:48 蓝字配深蓝边 #1F4A5C,绿字配深绿边 #24452A,蓝字看不清是因为淡黄边衬不出它;18:48 蓝和绿的字再浅一点点;18:50 五个字再一起浅一点点亮一点点,边都不动;18:50 绿再绿一点,亮度不变只加饱和 #6FB86B)。填充是色块底色,描边是那个色块上字的颜色,都从没黑罩的截图上取。
  { id: 'palette', name: '你的调色板', note: '以你的调色板为底,按你 11-11 的几轮微调:I 紫 · love 红 · you 蓝 · so 黄 · much 绿', words: [['#F4E2FF', '#3E211E'], ['#A81C21', '#EEEBDA'], ['#92CBDC', '#1F4A5C'], ['#FEE8B4', '#44040F'], ['#6FB86B', '#24452A']], heart: '#F48FB1', heartStroke: '#D9607F', rose: ['#F28FB0', '#F6B4CB'] },
  { id: 'retro', name: '复古提亮', note: '你那张调色板的味道,亮了两档', words: [['#EFD6FF', '#A8232B'], ['#E0434C', '#F9D56E'], ['#78C4EA', '#6B4A2B'], ['#F9D56E', '#6B4A2B'], ['#C98B52', '#F9D56E']], heart: '#F48FB1', heartStroke: '#D9607F', rose: ['#F28FB0', '#F6B4CB'] },
  { id: 'sorbet', name: '雪糕', note: '亮但柔一点', words: [['#EFD6FF', '#B52A36'], ['#F0545E', '#FFE27A'], ['#86E1F8', '#7A5230'], ['#FFE27A', '#7A5230'], ['#E7A15C', '#FFE27A']], heart: '#FFA1B5', heartStroke: '#E8547A', rose: ['#F494B6', '#FBBBD3'] },
  { id: 'candy', name: '糖果', note: '亮、饱和,最抢眼', words: [['#EFD6FF', '#B51E2E'], ['#FF3B4E', '#FFD84D'], ['#62CCF5', '#7A4420'], ['#FFD84D', '#7A4420'], ['#E07A3F', '#FFD84D']], heart: '#FF8FAB', heartStroke: '#E8336F', rose: ['#FF8FBA', '#FFB3D1'] },
  { id: 'macaron', name: '马卡龙', note: '全是浅色,最温柔,在白墙前最弱', words: [['#EFD6FF', '#B8475A'], ['#F77C86', '#FFF0A6'], ['#A6E3FB', '#8A5E3C'], ['#FFF0A6', '#8A5E3C'], ['#E0B089', '#FFF0A6']], heart: '#FFB3C6', heartStroke: '#E87FA0', rose: ['#F6A2C1', '#FCC4D8'] },
  { id: 'y2k', name: 'Y2K', note: '最冲,正红加荧光', words: [['#D9B3FF', '#A8142A'], ['#FF2E3F', '#FFF04D'], ['#4DD2FF', '#8A4A12'], ['#FFF04D', '#8A4A12'], ['#FF8A2A', '#FFF04D']], heart: '#FF6FAE', heartStroke: '#E8178A', rose: ['#FF77BC', '#FFA3D2'] },
  { id: 'neon', name: '荧光', note: '最亮的一档,偏街头', words: [['#E0C3FF', '#A3122A'], ['#FF2B47', '#FFE600'], ['#3FDBFF', '#8A5210'], ['#FFE600', '#8A5210'], ['#FF9F1C', '#FFE600']], heart: '#FF5C9A', heartStroke: '#E8246A', rose: ['#FF66AA', '#FF94C5'] },
];
window.LH_DEFAULT = { fontId: 'poppins', paletteId: 'palette' };
window.LH_SINCE = 1794435683713;   // 这个时间之前点的选择不算数(表改过了)
// 只认她亲手点过的选择(picked: true)。试听间打开本身不算选。
window.LH_resolve = function () {
  let ids = Object.assign({}, window.LH_DEFAULT);
  try { const s = JSON.parse(localStorage.getItem('lovehand-style') || 'null'); if (s && s.picked && s.t > window.LH_SINCE) { if (s.fontId) ids.fontId = s.fontId; if (s.paletteId) ids.paletteId = s.paletteId; } } catch (e) {}
  const font = window.LH_FONTS.find(f => f.id === ids.fontId) || window.LH_FONTS[0];
  const pal = window.LH_PALS.find(p => p.id === ids.paletteId) || window.LH_PALS[0];
  return { font, pal };
};
