/* 全ページ共通のヘッダー（ロゴ＋ナビ）。ナビを変えるときは、ここの NAV だけを直す。
   トップページ（<body class="home">）では、最初は隠しておき、スクロールし始めたら上部に現れて固定する。 */
(function () {
  /* 各項目：［リンク先, 表示名, このページ名のときに「現在地」にする条件］
     「対応CAD」の行き先は、特定の1製品ではなく、トップの「対応する3D CAD」（一覧）。
     各CADの詳細ページは cad-〇〇.html という名前にして、この一覧の「子」として扱う（増えても、ナビはこのまま）。 */
  var NAV = [
    ["index.html", "トップ", function (c) { return c === "index"; }],
    ["index.html#cad", "対応CAD", function (c) { return c.indexOf("cad-") === 0; }],
    ["howto.html", "使い方", function (c) { return c === "howto"; }],
    ["faq.html", "FAQ", function (c) { return c === "faq"; }]
  ];
  var LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-176 -10 1040 124" class="logosvg" role="img" aria-label="JW AUTO DRAW"><line class="base" x1="-176" y1="100" x2="864" y2="100" stroke="#f2f2f2" opacity="0.8"/><clipPath id="hband"><rect x="-391.1" y="-4.9" width="1469.8" height="109.8"/></clipPath><g fill="none" stroke="#f2f2f2" stroke-linecap="butt" stroke-linejoin="miter" clip-path="url(#hband)"><path d="M0.00 104.90 L38.00 9.49 L76.00 104.90" stroke-width="9.8" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="12"/><line x1="12.92" y1="66.00" x2="63.08" y2="66.00" stroke-width="9.8" opacity="1.0"/><line x1="110.90" y1="-4.90" x2="110.90" y2="71.90" stroke-width="9.8" opacity="1.0"/><line x1="167.10" y1="-4.90" x2="167.10" y2="71.90" stroke-width="9.8" opacity="1.0"/><path d="M167.10 71.90 A28.1 28.1 0 0 1 110.90 71.90" stroke-width="9.8"/><line x1="194.00" y1="0.00" x2="260.00" y2="0.00" stroke-width="9.8" opacity="1.0"/><line x1="227.00" y1="0.00" x2="227.00" y2="104.90" stroke-width="9.8" opacity="1.0"/><path d="M280.00 50.00 a50.9 54.557 0 1 0 101.8 0 a50.9 54.557 0 1 0 -101.8 0 Z M289.80 50.00 a41.10 46.13 0 1 0 82.20 0 a41.10 46.13 0 1 0 -82.20 0 Z" fill="#f2f2f2" fill-rule="evenodd" stroke="none"/><path d="M483.80 0.00 L470.70 0.00 L470.70 100.00 L483.80 100.00" stroke-width="9.8" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="12"/><path d="M483.80 0.00 A50 50 0 0 1 483.80 100.00" stroke-width="9.8"/><path d="M610.70 0.00 L583.60 0.00 L583.60 104.90" stroke-width="9.8" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="12"/><line x1="583.60" y1="50.00" x2="610.70" y2="50.00" stroke-width="9.8" opacity="1.0"/><path d="M610.70 0.00 A25 25 0 0 1 610.70 50.00" stroke-width="9.8"/><line x1="606.70" y1="50.00" x2="644.70" y2="104.90" stroke-width="9.8" opacity="1.0"/><path d="M666.70 104.90 L704.70 9.49 L742.70 104.90" stroke-width="9.8" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="12"/><line x1="679.62" y1="66.00" x2="729.78" y2="66.00" stroke-width="9.8" opacity="1.0"/><path d="M756.70 -4.90 L782.66 86.77 L807.70 31.23 L832.74 86.77 L858.70 -4.90" stroke-width="9.8" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="12"/><line x1="-147.66" y1="34.18" x2="-147.66" y2="90.18" stroke-width="7.644000000000001" opacity="1.0"/><path d="M-147.66 90.18 A9.82 9.82 0 0 1 -167.30 90.18" stroke-width="7.644000000000001"/><path d="M-125.24 34.18 L-109.05 89.61 L-93.62 59.16 L-78.19 89.61 L-62.00 34.18" stroke-width="7.644000000000001" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="12"/></g></svg>`;
  /* フッターの SNS リンク（全ページ共通）。リンク先を変えるときは、ここだけを直す */
  /* 各項目：［リンク先, 名前（読み上げ・ホバー用）, ロゴ（1色。色は文字と同じ）］ */
  var SNS = [
    ["https://www.threads.com/@hiro11svr", "Threads @hiro11svr",
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/></svg>'],
    ["https://www.instagram.com/hiro11svr", "Instagram @hiro11svr",
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>']
  ];
  function addSns() {   /* フッターは、このスクリプトより後ろにあるので、読み込みが終わってから差し込む */
    var fw = document.querySelector("footer .wrap");
    if (!fw || fw.querySelector(".sns")) return;
    var p = document.createElement("p");
    p.className = "sns";
    p.innerHTML = SNS.map(function (s) {
      return '<a href="' + s[0] + '" target="_blank" rel="noopener" aria-label="' + s[1] + '" title="' + s[1] + '">' + s[2] + "<span>" + s[1].split(" ")[1] + "</span></a>";
    }).join("");
    fw.appendChild(p);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addSns); else addSns();
  var host = document.getElementById("sitehdr");
  if (!host) return;
  function key(p) { p = (p || "").split("/").pop().replace(/\.html$/, ""); return p || "index"; }
  var cur = key(location.pathname);
  var links = NAV.map(function (n) {
    return '<a href="' + n[0] + '"' + (n[2](cur) ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
  }).join("");
  host.innerHTML = '<div class="wrap"><a class="logo" href="index.html" aria-label="JW AUTO DRAW（トップへ）">' + LOGO + '</a><nav aria-label="サイト内の移動">' + links + "</nav></div>";
  if (document.body.classList.contains("home")) {
    var on = false;
    function upd() {
      var s = (window.pageYOffset || document.documentElement.scrollTop || 0) > 4;
      if (s !== on) { on = s; document.body.classList.toggle("scrolled", s); }
    }
    addEventListener("scroll", upd, { passive: true });
    addEventListener("load", upd);
    upd();
  }
})();
