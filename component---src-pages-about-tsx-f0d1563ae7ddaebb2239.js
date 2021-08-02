(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"2l/u":function(e,a,n){"use strict";n.r(a);var o=n("q1tI"),i=n.n(o),t=n("/MKj"),l=n("vOnD"),r=n("nTs4"),c=n("SWNA"),s=n("O6ko"),u=n("u1cC"),m=n("kHOC"),p=n("O9nS"),d=n("Z6Kw"),w=l.a.div.withConfig({displayName:"ColumnsLayout",componentId:"sc-16rcnxs-0"})(["display:flex;flex-flow:row nowrap;gap:",";position:relative;width:100%;margin:0 auto;box-sizing:border-box;@media ","{padding:0 ",";flex-flow:column;}@media ","{max-width:",";padding-bottom:",";}"],d.h.big,d.a.mobile,d.h.normal,d.a.desktop,(function(e){return"full"===e.size?void 0:d.i}),(function(e){return"full"===e.size?0:d.h.normal})),z=l.a.div.withConfig({displayName:"ColumnsLayout__ContentColumn",componentId:"sc-16rcnxs-1"})(["display:flex;flex-flow:column;flex:1 1 auto;@media ","{display:",";}"],d.a.mobile,(function(e){return e.hideOnMobile?"none":"block"})),k=[{name:"Klub Jagielloński",imageSrc:"logo_cakjv2_crop.png",description:"Algorytm",sourceUrl:u.c.external.klubJagiellonski.href},{name:"Instytut Logistyki i Magazynowania",imageSrc:"logo_logistyka.png",description:"Baza kodów kreskowych i producentów",sourceUrl:u.c.external.instytutLogistyki.href},{name:"Koduj dla Polski",imageSrc:"logo_kodujdlapolski.png",description:"Otwarte spotkania projektowe dla programistów",sourceUrl:u.c.external.mojePanstwo.href}],y=function(){return k},g=n("VF73"),f=l.a.div.withConfig({displayName:"PartnerTile__Tile",componentId:"fmz1zq-0"})(["text-align:center;width:100%;.title{width:100%;}"]),b=function(e){e.name;var a=e.imageSrc,n=e.description,o=e.sourceUrl;return i.a.createElement(f,null,i.a.createElement("a",{href:o,target:"__blank"},i.a.createElement(g.a,{imageSrc:a})),i.a.createElement("p",{className:"title"},n))},h=l.a.ul.withConfig({displayName:"PartnersList__List",componentId:"sc-1hy1s0g-0"})(["display:flex;flex-flow:row nowrap;list-style:none;align-items:center;margin:0 auto;padding:0;gap:",";li{flex:1;width:100%;img{width:100%;}}@media ","{padding:0;flex-flow:column;max-width:20em;}"],d.h.big,d.a.mobile),j=function(e){var a=e.partners;return i.a.createElement(h,null,a.map((function(e){return i.a.createElement("li",{key:e.name},i.a.createElement(b,e))})))},E=l.a.div.withConfig({displayName:"about__ImageContainer",componentId:"p8hcmv-0"})(["min-width:20em;max-width:40em;margin:0 auto;"]);a.default=Object(t.connect)((function(e){return{location:e.app.location}}),{})((function(e){var a=e.location,n=Object(t.useDispatch)();return i.a.useEffect((function(){a&&(n(Object(s.c)(a)),n(Object(s.d)(u.a.ABOUT)))}),[]),i.a.createElement(r.a,{styles:{marginTop:d.h.big}},i.a.createElement(c.a,{pageTitle:"O Poli"}),i.a.createElement(w,null,i.a.createElement(z,null,i.a.createElement(m.a,null,i.a.createElement(p.b,null,"O Poli"),i.a.createElement(p.a,null,"Masz dość masówki globalnych koncernów? Szukasz lokalnych firm tworzących unikatowe produkty? Pola pomoże Ci odnaleźć polskie wyroby. Zabierając Polę na zakupy, odnajdujesz produkty „z duszą” i wspierasz polską gospodarkę."),i.a.createElement(p.a,null,"Zeskanuj kod kreskowy z dowolnego produktu i dowiedz się więcej o firmie, która go wyprodukowała. Pola powie Ci, czy dany producent opiera się na polskim kapitale, ma u nas swoją produkcję, tworzy wykwalifikowane miejsca pracy, jest częścią zagranicznego koncernu."),i.a.createElement(p.a,null,"Jeśli znajdziesz firmę, której nie ma w naszej bazie, koniecznie zgłoś ją do nas. Pomożesz nam w ten sposób uzupełniać unikatową bazę polskich producentów.")),i.a.createElement(m.a,null,i.a.createElement(p.b,null,"Algorytm"),i.a.createElement(p.a,null,"Każdemu producentowi Pola przypisuje od 0 do 100 punktów. Pierwsze 35 punktów przyznaje proporcjonalnie do udziału polskiego kapitału w konkretnym przedsiębiorstwie. Dalsze 10 punktów otrzymuje ta firma, która jest zarejestrowana w Polsce, a kolejne 30, o ile produkuje w naszym kraju. Dalsze 15 punktów zależy od tego, czy zatrudnia w naszym kraju w obszarze badań i rozwoju. Wreszcie ostatnie 10 punktów otrzymują firmy, które nie są częścią zagranicznych koncernów."),i.a.createElement(p.a,null,"Liczba punktów zwizualizowana jest przy pomocy czerwonego paska. Dokładamy wszelkich starań aby dane w aplikacji zawsze odpowiadały rzeczywistości i były aktualizowane na bieżąco. Prosimy o zgłaszanie wszelkich uwag i niejasności.")),i.a.createElement(m.a,null,i.a.createElement(p.b,null,"Filozofia działania"),i.a.createElement(p.a,null,"Staramy się być maksymalnie przejrzyści w naszych działaniach. Całość kodu źródłowego serwisu udostępniamy na zasadach otwartego oprogramowania na"," ",i.a.createElement("a",{href:u.c.external.polaGitHub.href,target:"__blank"},"koncie Klubu Jagiellońskiego")," ","w serwisie GitHub. Wktórce planujemy udostępnić w Internecie całość bazy danych producentów wraz z historią zmian i źródłami, na podstawie których podejmujemy decyzję o liczbie punktów, które im przyznajemy. Działamy zgodnie z naszą"," ",i.a.createElement("a",{href:u.c.external.polaPrivacyPolicy.href,target:"__blank"},"polityką prywatności"),".")),i.a.createElement(m.a,null,i.a.createElement(j,{partners:y()}))),i.a.createElement(z,{hideOnMobile:!0},i.a.createElement(E,null,i.a.createElement(g.a,{imageSrc:"sok.png"})))))}))}}]);
//# sourceMappingURL=component---src-pages-about-tsx-f0d1563ae7ddaebb2239.js.map