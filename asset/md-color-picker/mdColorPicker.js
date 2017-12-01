/**
 * Created by neoan on 8/12/2016.
 * TinyColor + ColorPicker
 */
/*TinyColor v1.4.1
 // https://github.com/bgrins/TinyColor
 // 2016-07-07, Brian Grinstead, MIT License */
!function(a){function b(a,d){if(a=a?a:"",d=d||{},a instanceof b)return a;if(!(this instanceof b))return new b(a,d);var e=c(a);this._originalInput=a,this._r=e.r,this._g=e.g,this._b=e.b,this._a=e.a,this._roundA=P(100*this._a)/100,this._format=d.format||e.format,this._gradientType=d.gradientType,this._r<1&&(this._r=P(this._r)),this._g<1&&(this._g=P(this._g)),this._b<1&&(this._b=P(this._b)),this._ok=e.ok,this._tc_id=O++}function c(a){var b={r:0,g:0,b:0},c=1,e=null,g=null,i=null,j=!1,k=!1;return"string"==typeof a&&(a=K(a)),"object"==typeof a&&(J(a.r)&&J(a.g)&&J(a.b)?(b=d(a.r,a.g,a.b),j=!0,k="%"===String(a.r).substr(-1)?"prgb":"rgb"):J(a.h)&&J(a.s)&&J(a.v)?(e=G(a.s),g=G(a.v),b=h(a.h,e,g),j=!0,k="hsv"):J(a.h)&&J(a.s)&&J(a.l)&&(e=G(a.s),i=G(a.l),b=f(a.h,e,i),j=!0,k="hsl"),a.hasOwnProperty("a")&&(c=a.a)),c=z(c),{ok:j,format:a.format||k,r:Q(255,R(b.r,0)),g:Q(255,R(b.g,0)),b:Q(255,R(b.b,0)),a:c}}function d(a,b,c){return{r:255*A(a,255),g:255*A(b,255),b:255*A(c,255)}}function e(a,b,c){a=A(a,255),b=A(b,255),c=A(c,255);var d,e,f=R(a,b,c),g=Q(a,b,c),h=(f+g)/2;if(f==g)d=e=0;else{var i=f-g;switch(e=h>.5?i/(2-f-g):i/(f+g),f){case a:d=(b-c)/i+(c>b?6:0);break;case b:d=(c-a)/i+2;break;case c:d=(a-b)/i+4}d/=6}return{h:d,s:e,l:h}}function f(a,b,c){function d(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+6*(b-a)*(2/3-c):a}var e,f,g;if(a=A(a,360),b=A(b,100),c=A(c,100),0===b)e=f=g=c;else{var h=.5>c?c*(1+b):c+b-c*b,i=2*c-h;e=d(i,h,a+1/3),f=d(i,h,a),g=d(i,h,a-1/3)}return{r:255*e,g:255*f,b:255*g}}function g(a,b,c){a=A(a,255),b=A(b,255),c=A(c,255);var d,e,f=R(a,b,c),g=Q(a,b,c),h=f,i=f-g;if(e=0===f?0:i/f,f==g)d=0;else{switch(f){case a:d=(b-c)/i+(c>b?6:0);break;case b:d=(c-a)/i+2;break;case c:d=(a-b)/i+4}d/=6}return{h:d,s:e,v:h}}function h(b,c,d){b=6*A(b,360),c=A(c,100),d=A(d,100);var e=a.floor(b),f=b-e,g=d*(1-c),h=d*(1-f*c),i=d*(1-(1-f)*c),j=e%6,k=[d,h,g,g,i,d][j],l=[i,d,d,h,g,g][j],m=[g,g,i,d,d,h][j];return{r:255*k,g:255*l,b:255*m}}function i(a,b,c,d){var e=[F(P(a).toString(16)),F(P(b).toString(16)),F(P(c).toString(16))];return d&&e[0].charAt(0)==e[0].charAt(1)&&e[1].charAt(0)==e[1].charAt(1)&&e[2].charAt(0)==e[2].charAt(1)?e[0].charAt(0)+e[1].charAt(0)+e[2].charAt(0):e.join("")}function j(a,b,c,d,e){var f=[F(P(a).toString(16)),F(P(b).toString(16)),F(P(c).toString(16)),F(H(d))];return e&&f[0].charAt(0)==f[0].charAt(1)&&f[1].charAt(0)==f[1].charAt(1)&&f[2].charAt(0)==f[2].charAt(1)&&f[3].charAt(0)==f[3].charAt(1)?f[0].charAt(0)+f[1].charAt(0)+f[2].charAt(0)+f[3].charAt(0):f.join("")}function k(a,b,c,d){var e=[F(H(d)),F(P(a).toString(16)),F(P(b).toString(16)),F(P(c).toString(16))];return e.join("")}function l(a,c){c=0===c?0:c||10;var d=b(a).toHsl();return d.s-=c/100,d.s=B(d.s),b(d)}function m(a,c){c=0===c?0:c||10;var d=b(a).toHsl();return d.s+=c/100,d.s=B(d.s),b(d)}function n(a){return b(a).desaturate(100)}function o(a,c){c=0===c?0:c||10;var d=b(a).toHsl();return d.l+=c/100,d.l=B(d.l),b(d)}function p(a,c){c=0===c?0:c||10;var d=b(a).toRgb();return d.r=R(0,Q(255,d.r-P(255*-(c/100)))),d.g=R(0,Q(255,d.g-P(255*-(c/100)))),d.b=R(0,Q(255,d.b-P(255*-(c/100)))),b(d)}function q(a,c){c=0===c?0:c||10;var d=b(a).toHsl();return d.l-=c/100,d.l=B(d.l),b(d)}function r(a,c){var d=b(a).toHsl(),e=(d.h+c)%360;return d.h=0>e?360+e:e,b(d)}function s(a){var c=b(a).toHsl();return c.h=(c.h+180)%360,b(c)}function t(a){var c=b(a).toHsl(),d=c.h;return[b(a),b({h:(d+120)%360,s:c.s,l:c.l}),b({h:(d+240)%360,s:c.s,l:c.l})]}function u(a){var c=b(a).toHsl(),d=c.h;return[b(a),b({h:(d+90)%360,s:c.s,l:c.l}),b({h:(d+180)%360,s:c.s,l:c.l}),b({h:(d+270)%360,s:c.s,l:c.l})]}function v(a){var c=b(a).toHsl(),d=c.h;return[b(a),b({h:(d+72)%360,s:c.s,l:c.l}),b({h:(d+216)%360,s:c.s,l:c.l})]}function w(a,c,d){c=c||6,d=d||30;var e=b(a).toHsl(),f=360/d,g=[b(a)];for(e.h=(e.h-(f*c>>1)+720)%360;--c;)e.h=(e.h+f)%360,g.push(b(e));return g}function x(a,c){c=c||6;for(var d=b(a).toHsv(),e=d.h,f=d.s,g=d.v,h=[],i=1/c;c--;)h.push(b({h:e,s:f,v:g})),g=(g+i)%1;return h}function y(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[a[c]]=c);return b}function z(a){return a=parseFloat(a),(isNaN(a)||0>a||a>1)&&(a=1),a}function A(b,c){D(b)&&(b="100%");var d=E(b);return b=Q(c,R(0,parseFloat(b))),d&&(b=parseInt(b*c,10)/100),a.abs(b-c)<1e-6?1:b%c/parseFloat(c)}function B(a){return Q(1,R(0,a))}function C(a){return parseInt(a,16)}function D(a){return"string"==typeof a&&-1!=a.indexOf(".")&&1===parseFloat(a)}function E(a){return"string"==typeof a&&-1!=a.indexOf("%")}function F(a){return 1==a.length?"0"+a:""+a}function G(a){return 1>=a&&(a=100*a+"%"),a}function H(b){return a.round(255*parseFloat(b)).toString(16)}function I(a){return C(a)/255}function J(a){return!!V.CSS_UNIT.exec(a)}function K(a){a=a.replace(M,"").replace(N,"").toLowerCase();var b=!1;if(T[a])a=T[a],b=!0;else if("transparent"==a)return{r:0,g:0,b:0,a:0,format:"name"};var c;return(c=V.rgb.exec(a))?{r:c[1],g:c[2],b:c[3]}:(c=V.rgba.exec(a))?{r:c[1],g:c[2],b:c[3],a:c[4]}:(c=V.hsl.exec(a))?{h:c[1],s:c[2],l:c[3]}:(c=V.hsla.exec(a))?{h:c[1],s:c[2],l:c[3],a:c[4]}:(c=V.hsv.exec(a))?{h:c[1],s:c[2],v:c[3]}:(c=V.hsva.exec(a))?{h:c[1],s:c[2],v:c[3],a:c[4]}:(c=V.hex8.exec(a))?{r:C(c[1]),g:C(c[2]),b:C(c[3]),a:I(c[4]),format:b?"name":"hex8"}:(c=V.hex6.exec(a))?{r:C(c[1]),g:C(c[2]),b:C(c[3]),format:b?"name":"hex"}:(c=V.hex4.exec(a))?{r:C(c[1]+""+c[1]),g:C(c[2]+""+c[2]),b:C(c[3]+""+c[3]),a:I(c[4]+""+c[4]),format:b?"name":"hex8"}:(c=V.hex3.exec(a))?{r:C(c[1]+""+c[1]),g:C(c[2]+""+c[2]),b:C(c[3]+""+c[3]),format:b?"name":"hex"}:!1}function L(a){var b,c;return a=a||{level:"AA",size:"small"},b=(a.level||"AA").toUpperCase(),c=(a.size||"small").toLowerCase(),"AA"!==b&&"AAA"!==b&&(b="AA"),"small"!==c&&"large"!==c&&(c="small"),{level:b,size:c}}var M=/^\s+/,N=/\s+$/,O=0,P=a.round,Q=a.min,R=a.max,S=a.random;b.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var a=this.toRgb();return(299*a.r+587*a.g+114*a.b)/1e3},getLuminance:function(){var b,c,d,e,f,g,h=this.toRgb();return b=h.r/255,c=h.g/255,d=h.b/255,e=.03928>=b?b/12.92:a.pow((b+.055)/1.055,2.4),f=.03928>=c?c/12.92:a.pow((c+.055)/1.055,2.4),g=.03928>=d?d/12.92:a.pow((d+.055)/1.055,2.4),.2126*e+.7152*f+.0722*g},setAlpha:function(a){return this._a=z(a),this._roundA=P(100*this._a)/100,this},toHsv:function(){var a=g(this._r,this._g,this._b);return{h:360*a.h,s:a.s,v:a.v,a:this._a}},toHsvString:function(){var a=g(this._r,this._g,this._b),b=P(360*a.h),c=P(100*a.s),d=P(100*a.v);return 1==this._a?"hsv("+b+", "+c+"%, "+d+"%)":"hsva("+b+", "+c+"%, "+d+"%, "+this._roundA+")"},toHsl:function(){var a=e(this._r,this._g,this._b);return{h:360*a.h,s:a.s,l:a.l,a:this._a}},toHslString:function(){var a=e(this._r,this._g,this._b),b=P(360*a.h),c=P(100*a.s),d=P(100*a.l);return 1==this._a?"hsl("+b+", "+c+"%, "+d+"%)":"hsla("+b+", "+c+"%, "+d+"%, "+this._roundA+")"},toHex:function(a){return i(this._r,this._g,this._b,a)},toHexString:function(a){return"#"+this.toHex(a)},toHex8:function(a){return j(this._r,this._g,this._b,this._a,a)},toHex8String:function(a){return"#"+this.toHex8(a)},toRgb:function(){return{r:P(this._r),g:P(this._g),b:P(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+P(this._r)+", "+P(this._g)+", "+P(this._b)+")":"rgba("+P(this._r)+", "+P(this._g)+", "+P(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:P(100*A(this._r,255))+"%",g:P(100*A(this._g,255))+"%",b:P(100*A(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+P(100*A(this._r,255))+"%, "+P(100*A(this._g,255))+"%, "+P(100*A(this._b,255))+"%)":"rgba("+P(100*A(this._r,255))+"%, "+P(100*A(this._g,255))+"%, "+P(100*A(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":this._a<1?!1:U[i(this._r,this._g,this._b,!0)]||!1},toFilter:function(a){var c="#"+k(this._r,this._g,this._b,this._a),d=c,e=this._gradientType?"GradientType = 1, ":"";if(a){var f=b(a);d="#"+k(f._r,f._g,f._b,f._a)}return"progid:DXImageTransform.Microsoft.gradient("+e+"startColorstr="+c+",endColorstr="+d+")"},toString:function(a){var b=!!a;a=a||this._format;var c=!1,d=this._a<1&&this._a>=0,e=!b&&d&&("hex"===a||"hex6"===a||"hex3"===a||"hex4"===a||"hex8"===a||"name"===a);return e?"name"===a&&0===this._a?this.toName():this.toRgbString():("rgb"===a&&(c=this.toRgbString()),"prgb"===a&&(c=this.toPercentageRgbString()),("hex"===a||"hex6"===a)&&(c=this.toHexString()),"hex3"===a&&(c=this.toHexString(!0)),"hex4"===a&&(c=this.toHex8String(!0)),"hex8"===a&&(c=this.toHex8String()),"name"===a&&(c=this.toName()),"hsl"===a&&(c=this.toHslString()),"hsv"===a&&(c=this.toHsvString()),c||this.toHexString())},clone:function(){return b(this.toString())},_applyModification:function(a,b){var c=a.apply(null,[this].concat([].slice.call(b)));return this._r=c._r,this._g=c._g,this._b=c._b,this.setAlpha(c._a),this},lighten:function(){return this._applyModification(o,arguments)},brighten:function(){return this._applyModification(p,arguments)},darken:function(){return this._applyModification(q,arguments)},desaturate:function(){return this._applyModification(l,arguments)},saturate:function(){return this._applyModification(m,arguments)},greyscale:function(){return this._applyModification(n,arguments)},spin:function(){return this._applyModification(r,arguments)},_applyCombination:function(a,b){return a.apply(null,[this].concat([].slice.call(b)))},analogous:function(){return this._applyCombination(w,arguments)},complement:function(){return this._applyCombination(s,arguments)},monochromatic:function(){return this._applyCombination(x,arguments)},splitcomplement:function(){return this._applyCombination(v,arguments)},triad:function(){return this._applyCombination(t,arguments)},tetrad:function(){return this._applyCombination(u,arguments)}},b.fromRatio=function(a,c){if("object"==typeof a){var d={};for(var e in a)a.hasOwnProperty(e)&&(d[e]="a"===e?a[e]:G(a[e]));a=d}return b(a,c)},b.equals=function(a,c){return a&&c?b(a).toRgbString()==b(c).toRgbString():!1},b.random=function(){return b.fromRatio({r:S(),g:S(),b:S()})},b.mix=function(a,c,d){d=0===d?0:d||50;var e=b(a).toRgb(),f=b(c).toRgb(),g=d/100,h={r:(f.r-e.r)*g+e.r,g:(f.g-e.g)*g+e.g,b:(f.b-e.b)*g+e.b,a:(f.a-e.a)*g+e.a};return b(h)},b.readability=function(c,d){var e=b(c),f=b(d);return(a.max(e.getLuminance(),f.getLuminance())+.05)/(a.min(e.getLuminance(),f.getLuminance())+.05)},b.isReadable=function(a,c,d){var e,f,g=b.readability(a,c);switch(f=!1,e=L(d),e.level+e.size){case"AAsmall":case"AAAlarge":f=g>=4.5;break;case"AAlarge":f=g>=3;break;case"AAAsmall":f=g>=7}return f},b.mostReadable=function(a,c,d){var e,f,g,h,i=null,j=0;d=d||{},f=d.includeFallbackColors,g=d.level,h=d.size;for(var k=0;k<c.length;k++)e=b.readability(a,c[k]),e>j&&(j=e,i=b(c[k]));return b.isReadable(a,i,{level:g,size:h})||!f?i:(d.includeFallbackColors=!1,b.mostReadable(a,["#fff","#000"],d))};var T=b.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},U=b.hexNames=y(T),V=function(){var a="[-\\+]?\\d+%?",b="[-\\+]?\\d*\\.\\d+%?",c="(?:"+b+")|(?:"+a+")",d="[\\s|\\(]+("+c+")[,|\\s]+("+c+")[,|\\s]+("+c+")\\s*\\)?",e="[\\s|\\(]+("+c+")[,|\\s]+("+c+")[,|\\s]+("+c+")[,|\\s]+("+c+")\\s*\\)?";return{CSS_UNIT:new RegExp(c),rgb:new RegExp("rgb"+d),rgba:new RegExp("rgba"+e),hsl:new RegExp("hsl"+d),hsla:new RegExp("hsla"+e),hsv:new RegExp("hsv"+d),hsva:new RegExp("hsva"+e),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();"undefined"!=typeof module&&module.exports?module.exports=b:"function"==typeof define&&define.amd?define(function(){return b}):window.tinycolor=b}(Math);

/**
 * md-color-picker - Angular-Material inspired color picker.
 * @version v0.2.6
 * @link https://github.com/brianpkelley/md-color-picker
 * @license MIT
 */
(function(angular, window, tinycolor) {

    (function( window, angular, undefined ) {
        'use strict';

        var dateClick;


        var canvasTypes = {
            hue: {
                getColorByPoint: function( x, y ) {
                    var imageData = this.getImageData( x, y );
                    this.setMarkerCenter( y );

                    var hsl = new tinycolor( {r: imageData[0], g: imageData[1], b: imageData[2] } );
                    return hsl.toHsl().h;
                },
                draw: function()  {
                    this.$element.css({'height': this.height + 'px'});

                    this.canvas.height = this.height;
                    this.canvas.width = this.height;

                    var hueGrd = this.context.createLinearGradient(90, 0.000, 90, this.height);

                    hueGrd.addColorStop(0.01,	'rgba(255, 0, 0, 1.000)');
                    hueGrd.addColorStop(0.167, 	'rgba(255, 0, 255, 1.000)');
                    hueGrd.addColorStop(0.333, 	'rgba(0, 0, 255, 1.000)');
                    hueGrd.addColorStop(0.500, 	'rgba(0, 255, 255, 1.000)');
                    hueGrd.addColorStop(0.666, 	'rgba(0, 255, 0, 1.000)');
                    hueGrd.addColorStop(0.828, 	'rgba(255, 255, 0, 1.000)');
                    hueGrd.addColorStop(0.999, 	'rgba(255, 0, 0, 1.000)');

                    this.context.fillStyle = hueGrd;
                    this.context.fillRect( 0, 0, this.canvas.width, this.height );
                }
            },
            alpha: {
                getColorByPoint: function( x, y ) {
                    var imageData = this.getImageData( x, y );
                    this.setMarkerCenter( y );

                    return imageData[3] / 255;
                },
                draw: function ()  {
                    this.$element.css({'height': this.height + 'px'});

                    this.canvas.height = this.height;
                    this.canvas.width = this.height;

                    var hueGrd = this.context.createLinearGradient(90, 0.000, 90, this.height);

                    hueGrd.addColorStop(0.01,	'rgba(' + this.currentColor.r + ',' + this.currentColor.g + ',' + this.currentColor.b + ', 1.000)');
                    hueGrd.addColorStop(0.99,	'rgba(' + this.currentColor.r + ',' + this.currentColor.g + ',' + this.currentColor.b + ', 0.000)');

                    this.context.fillStyle = hueGrd;
                    this.context.fillRect( -1, -1, this.canvas.width+2, this.height+2 );
                },
                extra: function() {
                    this.$scope.$on('mdColorPicker:spectrumColorChange', angular.bind( this, function( e, args ) {
                        this.currentColor = args.color;
                        this.draw();
                    }));
                }
            },
            spectrum: {
                getColorByPoint: function( x, y ) {

                    var imageData = this.getImageData( x, y );
                    this.setMarkerCenter(x,y);

                    return {
                        r: imageData[0],
                        g: imageData[1],
                        b: imageData[2]
                    };
                },
                draw: function() {
                    this.canvas.height = this.height;
                    this.canvas.width = this.height;
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

                    var whiteGrd = this.context.createLinearGradient(0, 0, this.canvas.width, 0);


                    whiteGrd.addColorStop(0.01, 'rgba(255, 255, 255, 1.000)');
                    whiteGrd.addColorStop(0.99, 'rgba(255, 255, 255, 0.000)');

                    var blackGrd = this.context.createLinearGradient(0, 0, 0, this.canvas.height);


                    blackGrd.addColorStop(0.01, 'rgba(0, 0, 0, 0.000)');
                    blackGrd.addColorStop(0.99, 'rgba(0, 0, 0, 1.000)');

                    this.context.fillStyle = 'hsl( ' + this.currentHue + ', 100%, 50%)';
                    this.context.fillRect( 0, 0, this.canvas.width, this.canvas.height );

                    this.context.fillStyle = whiteGrd;
                    this.context.fillRect( -1, -1, this.canvas.width+2, this.canvas.height+2 );

                    this.context.fillStyle = blackGrd;
                    this.context.fillRect( -1, -1, this.canvas.width+2, this.canvas.height+2 );
                },
                extra: function() {
                    this.$scope.$on('mdColorPicker:spectrumHueChange', angular.bind( this, function( e, args ) {
                        this.currentHue = args.hue;
                        this.draw();
                        var markerPos = this.getMarkerCenter();
                        var color = this.getColorByPoint( markerPos.x, markerPos.y );
                        this.setColor( color );

                    }));
                }
            }

        };

        function GradientCanvasFactory( ) {

            return function gradientCanvas( type ) {
                var canvas = new GradientCanvas( type, type != 'spectrum' );
                canvas = angular.merge( canvas, canvasTypes[type] );

                return {
                    template: '<canvas width="100%" height="100%"></canvas><div class="md-color-picker-marker"></div>',
                    link: canvas.get,
                    controller: function() {
                        console.log( "mdColorPickerAlpha Controller", Date.now() - dateClick );
                    }
                };
            }

        }

        function GradientCanvas( type, restrictX ) {

            this.type = type;
            this.restrictX = restrictX;
            this.offset = {
                x: null,
                y: null
            };
            this.height = 255;

            this.$scope = null;
            this.$element = null;

            this.get = angular.bind(this, function( $temp_scope, $temp_element, $temp_attrs ) {
                /*//////////////////////////
                // Variables
                ////////////////////////////*/

                this.$scope = $temp_scope;
                this.$element = $temp_element;


                this.canvas = this.$element.children()[0];
                this.marker = this.$element.children()[1];
                this.context = this.canvas.getContext('2d');
                this.currentColor = this.$scope.color.toRgb();
                this.currentHue = this.$scope.color.toHsv().h;
                /*///////////////////////////
                // Watchers, Observes, Events
                ////////////////////////////

                //$scope.$watch( function() { return color.getRgb(); }, hslObserver, true );*/


                this.$element.on('touchstart mousedown', angular.bind(this, this.onMouseDown));
                this.$scope.$on('mdColorPicker:colorSet', angular.bind( this, this.onColorSet ) );
                if ( this.extra ) {
                    this.extra();
                }
                /*///////////////////////////
                // init
                ///////////////////////////*/

                this.draw();
            });

            /*/return angular.bind( this, this.get );*/

        }



        GradientCanvas.prototype.$window = angular.element( window );

        GradientCanvas.prototype.getColorByMouse = function( e ) {

            var te =  e.touches && e.touches[0];

            var pageX = te && te.pageX || e.pageX;
            var pageY = te && te.pageY || e.pageY;

            var x = Math.round( pageX - this.offset.x );
            var y = Math.round( pageY - this.offset.y );

            return this.getColorByPoint(x, y);
        };

        GradientCanvas.prototype.setMarkerCenter = function( x, y ) {
            var xOffset = -1 * this.marker.offsetWidth / 2;
            var yOffset = -1 * this.marker.offsetHeight / 2;
            var xAdjusted, xFinal, yAdjusted, yFinal;

            if ( y === undefined ) {
                yAdjusted = x + yOffset;
                yFinal = Math.round( Math.max( Math.min( this.height-1 + yOffset, yAdjusted), yOffset ) );

                xFinal = 0;
            } else {
                xAdjusted = x + xOffset;
                yAdjusted = y + yOffset;

                xFinal = Math.floor( Math.max( Math.min( this.height + xOffset, xAdjusted ), xOffset ) );
                yFinal = Math.floor( Math.max( Math.min( this.height + yOffset, yAdjusted ), yOffset ) );
                /*/ console.log( "Raw: ", x+','+y, "Adjusted: ", xAdjusted + ',' + yAdjusted, "Final: ", xFinal + ',' + yFinal );*/
            }



            angular.element(this.marker).css({'left': xFinal + 'px' });
            angular.element(this.marker).css({'top': yFinal + 'px'});
        };

        GradientCanvas.prototype.getMarkerCenter = function() {
            var returnObj = {
                x: this.marker.offsetLeft + ( Math.floor( this.marker.offsetWidth / 2 ) ),
                y: this.marker.offsetTop + ( Math.floor( this.marker.offsetHeight / 2 ) )
            };
            return returnObj;
        };

        GradientCanvas.prototype.getImageData = function( x, y ) {
            x = Math.max( 0, Math.min( x, this.canvas.width-1 ) );
            y = Math.max( 0, Math.min( y, this.canvas.height-1 ) );

            var imageData = this.context.getImageData( x, y, 1, 1 ).data;
            return imageData;
        };

        GradientCanvas.prototype.onMouseDown = function( e ) {
            e.preventDefault();
            e.stopImmediatePropagation();

            this.$scope.previewUnfocus();

            this.$element.css({ 'cursor': 'none' });

            this.offset.x = this.canvas.getBoundingClientRect().left;
            this.offset.y = this.canvas.getBoundingClientRect().top;

            var fn = angular.bind( this, function( e ) {
                switch( this.type ) {
                    case 'hue':
                        var hue = this.getColorByMouse( e );
                        this.$scope.$broadcast( 'mdColorPicker:spectrumHueChange', {hue: hue});
                        break;
                    case 'alpha':
                        var alpha = this.getColorByMouse( e );
                        this.$scope.color.setAlpha( alpha );
                        this.$scope.alpha = alpha;
                        this.$scope.$apply();
                        break;
                    case 'spectrum':
                        var color = this.getColorByMouse( e );
                        this.setColor( color );
                        break;
                }
            });

            this.$window.on('touchmove mousemove', fn);
            this.$window.one('touchend mouseup', angular.bind(this, function (e) {
                this.$window.off('touchmove mousemove', fn);
                this.$element.css({ 'cursor': 'crosshair' });
            }));

            fn( e );
        };

        GradientCanvas.prototype.setColor = function( color ) {

            this.$scope.color._r = color.r;
            this.$scope.color._g = color.g;
            this.$scope.color._b = color.b;
            this.$scope.$apply();
            this.$scope.$broadcast('mdColorPicker:spectrumColorChange', { color: color });
        };

        GradientCanvas.prototype.onColorSet = function( e, args ) {
            switch( this.type ) {
                case 'hue':
                    var hsv = this.$scope.color.toHsv();
                    this.setMarkerCenter( this.canvas.height - ( this.canvas.height * ( hsv.h / 360 ) ) );
                    break;
                case 'alpha':
                    this.currentColor = args.color.toRgb();
                    this.draw();

                    var alpha = args.color.getAlpha();
                    var pos = this.canvas.height - ( this.canvas.height * alpha );

                    this.setMarkerCenter( pos );
                    break;
                case 'spectrum':
                    var hsv = args.color.toHsv();
                    this.currentHue = hsv.h;
                    this.draw();

                    var posX = this.canvas.width * hsv.s;
                    var posY = this.canvas.height - ( this.canvas.height * hsv.v );

                    this.setMarkerCenter( posX, posY );
                    break;
            }

        };








        angular.module('mdColorPicker', [])
            .run(['$templateCache', function ($templateCache) {
                var shapes = {
                    'clear': '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
                    'gradient': '<path d="M11 9h2v2h-2zm-2 2h2v2H9zm4 0h2v2h-2zm2-2h2v2h-2zM7 9h2v2H7zm12-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 18H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm2-7h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2h2v-2H5V5h14v6z"/>',
                    'tune': '<path d="M13 21v-2h8v-2h-8v-2h-2v6h2zM3 17v2h6v-2H3z"/><path d="M21 13v-2H11v2h10zM7 9v2H3v2h4v2h2V9H7z"/><path d="M15 9h2V7h4V5h-4V3h-2v6zM3 5v2h10V5H3z"/>',
                    'view_module': '<path d="M4 11h5V5H4v6z"/><path d="M4 18h5v-6H4v6z"/><path d="M10 18h5v-6h-5v6z"/><path d="M16 18h5v-6h-5v6z"/><path d="M10 11h5V5h-5v6z"/><path d="M16 5v6h5V5h-5z"/>',
                    'view_headline': '<path d="M4 15h17v-2H4v2z"/><path d="M4 19h17v-2H4v2z"/><path d="M4 11h17V9H4v2z"/><path d="M4 5v2h17V5H4z"/>',
                    'history': '<path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/><path d="M12 8v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>',
                    'clear_all': '<path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"/>'
                };
                for (var i in shapes) {
                    if (shapes.hasOwnProperty(i)) {
                        $templateCache.put([i, 'svg'].join('.'),
                            ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">', shapes[i], '</svg>'].join(''));
                    }
                }
            }])
            .factory('mdColorGradientCanvas', GradientCanvasFactory )
            .factory('mdColorPickerHistory', ['$injector', function( $injector ) {

                var history = [];
                var strHistory = [];

                var $cookies = false;
                try {
                    $cookies = $injector.get('$cookies');
                } catch(e) {

                }

                if ( $cookies ) {
                    var tmpHistory = $cookies.getObject( 'mdColorPickerHistory' ) || [];
                    for ( var i = 0; i < tmpHistory.length; i++ ) {
                        history.push( tinycolor( tmpHistory[i] ) );
                        strHistory.push( tmpHistory[i] );
                    }
                }

                var length = 40;

                return {
                    length: function() {
                        if ( arguments[0] ) {
                            length = arguments[0];
                        } else {
                            return history.length;
                        }
                    },
                    add: function( color ) {
                        for( var x = 0; x < history.length; x++ ) {
                            if ( history[x].toRgbString() === color.toRgbString() ) {
                                history.splice(x, 1);
                                strHistory.splice(x, 1);
                            }
                        }

                        history.unshift( color );
                        strHistory.unshift( color.toRgbString() );

                        if ( history.length > length ) {
                            history.pop();
                            strHistory.pop();
                        }
                        if ( $cookies ) {
                            $cookies.putObject('mdColorPickerHistory', strHistory );
                        }
                    },
                    get: function() {
                        return history;
                    },
                    reset: function() {
                        history = [];
                        strHistory = [];
                        if ( $cookies ) {
                            $cookies.putObject('mdColorPickerHistory', strHistory );
                        }
                    }
                };
            }])
            .directive('mdColorPicker', [ '$timeout', 'mdColorPickerHistory', function( $timeout, colorHistory ) {

                return {
                    templateUrl: "mdColorPicker.tpl.html",

                    require: '^ngModel',
                    scope: {
                        options: '=mdColorPicker',

                        type: '@',
                        label: '@?',
                        icon: '@?',
                        random: '@?',
                        default: '@?',

                        openOnInput: '=?',
                        hasBackdrop: '=?',
                        clickOutsideToClose: '=?',
                        skipHide: '=?',
                        preserveScope: '=?',

                        mdColorClearButton: '=?',
                        mdColorPreview: '=?',

                        mdColorAlphaChannel: '=?',
                        mdColorSpectrum: '=?',
                        mdColorSliders: '=?',
                        mdColorGenericPalette: '=?',
                        mdColorMaterialPalette: '=?',
                        mdColorHistory: '=?',
                        mdColorHex: '=?',
                        mdColorRgb: '=?',
                        mdColorHsl: '=?',
                        mdColorDefaultTab: '=?'
                    },
                    controller: ['$scope', '$element', '$attrs', '$mdDialog', '$mdColorPicker', function( $scope, $element, $attrs, $mdDialog, $mdColorPicker ) {
                        var didJustClose = false;

                        if ( $scope.options !== undefined ) {
                            for ( var opt in $scope.options ) {
                                if ( $scope.options.hasOwnProperty( opt ) ) {
                                    var scopeKey;
                                    scopeKey = opt;
                                    if ( $scope.hasOwnProperty( 'mdColor' + opt.slice(0,1).toUpperCase() + opt.slice(1) ) ) {
                                        scopeKey = 'mdColor' + opt.slice(0,1).toUpperCase() + opt.slice(1);
                                    }
                                    if ( scopeKey && ( $scope[scopeKey] === undefined || $scope[scopeKey] === '' ) ) {
                                        $scope[scopeKey] = $scope.options[opt];
                                    }
                                }
                            }
                        }

                        var ngModel = $element.controller('ngModel');

                        var updateValue = function(val) {
                            $scope.value = val || ngModel.$viewValue || '';
                        };

                        $scope.mdColorClearButton = $scope.mdColorClearButton === undefined ? true : $scope.mdColorClearButton;
                        $scope.mdColorPreview = $scope.mdColorPreview === undefined ? true : $scope.mdColorPreview;

                        $scope.mdColorAlphaChannel = $scope.mdColorAlphaChannel === undefined ? true : $scope.mdColorAlphaChannel;
                        $scope.mdColorSpectrum = $scope.mdColorSpectrum === undefined ? true : $scope.mdColorSpectrum;
                        $scope.mdColorSliders = $scope.mdColorSliders === undefined ? true : $scope.mdColorSliders;
                        $scope.mdColorGenericPalette = $scope.mdColorGenericPalette === undefined ? true : $scope.mdColorGenericPalette;
                        $scope.mdColorMaterialPalette = $scope.mdColorMaterialPalette === undefined ? true : $scope.mdColorMaterialPalette;
                        $scope.mdColorHistory = $scope.mdColorHistory === undefined ? true : $scope.mdColorHistory;
                        $scope.mdColorHex = $scope.mdColorHex === undefined ? true : $scope.mdColorHex;
                        $scope.mdColorRgb = $scope.mdColorRgb === undefined ? true : $scope.mdColorRgb;
                        $scope.mdColorHsl = $scope.mdColorHsl === undefined ? true : $scope.mdColorHsl;
                        updateValue();

                        $scope.$watch(function() {
                            return ngModel.$modelValue;
                        },function(newVal) {
                            updateValue(newVal);
                        });

                        $scope.$watch('value',function(newVal,oldVal) {
                            if (newVal !== '' && typeof newVal !== 'undefined' && newVal && newVal !== oldVal) {
                                ngModel.$setViewValue(newVal);
                            }
                        });


                        $scope.clearValue = function clearValue() {
                            $scope.value = '';
                        };
                        $scope.showColorPicker = function showColorPicker($event) {
                            if ( didJustClose ) {
                                return;
                            }

                            $mdColorPicker.show({
                                value: $scope.value,
                                defaultValue: $scope.default,
                                random: $scope.random,
                                clickOutsideToClose: $scope.clickOutsideToClose,
                                hasBackdrop: $scope.hasBackdrop,
                                skipHide: $scope.skipHide,
                                preserveScope: $scope.preserveScope,

                                mdColorAlphaChannel: $scope.mdColorAlphaChannel,
                                mdColorSpectrum: $scope.mdColorSpectrum,
                                mdColorSliders: $scope.mdColorSliders,
                                mdColorGenericPalette: $scope.mdColorGenericPalette,
                                mdColorMaterialPalette: $scope.mdColorMaterialPalette,
                                mdColorHistory: $scope.mdColorHistory,
                                mdColorHex: $scope.mdColorHex,
                                mdColorRgb: $scope.mdColorRgb,
                                mdColorHsl: $scope.mdColorHsl,
                                mdColorDefaultTab: $scope.mdColorDefaultTab,

                                $event: $event,

                            }).then(function( color ) {
                                $scope.value = color;
                            });
                        };
                    }],
                    compile: function( element, attrs ) {

                        attrs.type = attrs.type !== undefined ? attrs.type : 0;

                    }
                };
            }])
            .directive( 'mdColorPickerContainer', ['$compile','$timeout','$mdColorPalette','mdColorPickerHistory', function( $compile, $timeout, $mdColorPalette, colorHistory ) {
                return {
                    templateUrl: 'mdColorPickerContainer.tpl.html',
                    scope: {
                        value: '=?',
                        default: '@',
                        random: '@',
                        ok: '=?',
                        mdColorAlphaChannel: '=',
                        mdColorSpectrum: '=',
                        mdColorSliders: '=',
                        mdColorGenericPalette: '=',
                        mdColorMaterialPalette: '=',
                        mdColorHistory: '=',
                        mdColorHex: '=',
                        mdColorRgb: '=',
                        mdColorHsl: '=',
                        mdColorDefaultTab: '='
                    },
                    controller: ["$scope", "$element", "$attrs", function( $scope, $element, $attrs ) {

                        function getTabIndex( tab ) {
                            var index = 0;
                            if ( tab && typeof( tab ) === 'string' ) {
                                /* DOM isn't fast enough for this

                                 var tabs = $element[0].querySelector('.md-color-picker-colors').getElementsByTagName( 'md-tab' );
                                 console.log( tabs.length );
                                 */
                                var tabName = 'mdColor' + tab.slice(0,1).toUpperCase() + tab.slice(1);
                                var tabs = ['mdColorSpectrum', 'mdColorSliders', 'mdColorGenericPalette', 'mdColorMaterialPalette', 'mdColorHistory'];
                                for ( var x = 0; x < tabs.length; x++ ) {
                                    if ( tabs[x] == tabName ) {
                                        if ( $scope[tabName] ) {
                                            index = x;
                                            break;
                                        }
                                    }
                                }
                            } else if ( tab && typeof ( tab ) === 'number') {
                                index = tab;
                            }

                            return index;
                        }

                        /*//////////////////////////////////
                        // Variables
                        //////////////////////////////////*/
                        var container = angular.element( $element[0].querySelector('.md-color-picker-container') );
                        var resultSpan = angular.element( container[0].querySelector('.md-color-picker-result') );
                        var previewInput = angular.element( $element[0].querySelector('.md-color-picker-preview-input') );

                        var outputFn = [
                            'toHexString',
                            'toRgbString',
                            'toHslString'
                        ];



                        $scope.default = $scope.default ? $scope.default : $scope.random ? tinycolor.random() : 'rgb(255,255,255)';
                        if ( $scope.value.search('#') >= 0 ) {
                            $scope.type = 0;
                        } else if ( $scope.value.search('rgb') >= 0 ) {
                            $scope.type = 1;
                        } else if ( $scope.value.search('hsl') >= 0 ) {
                            $scope.type = 2;
                        }
                        $scope.color = new tinycolor($scope.value || $scope.default);
                        $scope.alpha = $scope.color.getAlpha();
                        $scope.history =  colorHistory;
                        $scope.materialFamily = [];

                        $scope.whichPane = getTabIndex( $scope.mdColorDefaultTab );
                        $scope.inputFocus = false;

                        /*/ Colors for the palette screen
                        //////////////////////////////////*/
                        var steps = 9;
                        var freq = 2*Math.PI/steps;

                        $scope.palette = [
                            ["rgb(255, 204, 204)","rgb(255, 230, 204)","rgb(255, 255, 204)","rgb(204, 255, 204)","rgb(204, 255, 230)","rgb(204, 255, 255)","rgb(204, 230, 255)","rgb(204, 204, 255)","rgb(230, 204, 255)","rgb(255, 204, 255)"],
                            ["rgb(255, 153, 153)","rgb(255, 204, 153)","rgb(255, 255, 153)","rgb(153, 255, 153)","rgb(153, 255, 204)","rgb(153, 255, 255)","rgb(153, 204, 255)","rgb(153, 153, 255)","rgb(204, 153, 255)","rgb(255, 153, 255)"],
                            ["rgb(255, 102, 102)","rgb(255, 179, 102)","rgb(255, 255, 102)","rgb(102, 255, 102)","rgb(102, 255, 179)","rgb(102, 255, 255)","rgb(102, 179, 255)","rgb(102, 102, 255)","rgb(179, 102, 255)","rgb(255, 102, 255)"],
                            ["rgb(255, 51, 51)","rgb(255, 153, 51)","rgb(255, 255, 51)","rgb(51, 255, 51)","rgb(51, 255, 153)","rgb(51, 255, 255)","rgb(51, 153, 255)","rgb(51, 51, 255)","rgb(153, 51, 255)","rgb(255, 51, 255)"],
                            ["rgb(255, 0, 0)","rgb(255, 128, 0)","rgb(255, 255, 0)","rgb(0, 255, 0)","rgb(0, 255, 128)","rgb(0, 255, 255)","rgb(0, 128, 255)","rgb(0, 0, 255)","rgb(128, 0, 255)","rgb(255, 0, 255)"],
                            ["rgb(245, 0, 0)","rgb(245, 123, 0)","rgb(245, 245, 0)","rgb(0, 245, 0)","rgb(0, 245, 123)","rgb(0, 245, 245)","rgb(0, 123, 245)","rgb(0, 0, 245)","rgb(123, 0, 245)","rgb(245, 0, 245)"],
                            ["rgb(214, 0, 0)","rgb(214, 108, 0)","rgb(214, 214, 0)","rgb(0, 214, 0)","rgb(0, 214, 108)","rgb(0, 214, 214)","rgb(0, 108, 214)","rgb(0, 0, 214)","rgb(108, 0, 214)","rgb(214, 0, 214)"],
                            ["rgb(163, 0, 0)","rgb(163, 82, 0)","rgb(163, 163, 0)","rgb(0, 163, 0)","rgb(0, 163, 82)","rgb(0, 163, 163)","rgb(0, 82, 163)","rgb(0, 0, 163)","rgb(82, 0, 163)","rgb(163, 0, 163)"],
                            ["rgb(92, 0, 0)","rgb(92, 46, 0)","rgb(92, 92, 0)","rgb(0, 92, 0)","rgb(0, 92, 46)","rgb(0, 92, 92)","rgb(0, 46, 92)","rgb(0, 0, 92)","rgb(46, 0, 92)","rgb(92, 0, 92)"],
                            ["rgb(255, 255, 255)","rgb(205, 205, 205)","rgb(178, 178, 178)","rgb(153, 153, 153)","rgb(127, 127, 127)","rgb(102, 102, 102)","rgb(76, 76, 76)","rgb(51, 51, 51)","rgb(25, 25, 25)","rgb(0, 0, 0)"]
                        ];

                        $scope.materialPalette = $mdColorPalette;

                        /*//////////////////////////////////
                        // Functions
                        //////////////////////////////////*/
                        $scope.isDark = function isDark( color ) {
                            if ( angular.isArray( color ) ) {
                                return tinycolor( {r: color[0], g: color[1], b: color[2] }).isDark();
                            } else {
                                return tinycolor( color ).isDark();
                            }

                        };
                        $scope.previewFocus = function() {
                            $scope.inputFocus = true;
                            $timeout( function() {
                                previewInput[0].setSelectionRange(0, previewInput[0].value.length);
                            });
                        };
                        $scope.previewUnfocus = function() {
                            $scope.inputFocus = false;
                            previewInput[0].blur();
                        };
                        $scope.previewBlur = function() {
                            $scope.inputFocus = false;
                            $scope.setValue();
                        };
                        $scope.previewKeyDown = function( $event ) {

                            if ( $event.keyCode == 13 ) {
                                $scope.ok && $scope.ok();
                            }
                        };
                        $scope.setPaletteColor = function( event ) {
                            $timeout( function() {
                                $scope.color = tinycolor( event.target.style.backgroundColor );
                            });
                        };

                        $scope.setValue = function setValue() {
                            if ( $scope.color && $scope.color && outputFn[$scope.type] && $scope.color.toRgbString() !== 'rgba(0, 0, 0, 0)' ) {
                                $scope.value = $scope.color[outputFn[$scope.type]]();
                            }
                        };

                        $scope.changeValue = function changeValue() {
                            $scope.color = tinycolor( $scope.value );
                            $scope.$broadcast('mdColorPicker:colorSet', { color: $scope.color });
                        };


                        /*//////////////////////////////////
                        // Watches and Events
                        //////////////////////////////////*/
                        $scope.$watch( 'color._a', function( newValue ) {
                            $scope.color.setAlpha( newValue );
                        }, true);

                        $scope.$watch( 'whichPane', function( newValue ) {
                            /* 0 - spectrum selector
                            // 1 - sliders
                            // 2 - palette */
                            $scope.$broadcast('mdColorPicker:colorSet', {color: $scope.color });

                        });

                        $scope.$watch( 'type', function() {
                            previewInput.removeClass('switch');
                            $timeout(function() {
                                previewInput.addClass('switch');
                            });
                        });

                        $scope.$watchGroup(['color.toRgbString()', 'type'], function( newValue ) {
                            if ( !$scope.inputFocus ) {
                                $scope.setValue();
                            }
                        });


                        /*//////////////////////////////////
                        // INIT
                        // Let all the other directives initialize
                        ///////////////////////////////////
                        //	console.log( "mdColorPickerContainer Controller PRE Timeout", Date.now() - dateClick ); */
                        $timeout( function() {
                            $scope.$broadcast('mdColorPicker:colorSet', { color: $scope.color });
                            previewInput.focus();
                            $scope.previewFocus();
                        });
                    }],
                    link: function( scope, element, attrs ) {

                        var tabs = element[0].getElementsByTagName( 'md-tab' );
                        /*
                         Replicating these structure without ng-repeats

                         <div ng-repeat="row in palette track by $index" flex="15"  layout-align="space-between" layout="row"  layout-fill>
                         <div ng-repeat="col in row track by $index" flex="10" style="height: 25.5px;" ng-style="{'background': col};" ng-click="setPaletteColor($event)"></div>
                         </div>

                         <div ng-repeat="(key, value) in materialColors">
                         <div ng-style="{'background': 'rgb('+value['500'].value[0]+','+value['500'].value[1]+','+value['500'].value[2]+')', height: '75px'}" class="md-color-picker-material-title" ng-class="{'dark': isDark( value['500'].value )}" ng-click="setPaletteColor($event)">
                         <span>{{key}}</span>
                         </div>
                         <div ng-repeat="(label, color) in value track by $index" ng-style="{'background': 'rgb('+color.value[0]+','+color.value[1]+','+color.value[2]+')', height: '33px'}" class="md-color-picker-with-label" ng-class="{'dark': isDark( color.value )}" ng-click="setPaletteColor($event)">
                         <span>{{label}}</span>
                         </div>
                         </div>
                         */


                        $timeout(function() {
                            createDOM();
                        });

                        function createDOM() {
                            var paletteContainer = angular.element( element[0].querySelector('.md-color-picker-palette') );
                            var materialContainer = angular.element( element[0].querySelector('.md-color-picker-material-palette') );
                            var paletteRow = angular.element('<div class="flex-15 layout-fill layout-row layout-align-space-between" layout-align="space-between" layout="row" layout-fill"></div>');
                            var paletteCell = angular.element('<div class="flex-10"></div>');

                            var materialTitle = angular.element('<div class="md-color-picker-material-title"></div>');
                            var materialRow = angular.element('<div class="md-color-picker-with-label"></div>');



                            angular.forEach(scope.palette, function( value, key ) {
                                var row = paletteRow.clone();
                                angular.forEach( value, function( color ) {
                                    var cell = paletteCell.clone();
                                    cell.css({
                                        height: '25.5px',
                                        backgroundColor: color
                                    });
                                    cell.bind('click', scope.setPaletteColor );
                                    row.append( cell );
                                });

                                paletteContainer.append( row );
                            });

                            angular.forEach(scope.materialPalette, function( value, key ) {
                                var title = materialTitle.clone();
                                title.html('<span>'+key.replace('-',' ')+'</span>');
                                title.css({
                                    height: '75px',
                                    backgroundColor: 'rgb('+value['500'].value[0]+','+value['500'].value[1]+','+value['500'].value[2]+')'
                                });
                                if ( scope.isDark(value['500'].value) ) {
                                    title.addClass('dark');
                                }

                                materialContainer.append( title );

                                angular.forEach( value, function( color, label ) {

                                    var row = materialRow.clone();
                                    row.css({
                                        height: '33px',
                                        backgroundColor: 'rgb('+color.value[0]+','+color.value[1]+','+color.value[2]+')'
                                    });
                                    if ( scope.isDark(color.value) ) {
                                        row.addClass('dark');
                                    }

                                    row.html('<span>'+label+'</span>');
                                    row.bind('click', scope.setPaletteColor );
                                    materialContainer.append( row );
                                });


                            });
                        }
                    }
                };
            }])

            .directive( 'mdColorPickerHue', ['mdColorGradientCanvas', function( mdColorGradientCanvas ) { return new mdColorGradientCanvas('hue'); }])
            .directive( 'mdColorPickerAlpha', ['mdColorGradientCanvas', function( mdColorGradientCanvas ) { return new mdColorGradientCanvas('alpha'); }])
            .directive( 'mdColorPickerSpectrum', ['mdColorGradientCanvas', function( mdColorGradientCanvas ) { return new mdColorGradientCanvas('spectrum'); }])

            .factory('$mdColorPicker', ['$q', '$mdDialog', 'mdColorPickerHistory', function ($q, $mdDialog, colorHistory) {
                var dialog;

                return {
                    show: function (options)
                    {
                        if ( options === undefined ) {
                            options = {};
                        }
                        options.hasBackdrop = options.hasBackdrop === undefined ? true : options.hasBackdrop;
                        options.clickOutsideToClose = options.clickOutsideToClose === undefined ? true : options.clickOutsideToClose;
                        options.defaultValue = options.defaultValue === undefined ? '#FFFFFF' : options.defaultValue;
                        options.focusOnOpen = options.focusOnOpen === undefined ? false : options.focusOnOpen;
                        options.preserveScope = options.preserveScope === undefined ? true : options.preserveScope;
                        options.skipHide = options.skipHide === undefined ? true : options.skipHide;

                        options.mdColorAlphaChannel = options.mdColorAlphaChannel === undefined ? false : options.mdColorAlphaChannel;
                        options.mdColorSpectrum = options.mdColorSpectrum === undefined ? true : options.mdColorSpectrum;
                        options.mdColorSliders = options.mdColorSliders === undefined ? true : options.mdColorSliders;
                        options.mdColorGenericPalette = options.mdColorGenericPalette === undefined ? true : options.mdColorGenericPalette;
                        options.mdColorMaterialPalette = options.mdColorMaterialPalette === undefined ? true : options.mdColorMaterialPalette;
                        options.mdColorHistory = options.mdColorHistory === undefined ? true : options.mdColorHistory;
                        options.mdColorRgb = options.mdColorRgb === undefined ? true : options.mdColorRgb;
                        options.mdColorHsl = options.mdColorHsl === undefined ? true : options.mdColorHsl;
                        options.mdColorHex = ((options.mdColorHex === undefined) || (!options.mdColorRgb && !options.mdColorHsl))  ? true : options.mdColorHex;
                        options.mdColorAlphaChannel = (!options.mdColorRgb && !options.mdColorHsl) ? false : options.mdColorAlphaChannel;

                        dialog = $mdDialog.show({
                            templateUrl: 'mdColorPickerDialog.tpl.html',
                            hasBackdrop: options.hasBackdrop,
                            clickOutsideToClose: options.clickOutsideToClose,

                            controller: ['$scope', 'options', function( $scope, options ) {
                                $scope.close = function close()
                                {
                                    $mdDialog.cancel();
                                };
                                $scope.ok = function ok()
                                {
                                    $mdDialog.hide( $scope.value );
                                };
                                $scope.hide = $scope.ok;



                                $scope.value = options.value;
                                $scope.default = options.defaultValue;
                                $scope.random = options.random;

                                $scope.mdColorAlphaChannel = options.mdColorAlphaChannel;
                                $scope.mdColorSpectrum = options.mdColorSpectrum;
                                $scope.mdColorSliders = options.mdColorSliders;
                                $scope.mdColorGenericPalette = options.mdColorGenericPalette;
                                $scope.mdColorMaterialPalette = options.mdColorMaterialPalette;
                                $scope.mdColorHistory = options.mdColorHistory;
                                $scope.mdColorHex = options.mdColorHex;
                                $scope.mdColorRgb = options.mdColorRgb;
                                $scope.mdColorHsl = options.mdColorHsl;
                                $scope.mdColorDefaultTab = options.mdColorDefaultTab;

                            }],

                            locals: {
                                options: options,
                            },
                            preserveScope: options.preserveScope,
                            skipHide: options.skipHide,

                            targetEvent: options.$event,
                            focusOnOpen: options.focusOnOpen,
                            autoWrap: false,
                            onShowing: function() {
                                /*		console.log( "DIALOG OPEN START", Date.now() - dateClick ); */
                            },
                            onComplete: function() {
                                /*		console.log( "DIALOG OPEN COMPLETE", Date.now() - dateClick );*/
                            }
                        });

                        dialog.then(function (value) {
                            colorHistory.add(new tinycolor(value));
                        }, function () { });

                        return dialog;
                    },
                    hide: function() {
                        return dialog.hide();
                    },
                    cancel: function() {
                        return dialog.cancel();
                    }
                };
            }]);
    })( window, window.angular );

    angular.module("mdColorPicker").run(["$templateCache", function($templateCache) {$templateCache.put("mdColorPicker.tpl.html","<div class=\"md-color-picker-input-container\" layout=\"row\">\n	<div class=\"md-color-picker-preview md-color-picker-checkered-bg\" ng-click=\"showColorPicker($event)\" ng-if=\"mdColorPreview\">\n		<div class=\"md-color-picker-result\" ng-style=\"{background: value}\"></div>\n	</div>\n	<md-input-container flex>\n		<label><md-icon ng-if=\"icon\">{{icon}}</md-icon>{{label}}</label>\n		<input type=\"input\" ng-model=\"value\" class=\'md-color-picker-input\'  ng-mousedown=\"(openOnInput || !mdColorPreview) && showColorPicker($event)\"/>\n	</md-input-container>\n	<md-button class=\"md-icon-button md-color-picker-clear\" ng-if=\"mdColorClearButton && value\" ng-click=\"clearValue();\" aria-label=\"Clear Color\">\n		<md-icon md-svg-icon=\"clear.svg\"></md-icon>\n	</md-button>\n</div>\n");
        $templateCache.put("mdColorPickerContainer.tpl.html","<div class=\"md-color-picker-container in\" layout=\"column\">\n	<div class=\"md-color-picker-arrow\" ng-style=\"{\'border-bottom-color\': color.toRgbString() }\"></div>\n\n	<div class=\"md-color-picker-preview md-color-picker-checkered-bg\" ng-class=\"{\'dark\': !color.isDark() || color.getAlpha() < .45}\" flex=\"1\" layout=\"column\">\n\n		<div class=\"md-color-picker-result\" ng-style=\"{\'background\': color.toRgbString()}\" flex=\"100\" layout=\"column\" layout-fill layout-align=\"center center\" ng-click=\"focusPreviewInput( $event )\">\n			<!--<span flex  layout=\"column\" layout-align=\"center center\">{{value}}</span>-->\n			<div flex  layout=\"row\" layout-align=\"center center\">\n				<input class=\"md-color-picker-preview-input\" type=\"text\" ng-model=\"value\" ng-focus=\"previewFocus($event);\" ng-blur=\"previewBlur()\" ng-change=\"changeValue()\" ng-keypress=\"previewKeyDown($event)\" layout-fill />\n			</div>\n			<div class=\"md-color-picker-tabs\" style=\"width: 100%\">\n				<md-tabs md-selected=\"type\" md-stretch-tabs=\"always\" md-no-bar md-no-ink md-no-pagination=\"true\" >\n					<md-tab ng-if=\"mdColorHex\" label=\"Hex\" ng-disabled=\"color.getAlpha() !== 1\" md-ink-ripple=\"#ffffff\"></md-tab>\n					<md-tab ng-if=\"mdColorRgb\" label=\"RGB\"></md-tab>\n					<md-tab ng-if=\"mdColorHsl\" label=\"HSL\"></md-tab>\n					<!--<md-tab label=\"HSV\"></md-tab>\n					<md-tab label=\"VEC\"></md-tab>-->\n				</md-tabs>\n			</div>\n		</div>\n	</div>\n\n	<div class=\"md-color-picker-tabs md-color-picker-colors\">\n		<md-tabs md-stretch-tabs=\"always\" md-align-tabs=\"bottom\"  md-selected=\"whichPane\" md-no-pagination>\n			<md-tab ng-if=\"mdColorSpectrum\">\n				<md-tab-label>\n					<md-icon md-svg-icon=\"gradient.svg\"></md-icon>\n				</md-tab-label>\n				<md-tab-body>\n					<div layout=\"row\" layout-align=\"space-between\" style=\"height: 255px\">\n						<div md-color-picker-spectrum></div>\n						<div md-color-picker-hue ng-class=\"{\'md-color-picker-wide\': !mdColorAlphaChannel}\"></div>\n						<div md-color-picker-alpha class=\"md-color-picker-checkered-bg\" ng-if=\"mdColorAlphaChannel\"></div>\n					</div>\n				</md-tab-body>\n			</md-tab>\n			<md-tab ng-if=\"mdColorSliders\">\n				<md-tab-label>\n					<md-icon md-svg-icon=\"tune.svg\"></md-icon>\n				</md-tab-label>\n				<md-tab-body>\n					<div layout=\"column\" flex=\"100\" layout-fill layout-align=\"space-between start center\" class=\"md-color-picker-sliders\">\n						<div layout=\"row\" layout-align=\"start center\" layout-wrap flex layout-fill>\n							<div flex=\"10\" layout layout-align=\"center center\">\n								<span class=\"md-body-1\">R</span>\n							</div>\n							<md-slider flex=\"65\" min=\"0\" max=\"255\" ng-model=\"color._r\" aria-label=\"red\" class=\"red-slider\"></md-slider>\n							<span flex></span>\n							<div flex=\"20\" layout layout-align=\"center center\">\n								<input style=\"width: 100%;\" min=\"0\" max=\"255\" type=\"number\" ng-model=\"color._r\" aria-label=\"red\" aria-controls=\"red-slider\">\n							</div>\n						</div>\n						<div layout=\"row\" layout-align=\"start center\" layout-wrap flex layout-fill>\n							<div flex=\"10\" layout layout-align=\"center center\">\n								<span class=\"md-body-1\">G</span>\n							</div>\n							<md-slider flex=\"65\" min=\"0\" max=\"255\" ng-model=\"color._g\" aria-label=\"green\" class=\"green-slider\"></md-slider>\n							<span flex></span>\n							<div flex=\"20\" layout layout-align=\"center center\">\n								<input style=\"width: 100%;\" min=\"0\" max=\"255\" type=\"number\" ng-model=\"color._g\" aria-label=\"green\" aria-controls=\"green-slider\">\n							</div>\n						</div>\n						<div layout=\"row\" layout-align=\"start center\" layout-wrap flex layout-fill>\n							<div flex=\"10\" layout layout-align=\"center center\">\n								<span class=\"md-body-1\">B</span>\n							</div>\n							<md-slider flex=\"65\" min=\"0\" max=\"255\" ng-model=\"color._b\" aria-label=\"blue\" class=\"blue-slider\"></md-slider>\n							<span flex></span>\n							<div flex=\"20\" layout layout-align=\"center center\" >\n								<input style=\"width: 100%;\" min=\"0\" max=\"255\" type=\"number\" ng-model=\"color._b\" aria-label=\"blue\" aria-controls=\"blue-slider\">\n							</div>\n						</div>\n						<div layout=\"row\" layout-align=\"start center\" layout-wrap flex layout-fill ng-if=\"!mdColorAlphaChannel\">\n							<div flex=\"10\" layout layout-align=\"center center\">\n								<span class=\"md-body-1\">A</span>\n							</div>\n							<md-slider flex=\"65\" min=\"0\" max=\"1\" step=\".01\" ng-model=\"color._a\" aria-label=\"alpha\" class=\"md-primary\"></md-slider>\n							<span flex></span>\n							<div flex=\"20\" layout layout-align=\"center center\" >\n								<input style=\"width: 100%;\" min=\"0\" max=\"1\" step=\".01\" type=\"number\" ng-model=\"color._a\" aria-label=\"alpha\" aria-controls=\"alpha-slider\">\n							</div>\n						</div>\n					</div>\n				</md-tab-body>\n			</md-tab>\n			<md-tab ng-if=\"mdColorGenericPalette\">\n				<md-tab-label>\n					<md-icon md-svg-icon=\"view_module.svg\"></md-icon>\n				</md-tab-label>\n				<md-tab-body>\n					<div layout=\"column\" layout-align=\"space-between start center\" flex class=\"md-color-picker-palette\">\n\n					</div>\n				</md-tab-body>\n			</md-tab>\n			<md-tab  ng-if=\"mdColorMaterialPalette\">\n				<md-tab-label>\n					<md-icon md-svg-icon=\"view_headline.svg\"></md-icon>\n				</md-tab-label>\n				<md-tab-body>\n					<div layout=\"column\" layout-fill flex class=\"md-color-picker-material-palette\">\n\n					</div>\n				</md-tab-body>\n			</md-tab>\n			<md-tab ng-if=\"mdColorHistory\">\n				<md-tab-label>\n					<md-icon md-svg-icon=\"history.svg\"></md-icon>\n				</md-tab-label>\n				<md-tab-body layout=\"row\" layout-fill>\n					<div layout=\"column\" flex layout-align=\"space-between start\" layout-wrap layout-fill class=\"md-color-picker-history\">\n						<div layout=\"row\" flex=\"80\" layout-align=\"space-between start start\" layout-wrap  layout-fill>\n							<div flex=\"10\" ng-repeat=\"historyColor in history.get() track by $index\">\n								<div  ng-style=\"{\'background\': historyColor.toRgbString()}\" ng-click=\"setPaletteColor($event)\"></div>\n							</div>\n						</div>\n\n\n						<md-button flex-end ng-click=\"history.reset()\" class=\"md-mini\" aria-label=\"Clear History\">\n							<md-icon md-svg-icon=\"clear_all.svg\"></md-icon>\n						</md-button>\n					</div>\n				</md-tab-body>\n			</md-tab>\n		</md-tabs>\n	</div>\n\n</div>\n");
        $templateCache.put("mdColorPickerDialog.tpl.html","<md-dialog class=\"md-color-picker-dialog\">\n	<div md-color-picker-container\n		value=\"value\"\n		default=\"{{defaultValue}}\"\n		random=\"{{random}}\"\n		ok=\"ok\"\n		md-color-alpha-channel=\"mdColorAlphaChannel\"\n		md-color-spectrum=\"mdColorSpectrum\"\n		md-color-sliders=\"mdColorSliders\"\n		md-color-generic-palette=\"mdColorGenericPalette\"\n		md-color-material-palette=\"mdColorMaterialPalette\"\n		md-color-history=\"mdColorHistory\"\n		md-color-hex=\"mdColorHex\"\n		md-color-rgb=\"mdColorRgb\"\n		md-color-hsl=\"mdColorHsl\"\n		md-color-default-tab=\"mdColorDefaultTab\"\n	></div>\n	<md-actions layout=\"row\">\n		<md-button class=\"md-mini\" ng-click=\"close()\" style=\"width: 50%;\">Cancel</md-button>\n		<md-button class=\"md-mini\" ng-click=\"ok()\" style=\"width: 50%;\">Select</md-button>\n	</md-actions>\n</md-dialog>\n");}]);
})(angular, window, tinycolor);
