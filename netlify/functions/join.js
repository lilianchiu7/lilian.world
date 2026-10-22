// 中转口。浏览器只跟 lilian.world 说话,去 Google 那一段由 Netlify 的服务器替它走。
//
// 为什么要它:script.google.com 在中国大陆打不开,所以在那边的人填完了发不出去,
// 而且失败不写任何地方,我们连「有人试过」都看不见。
//
// 线上地址:https://lilian.world/.netlify/functions/join
// 页面那边写的是「先敲这里,敲不开就退回直连 Google」,所以这个文件挂掉不会让提交断。
//
// 🔴 这份是模板,下面那两个占位符由 构建.py 在推送前填进去。
//    别把填好的那份存进 vault,也别手敲密钥。

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbx_ryjHtCgVkcJgDJMi3tXO8EAAROunnBipWk7_4J2IQMk9s6ijuxCfUo9HOVf83om8/exec';
const KEY      = '02ifqpImHiLooWahNQDuGBSg3waH';

// 和 Apps Script 那边同一套上限。这里先截一刀,后端再截一刀,两边都不信对方
const LIMITS = { email: 254, name: 80, notes: 2000, wants: 60, hp: 80, src: 24 };

exports.handler = async function (event) {
  const head = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };

  // 浏览器直接打开这个地址会走到这里,用来确认它活着
  if (event.httpMethod !== 'POST') {
    return { statusCode: 200, headers: head, body: JSON.stringify({ ok: true, relay: 1 }) };
  }

  try {
    const got = new URLSearchParams(event.body || '');
    const out = new URLSearchParams({ k: KEY });
    for (const f of Object.keys(LIMITS)) {
      out.set(f, String(got.get(f) || '').slice(0, LIMITS[f]));
    }
    const r = await fetch(ENDPOINT, { method: 'POST', body: out, redirect: 'follow' });
    // 原样把后端那句话转回去。成功与否只认它,中间这一层不自己编结论
    return { statusCode: 200, headers: head, body: await r.text() };
  } catch (e) {
    return { statusCode: 502, headers: head, body: JSON.stringify({ ok: false, err: 'relay' }) };
  }
};
