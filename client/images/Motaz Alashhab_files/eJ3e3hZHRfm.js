/*!CK:2075661547!*//*1456280715,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["vb2Su"]); }

__d('PhotocropConstraintConstants',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={BOUNDARY:'boundary',SQUARE:'square',WIDE:'wide'};h.getAspectRatioForType=function(i){switch(i){case h.SQUARE:return 1;case h.WIDE:return 16/9;default:return null;}};f.exports=h;},null);
__d('PhotocropConstraint',['Vector','PhotocropConstraintConstants','clamp'],function a(b,c,d,e,f,g,h,i,j){var k,l,m,n;if(c.__markCompiled)c.__markCompiled();function o(s){'use strict';this.photocrop=s;this.pos=null;}o.prototype.onMouseMove=function(s,t,u){'use strict';var v=s.sub(this.pos);if(t){this.onResize(v,u);}else this.onMove(v);this.pos=this.pos.add(v);};o.prototype.onMouseDown=function(s){'use strict';this.pos=s;};o.prototype.onResize=function(s,t){'use strict';};o.prototype.onMove=function(s){'use strict';var t=this.photocrop.box,u=this.photocrop.wrapper.offsetWidth,v=this.photocrop.wrapper.offsetHeight;s.x=j(s.x,-t.l,u-t.r);s.y=j(s.y,-t.t,v-t.b);this.photocrop.box=t.add(s);};k=babelHelpers.inherits(p,o);l=k&&k.prototype;p.prototype.onResize=function(s,t){'use strict';var u=this.photocrop.min_width,v=this.photocrop.min_height,w=this.photocrop.box,x=this.photocrop.wrapper.offsetWidth,y=this.photocrop.wrapper.offsetHeight;switch(t){case 'ne':w.r+=s.x=j(s.x,w.l+u-w.r,x-w.r);w.t+=s.y=j(s.y,-w.t,w.b-v-w.t);break;case 'nw':w.l+=s.x=j(s.x,-w.l,w.r-u-w.l);w.t+=s.y=j(s.y,-w.t,w.b-v-w.t);break;case 'se':w.r+=s.x=j(s.x,w.l+u-w.r,x-w.r);w.b+=s.y=j(s.y,w.t+v-w.b,y-w.b);break;case 'sw':w.l+=s.x=j(s.x,-w.l,w.r-u-w.l);w.b+=s.y=j(s.y,w.t+v-w.b,y-w.b);break;}};function p(){'use strict';k.apply(this,arguments);}m=babelHelpers.inherits(q,o);n=m&&m.prototype;q.prototype.setRatio=function(s){'use strict';this.ratio=s;return this;};q.prototype.onMouseDown=function(s){'use strict';n.onMouseDown.call(this,s);var t=this.photocrop.box,u=t.r-t.l,v=t.b-t.t;this.displacement=new h(u,v);};q.prototype.$AspectRatioConstraint1=function(s,t,u,v,w,x){'use strict';var y,z,aa,ba,ca;y=this.displacement.x/this.displacement.y;z=ba=j(t,s,u);aa=ca=j(w,v,x);if(y>this.ratio){aa=j(z/this.ratio,v,x);z=aa*this.ratio;}else{z=j(aa*this.ratio,s,u);aa=z/this.ratio;}return new h(z,aa);};q.prototype.onResize=function(s,t){'use strict';var u=this.photocrop.min_width,v=this.photocrop.min_height,w=this.photocrop.box,x=this.photocrop.wrapper.offsetWidth,y=this.photocrop.wrapper.offsetHeight,z;switch(t){case 'ne':this.displacement=this.displacement.add(s.x,-s.y);z=this.$AspectRatioConstraint1(u,this.displacement.x,x-w.l,v,this.displacement.y,w.b);w.r=w.l+z.x;w.t=w.b-z.y;break;case 'nw':this.displacement=this.displacement.add(-s.x,-s.y);z=this.$AspectRatioConstraint1(u,this.displacement.x,w.r,v,this.displacement.y,w.b);w.l=w.r-z.x;w.t=w.b-z.y;break;case 'se':this.displacement=this.displacement.add(s.x,s.y);z=this.$AspectRatioConstraint1(u,this.displacement.x,x-w.l,v,this.displacement.y,y-w.t);w.r=w.l+z.x;w.b=w.t+z.y;break;case 'sw':this.displacement=this.displacement.add(-s.x,s.y);z=this.$AspectRatioConstraint1(u,this.displacement.x,w.r,v,this.displacement.y,y-w.t);w.l=w.r-z.x;w.b=w.t+z.y;break;}};function q(){'use strict';m.apply(this,arguments);}function r(s,t){var u;switch(t){case i.BOUNDARY:u=new p(s);break;case i.WIDE:case i.SQUARE:u=new q(s).setRatio(i.getAspectRatioForType(t));break;default:throw Error('unsupported PhotocropConstraint type');}return u;}f.exports=r;},null);
__d('Photocrop2',['ArbiterMixin','PhotocropConstraintConstants','CSS','DOM','Event','PhotosConst','Rect','Style','Vector','mixin','PhotocropConstraint'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var s,t;if(c.__markCompiled)c.__markCompiled();s=babelHelpers.inherits(u,q(h));t=s&&s.prototype;function u(v,w,x){'use strict';t.constructor.call(this);this.photo=v;var y=this.getPhotoDimensions();if(x){this.imageDimensions=new p(x.x,x.y);}else this.imageDimensions=new p(y.x,y.y);w.height=w.height||m.PIC_NORMAL_FBX_SIZE;w.width=w.width||m.PIC_NORMAL_FBX_SIZE;Object.assign(this,{target:this.photo.parentNode,create_target:false,target_parent:this.photo.parentNode,min_width:m.PIC_NORMAL_FBX_SIZE,min_height:m.PIC_NORMAL_FBX_SIZE,center_x:(y.x||w.width)/2,center_y:(y.y||w.height)/2,constraint_type:i.BOUNDARY},w);this._unscaledMinHeight=this.min_height;this._unscaledMinWidth=this.min_width;this._unscaledHeight=this.height;this._unscaledWidth=this.width;this.setInitialDimensionsAndPos();if(this.create_target){this.target=k.create('div');j.addClass(this.target,'stageCropper');this.target_parent.appendChild(this.target);}j.addClass(this.target,'photocrop');['bg','wrapper','viewport'].forEach(function(z){this[z]=k.create('div');j.addClass(this[z],z);}.bind(this));this.highlight=k.create('img');j.addClass(this.highlight,'highlight');this.setHighlightSource();j.addClass(this.wrapper,'photocropWrapper');this.target.appendChild(this.bg);this.target.appendChild(this.wrapper);this.wrapper.appendChild(this.highlight);this.wrapper.appendChild(this.viewport);['ne','nw','sw','se'].forEach(function(z){var aa=k.create('div');j.addClass(aa,z);aa.setAttribute('data-cropcorner',z);this.viewport.appendChild(aa);j.addClass(aa,'profilePicViewportGrabby');}.bind(this));l.listen(this.viewport,{mousedown:this.mousedown.bind(this),dragstart:l.kill,selectstart:l.kill,click:l.stop});l.listen(document,{mousemove:this.mousemove.bind(this),mouseup:this.mouseup.bind(this)});l.listen(window,{resize:this.adjustForResize.bind(this)});this.realignToPictureSize();this.redraw();}u.prototype.setInitialDimensionsAndPos=function(){'use strict';this._constraint=r(this,this.constraint_type);var v=i.getAspectRatioForType(this.constraint_type),w=this.getPhotoDimensions();if(v){this._unscaledMinHeight=this._unscaledMinWidth/v;this._unscaledHeight=this._unscaledWidth/v;}this.setNewRatio();var x=Math.min(this.width,w.x),y=Math.min(this.height,w.y);this.min_width=Math.min(this.min_width,w.x);this.min_height=Math.min(this.min_height,w.y);if(v)if(w.x/w.y>v){y=Math.min(y,w.y);x=y*v;this.min_width=this.min_height*v;}else{x=Math.min(x,w.x);y=x/v;this.min_height=this.min_width/v;}var z=this.center_x-x/2,aa=this.center_y-y/2;this.box=new n(aa,z+x,aa+y,z);};u.prototype.getPhotoDimensions=function(){'use strict';return new p(Math.round(parseFloat(o.get(this.photo,'width'))),Math.round(parseFloat(o.get(this.photo,'height'))));};u.prototype.getPhotoPosition=function(){'use strict';return new p(this.photo.offsetLeft,this.photo.offsetTop);};u.prototype.setHighlightSource=function(){'use strict';this.highlight.src=this.photo.src;};u.prototype.setConstraintType=function(v){'use strict';this.constraint_type=v;this.setInitialDimensionsAndPos();this.adjustForResize();};u.prototype.adjustForResize=function(){'use strict';var v=this.ratio,w=this.setNewRatio(),x=w/v;this.box.t*=x;this.box.l*=x;this.box.b*=x;this.box.r*=x;this.redraw();this.realignToPictureSize();};u.prototype.setNewRatio=function(){'use strict';this.ratio=this.getPhotoDimensions().x/this.imageDimensions.x;this.min_width=this.ratio*this._unscaledMinWidth;this.min_height=this.ratio*this._unscaledMinHeight;this.width=Math.max(1,this.ratio)*this._unscaledWidth;this.height=Math.max(1,this.ratio)*this._unscaledHeight;return this.ratio;};u.prototype.realignToPictureSize=function(){'use strict';var v=this.photo;if(!v)return;var w=this.getPhotoDimensions(),x=this.getPhotoPosition();[this.bg,this.wrapper].forEach(function(y){y.style.width=w.x+'px';y.style.height=w.y+'px';y.style.top=x.y+'px';y.style.left=x.x+'px';});};u.prototype.redraw=function(){'use strict';var v=[this.box.t,this.box.r,this.box.b,this.box.l],w=this.getPhotoDimensions();this.highlight.style.width=w.x+"px";this.highlight.style.height=w.y+"px";this.highlight.style.clip="rect("+v.join("px ")+"px)";this.viewport.style.top=this.box.t+"px";this.viewport.style.left=this.box.l+"px";this.viewport.style.height=this.box.b-this.box.t+"px";this.viewport.style.width=this.box.r-this.box.l+"px";};u.prototype.done=function(v){'use strict';this.freezeViewport=true;if(!v){[this.bg,this.wrapper].forEach(k.remove);if(this.create_target){k.remove(this.target);this.target=null;}else j.removeClass(this.target,'photocrop');}var w=Math.round(this.box.l*(1/this.ratio)),x=Math.round(this.box.t*(1/this.ratio)),y=Math.round(this.box.r*(1/this.ratio)),z=Math.round(this.box.b*(1/this.ratio));this.inform('done',v);return {x:Math.max(w,0),y:Math.max(x,0),width:y-Math.max(w,0),height:z-Math.max(x,0)};};u.prototype.reset=function(){'use strict';this.freezeViewport=false;};u.prototype.mousedown=function(v){'use strict';if(this.freezeViewport)return;this.mouseTarget=v.getTarget();this._constraint.onMouseDown(p.getEventPosition(v));j.addClass(document.body,'draggingMode');return false;};u.prototype.mousemove=function(v){'use strict';if(!this.mouseTarget)return;this._constraint.onMouseMove(p.getEventPosition(v),this.mouseTarget!==this.viewport,this.mouseTarget.getAttribute('data-cropcorner'));this.redraw();return false;};u.prototype.mouseup=function(v){'use strict';this.mouseTarget=null;j.removeClass(document.body,'draggingMode');};f.exports=u;},null);
__d("XProfilePicCropAsyncController",["XController"],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports=c("XController").create("\/profile\/picture\/crop_profile_pic\/",{photo_id:{type:"Int",required:true},profile_id:{type:"Int",required:true},height:{type:"Float",required:true},width:{type:"Float",required:true},x:{type:"Float",required:true},y:{type:"Float",required:true},source:{type:"Enum",defaultValue:"timeline",enumType:1},method:{type:"Enum",defaultValue:"existing",enumType:1},redirect_uri:{type:"String"},sticker_id:{type:"Int"},expiration_duration:{type:"Int"},caption:{type:"String"}});},null);
__d("XProfilePicMakeAsyncController",["XController"],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports=c("XController").create("\/profile\/picture\/make_profile_pic\/",{end_x:{type:"Float"},end_y:{type:"Float"},photo_id:{type:"Int",required:true},profile_id:{type:"Int",required:true},source:{type:"Enum",defaultValue:"timeline",enumType:1},start_x:{type:"Float"},start_y:{type:"Float"},method:{type:"Enum",defaultValue:"existing",enumType:1},expiration_duration:{type:"Int"},caption:{type:"String"}});},null);
__d('XProfilePicSaver',['AsyncRequest','AsyncUploadRequest','ArbiterMixin','ProfilePictureFlowLogging','XProfilePicCropAsyncController','XProfilePicMakeAsyncController','mixin','tidyEvent'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p,q;if(c.__markCompiled)c.__markCompiled();var r=k.step;p=babelHelpers.inherits(s,n(j));q=p&&p.prototype;function s(t,u,v){'use strict';q.constructor.call(this);this.$XProfilePicSaver1=t;this.$XProfilePicSaver2=u;this.$XProfilePicSaver3=v;}s.prototype.setProfilePhotoSource=function(t){'use strict';this.$XProfilePicSaver4=t;return this;};s.prototype.setProfilePhotoMethod=function(t){'use strict';this.$XProfilePicSaver5=t;return this;};s.prototype.setFlowType=function(t){'use strict';this.$XProfilePicSaver6=t;return this;};s.prototype.saveCroppedProfilePic=function(t,u,v){'use strict';var w=l.getURIBuilder().setFloat('x',t.x).setFloat('y',t.y).setFloat('width',Math.min(t.width,1)).setFloat('height',Math.min(t.height,1));u&&w.setInt('sticker_id',u.id);this.$XProfilePicSaver7=true;this.$XProfilePicSaver8(w,u,v);this.$XProfilePicSaver9(r.CROP_SAVING);};s.prototype.saveAsProfilePic=function(){'use strict';this.$XProfilePicSaver10();};s.prototype.saveAsProfilePicWithPosition=function(t,u){'use strict';this.$XProfilePicSaver10(t,u);};s.prototype.$XProfilePicSaver10=function(t,u){'use strict';this.$XProfilePicSaver7=false;var v=m.getURIBuilder();if(t)v.setFloat('start_x',100*t.startX).setFloat('start_y',100*t.startY).setFloat('end_x',100*t.endX).setFloat('end_y',100*t.endY);this.$XProfilePicSaver8(v,null,u);this.$XProfilePicSaver9(r.PREVIOUS_PIC_SAVING);};s.prototype.$XProfilePicSaver11=function(t){'use strict';this.inform('error',t);this.$XProfilePicSaver9(this.$XProfilePicSaver7?r.CROP_FAIL:r.PREVIOUS_PIC_FAIL);};s.prototype.$XProfilePicSaver9=function(t){'use strict';this.$XProfilePicSaver6&&k.setFlowType(this.$XProfilePicSaver6);k.log(t);};s.prototype.$XProfilePicSaver8=function(t,u,v){'use strict';t.setInt('photo_id',this.$XProfilePicSaver1).setInt('profile_id',this.$XProfilePicSaver2).setEnum('source',this.$XProfilePicSaver4||'photo_view').setInt('expiration_duration',this.$XProfilePicSaver3);this.$XProfilePicSaver5&&t.setEnum('method',this.$XProfilePicSaver5);if(v)t.setString('caption',v);if(u){u.canvas.toBlob(function(w){var x=new i().setFiles({farr:w}).setAllowCrossOrigin(true).setURI(t.getURI());o([x.subscribe('success',this.$XProfilePicSaver12.bind(this)),x.subscribe('failure',this.$XProfilePicSaver13.bind(this))]);x.send();}.bind(this));}else new h(t.getURI()).setErrorHandler(this.$XProfilePicSaver11.bind(this)).setHandler(this.$XProfilePicSaver14.bind(this)).send();this.$XProfilePicSaver9(r.LOADING);};s.prototype.$XProfilePicSaver12=function(t,u){'use strict';this.$XProfilePicSaver14(u.getResponse());};s.prototype.$XProfilePicSaver13=function(t,u){'use strict';this.$XProfilePicSaver11(u.getResponse());};s.prototype.$XProfilePicSaver14=function(t){'use strict';this.inform('success',t);this.$XProfilePicSaver9(this.$XProfilePicSaver7?r.CROP_SUCCESS:r.PREVIOUS_PIC_SUCCESS);this.$XProfilePicSaver9(r.SUCCESS);};f.exports=s;},null);
__d('ProfilePicRequestCreator',['URI','XProfilePicSaver','tidyEvent'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();function k(l,m){'use strict';this.saver=new i(String(l),String(m));j([this.saver.subscribe('success',this.$ProfilePicRequestCreator1.bind(this)),this.saver.subscribe('error',this.$ProfilePicRequestCreator2.bind(this))]);this.setSuccessURI(new h('/profile.php').setQueryData({id:m}));this.setErrorURI(new h('/photo.php').setQueryData({pid:l,profile_id:m}));}k.prototype.setSuccessURI=function(l){'use strict';this.$ProfilePicRequestCreator3=l;return this;};k.prototype.setErrorURI=function(l){'use strict';this.$ProfilePicRequestCreator4=l;return this;};k.prototype.setProfilePhotoSource=function(l){'use strict';l&&this.saver.setProfilePhotoSource(l);return this;};k.prototype.setProfilePhotoMethod=function(l){'use strict';l&&this.saver.setProfilePhotoMethod(l);return this;};k.prototype.setFlowType=function(l){'use strict';this.saver.setFlowType(l);return this;};k.prototype.savePic=function(){'use strict';this.saver.saveAsProfilePic();};k.prototype.saveCrop=function(l,m){'use strict';this.saver.saveCroppedProfilePic({x:l.x/m.x,y:l.y/m.y,width:l.width/m.x,height:l.height/m.y});};k.prototype.$ProfilePicRequestCreator1=function(){'use strict';this.$ProfilePicRequestCreator3.go(true);};k.prototype.$ProfilePicRequestCreator2=function(){'use strict';this.$ProfilePicRequestCreator4.go(true);};f.exports=k;},null);
__d('SpotlightViewerBottomBar',['LeftRight.react','React','cx','joinClasses'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l=i.createClass({displayName:'SpotlightViewerBottomBar',render:function(){var m=Array.isArray(this.props.children)?this.props.children:[this.props.children],n="_4_8n _51an";if(this.props.className)n=k(n,this.props.className);if(m.length===1)return (i.createElement('div',{className:n},m[0]));n=k(n,"_50-m");return (i.createElement(h,{className:n},m[0],m[1]));}});f.exports=l;},null);
__d('SpotlightViewerBottomBarGroup',['React','cx'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j=h.createClass({displayName:'SpotlightViewerBottomBarGroup',render:function(){var k=this.props.itemmargin||'right',l=(k=='left'?"marginLeft":'')+(k=='right'?' '+"marginRight":'')+(' '+"_4_8i");return (h.createElement('div',{className:l},this.props.children));}});f.exports=j;},null);
__d('SpotlightViewerBottomBarLink',['Link.react','React','cx'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=i.createClass({displayName:'SpotlightViewerBottomBarLink',render:function(){return (i.createElement(h,babelHelpers['extends']({},this.props,{className:"_4_8j _4_8k"}),this.props.children));}});f.exports=k;},null);
__d('SpotlightViewerCheck',['Link.react','React','cx'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=i.createClass({displayName:'SpotlightViewerCheck',getInitialState:function(){return {selected:this.props.selected};},render:function(){var l=(this.props.selected?"_4_d3":'')+(' '+"_4_d2")+(' '+"_51an")+(' '+"_4bi")+(this.props.bounce?' '+"_3yk":'');return i.createElement(h,{className:l,onClick:this.props.onClick});}});f.exports=k;},null);
__d('SpotlightViewerCroppingBar',['React','SpotlightViewerBottomBar','SpotlightViewerBottomBarGroup','SpotlightViewerBottomBarLink','cx','fbt'],function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();var n=h.createClass({displayName:'SpotlightViewerCroppingBar',_getBarGroupContents:function(){if(this.props.saving)return (h.createElement('span',{className:"_4_8j"},m._("Saving your new profile picture")));return [h.createElement(k,{onClick:this.props.onDone},m._("Done Cropping")),h.createElement(k,{onClick:this.props.onCancel},m._("Cancel"))];},render:function(){return (h.createElement(i,null,h.createElement(j,null,this._getBarGroupContents())));}});f.exports=n;},null);
__d('SpotlightViewerOptionsMenu',['ContextualLayerAutoFlip','React','ReactMenu','PopoverMenu.react','SpotlightViewerBottomBarLink','fbt'],function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();var n=j.Item,o=i.createClass({displayName:'SpotlightViewerOptionsMenu',_onItemClick:function(p,q){this.props.callback&&this.props.callback(q.item.getValue());},render:function(){var p=i.createElement(j,{onItemClick:this._onItemClick},this.props.items.map(function(q){return (i.createElement(n,{value:q.value,title:q.label,href:q.href||'#'},q.label));}));return (i.createElement(k,{menu:p,layerBehaviors:[h],onShow:this.props.onShow,onHide:this.props.onHide},i.createElement(l,null,m._("Options"))));}});f.exports=o;},null);
__d('SpotlightViewerUpdateUrlOnNav',['PageTransitions','PhotoUtils','URI','VaultBoxURI','goURI'],function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();function m(n){'use strict';this._viewer=n;this._registered=false;this._shouldUpdateURL=false;this._suppressNextEvent=false;}m.prototype.enable=function(){'use strict';this._registered=false;this._subscriptions=[this._viewer.subscribe('open',this._onOpen.bind(this)),this._viewer.subscribe('close',this._onClose.bind(this)),this._viewer.subscribe('photo_change',this._onPhotoChange.bind(this))];this._enabled=true;};m.prototype.disable=function(){'use strict';for(var n=0;n<this._subscriptions.length;n++)this._subscriptions[n].unsubscribe();this._subscriptions=[];this._enabled=false;};m.prototype._registerTransition=function(){'use strict';if(this._registered)return;h.registerHandler(this._handleTransition.bind(this));this._registered=true;};m.prototype._handleTransition=function(n){'use strict';if(!this._enabled)return false;if(this._shouldUpdateURL){this._shouldUpdateURL=false;h.transitionComplete();return true;}this._suppressNextEvent=true;if(this._viewer.openURL(n)){h.transitionComplete();return true;}if(this._viewer.isOpen()&&k.isVaultArchiveURI(n)){this._suppressNextEvent=true;this._viewer.close();h.transitionComplete();return true;}this._suppressNextEvent=false;return false;};m.prototype._onOpen=function(){'use strict';this._registerTransition();this._openURI=j.getMostRecentURI().getUnqualifiedURI();};m.prototype._onClose=function(){'use strict';if(this._suppressNextEvent){this._suppressNextEvent=false;return;}var n=this._viewer.removePermalinkQueryData(this._openURI);this._updateURL(n);};m.prototype._onPhotoChange=function(n,o){'use strict';if(this._suppressNextEvent){this._suppressNextEvent=false;return;}this._updateURL(i.getPermalinkFromData(o));};m.prototype._updateURL=function(n){'use strict';this._shouldUpdateURL=true;l(n);};f.exports=m;},null);
__d('SpotlightVaultViewer',['Arbiter','ArbiterMixin','AsyncDialog','AsyncRequest','BadgedButton','CSSAnimations','LoadingIndicator.react','Parent','Photocrop2','PhotosConst','PhotoStore','PhotosUploadWaterfall','PhotoUtils','ProfilePicRequestCreator','ProfilePictureFlowLogging','React','ReactDOM','SpotlightViewer','SpotlightViewerAutoResize','SpotlightViewerBehaviorsMixin','SpotlightViewerBottomBar','SpotlightViewerBottomBarGroup','SpotlightViewerBottomBarLink','SpotlightViewerCheck','SpotlightViewerClose','SpotlightViewerCoreMixin','SpotlightViewerCroppingBar','SpotlightViewerDimensionMixin','SpotlightViewerOptionsMenu','SpotlightViewerPagers','SpotlightViewerPageWithKeys','SpotlightViewerUpdateUrlOnNav','SpotlightViewport','SubscriptionsHandler','URI','VaultBoxURI','VaultPageGrid','Vector','cx','fbt'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la,ma,na,oa,pa,qa,ra,sa,ta,ua){if(c.__markCompiled)c.__markCompiled();var va=w.createClass({displayName:'SpotlightVaultViewer',mixins:[i,aa,ga,ia],behaviors:[ma,la,z],getViewerID:function(){return 'vaultbox';},optionsMenuValues:{DOWNLOAD:0,CROP:1,ROTATE_LEFT:2,ROTATE_RIGHT:3,MAKE_COVER_PHOTO:4},getInitialState:function(){this._grid=ra.getInstance(this.props.gridid);this._subscriptions=new oa();return {photoData:this._getInitialPhotoData(),open:true,selectionSet:this._grid.getSelectionSet(),croppingMode:false,savingMode:false,menuOpen:false,bounce:false};},_getInitialPhotoData:function(){var wa=r.getIndexForID(this.props.setid,this.props.photoid),xa=r.getByIndexImmediate(this.props.setid,wa);return xa?xa:this._getThumbnailPhotoData();},_getThumbnailPhotoData:function(){if(!this.props.normaldimensions||!this.props.thumbsrc)return null;var wa=sa.deserialize(this.props.normaldimensions),xa={id:this.props.photoid,image1:{width:wa.x,height:wa.y,uri:this.props.thumbsrc}};if(this.props.hiresdimensions){var ya=sa.deserialize(this.props.hiresdimensions);xa.image2={width:ya.x,height:ya.y,uri:this.props.thumbsrc};}return xa;},_enableSubscriptions:function(){this._subscriptions.addSubscriptions(h.subscribe('VaultSharerDialog/imagesShared',this.close),h.subscribe('SpotlightVaultViewer/imageDeleted',this._onDelete),this.viewState.subscribe('photo_fetch',this.setState.bind(this,{photoData:null},null)));},removePermalinkQueryData:function(wa){if(qa.isVaultBoxURI(wa))return new pa(wa).removeQueryData('view_image');return wa;},_onShareClick:function(event){if(this.state.selectionSet.getLength()===0){this.state.selectionSet.add(this._getCurrentFBID());this.setState({selectionSet:this.state.selectionSet});}this._grid.createPost(event.target);},_onSelect:function(){var wa=this._getCurrentFBID();if(!this.state.selectionSet.contains(wa)){this.state.selectionSet.add(wa);}else this.state.selectionSet.remove(wa);this.setState({selectionSet:this.state.selectionSet,bounce:true});setTimeout(this.setState.bind(this,{bounce:false}),m.getBounceTimeout());},_onClickOptions:function(wa){if(wa==this.optionsMenuValues.CROP){this._enableCropping();}else if(wa==this.optionsMenuValues.ROTATE_LEFT){this._rotate('left');}else if(wa==this.optionsMenuValues.ROTATE_RIGHT){this._rotate('right');}else if(wa==this.optionsMenuValues.MAKE_COVER_PHOTO)this.close();},_rotate:function(wa){var xa=this._getCurrentFBID(),ya={fbid:xa,cs_ver:q.VIEWER_VAULTBOX};ya[wa]=1;var za=this.viewState.getPosition();new k('/ajax/photos/photo/rotate/').setAllowCrossPageTransition(true).setData(ya).setFinallyHandler(this.rotationComplete.bind(this,za)).setErrorHandler(this.rotationComplete.bind(this,za)).setMethod('POST').setReadOnly(false).send();this.viewState.inform('photo_fetch');},rotationComplete:function(wa){if(wa==this.viewState.getPosition())r.getByIndex(this.props.setid,wa,this._updatePhoto);},_enableCropping:function(){v.setAction(v.action.MAKE_PROFILE).setFlowType(v.flow.VAULT).log(v.step.CROP);var wa=this.getDimensions().getOriginalDimensionsFromPhoto(this.state.photoData);this._photocrop=new p(x.findDOMNode(this.refs.image),{},wa);this.setState({croppingMode:true});},_disableCropping:function(){v.setFlowType(v.flow.VAULT).log(v.step.CANCEL);this._photocrop&&this._photocrop.done(false);this.setState({croppingMode:false});},componentDidMount:function(){if(this.props.enablecropping)this._enableCropping();},_crop:function(){var wa=this._getCurrentFBID(),xa=this.state.photoData.owner.id,ya=this._photocrop.done(),za=this.getDimensions().getOriginalDimensionsFromPhoto(this.state.photoData);new u(wa,xa).setErrorURI(pa.getRequestURI()).setFlowType(v.flow.VAULT).saveCrop(ya,za);this.setState({croppingMode:false,savingMode:true});},_isCroppingEnabled:function(){return this.state.croppingMode||this.state.savingMode;},_delete:function(event){var wa=new k('/ajax/vault/delete.php').setData({vault_image_ids:[this._getCurrentFBID()],source:s.SPOTLIGHT_VAULT_VIEWER}).setStatusElement(o.byClass(event.target,'stat_elem')).setRelativeTo(event.target);j.send(wa);},_onDelete:function(){this.close();r.clearSetCache(this.props.setid);},openURL:function(wa){var xa=wa.getQueryData('view_image').view_image;if(!xa)return false;this.viewState.page(this.viewState.getRelativeMovement(xa));return true;},_getBottomBar:function(){if(!this.state.photoData)return null;if(this._isCroppingEnabled())return (w.createElement(ha,{onDone:this._crop,onCancel:this._disableCropping,saving:this.state.savingMode}));return (w.createElement(ba,{className:'stat_elem'},w.createElement(ca,null,w.createElement(da,{onClick:this._delete},ua._("Delete")),this._getOptionsMenu(),w.createElement('div',{className:"_4_8j"},w.createElement(n,{size:n.SIZES.small,color:n.COLORS.blue,showonasync:true,className:"_535k"}))),w.createElement(ca,{itemmargin:'left'},w.createElement(l,{onClick:this._onShareClick,className:"_4_8j",count:this.state.selectionSet.getLength(),singularLabel:ua._("Share Photo"),pluralLabel:ua._("Share Photos"),bounce:this.state.bounce}))));},_getCheck:function(){if(!this.state.photoData||this._isCroppingEnabled())return null;var wa=this.state.selectionSet.contains(this._getCurrentFBID());return (w.createElement(ea,{bounce:this.state.bounce,selected:wa,onClick:this._onSelect}));},_getPagers:function(){if(this._isCroppingEnabled())return null;return w.createElement(ka,null);},_getOptionsMenu:function(){if(!this.state.photoData)return null;var wa=[],xa=t.getDownloadURLFromData(this.state.photoData);if(xa)wa.push({label:ua._("Download"),value:this.optionsMenuValues.DOWNLOAD,href:t.getDownloadURLFromData(this.state.photoData)});if(this.state.photoData.owner)wa.push({label:ua._("Make Profile Picture"),value:this.optionsMenuValues.CROP});if(t.canViewerMakeCoverPhoto(this.state.photoData))wa.push({label:ua._("Make Cover Photo"),value:this.optionsMenuValues.MAKE_COVER_PHOTO,href:t.getCoverPhotoURLFromData(this.state.photoData)});wa.push({label:ua._("Rotate Left"),value:this.optionsMenuValues.ROTATE_LEFT});wa.push({label:ua._("Rotate Right"),value:this.optionsMenuValues.ROTATE_RIGHT});return (w.createElement(ja,{items:wa,callback:this._onClickOptions,onShow:this.setState.bind(this,{menuOpen:true},null),onHide:this.setState.bind(this,{menuOpen:false},null)}));},render:function(){var wa=this.getMedia(),xa=this.getStageDimensions();return (w.createElement(y,{open:this.state.open,onHide:this.close},w.createElement(na,{active:this.state.menuOpen,onClick:this._onClickViewport,stageDimensions:xa,media:wa,showLoadingIndicator:!this.state.photoData},w.createElement(fa,{onClick:this.close,position:'left'}),this._getCheck(),this._getBottomBar(),this._getPagers())));}});f.exports=va;},null);
__d('VaultBoxInit',['AsyncRequest','DOM','PhotoStore','React','SpotlightVaultViewer','SpotlightViewerInit','VaultPageGrid'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o={setID:'vault:images_by_date_taken',bootstrapWithElem:function(p){m.render(k.createElement(l,{open:true,gridid:p.getAttribute('data-grid-id'),setid:o.setID,photoid:p.getAttribute('data-fbid'),thumbsrc:i.find(p,'img').src,hiresdimensions:p.getAttribute('data-hi-res-dimensions'),normaldimensions:p.getAttribute('data-normal-dimensions')}));if(!j.hasBeenCreated(o.setID))new h('/ajax/photos/vaultbox/init_react.php').setRelativeTo(p).setData({photoID:p.getAttribute('data-fbid')}).send();},bootstrapFromPermalink:function(p,q,r,s){n.getInstanceWithCallback(r,function(){m.render(k.createElement(l,{open:true,setid:o.setID,initialpayload:p,photoid:q,gridid:r,enablecropping:s.enableCropping}));});}};f.exports=o;},null);