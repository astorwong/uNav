/*!CK:3853725742!*//*1456259587,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["XtG2l"]); }

__d('SpotlightViewer',['React','ReactLayeredComponentMixin','Spotlight.react','cx'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l=h.createClass({displayName:'SpotlightViewer',mixins:[i],renderLayers:function(){if(!this.props.open)return null;var m="_n3";if(this.props.className)m+=' '+this.props.className;return {photoLayer:h.createElement(j,{onBeforeHide:this.props.onBeforeHide,onHide:this.props.onHide,rootClassName:this.props.rootClassName,shown:this.props.open},h.createElement('div',{className:m,onClick:this.props.onClick},this.props.children))};},render:function(){return h.createElement('div',null);}});f.exports=l;},null);
__d('SpotlightViewerAutoResize',['Event','SubscriptionsHandler','invariant'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();function k(l){'use strict';this.$SpotlightViewerAutoResize1=l;!(typeof this.$SpotlightViewerAutoResize1.onResize==='function')?j(0):undefined;}k.prototype.enable=function(){'use strict';this.$SpotlightViewerAutoResize2=new i();this.$SpotlightViewerAutoResize2.addSubscriptions(h.listen(window,'resize',this.$SpotlightViewerAutoResize1.onResize));};k.prototype.disable=function(){'use strict';this.$SpotlightViewerAutoResize2.release();delete this.$SpotlightViewerAutoResize2;};f.exports=k;},null);
__d('SpotlightViewerBehaviorsMixin',['BehaviorsMixin'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={componentWillMount:function(){this.behaviors&&this.enableBehaviors(this.behaviors);},componentWillUnmount:function(){this.destroyBehaviors();}};Object.assign(i,h);f.exports=i;},null);
__d('SpotlightViewerClose',['React','TooltipLink.react','cx','fbt','joinClasses'],function a(b,c,d,e,f,g,h,i,j,k,l){if(c.__markCompiled)c.__markCompiled();var m=h.PropTypes,n=h.createClass({displayName:'SpotlightViewerClose',propTypes:{position:m.oneOf(['left','right'])},getDefaultProps:function(){return {position:'right'};},render:function(){var o=this.props.position=='left'?"_5wx3":"_5wx4",p=h.createElement('span',null,k._("Press Esc to close"));return (h.createElement(i,{className:l("_4-o9 _50-m _51an",o),onClick:this.props.onClick,tooltip:p}));}});f.exports=n;},null);
__d('PhotoUtils',['Event','URI'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j={getImagesFromData:function(k){var l=[];for(var m in k)if(m.indexOf('image')===0)l.push(k[m]);return l;},getFBIDFromData:function(k){return k&&k.id;},getOriginalImageFromData:function(k){return k.original||k.download_image;},getDownloadURLFromData:function(k){var l=this.getOriginalImageFromData(k);if(!l)return null;var m=new i(l.uri);m.addQueryData({dl:1});return m;},getPermalinkFromData:function(k){return k.permalink;},canViewerMakeCoverPhoto:function(k){return !!k.can_viewer_make_cover_photo;},getCoverPhotoURLFromData:function(k){return new i('/profile.php').addQueryData({preview_cover:j.getFBIDFromData(k)});},preload:function(k,l,m){var n=k.getDimensions();for(var o=0;o<l.length;++o){var p=n.getBestFitImageFromPhoto(l[o],n.getMaxStageDimensions()),q=new Image();m&&h.listen(q,'load',m.bind(null,l[o]));k.getLogger().log(p.uri);q.src=p.uri;}}};f.exports=j;},null);
__d('PhotoViewState',['ArbiterMixin','PhotoStore','PhotoUtils','SpotlightViewerLoggingEvents','mixin'],function a(b,c,d,e,f,g,h,i,j,k,l){var m,n;if(c.__markCompiled)c.__markCompiled();m=babelHelpers.inherits(o,l(h));n=m&&m.prototype;function o(p,q,r,s,t){'use strict';n.constructor.call(this);this._viewer=p;this._setID=q;this._updateCallback=s;this._position=r||0;this._preloaded={};this._reverse=t;}o.prototype._fetchCallback=function(p){'use strict';if(!this._viewer.isOpen())return;this._preload(p);this._log(k.DATA_FETCH_COMPLETE);};o.prototype._preload=function(p){'use strict';j.preload(this._viewer,p,function(q){this._preloaded[j.getFBIDFromData(q)]=true;}.bind(this));};o.prototype._preloadPhotosInRange=function(p,q){'use strict';var r=[];for(var s=p;s<=q;++s){var t=i.getByIndexImmediate(this._setID,s);if(t&&!this._isPreloaded(t))r.push(t);}this._preload(r);};o.prototype._isPreloaded=function(p){'use strict';return this._preloaded[j.getFBIDFromData(p)];};o.prototype.getPosition=function(){'use strict';return this._position;};o.prototype.isValidMovement=function(p){'use strict';if(!i.hasBeenCreated(this._setID))return false;if(i.hasLooped(this._setID))return true;var q=this._position+p,r=i.getAvailableRange(this._setID),s=r.offset+r.length-1;return q>=r.offset-1&&q<=s+1;};o.prototype.getRelativeMovement=function(p){'use strict';return i.getIndexForID(this._setID,p)-this._position;};o.prototype.moveCursor=function(p){'use strict';if(!this.isValidMovement(p))return false;this._position+=p;return true;};o.prototype._page=function(p){'use strict';if(!this.moveCursor(p))return;this._log(k.PAGE_BEGIN);var q=i.getByIndexImmediate(this._setID,this._position);if(!q){this.inform('photo_fetch');this._log(k.PHOTO_FETCH);}else if(!this._isPreloaded(q))this._preload([q]);i.getByIndex(this._setID,this._position,this._updateCallback);this._loadMoreIfNecessary(p>0,o.BUFFER_SIZE);this._log(k.PAGE_COMPLETE);};o.prototype.loadMoreForwardIfNecessary=function(p){'use strict';var q=i.getAvailableRange(this._setID),r=q.offset+q.length-1,s=this._position+p;if(s>r&&!i.hasLooped(this._setID)){var t=i.getCursorByIndexImmediate(this._setID,r);i.fetchForward(this._setID,t,p,this._fetchCallback.bind(this));}else this._preloadPhotosInRange(this._position+1,s);};o.prototype.loadMoreBackwardIfNecessary=function(p){'use strict';var q=i.getAvailableRange(this._setID),r=this._position-p;if(r<q.offset&&!i.hasLooped(this._setID)){var s=i.getCursorByIndexImmediate(this._setID,q.offset);i.fetchBackward(this._setID,s,p,this._fetchCallback.bind(this));}else this._preloadPhotosInRange(r,this._position-1);};o.prototype._loadMoreIfNecessary=function(p,q){'use strict';if(p){this.loadMoreForwardIfNecessary(q);}else this.loadMoreBackwardIfNecessary(q);};o.prototype.displayFirst=function(){'use strict';if(!this._viewer.isOpen())return;i.setPreFetchCallback(this._setID,function(){this._log(k.DATA_FETCH_BEGIN);}.bind(this));var p=function(q){if(!this._isPreloaded(q))this._preload([q]);this._updateCallback(q);}.bind(this);i.getByIndex(this._setID,this._position,p);if(this._reverse){this.loadMoreBackwardIfNecessary(o.BUFFER_SIZE);}else this.loadMoreForwardIfNecessary(o.BUFFER_SIZE);};o.prototype.backward=function(){'use strict';this._page(this._reverse?1:-1);};o.prototype.forward=function(){'use strict';this._page(this._reverse?-1:1);};o.prototype._log=function(p){'use strict';this._viewer.log(p);};Object.assign(o,{BUFFER_SIZE:4});f.exports=o;},null);
__d('SpotlightViewerImage',['Image.react','React','cx'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=i.createClass({displayName:'SpotlightViewerImage',render:function(){return (i.createElement(h,{className:"_4-od",src:this.props.src,style:{width:this.props.dimensions.x,height:this.props.dimensions.y}}));}});f.exports=k;},null);
__d('SpotlightViewerCoreMixin',['PhotoLogger','PhotoStore','PhotoUtils','PhotoViewState','React','SpotlightViewerImage','SpotlightViewerLoggingEvents'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o={_displayFirstPhoto:function(){i.executePostCreate(this.props.setid,this.viewState.displayFirst.bind(this.viewState));},_getInitialPosition:function(){var p;if(!this.props.clearcache)p=i.getIndexForID(this.props.setid,this.props.photoid);if(p===undefined){i.clearSetCache(this.props.setid);p=0;}return p;},__displayPhoto:function(){var p=this._getInitialPosition();this.viewState=new k(this,this.props.setid,p,this._updatePhoto,this.props.reverse);this.inform('open');this._displayFirstPhoto();},componentWillMount:function(){this._logger=new h(this.getViewerID());this.log(n.OPEN_BEGIN);this.__displayPhoto();},componentDidMount:function(){this._enableSubscriptions&&this._enableSubscriptions();this.log(n.OPEN_COMPLETE);},isOpen:function(){return this.state.open;},close:function(){if(!this.isOpen())return;this.log(n.CLOSE_BEGIN);this.setState({open:false},function(){this.inform('close');this.log(n.CLOSE_COMPLETE);});},componentWillUnmount:function(){this.viewState=null;},_onClickViewport:function(p){p?this.viewState.forward():this.viewState.backward();},_getMedia:function(p,q){return (l.createElement(m,{ref:'image',src:p.uri,dimensions:q.imageDimensions}));},_getCurrentFBID:function(){return j.getFBIDFromData(this.state.photoData);},_updatePhoto:function(p){this.log(n.PHOTO_CHANGE_BEGIN);this.setState({photoData:p},function(){this.inform('photo_change',this.state.photoData);this.log(n.PHOTO_CHANGE_COMPLETE);});},getLogger:function(){return this._logger;},log:function(p){this._logger&&this._logger.logEvent(p);}};f.exports=o;},null);
__d('PhotoViewerDimensions',['Event','PhotoUtils','Vector'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k={verticalPadding:'number',horizontalPadding:'number',normalResDim:'object'};function l(m){'use strict';for(var n in m){if(!k[n])throw new Error("Unsupported extraData value '"+n+"' should not be used");if(typeof m[n]===k[n])this['_'+n]=m[n];}this._listener=h.listen(window,'resize',this._resetMaxStageDimensions.bind(this));}l.prototype.destroy=function(){'use strict';this._listener.remove();};l.prototype.getStageDimensions=function(m){'use strict';var n=this.getMaxStageDimensions(),o=new j(Math.min(m.x,n.x),Math.min(m.y,n.y)),p=o.x/o.y,q=m.x/m.y;if(p<q){o.y=Math.round(o.x/q);}else o.x=Math.round(o.y*q);return o;};l.prototype.getImageDimensionsForStage=function(m,n){'use strict';var o=m.x,p=m.y,q=n.x,r=n.y;if(o>=q||p>=r){var s=o/p,t=q/r;if(t<s){o=q;p=Math.round(q/s);}else if(t>s){o=Math.round(r*s);p=r;}else{o=q;p=r;}}return new j(o,p);};l.prototype.getMaxStageDimensions=function(){'use strict';if(!this._maxStageDimensions)this._maxStageDimensions=new j(j.getViewportDimensions().x-this._horizontalPadding,j.getViewportDimensions().y-this._verticalPadding);return this._maxStageDimensions;};l.prototype._resetMaxStageDimensions=function(){'use strict';this._maxStageDimensions=null;};l.prototype.getBestFitImageFromPhoto=function(m,n){'use strict';var o=null,p=i.getImagesFromData(m);p=p.sort(function(r,s){return s.width-r.width;});if(window.devicePixelRatio&&window.devicePixelRatio>1)n=new j(n.x*window.devicePixelRatio,n.y*window.devicePixelRatio);for(var q=0;q<p.length;q++)if(!o||p[q].width>=n.x||p[q].height>=n.y)o=p[q];return o;};l.prototype.getOriginalDimensionsFromPhoto=function(m){'use strict';var n=i.getOriginalImageFromData(m);return new j(n.width,n.height);};l.prototype.getBestFitDimensionsFromPhoto=function(m,n){'use strict';var o=this.getBestFitImageFromPhoto(m,n);return new j(o.width,o.height);};l.prototype.getVerticalPadding=function(){'use strict';return this._verticalPadding;};l.prototype.getHorizontalPadding=function(){'use strict';return this._horizontalPadding;};Object.assign(l.prototype,{_verticalPadding:40,_horizontalPadding:60,_normalResDim:{x:960,y:960}});f.exports=l;},null);
__d('SpotlightViewerStageResizer',['Event','SubscriptionsHandler','Vector'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=520;function l(m,n){'use strict';this._subscriptionsHandler=new i();this._subscriptionsHandler.addSubscriptions(h.listen(window,'resize',this._resetStageDimensions.bind(this)));this._dimensions=m;this._minHeight=n.minHeight||k;this._minWidth=n.minWidth||k;this._resetStageDimensions();}l.prototype.destroy=function(){'use strict';this._dimensions=null;this._subscriptionsHandler.release();};l.prototype._resetStageDimensions=function(){'use strict';this._currentStageDimensions=new j(this._minWidth,this._minHeight);};l.prototype.getImageAndStageDimensions=function(m){'use strict';var n=this._dimensions.getBestFitDimensionsFromPhoto(m,this._dimensions.getMaxStageDimensions()),o=this._dimensions.getStageDimensions(n);this._currentStageDimensions=new j(Math.max(o.x,this._minWidth,this._currentStageDimensions.x),Math.max(o.y,this._minHeight,this._currentStageDimensions.y));var p=this._dimensions.getImageDimensionsForStage(n,this._currentStageDimensions);return {stageDimensions:this._currentStageDimensions,imageDimensions:p};};l.prototype.getCurrentStageDimensions=function(){'use strict';return this._currentStageDimensions;};f.exports=l;},null);
__d('SpotlightViewerDimensionMixin',['SpotlightViewerStageResizer','PhotoViewerDimensions'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j={getInitialState:function(){this._dimensions=new i({verticalPadding:this.props.verticalPadding,horizontalPadding:this.props.horizontalPadding});this._resizer=new h(this._dimensions,{minHeight:this.props.minHeight,minWidth:this.props.minWidth});return {maxStageDimensions:this._dimensions.getMaxStageDimensions()};},componentWillUnmount:function(){this._resizer&&this._resizer.destroy();this._resizer=null;this._dimensions&&this._dimensions.destroy();this._dimensions=null;},getMedia:function(){if(this.state.photoData){var k=this._resizer.getImageAndStageDimensions(this.state.photoData),l=this._dimensions.getBestFitImageFromPhoto(this.state.photoData,this.state.maxStageDimensions);return this._getMedia(l,k);}else return null;},getDimensions:function(){return this._dimensions;},getStageDimensions:function(){if(this.state.photoData){return this._resizer.getImageAndStageDimensions(this.state.photoData).stageDimensions;}else return this._dimensions.getMaxStageDimensions();},getImageDimensions:function(){if(!this.state.photoData)return null;return this._resizer.getImageAndStageDimensions(this.state.photoData).imageDimensions;},onResize:function(){this.setState({maxStageDimensions:this._dimensions.getMaxStageDimensions()});}};f.exports=j;},null);
__d('SpotlightViewerPageWithKeys',['KeyEventController','SubscriptionsHandler'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();function j(k){'use strict';this.$SpotlightViewerPageWithKeys1=k;}j.prototype.enable=function(){'use strict';this.$SpotlightViewerPageWithKeys2=new i();this.$SpotlightViewerPageWithKeys2.addSubscriptions(h.registerKey('LEFT',function(){this.$SpotlightViewerPageWithKeys1.viewState.backward();return false;}.bind(this)),h.registerKey('RIGHT',function(){this.$SpotlightViewerPageWithKeys1.viewState.forward();return false;}.bind(this)));};j.prototype.disable=function(){'use strict';this.$SpotlightViewerPageWithKeys2.release();delete this.$SpotlightViewerPageWithKeys2;};f.exports=j;},null);
__d('SpotlightViewerPagers',['LeftRight.react','Link.react','React','cx'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l=j.createClass({displayName:'SpotlightViewerPagers',render:function(){return (j.createElement(h,null,j.createElement(i,{className:"_4-oa _4-ob _50-m"}),j.createElement(i,{className:"_4-oa _4-oc _50-m"})));}});f.exports=l;},null);
__d('SpotlightViewerThumbnailMixin',['PhotoStore','Vector'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j={_getInitialPhotoData:function(){var k=h.getIndexForID(this.props.setid,this.props.photoid),l=h.getByIndexImmediate(this.props.setid,k);return l?l:this._getThumbnailPhotoData();},_getThumbnailPhotoData:function(){if(!this.props.dimensions||!this.props.thumbsrc)return null;var k={id:this.props.photoid};for(var l=0;l<this.props.dimensions.length;++l){var m=i.deserialize(this.props.dimensions[l]);k['image'+l]={width:m.x,height:m.y,uri:this.props.thumbsrc};}return k;}};f.exports=j;},null);
__d('SpotlightViewport',['Locale','Parent','React','ReactDOM','Vector','csx','cx','joinClasses'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){if(c.__markCompiled)c.__markCompiled();var p=j.PropTypes,q=j.createClass({displayName:'SpotlightViewport',propTypes:{stageDimensions:p.object.isRequired,useWidth:p.bool},PAGE_TO_PREV_PERCENTAGE:.2,sections:{NONE:null,FORWARD:1,BACKWARD:2},getInitialState:function(){return {currentActiveSection:this.sections.NONE,active:true};},_onMouseMove:function(event){var r=k.findDOMNode(this),s=l.getEventPosition(event.nativeEvent),t=l.getElementPosition(r),u=this.props.useWidth?this.props.stageDimensions.x:l.getElementDimensions(r).x,v,w=s.x-t.x,x=w/u;if(h.isRTL()){v=x>1-this.PAGE_TO_PREV_PERCENTAGE;}else v=x<this.PAGE_TO_PREV_PERCENTAGE;if(v){this.setState({currentActiveSection:this.sections.BACKWARD});}else this.setState({currentActiveSection:this.sections.FORWARD});},_onClick:function(event){var r=this.state.currentActiveSection==this.sections.FORWARD,s=event.target;if(!i.bySelector(s,"._51an"))this.props.onClick&&this.props.onClick(r);},_onMouseEnter:function(){this.setState({active:true});},_onMouseLeave:function(){this.setState({active:false});},render:function(){var r="_4-of"+(!this.state.active&&!this.props.active?' '+"_50-l":'')+(this.state.currentActiveSection===this.sections.BACKWARD?' '+"_516a":'')+(this.state.currentActiveSection===this.sections.FORWARD?' '+"_516b":'')+(this.props.showLoadingIndicator?' '+"_51jp":'');if(this.props.className)r=o(r,this.props.className);var s={};if(this.props.stageDimensions){s={height:this.props.stageDimensions.y};if(this.props.useWidth)s.width=this.props.stageDimensions.x;}return (j.createElement('div',{className:r,style:s,onClick:this._onClick,onMouseMove:this._onMouseMove,onMouseEnter:this._onMouseEnter,onMouseLeave:this._onMouseLeave},this.props.children,j.createElement('div',{className:"_4-og"},j.createElement('span',{className:"_4-oh"}),this.props.media,j.createElement('div',{className:"_4-oi"}))));}});f.exports=q;},null);
__d('SpotlightSnowflakePhotoViewer',['ArbiterMixin','React','SpotlightViewer','SpotlightViewerAutoResize','SpotlightViewerBehaviorsMixin','SpotlightViewerClose','SpotlightViewerCoreMixin','SpotlightViewerDimensionMixin','SpotlightViewerPagers','SpotlightViewerPageWithKeys','SpotlightViewerThumbnailMixin','SpotlightViewport','SubscriptionsHandler'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){if(c.__markCompiled)c.__markCompiled();var u=i.createClass({displayName:'SpotlightSnowflakePhotoViewer',mixins:[h,l,n,r,o],behaviors:[q,k],getViewerID:function(){return 'photoviewer';},componentWillUnmount:function(){this._subscriptions&&this._subscriptions.release();this._subscriptions=null;},getInitialState:function(){this._subscriptions=new t();return {photoData:this._getInitialPhotoData(),open:true};},_enableSubscriptions:function(){this.props.useloadingindicator&&this._subscriptions.addSubscriptions(this.viewState.subscribe('photo_fetch',this.setState.bind(this,{photoData:null},null)));},render:function(){var v=this.getMedia(),w=this.getStageDimensions(),x=this.props.useloadingindicator&&!this.state.photoData;return (i.createElement(j,{open:this.state.open,onHide:this.close},i.createElement(s,{media:v,showLoadingIndicator:x,stageDimensions:w,onClick:this._onClickViewport},i.createElement(m,{onClick:this.close}),this.props.disablepaging?null:i.createElement(p,null))));}});f.exports=u;},null);
__d('CampfireImageViewer',['DOM','Event','React','ReactDOM','SpotlightSnowflakePhotoViewer','ge'],function a(b,c,d,e,f,g,h,i,j,k,l,m){'use strict';if(c.__markCompiled)c.__markCompiled();var n={registerPopup:function(o,p){i.listen(o,'click',function(q){n.bootstrap({src:p.src,fbid:p.id,dimensions:[p.width,p.height].join(','),disablePaging:true});});},bootstrap:function(o){var p=j.createElement(l,{dimensions:[o.dimensions],open:true,disablepaging:true,photoid:o.fbid,reverse:false,rootClassName:o.rootClassName,thumbsrc:o.src});n.render(p);},render:function(o){var p=m('campfire_viewer');if(!p){p=h.create('div',{id:'messages_viewer'});document.body.appendChild(p);}o=k.render(o,p);o.subscribeOnce('close',function(){k.unmountComponentAtNode(p);});}};f.exports=n;},null);