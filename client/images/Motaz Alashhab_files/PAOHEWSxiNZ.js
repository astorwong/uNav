/*!CK:3043258383!*//*1456118363,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["OVWTV"]); }

__d("ComposerNUXType",[],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports={CAMERA_NUX:"camera_nux_seen",ADD_MORE_NUX:"add_more_nux_seen",OGCOMPOSER_NUX:"ogcomposer_nux_seen",FACEREC_SUGGESTIONS_NUX:"facerec_suggestions_nux_seen",TAGGING_FLYOUT_NUX:"tagging_flyout_nux_seen",OGCOMPOSER_NEW_ICON_PICKER_NUX:"minutiae_icon_picker_nux_seen",SHARER_MINUTIAE_NUX:"sharer_minutiae_nux_seen",ADD_STICKERS_NUX:"add_stickers_nux_seen",UPCOMING_BIRTHDAYS_NUX:"upcoming_birthdays_nux_seen",CROSS_POST_NUX:"cross_post_nux_seen",SLIDESHOW_NUX:"slideshow_nux_seen"};},null);
__d('FileInput.react',['FileInput','InlineBlock.react','React','ReactDOM','cx','invariant','joinClasses'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o=j.PropTypes,p=j.createClass({displayName:'FileInput',propTypes:{containerClassName:o.string,display:o.oneOf(['inline-block','inline'])},getDefaultProps:function(){return {display:'inline-block'};},render:function(){var q=n("_m",this.props.containerClassName),r="container",s=j.createElement('input',babelHelpers['extends']({},this.props,{type:'file',className:n(this.props.className,"_n"),ref:'fileInput'}),undefined);if(this.props.display==='inline-block')return (j.createElement(i,{className:q,ref:r},this.props.children,s));return (j.createElement('span',{className:q,ref:r},this.props.children,s));},componentDidMount:function(){var q=k.findDOMNode(this.refs.fileInput),r=k.findDOMNode(this.refs.container),s=r.firstChild;!(s.nodeName==='A')?m(0):undefined;s.setAttribute('rel','ignore');this._fileInput=new h(r,s,q);},componentWillUnmount:function(){this._fileInput.destroy();this._fileInput=null;},getFileInput:function(){return this._fileInput;},focus:function(){var q=k.findDOMNode(this.refs.fileInput);if(!q.disabled)q.focus();}});f.exports=p;},null);
__d('MenuSeparator.react',['MenuSeparator'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(k){k.isReactLegacyFactory={};k.type=k;}var j=h;i(j);f.exports=j;},null);
__d('MenuStaticItem.react',['MenuStaticItem'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(k){k.isReactLegacyFactory={};k.type=k;}var j=h;i(j);f.exports=j;},null);
__d('ScrollColumn.react',['cx','invariant','joinClasses','throttle','tidyEvent','Arbiter','Event','React','ReactDOM','Vector','ViewportBounds'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){if(c.__markCompiled)c.__markCompiled();var s=o.PropTypes,t='ScrollColumn/adjust',u=o.createClass({displayName:'ScrollColumn',propTypes:{topOffset:s.number,zIndex:s.number},getDefaultProps:function(){return {topOffset:0,zIndex:0};},_scroll:0,_scrollDelta:0,getInitialState:function(){return {fixed:null,fixedBottom:0,fixedTop:this.props.topOffset,top:0};},render:function(){var v='auto',w=this.state.fixedLeft,x='auto';if(this.state.fixed==='bottom'){v=this.state.fixedBottom;}else if(this.state.fixed==='top'){x=this.state.fixedTop;}else{w='auto';x=this.state.top;}var y=j(this.props.className,"_5ss7");return (o.createElement('div',{className:y,ref:'container'},o.createElement('div',{className:"_5ss8"+(this.state.fixed?' '+"fixed_always":''),ref:'column',style:{bottom:v,left:w,top:x,zIndex:this.props.zIndex}},this.props.children)));},componentDidMount:function(){this.setState({adjustEventListener:l(m.subscribe(t,function(){this._adjust();}.bind(this))),resizeListener:l(n.listen(window,'resize',k(this._adjust))),scrollListener:l(n.listen(window,'scroll',this._onScroll)),viewportBoundsUpdateListener:l(r.subscribe('change',this._adjust))});this._adjust();},componentDidUpdate:function(v,w){if(w.fixed!==this.state.fixed)m.inform('reflow');},componentWillUnmount:function(){this.state.adjustEventListener.unsubscribe();this.state.resizeListener.remove();this.state.scrollListener.remove();},_onScroll:function(event){var v=q.getScrollPosition().y;this._scrollDelta=v-this._scroll;this._scroll=v;this._adjust();},_adjust:function(){if(!this.isMounted())return;this._updateContainerHeight();this._updateColumnWidth();if(this._isContainerBelowViewportTop()){this._setNotFixed(0);return;}if(!this._isColumnLargerThanViewport()){this._setFixedToTop();return;}if(this._scrollDelta>0)if(this._isBottomOfColumnVisible()){this._setFixedToBottom();return;}if(this._scrollDelta<0)if(this._isTopOfColumnVisible()){this._setFixedToTop();return;}var v=this._getTopPositionForRef('column'),w=this._getTopPositionForRef('container'),x=v-w;this._setNotFixed(x);},_getTopPositionForRef:function(v){var w=this.refs[v];!w?i(0):undefined;var x=q.getElementPosition(p.findDOMNode(w),'viewport').y;if(this._scroll<0)x+=this._scroll;return x;},_getTopBoundWithOffset:function(){return r.getTop()+this.props.topOffset;},_isContainerBelowViewportTop:function(){var v=this._getTopPositionForRef('container');return v>=this._getTopBoundWithOffset();},_isColumnLargerThanViewport:function(){var v=q.getViewportDimensions().y-r.getBottom()-this._getTopBoundWithOffset();return p.findDOMNode(this.refs.column).offsetHeight>v;},_isBottomOfColumnVisible:function(){var v=this._getTopPositionForRef('column'),w=q.getElementDimensions(p.findDOMNode(this.refs.column),'viewport').y,x=v+w;return x<=q.getViewportDimensions().y-r.getBottom();},_isTopOfColumnVisible:function(){var v=this._getTopPositionForRef('column');return v>=this._getTopBoundWithOffset();},_getFixedLeft:function(){return (q.getElementPosition(p.findDOMNode(this.refs.container),'viewport').x);},_setFixedToBottom:function(){this.setState({fixed:'bottom',fixedBottom:r.getBottom(),fixedLeft:this._getFixedLeft()});},_setFixedToTop:function(){this.setState({fixed:'top',fixedLeft:this._getFixedLeft(),fixedTop:this._getTopBoundWithOffset()});},_setNotFixed:function(v){this.setState({fixed:false,top:v});},_updateContainerHeight:function(){p.findDOMNode(this.refs.container).style.height=p.findDOMNode(this.refs.column).offsetHeight+'px';},_updateColumnWidth:function(){p.findDOMNode(this.refs.column).style.width=p.findDOMNode(this.refs.container).offsetWidth+'px';}});u.EVENT_SHOULD_ADJUST=t;f.exports=u;},null);
__d('XUIDialogCloseButton.react',['React','XUIDialogButton.react','fbt'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=h.createClass({displayName:'XUIDialogCloseButton',render:function(){return (h.createElement(i,babelHelpers['extends']({},this.props,{action:'cancel',label:j._("Close")})));}});f.exports=k;},null);
__d('XUIDialogSaveButton.react',['React','XUIDialogButton.react','fbt'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=h.createClass({displayName:'XUIDialogSaveButton',render:function(){return (h.createElement(i,babelHelpers['extends']({},this.props,{action:'confirm',label:j._("Save")})));}});f.exports=k;},null);
__d('XUIMenuSeparator.react',['MenuSeparator.react'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=h;f.exports=i;},null);
__d('XUIMenuStaticItem.react',['MenuStaticItem.react'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=h;f.exports=i;},null);
__d("Collection",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i,j){if(!i.__collection__){var k=new Function();for(var l in i.prototype)k.prototype[l]=h._call.bind(null,l);i.__collection__=k;}var m=new i.__collection__();m._elements=j;return m;}h._call=function(i){var j=Array.prototype.slice.call(arguments,1);this._elements.forEach(function(k){k[i].apply(k,j);});return this;};f.exports=h;},null);
__d('Drag',['Event','Arbiter','DOM','Style','Vector'],function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();var m={};m.currentDraggable=null;m.grab=function(n){if(m.currentDraggable)m._onmouseup();n.lastDragOver=null;m.attachDragEvents();m.currentDraggable=n;};m.attachDragEvents=function(){document.onselectstart=function(){document.onselectstart=null;return false;};if(m.dragEventsAttached)return;m.dragEventsAttached=true;i.subscribe('scroller/scroll',m._onmousemove);h.listen(document,{mousemove:m._onmousemove,mouseup:m._onmouseup});};m.droppables={};m.addDroppable=function(n,o){(m.droppables[n]=m.droppables[n]||[]).push(o);};m.removeDroppable=function(n,o){m.droppables[n]=m.droppables[n].filter(function(p){return p!=o;});};m.getOffsetParent=function(n){if(j.isNodeOfType(n,['body','html']))return document.body;while((n=n.parentNode)&&n!==document.body)if(k.get(n,'position')!=='static')return n;return document.body;};m._onmousemove=function(event,n){if(!m.currentDraggable)return;var o=n||l.getEventPosition(event),p=m.currentDraggable,q=m.droppables[p.namespace];if(p.namespace&&p.active&&q){var r={};q.forEach(function(x){r[x.zIndex]=x.zIndex;});var s=[];for(var t in r)s.push(r[t]);s.sort();var u=p.lastDragOver,v=null;for(var w=s.length-1;w>=0;w--)if(u&&u.dom!=null&&u.zIndex==s[w]&&u.isDraggedOver(o)){v=u;break;}else for(t=0;t<q.length;t++){if(s[w]!=q[t].zIndex)continue;if(u!=q[t]&&p.dom!=q[t].dom&&q[t].isDraggedOver(o)){v=q[t];w=-1;break;}}if(v&&v!=u){v.ondragover(p);m.currentDraggable.adjustCursorPosition();}if(v)v.ondragmove(p,o.sub(l.getElementPosition(v.dom)));p.lastDragOver=v;}m.currentDraggable._onmousemove(o);};m._onmouseup=function(n){document.onselectstart=null;if(m.currentDraggable){m.currentDraggable._ondrop();m.currentDraggable=null;}};f.exports=m;},null);
__d('Draggable',['Event','Arbiter','Collection','DOM','Drag','Rect','Style','Vector','emptyFunction'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){if(c.__markCompiled)c.__markCompiled();function q(s){'use strict';this.canvas=s;this.scrollZone=50;this.velocity=100;this.coefficient=1;}q.prototype.activate=function(){'use strict';this.activate=p;this.event=h.listen(document,'mousemove',this._onmousemove.bind(this));this.interval=setInterval(this._intervalHandler.bind(this),50);this.cursor=null;};q.prototype.deactivate=function(){'use strict';delete this.activate;this.event&&this.event.remove();this.event=null;clearInterval(this.interval);};q.prototype._onmousemove=function(event){'use strict';this.cursor=o.getEventPosition(event);};q.prototype._intervalHandler=function(){'use strict';if(!this.cursor)return;var s=this.canvas==document.body?m.getViewportBounds():new m(this.canvas),t=new m(this.cursor.y-s.t,s.r-this.cursor.x,s.b-this.cursor.y,this.cursor.x-s.l),u=new o(0,0);if(t.t<t.b&&t.t<this.scrollZone){u.y=-this.scrollZone+t.t;}else if(t.b<this.scrollZone)u.y=this.scrollZone-t.b;u.y=this._doMath(u.y);if(t.l<t.r&&t.l<this.scrollZone){u.x=-this.scrollZone+t.l;}else if(t.r<this.scrollZone)u.x=this.scrollZone-t.r;u.x=this._doMath(u.x);if(u.x||u.y){u.scrollElementBy(this.canvas);if(document.body==this.canvas){var v=o.getScrollPosition();u.scrollElementBy(this.canvas);var w=o.getScrollPosition();this.cursor=this.cursor.add(w.sub(v));}else u.scrollElementBy(this.canvas);i.inform('scroller/scroll',this.cursor);}};q.prototype._doMath=function(s){'use strict';s=s>=0?Math.min(s,this.scrollZone):Math.max(s,-this.scrollZone);return Math.floor(Math.pow(s/this.scrollZone*this.velocity,this.coefficient));};q.findScrollParent=function(s){'use strict';var t;s=s.parentNode;while(s){if(s.scrollHeight!=s.offsetTop){t=n.get(s,'overflowY');if(t=='scroll'||t=='auto')return s;}s=s.parentNode;}return document.body;};function r(s){'use strict';if(!s)throw new Error('Element should be a DOM node');if(!(this instanceof r)){if(s instanceof Array){var t=[];s.forEach(function(u){t.push(new r(u));});return new j(r,t);}else return new r(s);}else{this.data={};this.handles=[];this.dom=s;this.boundingBox=null;this.useScroller=true;this.grabPctX=this.grabPctY=0;this._shouldKillEvents=true;this.addHandle(this.dom);}}r.prototype.destroy=function(){'use strict';this.handles.forEach(function(s){this.removeHandle(s.obj);}.bind(this));this.data=this.dom=null;};r.prototype.adjustCursorPosition=function(){'use strict';var s=o.getElementDimensions(this.dom);this.cursorPositionVector=new o(parseInt(this.grabPctX*s.x,10),parseInt(this.grabPctY*s.y,10));};r.prototype._onclick=function(event){'use strict';if(!this._shouldKillEvents)return true;if(this.active)return h.kill(event);};r.prototype._ongrab=function(s){'use strict';this.ongrab();if(this.useScroller){if(!this.scroller)this.scroller=new q(q.findScrollParent(this.dom));this.scroller.activate();}if(this.active){if(!this.oldPosition)this.oldPosition=this.dom.style.position;var t=l.getOffsetParent(this.dom);if(t!==document.body)s=s.sub(o.getElementPosition(t));this.dom.style.position=this.absolute?'absolute':'relative';s.sub(this.cursorPositionVector).setElementPosition(this.dom);}};r.prototype._onmousedown=function(event){'use strict';if(!(event.which&&event.which===1||event.button&&event.button===1))return;var s=event.getTarget();if(k.isNodeOfType(s,['input','select','textarea','object','embed']))return true;var t=o.getEventPosition(event),u=o.getElementDimensions(this.dom);this.draggableInitialVector=o.getElementPosition(this.dom);this.cursorPositionVector=t.sub(this.draggableInitialVector);this.grabPctX=u.x===0?0:this.cursorPositionVector.x/u.x;this.grabPctY=u.y===0?0:this.cursorPositionVector.y/u.y;l.grab(this,event);if(this.gutter){this.cursorInitialVector=t;}else{this._setActive(true);this._ongrab(t);}if(!this._shouldKillEvents)return true;return h.kill(event);};r.prototype._onmousemove=function(s){'use strict';if(!this.active)if(s.distanceTo(this.cursorInitialVector)>=this.gutter){this._setActive(true);this._ongrab(s);}if(this.active){var t=s.sub(this.cursorPositionVector),u;if(this.boundingBox){var v=m.newFromVectors(t,o.getElementDimensions(this.dom));v=v.boundWithin(this.boundingBox);t=v.getPositionVector();if(this.boundingBox.w()===0){u=new o(this.draggableInitialVector.x,t.y,'document');}else if(this.boundingBox.h()===0){u=new o(t.x,this.draggableInitialVector.y,'document');}else u=t;}else u=t;var w=l.getOffsetParent(this.dom);if(w!==document.body)u=u.sub(o.getElementPosition(w));u.setElementPosition(this.dom);this.ondrag(s);}};r.prototype._ondrop=function(){'use strict';this.scroller&&this.scroller.deactivate();if(this.active){setTimeout(function(){this._setActive(false);}.bind(this),0);this.ondrop(this.scroller&&this.scroller.cursor);if(this.lastDragOver)this.lastDragOver.ondrop(this);}};r.prototype.killDrag=function(){'use strict';this._setActive(false);l._onmouseup();};r.prototype.forceDrop=function(){'use strict';l._onmouseup();};r.prototype.setBoundingBox=function(s){'use strict';this.boundingBox=s;return this;};r.prototype.resetPosition=function(){'use strict';this.dom.style.position=this.oldPosition;this.oldPosition=null;this.dom.style.left='';this.dom.style.top='';return this;};r.prototype.setUseAbsolute=function(s){'use strict';this.absolute=s;return this;};r.prototype.setDragHandler=function(s){'use strict';this.ondrag=s;return this;};r.prototype.setGrabHandler=function(s){'use strict';this.ongrab=s;return this;};r.prototype.setDropHandler=function(s){'use strict';this.ondrop=s;return this;};r.prototype.setGutter=function(s){'use strict';this.gutter=s;return this;};r.prototype.setNamespace=function(s){'use strict';this.namespace=s;return this;};r.prototype.setUseScroller=function(s){'use strict';this.useScroller=s;return this;};r.prototype.setAvoidKillingEvents=function(s){'use strict';this._shouldKillEvents=!s;return this;};r.prototype.addHandle=function(s){'use strict';if(this.handles.length==1&&this.handles[0].obj==this.dom)this.removeHandle(this.dom);this.handles.push({obj:s,evt:[h.listen(s,'mousedown',this._onmousedown.bind(this)),h.listen(s,'click',this._onclick.bind(this)),h.listen(s,'drag',this._killUnlessActive.bind(this)),h.listen(s,'selectstart',this._killUnlessActive.bind(this))]});return this;};r.prototype.removeHandle=function(s){'use strict';this.handles=this.handles.filter(function(t){if(t.obj!=s){return true;}else{t.evt.forEach(function(u){u.remove();});return false;}});};r.prototype.getDOM=function(){'use strict';return this.dom;};r.prototype.setKey=function(s,t){'use strict';this.data[s]=t;return this;};r.prototype.getKey=function(s){'use strict';return this.data[s];};r.prototype._setActive=function(s){'use strict';if(!this.dom)return;this.dom.activeDrag=this.active=s;for(var t=0;t<this.handles.length;t++)this.handles[t].obj.activeDrag=s;};r.prototype._killUnlessActive=function(s){'use strict';if(!this._shouldKillEvents)return;if(s.getTarget()!==document.activeElement)return s.kill();};r.prototype.ondrag=p;r.prototype.ongrab=p;r.prototype.ondrop=p;r.prototype.gutter=0;r.prototype.handles=null;f.exports=r;},null);
__d('PagesComposerTargeting.react',['PagesComposerAdsTargetingSection.react','React'],function a(b,c,d,e,f,g,h,i){'use strict';if(c.__markCompiled)c.__markCompiled();var j=i.PropTypes,k=i.createClass({displayName:'PagesComposerTargeting',propTypes:{initialTargetingSpec:j.object,onTargetingChange:j.func.isRequired,canSeeCompleteList:j.bool,useTargetingAsFilter:j.bool,feedTargetingReachEstimateGK:j.bool,canSeeDemographicOptions:j.bool},render:function(){return (i.createElement(h,this.props));}});f.exports=k;},null);
__d('ReactComposerPhotoCarouselActionType',['keyMirror'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();f.exports=h({SELECT_PHOTO_CAROUSEL:null,UNSELECT_PHOTO_CAROUSEL:null,PREVIEW_COMPLETED:null,PREVIEW_INCOMPLETED:null,HIDE_CAROUSEL_URL_INPUT_AREA:null,SHOW_CAROUSEL_URL_INPUT_AREA:null,SEEN_NUX:null});},null);
__d('ScrollColumnRenderer',['DOMContainer.react','React','ReactRenderer','ScrollColumn.react'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l={init:function(m,n,o){j.constructAndRenderComponentAcrossTransitions(k,babelHelpers['extends']({children:[i.createElement(h,{key:'content'},m)]},o),n);}};f.exports=l;},null);