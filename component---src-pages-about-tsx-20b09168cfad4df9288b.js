(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"2l/u":function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),r=n.n(a),o=n("/MKj"),i=n("vOnD"),l=n("nTs4"),c=n("SWNA"),u=n("O6ko"),d=n("u1cC"),s=n("kHOC"),p=n("O9nS"),m=n("Z6Kw"),f=i.default.div.withConfig({displayName:"ColumnsLayout",componentId:"sc-16rcnxs-0"})(["display:flex;flex-flow:row nowrap;gap:",";position:relative;width:100%;margin:0 auto;box-sizing:border-box;@media ","{padding:0 ",";flex-flow:column;}@media ","{max-width:",";padding-bottom:",";}"],m.h.big,m.a.mobile,m.h.normal,m.a.desktop,(function(e){return"full"===e.size?void 0:m.i}),(function(e){return"full"===e.size?0:m.h.normal})),w=i.default.div.withConfig({displayName:"ColumnsLayout__ContentColumn",componentId:"sc-16rcnxs-1"})(["display:flex;flex-flow:column;flex:1 1 auto;@media ","{display:",";}"],m.a.mobile,(function(e){return e.hideOnMobile?"none":"block"})),y=[{name:"Klub Jagielloński",imageSrc:"logo_cakjv2_crop.png",description:"Algorytm",sourceUrl:d.c.external.klubJagiellonski.href},{name:"Instytut Logistyki i Magazynowania",imageSrc:"logo_logistyka.png",description:"Baza kodów kreskowych i producentów",sourceUrl:d.c.external.instytutLogistyki.href},{name:"Koduj dla Polski",imageSrc:"logo_kodujdlapolski.png",description:"Otwarte spotkania projektowe dla programistów",sourceUrl:d.c.external.mojePanstwo.href}],g=function(){return y},b=n("VF73"),h=i.default.div.withConfig({displayName:"PartnerTile__Tile",componentId:"sc-fmz1zq-0"})(["text-align:center;width:100%;.title{width:100%;}"]),E=function(e){e.name;var t=e.imageSrc,n=e.description,a=e.sourceUrl;return r.a.createElement(h,null,r.a.createElement("a",{href:a,target:"__blank"},r.a.createElement(b.a,{imageSrc:t})),r.a.createElement("p",{className:"title"},n))},z=i.default.ul.withConfig({displayName:"PartnersList__List",componentId:"sc-1hy1s0g-0"})(["display:flex;flex-flow:row nowrap;list-style:none;align-items:center;margin:0 auto;padding:0;gap:",";li{flex:1;width:100%;img{width:100%;}}@media ","{padding:0;flex-flow:column;max-width:20em;}"],m.h.big,m.a.mobile),j=function(e){var t=e.partners;return r.a.createElement(z,null,t.map((function(e){return r.a.createElement("li",{key:e.name},r.a.createElement(E,e))})))};function k(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function x(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function v(e,t,n){return t&&x(e.prototype,t),n&&x(e,n),e}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function P(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function D(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function M(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?D(e):t}function N(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=C(e);if(t){var r=C(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return M(this,n)}}function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(a=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(c){r=!0,o=c}finally{try{a||null==l.return||l.return()}finally{if(r)throw o}}return n}(e,t)||T(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e){return function(e){if(Array.isArray(e))return H(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||T(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var L=function e(t){var n=this,a=t.expanded,r=void 0===a?[]:a,o=t.allowMultipleExpanded,i=void 0!==o&&o,l=t.allowZeroExpanded,c=void 0!==l&&l;k(this,e),A(this,"expanded",void 0),A(this,"allowMultipleExpanded",void 0),A(this,"allowZeroExpanded",void 0),A(this,"toggleExpanded",(function(e){return n.isItemDisabled(e)?n:n.isItemExpanded(e)?n.augment({expanded:n.expanded.filter((function(t){return t!==e}))}):n.augment({expanded:n.allowMultipleExpanded?[].concat(Z(n.expanded),[e]):[e]})})),A(this,"isItemDisabled",(function(e){var t=n.isItemExpanded(e),a=1===n.expanded.length;return Boolean(t&&!n.allowZeroExpanded&&a)})),A(this,"isItemExpanded",(function(e){return-1!==n.expanded.indexOf(e)})),A(this,"getPanelAttributes",(function(e,t){var a=null!=t?t:n.isItemExpanded(e);return{role:n.allowMultipleExpanded?void 0:"region","aria-hidden":n.allowMultipleExpanded?!a:void 0,"aria-labelledby":n.getButtonId(e),id:n.getPanelId(e),hidden:!a||void 0}})),A(this,"getHeadingAttributes",(function(){return{role:"heading"}})),A(this,"getButtonAttributes",(function(e,t){var a=null!=t?t:n.isItemExpanded(e),r=n.isItemDisabled(e);return{id:n.getButtonId(e),"aria-disabled":r,"aria-expanded":a,"aria-controls":n.getPanelId(e),role:"button",tabIndex:0}})),A(this,"getPanelId",(function(e){return"accordion__panel-".concat(e)})),A(this,"getButtonId",(function(e){return"accordion__heading-".concat(e)})),A(this,"augment",(function(t){return new e(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach((function(t){A(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({expanded:n.expanded,allowMultipleExpanded:n.allowMultipleExpanded,allowZeroExpanded:n.allowZeroExpanded},t))})),this.expanded=r,this.allowMultipleExpanded=i,this.allowZeroExpanded=c},q=Object(a.createContext)(null),R=function(e){P(n,e);var t=N(n);function n(){var e;k(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return A(D(e=t.call.apply(t,[this].concat(r))),"state",new L({expanded:e.props.preExpanded,allowMultipleExpanded:e.props.allowMultipleExpanded,allowZeroExpanded:e.props.allowZeroExpanded})),A(D(e),"toggleExpanded",(function(t){e.setState((function(e){return e.toggleExpanded(t)}),(function(){e.props.onChange&&e.props.onChange(e.state.expanded)}))})),A(D(e),"isItemDisabled",(function(t){return e.state.isItemDisabled(t)})),A(D(e),"isItemExpanded",(function(t){return e.state.isItemExpanded(t)})),A(D(e),"getPanelAttributes",(function(t,n){return e.state.getPanelAttributes(t,n)})),A(D(e),"getHeadingAttributes",(function(){return e.state.getHeadingAttributes()})),A(D(e),"getButtonAttributes",(function(t,n){return e.state.getButtonAttributes(t,n)})),e}return v(n,[{key:"render",value:function(){var e=this.state,t=e.allowZeroExpanded,n=e.allowMultipleExpanded;return Object(a.createElement)(q.Provider,{value:{allowMultipleExpanded:n,allowZeroExpanded:t,toggleExpanded:this.toggleExpanded,isItemDisabled:this.isItemDisabled,isItemExpanded:this.isItemExpanded,getPanelAttributes:this.getPanelAttributes,getHeadingAttributes:this.getHeadingAttributes,getButtonAttributes:this.getButtonAttributes}},this.props.children||null)}}]),n}(a.PureComponent);A(R,"defaultProps",{allowMultipleExpanded:!1,allowZeroExpanded:!1});var W,J=function(e){P(n,e);var t=N(n);function n(){var e;k(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return A(D(e=t.call.apply(t,[this].concat(r))),"renderChildren",(function(t){return t?e.props.children(t):null})),e}return v(n,[{key:"render",value:function(){return Object(a.createElement)(q.Consumer,null,this.renderChildren)}}]),n}(a.PureComponent);!function(e){e.Accordion="Accordion",e.AccordionItem="AccordionItem",e.AccordionItemButton="AccordionItemButton",e.AccordionItemHeading="AccordionItemHeading",e.AccordionItemPanel="AccordionItemPanel"}(W||(W={}));var K=W,U=0;var F=/[\u0009\u000a\u000c\u000d\u0020]/g;function G(e){return""!==e&&!F.test(e)||(console.error('uuid must be a valid HTML5 id but was given "'.concat(e,'", ASCII whitespaces are forbidden')),!1)}var V=Object(a.createContext)(null),Q=function(e){var t=e.children,n=e.uuid,r=e.accordionContext,o=e.dangerouslySetExpanded,i=function(){r.toggleExpanded(n)},l=function(e){var r=null!=o?o:e.isItemExpanded(n),l=e.isItemDisabled(n),c=e.getPanelAttributes(n,o),u=e.getHeadingAttributes(n),d=e.getButtonAttributes(n,o);return Object(a.createElement)(V.Provider,{value:{uuid:n,expanded:r,disabled:l,toggleExpanded:i,panelAttributes:c,headingAttributes:u,buttonAttributes:d}},t)};return Object(a.createElement)(J,null,l)},$=function(e){return Object(a.createElement)(J,null,(function(t){return Object(a.createElement)(Q,O({},e,{accordionContext:t}))}))},X=function(e){var t=e.children,n=function(e){return e?t(e):null};return Object(a.createElement)(V.Consumer,null,n)},Y=function(e){var t,n=e.uuid,r=e.dangerouslySetExpanded,o=e.className,i=void 0===o?"accordion__item":o,l=e.activeClassName,c=S(e,["uuid","dangerouslySetExpanded","className","activeClassName"]),u=B(Object(a.useState)((t=U,U+=1,"raa-".concat(t))),1)[0],d=null!=n?n:u,s=function(e){var t=e.expanded&&l?l:i;return Object(a.createElement)("div",O({"data-accordion-component":"AccordionItem",className:t},c))};return G(d.toString()),c.id&&G(c.id),Object(a.createElement)($,{uuid:d,dangerouslySetExpanded:r},Object(a.createElement)(X,null,s))};function ee(e){var t=function e(t){return t&&(t.matches('[data-accordion-component="Accordion"]')?t:e(t.parentElement))}(e);return t&&Array.from(t.querySelectorAll('[data-accordion-component="AccordionItemButton"]'))}Y.displayName=K.AccordionItem;var te="End",ne="Enter",ae="Home",re=" ",oe="Spacebar",ie="ArrowUp",le="ArrowDown",ce="ArrowLeft",ue="ArrowRight",de=function(e){var t=e.toggleExpanded,n=e.className,r=void 0===n?"accordion__button":n,o=S(e,["toggleExpanded","className"]);return o.id&&G(o.id),Object(a.createElement)("div",O({className:r},o,{role:"button",tabIndex:0,onClick:t,onKeyDown:function(e){var n,a,r=e.key;if(r!==ne&&r!==re&&r!==oe||(e.preventDefault(),t()),e.target instanceof HTMLElement)switch(r){case ae:e.preventDefault(),n=e.target,(a=(ee(n)||[])[0])&&a.focus();break;case te:e.preventDefault(),function(e){var t=ee(e)||[],n=t[t.length-1];n&&n.focus()}(e.target);break;case ce:case ie:e.preventDefault(),function(e){var t=ee(e)||[],n=t.indexOf(e);if(-1!==n){var a=t[n-1];a&&a.focus()}}(e.target);break;case ue:case le:e.preventDefault(),function(e){var t=ee(e)||[],n=t.indexOf(e);if(-1!==n){var a=t[n+1];a&&a.focus()}}(e.target)}},"data-accordion-component":"AccordionItemButton"}))},se=function(e){P(n,e);var t=N(n);function n(){var e;k(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return A(D(e=t.call.apply(t,[this].concat(r))),"ref",void 0),A(D(e),"setRef",(function(t){e.ref=t})),e}return v(n,[{key:"componentDidUpdate",value:function(){n.VALIDATE(this.ref)}},{key:"componentDidMount",value:function(){n.VALIDATE(this.ref)}},{key:"render",value:function(){return Object(a.createElement)("div",O({"data-accordion-component":"AccordionItemHeading"},this.props,{ref:this.setRef}))}}],[{key:"VALIDATE",value:function(e){if(void 0===e)throw new Error("ref is undefined");if(1!==e.childElementCount||!e.firstElementChild||"AccordionItemButton"!==e.firstElementChild.getAttribute("data-accordion-component"))throw new Error("AccordionItemButton may contain only one child element, which must be an instance of AccordionItemButton.\n\nFrom the WAI-ARIA spec (https://www.w3.org/TR/wai-aria-practices-1.1/#accordion):\n\n“The button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.”\n\n")}}]),n}(a.PureComponent);A(se,"defaultProps",{className:"accordion__heading","aria-level":3});var pe=function(e){return Object(a.createElement)(X,null,(function(t){var n=t.headingAttributes;return e.id&&G(e.id),Object(a.createElement)(se,O({},e,n))}))};pe.displayName=K.AccordionItemHeading;var me=Object(i.default)((function(e){return Object(a.createElement)(X,null,(function(t){var n=t.toggleExpanded,r=t.buttonAttributes;return Object(a.createElement)(de,O({toggleExpanded:n},e,r))}))})).withConfig({displayName:"SingleAccordion__ItemButton",componentId:"sc-s6pk3u-0"})(["cursor:pointer;padding:10px;width:100%;text-align:left;border:none;font-size:14px;font-weight:bolder;::before{display:inline-block;content:'';height:7px;width:7px;margin-right:12px;border-bottom:2px solid currentColor;border-right:2px solid currentColor;transform:rotate(-135deg);}&[aria-expanded='true']::before,&[aria-selected='true']::before{transform:rotate(45deg);}"]),fe=Object(i.keyframes)(["0%{opacity:0;}100%{opacity:1;}"]),we=Object(i.default)((function(e){var t=e.className,n=void 0===t?"accordion__panel":t,r=e.id,o=S(e,["className","id"]),i=function(e){var t=e.panelAttributes;return r&&G(r),Object(a.createElement)("div",O({"data-accordion-component":"AccordionItemPanel",className:n},o,t))};return Object(a.createElement)(X,null,i)})).withConfig({displayName:"SingleAccordion__ItemPanel",componentId:"sc-s6pk3u-1"})(["padding:10px;font-size:14px;animation:"," 0.35s ease-in;padding-left:30px;"],fe),ye=function(e){var t=e.question,n=e.answer,a=e.key;return r.a.createElement(Y,{key:a},r.a.createElement(pe,null,r.a.createElement(me,null,t)),r.a.createElement(we,null,n))},ge=Object(i.default)((function(e){var t=e.className,n=void 0===t?"accordion":t,r=e.allowMultipleExpanded,o=e.allowZeroExpanded,i=e.onChange,l=e.preExpanded,c=S(e,["className","allowMultipleExpanded","allowZeroExpanded","onChange","preExpanded"]);return Object(a.createElement)(R,{preExpanded:l,allowMultipleExpanded:r,allowZeroExpanded:o,onChange:i},Object(a.createElement)("div",O({"data-accordion-component":"Accordion",className:n},c)))})).withConfig({displayName:"AccordionList__Wrapper",componentId:"sc-xtwben-0"})(["border-radius:2px;[hidden]{display:none;}"]),be=function(e){var t=e.list;return r.a.createElement(ge,{allowMultipleExpanded:!0,allowZeroExpanded:!0},t.map((function(e){return r.a.createElement(ye,{question:e.question,answer:e.answer,key:e.key})})))},he=[{question:"Mam telefon z systemem operacyjnym Android. Nie mogę znaleźć aplikacji w Google Play. Dlaczego?",answer:r.a.createElement("p",null,"Aplikacja Pola działa na telefonach wyposażonych w system Android 4.1 lub nowszy. Aktualnie nie planujemy wsparcia dla wcześniejszych wersji."),key:1},{question:"Mam telefon iPhone (iPad). Nie mogę znaleźć aplikacji w App Store. Dlaczego?",answer:r.a.createElement("p",null,"Aplikacja Pola działa na urządzeniach wyposażonych w system operacyjny iOS w wersji 11.0 lub nowszej. Aktualnie nie planujemy wsparcia dla wcześniejszych wersji."),key:2},{question:"Reprezentuję producenta. Moja firma nie została jeszcze zweryfikowana przez redakcję. Co mam zrobić?",answer:r.a.createElement("p",null,"W pierwszej kolejności zajmujemy się tymi firmami, których produkty są najczęściej skanowane. Jednak możesz nam pomóc w weryfikacji firmy wypełniając ",r.a.createElement("a",{href:d.c.external.form.href},"formularz"),"."),key:3},{question:"Jak mogę zgłosić uwagi lub błąd w serwisie Pola?",answer:r.a.createElement("p",null,"Korzystamy z serwisu GitHub do zgłaszania błędów i uwag. Wybierz do jakiej części Poli chcesz zgłosić uwagi: ",r.a.createElement("a",{href:d.c.external.githubAndroid.href},"aplikacja na Androida"),", ",r.a.createElement("a",{href:d.c.external.githubIos.href},"aplikacja na iPhone'a"),", ",r.a.createElement("a",{href:d.c.external.githubWeb.href},"strona internetowa"),"."),key:4},{question:"Chcę pomóc w projekcie",answer:r.a.createElement("p",null,"Zapraszamy do włączenia się w pracę nad serwisem Pola. Dołącz do nas i pracuj nad ",r.a.createElement("a",{href:d.c.external.githubAndroid.href},"aplikacją na Androida"),", ",r.a.createElement("a",{href:d.c.external.githubIos.href},"aplikacją na iPhone'a")," lub ",r.a.createElement("a",{href:d.c.external.githubWeb.href},"stroną internetową"),". Stale poszukujemy też wolontariuszy chcących pomóc nam rozwijać bazę danych o firmach - zachęcamy do kontaktu z Mateuszem Perowiczem (tel. 660 010 034, e-mail: mateusz.perowicz@klubjagiellonski.pl)"),key:5}],Ee=i.default.div.withConfig({displayName:"Faq__Wrapper",componentId:"sc-guoh39-0"})(["margin:"," 0;"],m.f.big),ze=function(){return r.a.createElement(Ee,null,r.a.createElement(p.b,null,"FAQ"),r.a.createElement(be,{list:he}))},je=i.default.div.withConfig({displayName:"about__ImageContainer",componentId:"sc-p8hcmv-0"})(["min-width:20em;max-width:40em;margin:0 auto;"]);t.default=Object(o.connect)((function(e){return{location:e.app.location}}),{})((function(e){var t=e.location,n=Object(o.useDispatch)();return r.a.useEffect((function(){t&&(n(Object(u.c)(t)),n(Object(u.d)(d.a.ABOUT)))}),[]),r.a.createElement(l.a,{styles:{marginTop:m.h.big}},r.a.createElement(c.a,{pageTitle:"O Poli"}),r.a.createElement(f,null,r.a.createElement(w,null,r.a.createElement(s.a,null,r.a.createElement(p.b,null,"O Poli"),r.a.createElement(p.a,null,"Masz dość masówki globalnych koncernów? Szukasz lokalnych firm tworzących unikatowe produkty? Pola pomoże Ci odnaleźć polskie wyroby. Zabierając Polę na zakupy, odnajdujesz produkty „z duszą” i wspierasz polską gospodarkę."),r.a.createElement(p.a,null,"Zeskanuj kod kreskowy z dowolnego produktu i dowiedz się więcej o firmie, która go wyprodukowała. Pola powie Ci, czy dany producent opiera się na polskim kapitale, ma u nas swoją produkcję, tworzy wykwalifikowane miejsca pracy, jest częścią zagranicznego koncernu."),r.a.createElement(p.a,null,"Jeśli znajdziesz firmę, której nie ma w naszej bazie, koniecznie zgłoś ją do nas. Pomożesz nam w ten sposób uzupełniać unikatową bazę polskich producentów.")),r.a.createElement(s.a,null,r.a.createElement(p.b,null,"Algorytm"),r.a.createElement(p.a,null,"Każdemu producentowi Pola przypisuje od 0 do 100 punktów. Pierwsze 35 punktów przyznaje proporcjonalnie do udziału polskiego kapitału w konkretnym przedsiębiorstwie. Dalsze 10 punktów otrzymuje ta firma, która jest zarejestrowana w Polsce, a kolejne 30, o ile produkuje w naszym kraju. Dalsze 15 punktów zależy od tego, czy zatrudnia w naszym kraju w obszarze badań i rozwoju. Wreszcie ostatnie 10 punktów otrzymują firmy, które nie są częścią zagranicznych koncernów."),r.a.createElement(p.a,null,"Liczba punktów zwizualizowana jest przy pomocy czerwonego paska. Dokładamy wszelkich starań aby dane w aplikacji zawsze odpowiadały rzeczywistości i były aktualizowane na bieżąco. Prosimy o zgłaszanie wszelkich uwag i niejasności.")),r.a.createElement(s.a,null,r.a.createElement(p.b,null,"Filozofia działania"),r.a.createElement(p.a,null,"Staramy się być maksymalnie przejrzyści w naszych działaniach. Całość kodu źródłowego serwisu udostępniamy na zasadach otwartego oprogramowania na"," ",r.a.createElement("a",{href:d.c.external.polaGitHub.href,target:"__blank"},"koncie Klubu Jagiellońskiego")," ","w serwisie GitHub. Wktórce planujemy udostępnić w Internecie całość bazy danych producentów wraz z historią zmian i źródłami, na podstawie których podejmujemy decyzję o liczbie punktów, które im przyznajemy. Działamy zgodnie z naszą"," ",r.a.createElement("a",{href:d.c.external.polaPrivacyPolicy.href,target:"__blank"},"polityką prywatności"),".")),r.a.createElement(s.a,null,r.a.createElement(p.b,null,"Partnerzy"),r.a.createElement(j,{partners:g()})),r.a.createElement(ze,null)),r.a.createElement(w,{hideOnMobile:!0},r.a.createElement(je,null,r.a.createElement(b.a,{imageSrc:"sok.png"})))))}))}}]);
//# sourceMappingURL=component---src-pages-about-tsx-20b09168cfad4df9288b.js.map