"use strict";angular.module("angular-google-auth",[]).factory("googleAuth",["$rootScope","$http","$q",function(a){var b={init:function(a){if("localhost"===document.domain)b.login({getEmail:function(){return"localhost@ft.com"}},a);else{var c=document.createElement("script");c.src="https://apis.google.com/js/client:platform.js?onload=cardKitAuth",document.body.appendChild(c),window.cardKitAuth=function(){gapi.signin2.render("my-signin2",{width:200,height:50,longtitle:!1,theme:"dark",onsuccess:function(c){b.login(c.getBasicProfile(),a)}})}}},login:function(b,c){var d=/^.*\@ft\.com$/gi,e=b.getEmail();e.match(d)?a.$broadcast(c.evtName,b):(gapi.auth2.getAuthInstance().disconnect(),gapi.auth2.getAuthInstance().signOut()),a.$$phase||a.$apply()}};return b}]),angular.module("cardkitApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","colorpicker.module","draganddrop","ui.router","angular-google-auth"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("index",{url:"/",controller:"MainCtrl",templateUrl:"views/main.html",resolve:{themeConfig:["themeConfigProvider",function(a){return a}],templateConfig:["templateConfigProvider",function(a){return a}]}}).state("login",{url:"/login",controller:"LoginCtrl",templateUrl:"views/login.html"})}]),angular.module("cardkitApp").controller("MainCtrl",["$scope","$location","saveSvgAsPng","themeConfig","templateConfig",function(a,b,c,d,e){function f(){a.defaultConfig=angular.copy(a.config),a.$broadcast("resetSvg")}function g(b,c){var d=new FileReader;d.onload=function(){c.src=d.result,a.$apply()},d.readAsDataURL(b)}function h(a){return a.stopPropagation(),a.preventDefault(),a.dataTransfer||null}a.googleInfo||b.path("/login"),a.config={sizes:[{name:"Twitter",width:650,height:320,gridSize:16.25},{name:"Facebook",width:800,height:370,gridSize:20}],themes:d,templates:e,output:{scale:2,editable:{scale:!0}},svg:{canvas:{height:function(){return a.size.height},width:function(){return a.size.width},gridSize:function(){return a.size.gridSize}}}},"undefined"!=typeof a.config.themes&&(a.theme=a.config.themes.length>1?null:a.config.themes[0]),"undefined"!=typeof a.config.templates&&(a.config.svg.elements=a.config.templates.length>1?null:a.config.template[0](a)),a.size=a.config.sizes.length>1?null:a.config.sizes[0],a.$watch("theme",function(){a.$broadcast("changeTheme"),f()}),a.$watch("template",function(b){b&&(a.config.svg.elements=b.elements(a),a.$broadcast("changeTemplate"),f())}),a.$watch("size",function(){a.$broadcast("changeSize"),f()}),a.resetSvg=function(){a.config.svg=a.defaultConfig.svg,f()},a.onDrop=function(a,b){var c=h(b);g(c.files[0],this.element)},a.fileChanged=function(a){g(angular.element(a)[0].files[0],angular.element(a).data("key"))},a.removeImage=function(b){a.config.svg.elements[b].src=""},a.downloadSvg=function(){c(document.getElementById("snap-svg"),"image.png",{scale:a.config.output.scale})}}]),angular.module("cardkitApp").controller("LoginCtrl",["$rootScope","$scope","$location","googleAuth",function(a,b,c,d){var e="991906554139-pn6gc09ch9jb2iric7tms4jmg7gp8lur.apps.googleusercontent.com",f="evtGoogleLogin";b.trouble=function(a){var b=document.querySelector(".trouble__help");a=a||"100px"==b.style.height?0:"100px",b.style.height=a},b.$on(f,function(b,d){a.googleInfo=d,c.path("/home")}),d.init({client_id:e,evtName:f})}]),angular.module("cardkitApp").service("snapSVG",["$window",function(a){return a.Snap}]),angular.module("cardkitApp").directive("snapSvg",["snapSVG",function(a){return{template:'<svg id="snap-svg"></svg>',restrict:"E",scope:{svgConfig:"=",svgTheme:"="},link:function(b,c){function d(a){var b={};for(var c in a)switch(typeof a[c]){case"function":b[c]=a[c]();break;default:b[c]=a[c]}return b}function e(a,b){for(var c="",d=document.styleSheets,e=0;e<d.length;e++)if(f(d[e].href))console.warn("Cannot include styles from other hosts: "+d[e].href);else{var g=d[e].cssRules;if(null!==g)for(var h=0;h<g.length;h++){var i=g[h];if("undefined"!=typeof i.style)try{var j=a.querySelectorAll(i.selectorText);if(j.length>0){var k=b?b(i.selectorText):i.selectorText;c+=k+" { "+i.style.cssText+" }\n"}else i.cssText.match(/^@font-face/)&&(c+=i.cssText+"\n")}catch(l){}}}return c}function f(a){return a&&0===a.lastIndexOf("http",0)&&-1===a.lastIndexOf(window.location.host)}function g(){p=d(m.canvas),q=t.rect(0,0,p.width,p.height,0,0).attr(p),p.draggable===!0&&q.altDrag(),r=[]}function h(){u={Sepia:t.paper.filter(a.filter.sepia(1)).attr({width:4*p.width+"px",height:4*p.height+"px"}),Grayscale:t.paper.filter(a.filter.grayscale(1)).attr({width:4*p.width+"px",height:4*p.height+"px"}),Saturate:t.paper.filter(a.filter.saturate(.5)).attr({width:4*p.width+"px",height:4*p.height+"px"}),Invert:t.paper.filter(a.filter.invert(1)).attr({width:4*p.width+"px",height:4*p.height+"px"}),Blur:t.paper.filter(a.filter.blur(4,4)).attr({width:4*p.width+"px",height:4*p.height+"px"})}}function i(a){var b;switch(a=d(a),a.type){case"text":b=t.text(a.x,a.y);break;case"image":b=t.image(a.src,a.x,a.y,a.width,a.height);break;case"rect":b=t.rect(a.x,a.y,a.width,a.height,0,0);break;case"circle":break;case"group":var c;b="",angular.forEach(a.elements,function(a,d){c=i(a),j(c,a),0===d?b=t.group(c):b.group(c)});break;default:return!1}return"undefined"!=typeof a.defaultFilter&&(""!==a.defaultFilter?b.attr({filter:u[a.defaultFilter]}):b.attr({filter:""})),b}function j(a,b){var c=d(b),e=c;return delete e.$$hashKey,"text"===e.type&&(e.text=e.text.split("\n")),e.textTransform&&(a.node.style.textTransform=e.textTransform),a.attr(e),"text"===e.type&&a.selectAll("tspan").forEach(function(a,b){a.attr({x:e.x,y:e.y+e.fontSize*b})}),a}function k(){var a=d(b.svgConfig.canvas);t.attr({viewBox:"0, 0, "+a.width+", "+a.height,"data-width":a.width,"data-height":a.height}),j(q,b.svgConfig.canvas);var c;angular.forEach(b.svgConfig.elements,function(a,d){if("undefined"!=typeof r[d]){if(s=r[d],"image"===s.type){c=s.matrix;var e=i(b.svgConfig.elements[d]);if(e===!1)return;s.after(e),e.transform(c),s.remove(),s=e,r[d]=s}if("g"===s.type){if(c=s.matrix,s.remove(),s=i(b.svgConfig.elements[d]),s===!1)return;s.transform(c),r[d]=s}}else{if(s=i(a),s===!1)return;r.push(s)}var f=a;delete f.$$hashKey,j(s,a),a.draggable===!0&&(s.undrag(),s.altDrag())})}function l(){var a=t.selectAll("*");angular.forEach(a,function(a){a.transform("")})}var m=angular.fromJson(b.svgConfig);a.plugin(function(a,c){c.prototype.altDrag=function(){return this.drag(e,d,f),this};var d=function(){this.data("ot",this.transform().local)},e=function(a,c){var d,e,f=this.transform().diffMatrix.invert();f.e=f.f=0,d=f.x(a,c),e=f.y(a,c);var g=b.svgConfig.canvas.gridSize();d=Math.round(d/g)*g,e=Math.round(e/g)*g,this.transform(this.data("ot")+"t"+[d,e])},f=function(){}});var n,o,p,q,r,s,t,u;t=a(c[0].children[0]),t.attr({height:"100%",width:"100%"}),n=t.paper.el("style",{type:"text/css"}),o=e(t.node),n.node.innerHTML=o,n.toDefs(),g(),h(),b.$watch("svgConfig",k,!0),b.$on("changeTheme",k),b.$on("changeTemplate",function(){g(),k()}),b.$on("changeSize",k),b.$on("changeSize",h),b.$on("resetSvg",l)}}}]),angular.module("cardkitApp").service("saveSvgAsPng",["$window",function(a){return a.saveSvgAsPng}]),angular.module("cardkitApp").directive("fixedScroll",["$window",function(a){return function(b,c){var d=c.offset().top-20;angular.element(a).bind("scroll",function(){angular.element(a).scrollTop()>=d?c.addClass("fixed"):c.removeClass("fixed")})}}]),angular.module("cardkitApp").provider("themeConfigProvider",function(){return{$get:["$http","$q",function(a,b){var c=a.get("themes.config.json")["catch"](function(a){return 404===a.status?[]:b.reject(a)});return b.all([c]).then(function(a){return a[0].data})}]}}),angular.module("cardkitApp").provider("templateConfigProvider",function(){return{$get:function(){return[{name:"Quote",elements:function(a){return[{name:"Background Colour",type:"rect",controlsOrder:7,height:function(){return a.size.height},width:function(){return a.size.width},fill:function(){return a.theme.background},editable:{fill:"picker"}},{name:"Image",type:"image",width:600,controlsOrder:4,height:function(){return this.width},src:"",opacity:1,x:"0%",y:"0%",preserveAspectRatio:"xMinYMin meet",draggable:!0,defaultFilter:"",editable:{src:!0,width:!0,opacity:!0,filters:["Sepia","Grayscale","Saturate","Invert","Blur"]}},{name:"Cross Reference Background",type:"rect",controlsOrder:5,height:function(){return 3*a.size.gridSize},width:function(){return a.size.width},y:function(){return a.size.height-this.height()},fill:function(){return a.theme.xrefBackground},editable:{fill:"picker"}},{name:"Logo",type:"image",controlsOrder:6,width:function(){return 2*a.size.gridSize},height:function(){return 2*a.size.gridSize},src:function(){return a.theme.logoSrc},opacity:1,x:function(){return a.size.width-3*a.size.gridSize},y:function(){var b=a.size.gridSize/2;return a.size.height-(this.height()+b)},preserveAspectRatio:"xMinYMin meet",editable:{src:!0,width:!0,opacity:!0},draggable:!1},{name:"Cross Reference Text",type:"text",text:"Read more at: Insert name here",controlsOrder:3,fill:function(){return a.theme.xref},fontSize:22,fontFamily:function(){return a.theme.xrefFont},textAnchor:"start",x:function(){return a.size.gridSize},y:function(){return a.size.height-a.size.gridSize},fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (16px)":16,"Large (18px)":18},fill:"picker",textAnchor:!0}},{name:"Credit",type:"text",text:"Credit: Insert name here",controlsOrder:2,fill:function(){return a.theme.quote},fontSize:18,fontFamily:function(){return a.theme.creditFont},textAnchor:"start",textTransform:"uppercase",x:15,y:250,fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (16px)":16,"Large (18px)":18},fill:"picker",textAnchor:!0}},{name:"Headline",type:"text",text:"Edit this text, and drag it around.\n\nYou can upload your own background image,\nlogo, and change the colour of the text too.",fill:function(){return a.theme.quote},controlsOrder:1,fontSize:32,fontFamily:function(){return a.theme.headlineFont},textAnchor:"start",x:15,y:45,fontWeight:600,draggable:!0,editable:{text:!0,fill:"picker",textAnchor:!0,fontSize:{"Small (26px)":26,"Medium (32px)":32,"Large (40px)":40,"X-Large (50px)":50}}}]}},{name:"Quote Big",elements:function(a){return[{name:"Background Colour",type:"rect",controlsOrder:7,height:function(){return a.size.height},width:function(){return a.size.width},fill:function(){return a.theme.background}},{name:"Cross Reference Background",type:"rect",controlsOrder:5,height:function(){return 3*a.size.gridSize},width:function(){return a.size.width},y:function(){return a.size.height-this.height()},fill:function(){return a.theme.xrefBackground}},{name:"Logo",type:"image",controlsOrder:6,width:function(){return 2*a.size.gridSize},height:function(){return 2*a.size.gridSize},src:function(){return a.theme.logoSrc},opacity:1,x:function(){return a.size.width-3*a.size.gridSize},y:function(){var b=a.size.gridSize/2;return a.size.height-(this.height()+b)},preserveAspectRatio:"xMinYMin meet",draggable:!1},{name:"Cross Reference Text",type:"text",text:"Read more at: Insert name here",controlsOrder:3,fill:function(){return a.theme.xref},fontSize:22,fontFamily:function(){return a.theme.xrefFont},textAnchor:"start",x:function(){return a.size.gridSize},y:function(){return a.size.height-a.size.gridSize},fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (16px)":16,"Large (18px)":18},fill:"picker",textAnchor:!0}},{name:"Credit",type:"text",text:"Ogden Nash",controlsOrder:2,fill:function(){return a.theme.quote},fontSize:18,fontFamily:function(){return a.theme.creditFont},textAnchor:"start",textTransform:"uppercase",x:function(){return a.size.gridSize},y:235,fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (16px)":16,"Large (18px)":18}}},{name:"Quote",type:"text",text:"‘Bankers are just like\neverybody else.\nExcept richer’",fill:function(){return a.theme.quote},controlsOrder:1,fontSize:60,fontFamily:function(){return a.theme.headlineFont},textAnchor:"start",x:function(){return a.size.gridSize},y:function(){return 4*a.size.gridSize},fontWeight:600,draggable:!0,editable:{text:!0,fill:"picker",textAnchor:!0,fontSize:{"Small (50px)":50,"Medium (60px)":60,"Large (72px)":72}}}]}},{name:"Quote With Headshot",elements:function(a){return[{name:"Background Colour",type:"rect",controlsOrder:7,height:function(){return a.size.height},width:function(){return a.size.width},fill:function(){return a.theme.background}},{name:"Image",type:"image",width:300,controlsOrder:4,height:function(){return this.width},src:function(){return a.theme.headshotSrc||""},opacity:1,x:function(){return a.size.width-(this.width+a.size.gridSize)},y:function(){return a.size.gridSize},preserveAspectRatio:"xMinYMin meet",draggable:!0,defaultFilter:"",editable:{src:!0,width:!0,opacity:!0,filters:["Sepia","Grayscale","Saturate","Invert","Blur"]}},{name:"Cross Reference Background",type:"rect",controlsOrder:5,height:function(){return 3*a.size.gridSize},width:function(){return a.size.width},y:function(){return a.size.height-this.height()},fill:function(){return a.theme.xrefBackground}},{name:"Logo",type:"image",controlsOrder:6,width:function(){return 2*a.size.gridSize},height:function(){return 2*a.size.gridSize},src:function(){return a.theme.logoSrc},opacity:1,x:function(){return a.size.width-3*a.size.gridSize},y:function(){var b=a.size.gridSize/2;return a.size.height-(this.height()+b)},preserveAspectRatio:"xMinYMin meet",draggable:!1},{name:"Cross Reference Text",type:"text",text:"Read more at: Insert name here",controlsOrder:3,fill:function(){return a.theme.xref},fontSize:22,fontFamily:function(){return a.theme.xrefFont},textAnchor:"start",x:function(){return a.size.gridSize},y:function(){return a.size.height-a.size.gridSize},fontWeight:500,draggable:!1,editable:{text:!0}},{name:"Credit",type:"text",text:"Janan Ganesh on why\nLabour is Terrible",controlsOrder:2,fill:function(){return a.theme.quote},fontSize:18,fontFamily:function(){return a.theme.creditFont},textAnchor:"start",textTransform:"uppercase",x:15,y:235,fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (16px)":16,"Large (18px)":18},fill:"picker",textAnchor:!0}},{name:"Headline",type:"text",text:"Friendship is constant\nin all other things save in\nthe office and affairs of\nlove: Therefore, all hearts\nin love use their own",fill:function(){return a.theme.quote},controlsOrder:1,fontSize:32,fontFamily:function(){return a.theme.headlineFont},textAnchor:"start",x:15,y:45,fontWeight:600,draggable:!0,editable:{text:!0,fill:"picker",textAnchor:!0,fontSize:{"Small (26px)":26,"Medium (32px)":32,"Large (40px)":40,"X-Large (50px)":50}}}]}},{name:"Big Number",elements:function(a){return[{name:"Background Colour",type:"rect",controlsOrder:7,height:function(){return a.size.height},width:function(){return a.size.width},fill:function(){return a.theme.background}},{name:"Cross Reference Background",type:"rect",controlsOrder:5,height:function(){return 3*a.size.gridSize},width:function(){return a.size.width},y:function(){return a.size.height-this.height()},fill:function(){return a.theme.xrefBackground}},{name:"Logo",type:"image",controlsOrder:6,width:function(){return 2*a.size.gridSize},height:function(){return 2*a.size.gridSize},src:function(){return a.theme.logoSrc},opacity:1,x:function(){return a.size.width-3*a.size.gridSize},y:function(){var b=a.size.gridSize/2;return a.size.height-(this.height()+b)},preserveAspectRatio:"xMinYMin meet",draggable:!1},{name:"Cross Reference Text",type:"text",text:"Read more at: Insert name here",controlsOrder:3,fill:function(){return a.theme.xref},fontSize:22,fontFamily:function(){return a.theme.xrefFont},textAnchor:"start",x:function(){return a.size.gridSize},y:function(){return a.size.height-a.size.gridSize},fontWeight:500,draggable:!1,editable:{text:!0,fontSize:{"Small (16px)":16,"Large (18px)":18}}},{name:"Explanatory Text",type:"text",text:"Explanatory text goes here like this and\nlike this which is 32/34, over two or three\nlines",controlsOrder:2,fill:function(){return a.theme.quote},fontSize:32,fontFamily:function(){return a.theme.creditFont},textAnchor:"start",x:15,y:170,fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (32px)":32,"Large (34px)":34},textAnchor:!0}},{name:"Big Number",type:"text",text:"100px",fill:function(){return a.theme.highlightColor},controlsOrder:1,fontSize:100,fontFamily:function(){return a.theme.headlineFont},textAnchor:"start",x:15,y:100,fontWeight:600,draggable:!0,editable:{text:!0,fill:"picker",textAnchor:!0}}]}},{name:"Graph with Explanation",elements:function(a){return[{name:"Background Colour",type:"rect",controlsOrder:7,height:function(){return a.size.height},width:function(){return a.size.width},fill:function(){return a.theme.background}},{name:"Side Explanation Background",type:"rect",controlsOrder:5,height:function(){return a.size.height},width:function(){return.3*a.size.width},y:"0%",x:function(){return a.size.width-this.width()},fill:function(){return a.theme.xrefBackground}},{name:"Logo",type:"image",controlsOrder:6,width:function(){return 2*a.size.gridSize},height:function(){return 2*a.size.gridSize},src:function(){return a.theme.logoSrc},opacity:1,x:function(){return a.size.width-3*a.size.gridSize},y:function(){var b=a.size.gridSize;return a.size.height-(this.height()+b)},preserveAspectRatio:"xMinYMin meet",draggable:!1},{name:"Ref Text",type:"text",text:"FT.COM/\nCOMPANIES",controlsOrder:3,fill:function(){return a.theme.xref},fontSize:18,fontFamily:function(){return a.theme.xrefFont},textAnchor:"start",x:function(){var b=a.size.width;return b-.3*b+a.size.gridSize},y:function(){return a.size.height-2*a.size.gridSize},fontWeight:500,draggable:!1},{name:"Explanatory Text",type:"text",text:"This is 180px\nwide explanation\ntext for the chart.\nShould run short\nbut max depth on\nthis grid for text\nis 225px box, with\n15px padding",controlsOrder:2,fill:function(){return a.theme.xref},fontSize:24,fontFamily:function(){return a.theme.creditFont},textAnchor:"start",width:function(){return.3*a.size.width},x:function(){var b=a.size.width;return b-.3*b+a.size.gridSize},y:function(){return 2*a.size.gridSize},fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (32px)":32,"Large (34px)":34},textAnchor:!0}},{name:"Graph",type:"image",width:function(){return.6*a.size.width},controlsOrder:4,height:function(){var b;return b="string"==typeof this.width?+this.width:this.width(),b>a.size.height-2*a.size.gridSize&&(b=a.size.height-2*a.size.gridSize),b},src:function(){return a.theme.graphSrc},opacity:1,x:function(){return a.size.gridSize},y:function(){return a.size.gridSize},preserveAspectRatio:"xMinYMin meet",draggable:!0,defaultFilter:"",editable:{src:!0,width:!0,opacity:!0,filters:["Sepia","Grayscale","Saturate","Invert","Blur"]}}]}},{name:"Graph with Explanation (narrow)",elements:function(a){return[{name:"Background Colour",type:"rect",controlsOrder:7,height:function(){return a.size.height},width:function(){return a.size.width},fill:function(){return a.theme.background}},{name:"Side Explanation Background",type:"rect",controlsOrder:5,height:function(){return a.size.height},width:function(){return.25*a.size.width},y:"0%",x:function(){return a.size.width-this.width()},fill:function(){return a.theme.xrefBackground}},{name:"Logo",type:"image",controlsOrder:6,width:function(){return 2*a.size.gridSize},height:function(){return 2*a.size.gridSize},src:function(){return a.theme.logoSrc},opacity:1,x:function(){return a.size.width-3*a.size.gridSize},y:function(){var b=a.size.gridSize;return a.size.height-(this.height()+b)},preserveAspectRatio:"xMinYMin meet",draggable:!1},{name:"Ref Text",type:"text",text:"FT.COM/\nCOMPANIES",controlsOrder:3,fill:function(){return a.theme.xref},fontSize:18,fontFamily:function(){return a.theme.xrefFont},textAnchor:"start",x:function(){var b=a.size.width;return b-.25*b+a.size.gridSize},y:function(){return a.size.height-2*a.size.gridSize},fontWeight:500,draggable:!1},{name:"Explanatory Text",type:"text",text:"This is\nexplanation text\nwhich goes with\nthe chart. Should\nrun short if\npossible. Slightly\nnarrower than\nstandard RH box",controlsOrder:2,fill:function(){return a.theme.xref},fontSize:18,fontFamily:function(){return a.theme.creditFont},textAnchor:"start",width:function(){return.25*a.size.width},x:function(){var b=a.size.width;return b-.25*b+a.size.gridSize},y:function(){return 2*a.size.gridSize},fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (18px)":18,"Large (22px)":22},textAnchor:!0}},{name:"Graph",type:"image",width:function(){return.7*a.size.width},controlsOrder:4,height:function(){var b;return b="string"==typeof this.width?+this.width:this.width(),b>a.size.height-2*a.size.gridSize&&(b=a.size.height-2*a.size.gridSize),b},src:function(){return a.theme.graphWideSrc},opacity:1,x:function(){return a.size.gridSize},y:function(){return a.size.gridSize},preserveAspectRatio:"xMinYMin meet",draggable:!0,defaultFilter:"",editable:{src:!0,width:!0,opacity:!0,filters:["Sepia","Grayscale","Saturate","Invert","Blur"]}}]}},{name:"Promo A",elements:function(a){return[{name:"Background Colour",type:"rect",controlsOrder:7,height:function(){return a.size.height},width:function(){return a.size.width},fill:function(){return a.theme.background}},{name:"Promo Image",type:"image",width:function(){return a.size.width},controlsOrder:4,height:function(){var a;return a="string"==typeof this.width?+this.width:this.width()},src:function(){return a.theme.promoSrc},opacity:1,x:"0%",y:"0%",preserveAspectRatio:"xMinYMin meet",draggable:!0,defaultFilter:"",editable:{src:!0,width:!0,opacity:!0,filters:["Sepia","Grayscale","Saturate","Invert","Blur"]}},{name:"Cross Reference Background",type:"rect",controlsOrder:5,height:function(){return 3*a.size.gridSize},width:function(){return a.size.width},y:function(){return a.size.height-this.height()},fill:function(){return a.theme.xrefBackground}},{name:"Logo",type:"image",controlsOrder:6,width:function(){return 2*a.size.gridSize},height:function(){return 2*a.size.gridSize},src:function(){return a.theme.logoSrc},opacity:1,x:function(){return a.size.width-3*a.size.gridSize},y:function(){var b=a.size.gridSize/2;return a.size.height-(this.height()+b)},preserveAspectRatio:"xMinYMin meet",draggable:!1},{name:"Cross Reference Text",type:"text",text:"Promo A please go to ft.com/something-interesting",controlsOrder:3,fill:function(){return a.theme.xref},fontSize:22,fontFamily:function(){return a.theme.xrefFont},textAnchor:"start",x:function(){return a.size.gridSize},y:function(){return a.size.height-a.size.gridSize},fontWeight:500,draggable:!1,editable:{text:!0,fontSize:{"Small (16px)":16,"Large (18px)":18}}}]}},{name:"Promo B",elements:function(a){return[{name:"Background Colour",type:"rect",controlsOrder:7,height:function(){return a.size.height},width:function(){return a.size.width},fill:function(){return a.theme.background}},{name:"Promo Image",type:"image",width:function(){return.75*a.size.width},controlsOrder:4,height:function(){var a;return a="string"==typeof this.width?+this.width:this.width()},src:function(){return a.theme.promoSrc},opacity:1,x:"0%",y:"0%",preserveAspectRatio:"xMinYMin meet",draggable:!0,defaultFilter:"",editable:{src:!0,width:!0,opacity:!0,filters:["Sepia","Grayscale","Saturate","Invert","Blur"]}},{name:"Side Explanation Background",type:"rect",controlsOrder:5,height:function(){return a.size.height},width:function(){return.25*a.size.width},y:"0%",x:function(){return a.size.width-this.width()},fill:function(){return a.theme.xrefBackground}},{name:"Logo",type:"image",controlsOrder:6,width:function(){return 2*a.size.gridSize},height:function(){return 2*a.size.gridSize},src:function(){return a.theme.logoSrc},opacity:1,x:function(){return a.size.width-3*a.size.gridSize},y:function(){var b=a.size.gridSize;return a.size.height-(this.height()+b)},preserveAspectRatio:"xMinYMin meet",draggable:!1},{name:"Explanatory Text",type:"text",text:"Promo B\nplease go\nto ft.com/\nsomething-\ninteresting",controlsOrder:2,fill:function(){return a.theme.xref},fontSize:24,fontFamily:function(){return a.theme.creditFont},textAnchor:"start",width:function(){return.25*a.size.width},x:function(){var b=a.size.width;return b-.25*b+a.size.gridSize},y:function(){return 2*a.size.gridSize},fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (22px)":22,"Large (24px)":24},textAnchor:!0}}]}},{name:"Breaking News",elements:function(a){return[{name:"Background Colour",type:"rect",controlsOrder:7,height:function(){return a.size.height},width:function(){return a.size.width},fill:function(){return a.theme.background}},{name:"Header Background",type:"rect",controlsOrder:5,height:function(){return 3*a.size.gridSize},width:function(){return a.size.width},y:0,fill:function(){return a.theme.highlightColor}},{name:"Logo",type:"image",controlsOrder:6,width:function(){return 2*a.size.gridSize},height:function(){return 2*a.size.gridSize},src:function(){return a.theme.logoAltSrc},opacity:1,x:function(){return a.size.width-3*a.size.gridSize},y:function(){var b=a.size.gridSize;return a.size.height-(this.height()+b)},preserveAspectRatio:"xMinYMin meet",draggable:!1},{name:"Bookmark",type:"image",controlsOrder:6,width:function(){return a.size.gridSize},height:function(){return 2*a.size.gridSize},src:function(){return a.theme.bookmark},opacity:1,x:function(){return a.size.width-(this.width()+a.size.gridSize)},y:function(){return(3.5*a.size.gridSize-this.height())/2},preserveAspectRatio:"xMinYMin meet",draggable:!1},{name:"Header Text",type:"text",text:"Forex Scandal",textTransform:"uppercase",controlsOrder:3,fill:function(){return a.theme.xref},fontSize:22,fontFamily:function(){return a.theme.xrefFont},textAnchor:"start",x:function(){return a.size.gridSize},y:function(){return 2*a.size.gridSize},fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (18px)":18,"Large (22px)":22},fill:"picker",textAnchor:!0}},{name:"Credit",type:"text",text:"Name here in caps",controlsOrder:2,fill:function(){return a.theme.quote},fontSize:18,fontFamily:function(){return a.theme.creditFont},textAnchor:"start",textTransform:"uppercase",x:function(){return a.size.gridSize},y:235,fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (16px)":16,"Large (18px)":18}}},{name:"Read more",type:"text",text:"Read more about the case on ft.com/xxxxx",controlsOrder:2,fill:function(){return a.theme.highlightColor},fontSize:18,fontFamily:function(){return a.theme.creditFont},textAnchor:"start",textTransform:"uppercase",x:function(){return a.size.gridSize},y:285,fontWeight:500,draggable:!0,editable:{text:!0,fontSize:{"Small (16px)":16,"Large (18px)":18}}},{name:"Quote",type:"text",text:"‘This would be a breaking news\nquote which looks like this and\ngoes here with black FT square’",fill:function(){return a.theme.quote},controlsOrder:1,fontSize:44,fontFamily:function(){return a.theme.headlineFont},textAnchor:"start",x:function(){return a.size.gridSize},y:function(){return 6*a.size.gridSize},fontWeight:600,draggable:!0,editable:{text:!0,fontSize:{"Small (32px)":32,"Medium (44px)":44,"Large (50px)":50}}}]}}]}}}),angular.module("cardkitApp").directive("textEditor",function(){return{template:'<div><label>Text</label><textarea ng-model="element.text" class="form-control"></textarea></div>',restrict:"E",replace:!0,scope:{element:"="}}}),angular.module("cardkitApp").directive("fillEditor",function(){return{template:'<div><label>Fill Color</label><input colorpicker type="text" ng-model="element.fill" ng-if="field == \'picker\'" class="form-control" /><select ng-model="element.fill" ng-options="name for (name, value) in field" class="form-control" ng-if="field != \'picker\'"><option value="">-- Select a Fill Color --</option></select></div>',restrict:"E",scope:{field:"=",element:"="}}}),angular.module("cardkitApp").directive("fontsizeEditor",function(){return{template:'<div><label>Font Size</label><select ng-model="element.fontSize" ng-options="name for (name, value) in field" class="form-control"><option value="">-- Select a Font Size --</option></select></div>',restrict:"E",replace:!0,scope:{element:"=",field:"="}}}),angular.module("cardkitApp").directive("fontfamilyEditor",function(){return{template:'<div><label>Font Family</label><select ng-model="element.fontFamily" ng-options="name for (name, value) in field" class="form-control"><option value="">-- Select a Font Family --</option></select></div>',restrict:"E",replace:!0,scope:{element:"=",field:"="}}}),angular.module("cardkitApp").directive("imageEditor",function(){return{template:'<div><label>Image</label><div class="dropzone" drop="onDrop($data, $event, key)" drop-effect="copy" drop-accept="\'Files\'" drag-over-class="drag-over-accept"><div class="fileInputWrapper button"><span>or select an image</span><input onchange="angular.element(this).scope().$parent.fileChanged(this, event)" data-key="{{key}}" type="file" accept="image/*" /></div></div><button ng-show="config.elements[key].src !== \'\'" ng-click="removeImage(key)" class="button button-danger"><i class="fa fa-times"></i> Remove Image</button></div>',restrict:"E",scope:{key:"=",onDrop:"=",element:"=",removeImage:"="}}}),angular.module("cardkitApp").directive("sizeEditor",function(){return{template:'<div><label>Size</label><input type="range" min="10" max="1000" ng-model="element.width" /></div>',restrict:"E",replace:!0,scope:{element:"="}}}),angular.module("cardkitApp").directive("textanchorEditor",function(){return{template:'<div><label>Text Anchor</label><select ng-model="element.textAnchor" class="form-control"><option value="">-- Select a Text Anchor --</option><option value="start">Start</option><option value="middle">Middle</option><option value="end">End</option></select></div>',restrict:"E",replace:!0,scope:{element:"="}}}),angular.module("cardkitApp").directive("opacityEditor",function(){return{template:'<div><label>Opacity</label><input type="range" min="0" max="1" ng-model="element.opacity" step="0.05" /></div>',restrict:"E",replace:!0,scope:{element:"=element"}}}),angular.module("cardkitApp").directive("filterEditor",function(){return{template:'<div><label>Filter</label><select ng-model="element.defaultFilter" ng-options="filter for filter in filters" class="form-control"><option value="">No filter</option></select></div>',replace:!0,restrict:"E",scope:{element:"=",filters:"="}}});