(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/likeFx/likeFx"],{"0ce0":function(t,e,n){"use strict";var i=n("99eb"),a=n.n(i);a.a},"322b":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement;t._self._c},u=[]},8663:function(t,e,n){"use strict";n.r(e);var i=n("9145"),a=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=a.a},9145:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"LikeFx",data:function(){return{queue:{},ctx:null,timer:0}},props:{height:{type:Number,default:1920},width:{type:Number,default:375}},mounted:function(){this.ctx=t.createCanvasContext("bubble"),this.queue={},console.log("likeFx mounted")},destroyed:function(){console.log("likeFx destoryed"),this.clearTimer()},methods:{likeClick:function(){console.log("开始点赞啦");var t="/static/img/likeFx/"+this.getRandomInt(1,33)+".png",e={id:(new Date).getTime(),timer:0,opacity:0,pathData:this.generatePathData(),image:t,factor:{speed:6e-4,t:.6}};Object.keys(this.queue).length>0?this.queue[e.id]=e:(this.queue[e.id]=e,this.bubbleAnimate())},getRandom:function(t,e){return Math.random()*(e-t)+t},getRandomInt:function(t,e){return Math.floor(Math.random()*(e-t+1))+t},generatePathData:function(){var t=this.width,e=this.height,n={x:.72*t,y:e},i={x:this.getRandom(.22*t,.33*t),y:this.getRandom(.5*e,.75*e)},a={x:this.getRandom(0,.88*t),y:this.getRandom(.25*e,.5*e)},u={x:this.getRandom(0,.88*t),y:this.getRandom(0,.125*e)};return[n,i,a,u]},updatePath:function(t,e){var n=t[0],i=t[1],a=t[2],u=t[3],r=e.t,o=3*(i.x-n.x),c=3*(a.x-i.x)-o,s=u.x-n.x-o-c,l=3*(i.y-n.y),h=3*(a.y-i.y)-l,d=u.y-n.y-l-h,f=s*(r*r*r)+c*(r*r)+o*r+n.x,m=d*(r*r*r)+h*(r*r)+l*r+n.y;return{x:f,y:m}},bubbleAnimate:function(){var t=this,e=(this.width,this.height);Object.keys(this.queue).forEach((function(n){var i=t.queue[+n],a=t.updatePath(i.pathData,i.factor),u=a.x,r=a.y,o=i.factor.speed;i.factor.t+=o;var c=30;c=(e-r)/1.5,c=Math.min(30,c);var s=i.opacity;s=r/(.3*e),s=Math.min(1,s),t.ctx.globalAlpha=s,t.ctx.drawImage(i.image,u-c/2,r,c,c),i.factor.t>1&&delete t.queue[i.id],r>e&&delete t.queue[i.id]})),this.ctx.draw(),Object.keys(this.queue).length>0?this.timer=setTimeout((function(){t.bubbleAnimate()}),5):(this.clearTimer(),this.ctx.draw())},clearTimer:function(){this.timer&&clearTimeout(this.timer)}}};e.default=n}).call(this,n("543d")["default"])},"99eb":function(t,e,n){},"9c87":function(t,e,n){"use strict";n.r(e);var i=n("322b"),a=n("8663");for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);n("0ce0");var r,o=n("f0c5"),c=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/likeFx/likeFx-create-component',
    {
        'components/likeFx/likeFx-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9c87"))
        })
    },
    [['components/likeFx/likeFx-create-component']]
]);
