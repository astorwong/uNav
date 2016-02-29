/*!CK:3862483618!*//*1456285125,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["WxLSR"]); }

__d("FullViewType",[],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports={ENTIRE_UNIT:1};},null);
__d('EgoAdsObjectSet',['DOM','csx'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();function j(){'use strict';this._allEgoUnits=[];this._egoUnits=[];}j.prototype.init=function(l){'use strict';this._allEgoUnits=l;this._egoUnits=[];this._allEgoUnits.forEach(function(m){var n=k(m);if(!n||!n.holdout)this._egoUnits.push(m);},this);};j.prototype.getCount=function(){'use strict';return this._egoUnits.length;};j.prototype.forEach=function(l,m){'use strict';this._egoUnits.forEach(l,m);};j.prototype.getUnit=function(l){'use strict';return this._egoUnits[l];};j.prototype.getHoldoutAdIDsForSpace=function(l,m){'use strict';if(!l||!m)return [];var n=[];for(var o=0;l>0&&o<this._allEgoUnits.length;o++){var p=this._allEgoUnits[o],q=m(p),r=k(p);if(l>=q&&r&&r.holdout)n.push(r.adid);l-=q;}return n;};j.prototype.getHoldoutAdIDsForNumAds=function(l){'use strict';l=Math.min(l,this._allEgoUnits.length);var m=[];for(var n=0;n<l;n++){var o=this._allEgoUnits[n],p=k(o);if(p&&p.holdout)m.push(p.adid);}return m;};function k(l){var m=h.scry(l,"div._4u8")[0],n=m&&m.getAttribute('data-ad');return n&&JSON.parse(n)||undefined;}f.exports=j;},null);
__d('EmuController',['AsyncRequest','DataStore','URI','emptyFunction','ge','goURI'],function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();function n(o,p){'use strict';var q=l(o);if(!q)return null;this.impression=p;this.containerId=o;i.set(q,'emuController',this);return this;}n.prototype.event=function(o,p,q,r){'use strict';var s={eid:this.impression,f:0,ui:this.containerId,en:o,a:1};if(p)s.ed=JSON.stringify(p);if(!r)r=k;var t=new h().setURI(this.EVENT_HANDLER_PATH).setData(s).setErrorHandler(r);if(q)t.setHandler(q);t.send();};n.prototype.redirect=function(){'use strict';var o={eid:this.impression,f:0,ui:this.containerId,en:this.CLICK,a:0,sig:Math.floor(Math.random()*65535)+65536},p=new j(this.EVENT_HANDLER_PATH);p.setQueryData(o);m(p);};n.fromContainer=function(o){'use strict';var p=l(o);if(!p)return null;return i.get(p,'emuController');};n.getEventClass=function(o){'use strict';return "emuEvent"+String(o).trim();};Object.assign(n.prototype,{EVENT_HANDLER_PATH:'/ajax/emu/end.php',CLICK:1,FAN:"fad_fan"});f.exports=n;},null);
__d('legacy:ad-units-base-js',['EmuController'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();b.EmuController=c('EmuController');},3);
__d('BlueBarMinWidthWithJewel',['BlueBar','DOMEventListener','DOMQuery','Locale','csx','getElementPosition','getStyleProperty','getViewportDimensions','queryThenMutateDOM'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){if(c.__markCompiled)c.__markCompiled();g.init=function(){var q=h.getNavRoot();if(!q)return;var r=j.scry(q,"._fmc")[0];if(!r)return;var s=function(){return p(function(){var t=m(q),u=t.x,v=t.width,w=undefined;if(k.isRTL()){w=-u;}else{var x=o().width;w=2*u+v-x;}if(w>0){var y=parseInt(n(q,'width'),10),z=y-w;if(z>0)return z+'px';}return '';},function(t){r.style.width=t;},'BlueBarMinWidthWithJewel');};i.add(window,'resize',s);s();};},null);
__d('BrowseClientEventLogger',['Banzai'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i='browse_client_event_session',j='21.',k={logData:function(event,l,m,n){if(!event||!l)return;n=n||{};n.event=event;n.client_time=Math.floor(Date.now());n.session_id=l;n.vertical=m;this.allData=this.allData||{};this.processedSessions=this.processedSessions||[];if(this.processedSessions.indexOf(l)!==-1)return;if(!this.allData.sessionid)this.allData.sessionid=[];this.allData.sessionid.push(n);if(event==='window_unloaded'||event==='window_transition_to_LHC'||event==='window_transition_to_home_click'||event==='window_transition_to_fb_page'){this._postBatch(this.allData.sessionid);this.processedSessions.push(l);}},logClick:function(l){l.event='click';this.maybeLogVisiblityEvent(l,true);},maybeLogClientViewEvent:function(l){l.event='client_view';this.maybeLogVisiblityEvent(l);},maybeLogVisiblityEvent:function(l,m){if(!l||!l.xt||l.xt.indexOf(j)!==0)return;var n=JSON.parse(l.xt.substring(3));if(m)n.click_type=l.click_type;var event=l.event;if(event==='vpvd'){if(!l.ft)return;n.vpvd_time=l.ft.vpvd_time_delta;}this.logData(event,n.session_id,n.vertical,n);},_postBatch:function(l){h.post(i,l,{delay:0,retry:true});}};f.exports=k;},null);
__d('AdBlockerDetectorLogging',['Banzai','ErrorUtils','getElementPosition'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=1,l=2,m='swank',n={doAdBlockCheck:function(o,p){i.applyWithGuard(function(){this._doAdBlockImgCheck(o,p.token||p,0);}.bind(this),this);},_doAdBlockImgCheck:function(o,p,q){if(!p||!o)return;var r=o.querySelectorAll('img');if(r.length>0){var s=false;for(var t=0;t<r.length;t++){var u=r[t],v=j(u);if(v.width>0||v.height>0){s=true;break;}}if(!s){var w=o,x=0;while(w!==null){if(x++>50)break;if(w.classList.contains('hidden_elem')||w.classList.contains('holdoutAdStory')||w.classList.contains('ego_ads_holdout'))return;w=w.parentElement;}h.post('xtrackable:'+m,{token:p});}}else if(r.length===0&&p.startsWith('7.'))if(++q<5)setTimeout(function(){this._doAdBlockImgCheck(o,p,q);}.bind(this).bind(this),2500);},doBrowserExtensionCheck:function(o,p){try{var r=document.getElementsByTagName('head')[0],s=document.documentElement.shadowRoot,t=[];if(s)t=Array.prototype.slice.call(s.querySelectorAll('style'));var u=Array.prototype.slice.call(r.querySelectorAll('style')).filter(function(w){return w&&w.textContent.length==0;}),v={};v[k]=t.length>0;v[l]=u.length>0;if(o)t.forEach(function(w){w.disabled=true;});if(p)u.forEach(function(w){w.disabled=true;});h.post('search_check',v);}catch(q){}}};f.exports=n;},null);
__d('FullViewLogger',['Banzai','ScriptPath','SubscriptionsHandler','URI'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();l.logFromViewableImpressionTracker=function(m){'use strict';var n=new l();n.subscribeToTrackerEvents(m);};l.prototype.subscribeToTrackerEvents=function(m){'use strict';this.subscriptionsHandler=new j();this.subscriptionsHandler.addSubscriptions(m.addListener('full_view',this.onFullView,this));};l.prototype.onFullView=function(m){'use strict';if(this.$FullViewLogger1())this.$FullViewLogger2(m);var n={token:m.token,fullViewType:m.fullViewType,scriptPath:i.getTopViewEndpoint()};h.post('xtrackable:full_view',n);if(this.$FullViewLogger1())this.$FullViewLogger3(n);};l.prototype.$FullViewLogger1=function(){'use strict';return 0;};l.prototype.$FullViewLogger2=function(m){'use strict';};l.prototype.$FullViewLogger3=function(m){'use strict';};function l(){'use strict';}f.exports=l;},null);
__d('ViewableImpressionHeatmapLogger',['Banzai'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();i.logFromViewableImpressionTracker=function(j,k){'use strict';var l=new i(k);l.subscribeToTrackerEvents(j);};function i(j){'use strict';this.loggingDurationMS=j;this.trackingEntries={};}i.prototype.subscribeToTrackerEvents=function(j){'use strict';this.visibleSubscription=j.addListener('visible',this.onElementVisible,this);this.hiddenSubscription=j.addListener('hidden',this.onElementHidden,this);};i.prototype.onElementVisible=function(j){'use strict';var k=this.getCurrentTimestamp(),l=this.trackingEntries[j.id];if(!l){l=this.createTrackingEntry(j);this.beginTracking(j.id,l);k=l.startedTrackingTS;}l.viewportProgressEvents.push({timestamp:k,percentInViewport:j.percentInViewport.toFixed(2)});};i.prototype.onElementHidden=function(j){'use strict';var k=this.getCurrentTimestamp(),l=this.trackingEntries[j.id];if(!l)return;l.viewportProgressEvents.push({timestamp:k,percentInViewport:0});};i.prototype.onTrackingCompleted=function(j){'use strict';var k=this.trackingEntries[j];k.viewportProgressEvents.push({timestamp:this.getCurrentTimestamp(),percentInViewport:k.tracker.getPercentInViewport().toFixed(2)});if(this.$ViewableImpressionHeatmapLogger1())this.$ViewableImpressionHeatmapLogger2(j,k);this.logToServer(k);delete this.trackingEntries[j];};i.prototype.logToServer=function(j){'use strict';var k=j;delete k.tracker;h.post('xtrackable:heatmap',k);};i.prototype.beginTracking=function(j,k){'use strict';this.trackingEntries[j]=k;setTimeout(function(){return this.onTrackingCompleted(j);}.bind(this),this.loggingDurationMS);};i.prototype.createTrackingEntry=function(j){'use strict';return {tracker:j.tracker,token:j.token,startedTrackingTS:this.getCurrentTimestamp(),viewportProgressEvents:[]};};i.prototype.getCurrentTimestamp=function(){'use strict';return (Date.now()/1000).toFixed(2);};i.prototype.$ViewableImpressionHeatmapLogger1=function(){'use strict';return 0;};i.prototype.$ViewableImpressionHeatmapLogger2=function(j,k){'use strict';var l='Completed tracking for id '+j+' token='+k.token+' startedTrackingTS='+k.startedTrackingTS+'\n';k.viewportProgressEvents.forEach(function(m){l+='% in view: '+m.percentInViewport+' timestamp='+m.timestamp+'\n';});};f.exports=i;},null);
__d('ViewableImpressionUtils',['CSS','cx'],function a(b,c,d,e,f,g,h,i){if(c.__markCompiled)c.__markCompiled();var j={isHorizontallyOffscreen:function(k,l,m){var n=Math.max(l.x,0),o=Math.min(l.x+l.width,m.width);return o-n<l.width||h.hasClass(k,"desktop_hscroll_offscreen");}};f.exports=j;},null);
__d('ViewableImpressionTracker',['Banzai','BrowseClientEventLogger','DOM','FullViewType','NonBlockingIFrame','Style','URI','ViewableImpressionUtils','WebSpeedExperiments','getElementPosition','getViewportDimensions','mixInEventEmitter'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){if(c.__markCompiled)c.__markCompiled();function t(u,v,w){'use strict';this.id=u;this.element=v;this.config=w;this.iframe=null;this.viewableTimeout=null;this.clearSubsequentTimeout=null;this.waitForSubsequent=false;this.waitForLogged=false;this.isNonViewableLogged=false;this.isVisible=false;this.iframeLogged=false;this.banzaiLogged=false;this.topLeftInViewport=false;this.bottomRightInViewport=false;}t.prototype.getID=function(){'use strict';return this.id;};t.prototype.getPercentInViewport=function(){'use strict';var u=r(),v=q(this.element);return this.$ViewableImpressionTracker1(u,v);};t.prototype.$ViewableImpressionTracker1=function(u,v){'use strict';if(v.x<u.width&&v.x+v.width>0&&v.y<u.height&&v.y+v.height>0&&m.get(this.element,'visibility')!=='hidden'&&m.get(this.element,'opacity')!=='0'){var w=Math.max(v.x,0),x=Math.min(v.x+v.width,u.width),y=Math.max(v.y,0),z=Math.min(v.y+v.height,u.height);if(v.height*v.width===0)return 100;if(this.config.require_horizontally_onscreen&&o.isHorizontallyOffscreen(this.element,v,u))return 0;var aa=100*(x-w)*(z-y)/(v.height*v.width);return aa;}return 0;};t.prototype.$ViewableImpressionTracker2=function(u,v){'use strict';if(m.get(this.element,'visibility')==='hidden'||m.get(this.element,'opacity')==='0')return false;var w=v.x,x=v.y,y=v.x+v.width,z=v.y+v.height;this.topLeftInViewport=this.topLeftInViewport||w>=0&&w<=u.width&&x>=0&&x<=u.height;this.bottomRightInViewport=this.bottomRightInViewport||y>=0&&y<=u.width&&z>=0&&z<=u.height;return this.topLeftInViewport&&this.bottomRightInViewport;};t.prototype.$ViewableImpressionTracker3=function(u,v){'use strict';if(this.hasEmittedFullViewEvent)return;if(this.$ViewableImpressionTracker2(u,v)){this.emit('full_view',{tracker:this,id:this.getID(),token:this.getToken(),fullViewType:k.ENTIRE_UNIT});this.hasEmittedFullViewEvent=true;}};t.prototype.onVisible=function(){'use strict';this.isVisible=true;var u=r(),v=q(this.element),w=this.$ViewableImpressionTracker1(u,v),x=w>this.config.pixel_in_percentage;this.emit('visible',{tracker:this,id:this.getID(),token:this.getToken(),percentInViewport:w});this.$ViewableImpressionTracker3(u,v);if(!x){this.$ViewableImpressionTracker4();return;}if(this.isLogged()){this.$ViewableImpressionTracker5();}else this.$ViewableImpressionTracker6();if(!this.waitForLogged&&!this.isLogged()){this.waitForLogged=true;this.viewableTimeout=setTimeout(function(){this.waitForLogged=false;var y=this.getPercentInViewport(),z=y>this.config.pixel_in_percentage;if(!z){this.$ViewableImpressionTracker7();return;}this.logImpression(1,{});this.$ViewableImpressionTracker5();}.bind(this),this.config.duration_in_ms);}};t.prototype.onHidden=function(){'use strict';this.emit('hidden',{id:this.getID(),token:this.getToken()});if(this.config.log_initial_nonviewable&&!this.isLogged()&&!this.isNonViewableLogged){this.logNonViewableImpression();}else if(!this.config.log_initial_nonviewable&&!this.isLogged()&&this.isVisible)this.logNonViewableImpression();this.isVisible=false;if(this.waitForLogged){this.waitForLogged=false;clearTimeout(this.viewableTimeout);}if(this.isLogged()&&!this.waitForSubsequent&&this.config.subsequent_gap_in_ms>=0){this.waitForSubsequent=true;this.clearSubsequentTimeout=setTimeout(function(){this.waitForSubsequent=false;this.reset();if(this.isVisible)this.onVisible();}.bind(this),this.config.subsequent_gap_in_ms);}this.$ViewableImpressionTracker7();};t.prototype.onRemoved=function(){'use strict';this.isVisible=false;};t.prototype.getToken=function(){'use strict';return this.element.getAttribute('data-xt');};t.prototype.logImpression=function(u,v){'use strict';if(this.isLogged())return;var w=this.getToken(),x=Math.floor(Date.now()/1000),y={xt:w,isv:u,cts:x};if(h.isEnabled('xtrackable_clientview_batch')&&this.config.should_batch){this.logWithBanzai(y);}else this.logWithIFrame(Object.assign(y,v));};t.prototype.logNonViewableImpression=function(){'use strict';if(this.config.nonviewableEnabled){var u=this.getToken();h.post('xtrackable:nonviewable',{xt:u});}this.isNonViewableLogged=true;};t.prototype.isLogged=function(){'use strict';return this.iframeLogged||this.banzaiLogged;};t.prototype.reset=function(){'use strict';if(this.iframeLogged)this.iframeLogged=false;if(this.iframe){j.remove(this.iframe);this.iframe=null;}if(this.banzaiLogged)this.banzaiLogged=false;this.isNonViewableLogged=false;this.isVisible=false;this.waitForLogged=false;this.waitForSubsequent=false;};t.prototype.logWithBanzai=function(u){'use strict';this.banzaiLogged=true;i.maybeLogClientViewEvent(u);h.post('xtrackable:clientview_batch',u);};t.prototype.logWithIFrame=function(u){'use strict';this.iframeLogged=true;if(p.non_blocking_tracker){l.loadIFrame(new n(this.config.impressionURL).addQueryData(u).toString());}else{this.iframe=j.create('iframe',{src:new n(this.config.impressionURL).addQueryData(u),width:0,height:0,frameborder:0,scrolling:'no',className:'fbEmuTracking'});this.iframe.setAttribute('aria-hidden','true');j.appendContent(this.element,this.iframe);}};t.prototype.$ViewableImpressionTracker8=function(){'use strict';return 0;};t.prototype.$ViewableImpressionTracker4=function(){'use strict';if(this.$ViewableImpressionTracker8()){m.set(this.element,'background-color','#abab9a');m.set(this.element,'outline','3px solid #abab9a');}};t.prototype.$ViewableImpressionTracker6=function(){'use strict';if(this.$ViewableImpressionTracker8()){m.set(this.element,'background-color','#e4f70a');m.set(this.element,'outline','3px solid #e4f70a');}};t.prototype.$ViewableImpressionTracker7=function(){'use strict';if(this.$ViewableImpressionTracker8()){m.set(this.element,'background-color',null);m.set(this.element,'outline',null);}};t.prototype.$ViewableImpressionTracker5=function(){'use strict';if(this.$ViewableImpressionTracker8()){m.set(this.element,'background-color','#047515');m.set(this.element,'outline','3px solid #047515');}};s(t,{visible:true,hidden:true,full_view:true});f.exports=t;},null);
__d('VisibilityTrackingHelper',['Arbiter','DesktopHscrollUnitEventConstants','getViewportDimensions','Event'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l={getEventListeners:function(m){return [k.listen(document,'DOMContentLoaded',m),k.listen(window,'scroll',m),k.listen(window,'resize',m),h.subscribe(i.HSCROLL_ITEM_SHOWN_EVENT,m)];},getViewportInfo:function(){return j();}};f.exports=l;},null);
__d('VisibilityTracking',['Banzai','BrowseClientEventLogger','ErrorUtils','ScriptPath','SubscriptionsHandler','Visibility','VisibilityTrackingHelper','collectDataAttributes','getElementPosition','pageID','throttle'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){if(c.__markCompiled)c.__markCompiled();var s='visibility_tracking',t='[data-vistracking]',u=500,v=50,w=50,x=50,y=50,z={VISIBLE:'visible',HIDDEN:'hidden'},aa={DEFAULT:'default',REMOVED:'removed'},ba={name:z.VISIBLE,cause:aa.DEFAULT},ca={name:z.HIDDEN,cause:aa.DEFAULT},da={name:z.HIDDEN,cause:aa.REMOVED},ea=0;function fa(ga){'use strict';ga=ga||{};if(!ga.bypass_banzai_check&&!h.isEnabled(s))return;this.visibleElementInfo={};this.getDataFromConfig(ga);m.addListener(m.VISIBLE,j.guard(this.fireEvent,'VisibilityTracking:visible',this));if(!this.skipVisibilityHiddenEvents)m.addListener(m.HIDDEN,j.guard(this.clearAllVisibleElements,'VisibilityTracking:hidden',this));k.subscribe(j.guard(this.updateVisibleElements,'VisibilityTracking:scriptPath',this));h.subscribe(h.SHUTDOWN,j.guard(this.onUnload,'VisibilityTracking:banzaiShutdown',this));this.fireEventCallback=r.acrossTransitions(j.guard(this.fireEvent,'VisibilityTracking:fireEventCallback',this),this.timeout,this);this.listeners=new l();n.getEventListeners(this.fireEventCallback).forEach(function(ha){this.listeners.addSubscriptions(ha);},this);if(this.extraInit)j.applyWithGuard(this.extraInit.bind(this));}fa.prototype.getDataFromConfig=function(ga){'use strict';this.config=ga;this.root=ga.root||document.documentElement;this.selector=ga.selector||t;this.timeout=typeof ga.timeout!=='undefined'?ga.timeout:u;this.minOffsetVisibleFromBottom=typeof ga.minOffsetVisibleFromBottom!=='undefined'?ga.minOffsetVisibleFromBottom:v;this.minOffsetVisibleFromTop=typeof ga.minOffsetVisibleFromTop!=='undefined'?ga.minOffsetVisibleFromTop:w;this.minOffsetVisibleFromLeft=typeof ga.minOffsetVisibleFromLeft!=='undefined'?ga.minOffsetVisibleFromLeft:x;this.minOffsetVisibleFromRight=typeof ga.minOffsetVisibleFromRight!=='undefined'?ga.minOffsetVisibleFromRight:y;this.handleAllHiddenEvents=typeof ga.handleAllHiddenEvents!=='undefined'?ga.handleAllHiddenEvents:false;this.handleAllVisibleEvents=typeof ga.handleAllVisibleEvents!=='undefined'?ga.handleAllVisibleEvents:false;this.skipVisibilityHiddenEvents=typeof ga.skipVisibilityHiddenEvents!=='undefined'?ga.skipVisibilityHiddenEvents:false;this.cacheTrackedElements=typeof ga.cacheTrackedElements!=='undefined'?ga.cacheTrackedElements:false;};fa.prototype.getAllTrackedElements=function(){'use strict';if(!this.allTrackedElements){this.allTrackedElements={};if(this.root.querySelectorAll){var ga=this.root.querySelectorAll(this.selector);for(var ha=0;ha<ga.length;ha++){var ia=this.getElementID(ga[ha]);this.allTrackedElements[ia]=ga[ha];}}}return this.allTrackedElements;};fa.prototype.refreshAllTrackedElements=function(){'use strict';delete this.allTrackedElements;return this.getAllTrackedElements();};fa.prototype.getDataToLog=function(ga){'use strict';var ha=Object.assign(o(ga,['gt']).gt,{client_time:Date.now()/1000,time_spent_id:q,script_path:k.getScriptPath()});return ha;};fa.prototype.getElementID=function(ga){'use strict';var ha=ga.$VisibilityTracking1;if(ha)return ha;ga.$VisibilityTracking1=++ea;return ea;};fa.prototype.sendDataToLog=function(ga){'use strict';i.maybeLogVisiblityEvent(ga);h.post(s,ga);};fa.prototype.fireEvent=function(){'use strict';var ga=this.cacheTrackedElements?this.allTrackedElements:this.refreshAllTrackedElements();for(var ha in ga){var ia=ga[ha],ja=n.getViewportInfo(),ka=this.isVisible(ia,ja);if(!ka&&(ha in this.visibleElementInfo||this.handleAllHiddenEvents)){this.handleEvent(ia,ca);}else if(ka&&(!(ha in this.visibleElementInfo)||this.handleAllVisibleEvents))this.handleEvent(ia,ba);}this.clearUntrackedVisibleElements();};fa.prototype.isVisible=function(ga,ha){'use strict';var ia=p(ga);return (ia.x||ia.y||ia.width||ia.height)&&ia.y+ia.height>=this.minOffsetVisibleFromTop&&ia.y<=ha.height-this.minOffsetVisibleFromBottom&&ia.x+ia.width>=this.minOffsetVisibleFromLeft&&ia.x<=ha.width-this.minOffsetVisibleFromRight;};fa.prototype.handleEvent=function(ga,event){'use strict';var ha=this.getElementID(ga),ia=this.getDataToLog(ga),ja;if(event.name===z.VISIBLE){var ka=Math.floor(Date.now()/1000);ja=q.concat(":",ka.toString(),":",this.getElementID(ga).toString());this.visibleElementInfo[ha]={visibility_id:ja,elem:ga};}else if(event.name===z.HIDDEN)if(ha in this.visibleElementInfo){ja=this.visibleElementInfo[ha].visibility_id;delete this.visibleElementInfo[ha];}this.sendDataToLog(Object.assign(ia,{event:event.name,visibility_id:ja}));};fa.prototype.clearUntrackedVisibleElements=function(){'use strict';var ga=this.getAllTrackedElements();for(var ha in this.visibleElementInfo)if(!(ha in ga)){var ia=this.visibleElementInfo[ha];if(ia.elem)this.handleEvent(ia.elem,da);}};fa.prototype.clearAllVisibleElements=function(){'use strict';var ga=this.getAllTrackedElements();for(var ha in ga)if(ha in this.visibleElementInfo)this.handleEvent(ga[ha],ca);this.clearUntrackedVisibleElements();};fa.prototype.updateVisibleElements=function(){'use strict';this.clearAllVisibleElements();this.fireEvent();};fa.prototype.refreshAndFireEvent=function(){'use strict';this.refreshAllTrackedElements();this.fireEventCallback();};fa.prototype.onUnload=function(){'use strict';this.clearAllVisibleElements();if(this.listeners){this.listeners.release();this.listeners=null;}if(this.extraCleanup)j.applyWithGuard(this.extraCleanup.bind(this));};fa.init=function(ga){'use strict';new fa(ga);};fa.EVENT=z;fa.CAUSE=aa;f.exports=fa;},null);
__d('ViewableImpressionEventHandler',['FullViewLogger','ViewableImpressionHeatmapLogger','ViewableImpressionTracker','VisibilityTracking'],function a(b,c,d,e,f,g,h,i,j,k){var l,m;if(c.__markCompiled)c.__markCompiled();var n=1;l=babelHelpers.inherits(o,k);m=l&&l.prototype;o.prototype.extraInit=function(){'use strict';this.impressionTrackers={};};o.prototype.getDataFromConfig=function(p){'use strict';m.getDataFromConfig.call(this,p);this.doHeatmapLogging=p.doHeatmapLogging;this.heatmapLoggingDurationMS=p.heatmapLoggingDurationMS;p.impressionURL=p.impressionURL!==undefined?p.impressionURL:'/xti.php';p.nonviewableEnabled=p.nonviewableEnabled!==undefined?p.nonviewableEnabled:false;};o.prototype.getImpressionTracking=function(p){'use strict';var q=this.getElementID(p),r=babelHelpers['extends']({},this.getConfigFromElement(p),this.config),s=this.impressionTrackers[q];if(!s){s=new j(q,p,r);this.impressionTrackers[q]=s;if(this.doHeatmapLogging)i.logFromViewableImpressionTracker(s,this.heatmapLoggingDurationMS);if(r.should_log_full_views)h.logFromViewableImpressionTracker(s);}return s;};o.prototype.handleEvent=function(p,event){'use strict';var q=this.getImpressionTracking(p);if(!q)return;if(event.name===k.EVENT.VISIBLE){q.onVisible();if(!this.visibleElementInfo[q.getID()])this.visibleElementInfo[q.getID()]={elem:p};}else if(event.name===k.EVENT.HIDDEN)if(event.cause===k.CAUSE.DEFAULT){q.onHidden();delete this.visibleElementInfo[q.getID()];}else if(event.cause===k.CAUSE.REMOVED){q.onRemoved();delete this.visibleElementInfo[q.getID()];delete this.impressionTrackers[q.getID()];}};o.prototype.getConfigFromElement=function(p){'use strict';return JSON.parse(p.getAttribute('data-xt-vimp'));};o.prototype.getElementID=function(p){'use strict';if(!p.getAttribute('id'))p.setAttribute('id','xt_uniq_'+n++);return p.getAttribute('id');};function o(){'use strict';l.apply(this,arguments);}f.exports=o;},null);
__d("GamesGogglesSwitch",[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=false,i={enable:function(){h=true;},isEnabled:function(){return h;}};f.exports=i;},null);
__d('GamesImpressionTracker',['VisibilityTracking','throttle','Event','Banzai','Arbiter','cx','GamesGogglesSwitch'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){var o,p;if(c.__markCompiled)c.__markCompiled();var q='data-gamesegoimp',r='data-gamesrankedimp',s=1000;function t(y){if(n.isEnabled())y.className=y.className+" "+"_1z5y";}function u(y){return function(){if(y){y();y=null;}};}o=babelHelpers.inherits(v,h);p=o&&o.prototype;v.prototype.handleEvent=function(y,event){'use strict';if(event.name===h.EVENT.VISIBLE){var z=y.getAttribute(r);y.removeAttribute(r);if(z){t(y);z&&k.post('games_ranked_imp',{data:z});}j.listen(y,'mouseover',u(function(){k.post('games_mouseover',{data:z});j.listen(y,'mouseout',u(function(){k.post('games_mouseout',{data:z});}));}));}};function v(){'use strict';o.apply(this,arguments);}var w=new v({selector:'[data-gamesrankedimp]',handleAllVisibleEvents:true,skipVisibilityHiddenEvents:true,cacheTrackedElements:true}),x=i.acrossTransitions(function(){return w.fireEventCallback();},s,null);w.listeners.addSubscriptions(j.listen(document,'mousemove',x),j.listen(document,'click',x),l.subscribe('games_unit_loaded',function(){return w.refreshAllTrackedElements();}));},null);
__d('legacy:async-signal',['AsyncSignal'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();b.AsyncSignal=c('AsyncSignal');},3);
__d('ViewableImpressionTracking',['Arbiter','DesktopHscrollUnitEventConstants','ErrorUtils','LitestandMessages','Run','ViewableImpressionEventHandler','ViewableImpressionConfig'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o={init:function(){if(m.instance===undefined){m.instance=new m(n);m.instance.listeners.addSubscriptions(h.subscribe([k.STORIES_INSERTED,'AdsRefreshHandler/AdsLoaded','MPPInsights/ChartView','PhotoSnowliftAds/displayUnits','WebMessengerAdsControl/adjustAds',i.HSCROLL_ITEM_INSERTED_EVENT,'WebVideoChannelAds/AdsLoaded'],j.guard(function(){m.instance.refreshAndFireEvent();},'ViewableImpressionTracking')));}l.onLoad(function(){m.instance.refreshAndFireEvent();});}};f.exports=o;},null);
__d('MercuryLeftNav',['Arbiter','MessagingTag','NavigationMessage','MercuryThreadInformer','MercuryUnreadState'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=c('MercuryThreadInformer').get(),l=c('MercuryUnreadState').get(),m=false;function n(){var p=l.getUnreadCount(i.INBOX);h.inform(j.NAVIGATION_COUNT_UPDATE,{key:'inbox',hide:true});h.inform(j.NAVIGATION_COUNT_UPDATE,{key:'inbox',count:p});}var o={bootstrap:function(){if(m)return;k.subscribe('unread-updated',n);m=true;}};f.exports=o;},null);
__d('SelectorDeprecated',['Arbiter','Button','ContextualLayer','CSS','DataStore','DOM','Event','Focus','HTML','Keys','MenuDeprecated','Parent','Style','Toggler','TooltipData','URI','Vector','arrayContains','emptyFunction','getDocumentScrollElement'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa){if(c.__markCompiled)c.__markCompiled();var ba,ca,da=[],ea;function fa(qa){return s.byClass(qa,'uiSelector');}function ga(qa){return s.byClass(qa,'uiSelectorButton');}function ha(){if(!ca){ca=new j({position:'below'},m.create('div'));k.addClass(ca.getRoot(),'uiSelectorContextualLayer');}return ca;}function ia(qa){return m.scry(qa,'select')[0];}function ja(qa){return m.find(qa,'div.uiSelectorMenuWrapper');}var ka=function(){ka=z;r.subscribe('select',function(qa,ra){if(!ba||!ra||ra.menu!==pa.getSelectorMenu(ba))return;var sa=la(ba),ta=ma(ra.item);if(ta){var ua=ba,va=pa.isOptionSelected(ra.item),wa=pa.inform('select',{selector:ua,option:ra.item,clone:ea});if(wa===false)return;if(sa||!va){pa.setSelected(ua,pa.getOptionValue(ra.item),!va);pa.inform('toggle',{selector:ua,option:ra.item});pa.inform('change',{selector:ua});h.inform('Form/change',{node:ua});if(na(ua))l.set(ua,'dirty',true);}}if(!sa||!ta)ba&&pa.toggle(ba);});};function la(qa){return !!qa.getAttribute('data-multiple');}function ma(qa){return k.hasClass(qa,'uiSelectorOption');}function na(qa){return !!qa.getAttribute('data-autosubmit');}var oa=function(){oa=z;var qa={keydown:function(event){var ra=event.getTarget();if(m.isInputNode(ra))return;switch(n.getKeyCode(event)){case q.DOWN:case q.SPACE:case q.UP:if(ga(ra)){var sa=fa(ra);pa.toggle(sa);return false;}break;case q.ESC:if(ba){var ta=pa.getSelectorButton(ba);pa.toggle(ba);ta&&o.set(ta);return false;}break;}},mouseover:function(event){var ra=s.byAttribute(event.getTarget(),'ajaxify');if(ra&&k.hasClass(ra,'uiSelectorButton'))pa.loadMenu(fa(ra));}};n.listen(document.body,qa);};u.subscribe(['show','hide'],function(qa,ra){var sa=fa(ra.getActive());if(sa){oa();ka();var ta=pa.getSelectorButton(sa),ua=pa.getSelectorMenu(sa),va=qa==='show';ta.setAttribute('aria-expanded',va?'true':'false');if(va){ba=sa;if(k.hasClass(ta,'uiButtonDisabled')){pa.setEnabled(sa,false);return false;}ua=ua||pa.loadMenu(sa);var wa=t.getScrollParent(sa),xa=wa!==window&&wa!==aa();if(xa||k.hasClass(sa,'uiSelectorUseLayer')){if(xa)da.push(n.listen(wa,'scroll',function(){ra.hide();}));ea=m.create('div',{className:sa.className});k.addClass(ea,'invisible_elem');x.getElementDimensions(sa).setElementDimensions(ea);m.replace(sa,ea);var ya=k.hasClass(sa,'uiSelectorRight'),za=k.hasClass(sa,'uiSelectorBottomUp');ha().setContext(ea).setContent(sa).setPosition(za?'above':'below').setAlignment(ya?'right':'left').show();}r.register(ua);var ab=r.getCheckedItems(ua);if(!ab.length)ab=r.getEnabledItems(ua);if(ab.length)r.focusItem(ab[0]);}else{ba=null;if(ea){while(da.length)da.pop().remove();m.replace(ea,sa);ha().hide();ea=null;}ua&&r.unregister(ua);if(na(sa)&&l.get(sa,'dirty')){var bb=m.scry(sa,'input.submitButton')[0];bb&&bb.click();l.remove(sa,'dirty');}}k.conditionClass(pa.getSelectorButton(sa),'selected',va);pa.inform(va?'open':'close',{selector:sa,clone:ea});}});var pa=Object.assign(new h(),{attachMenu:function(qa,ra,sa){qa=fa(qa);if(qa){ba&&r.unregister(pa.getSelectorMenu(ba));m.setContent(ja(qa),ra);ba&&r.register(pa.getSelectorMenu(qa));ea&&ha().updatePosition();if(sa){var ta=qa.getAttribute('data-name');ta&&sa.setAttribute('name',ta);if(!la(qa))sa.setAttribute('multiple',false);var ua=ia(qa);if(ua){m.replace(ua,sa);}else m.insertAfter(qa.firstChild,sa);}return true;}},getOption:function(qa,ra){var sa=pa.getOptions(qa),ta=sa.length;while(ta--)if(ra===pa.getOptionValue(sa[ta]))return sa[ta];return null;},getOptions:function(qa){var ra=r.getItems(pa.getSelectorMenu(qa));return ra.filter(ma);},getEnabledOptions:function(qa){var ra=r.getEnabledItems(pa.getSelectorMenu(qa));return ra.filter(ma);},getSelectedOptions:function(qa){return r.getCheckedItems(pa.getSelectorMenu(qa));},getOptionText:function(qa){return r.getItemLabel(qa);},getOptionValue:function(qa){var ra=fa(qa),sa=ia(ra),ta=pa.getOptions(ra).indexOf(qa);return ta>=0?sa.options[ta+1].value:'';},getSelectorButton:function(qa){return m.find(qa,'a.uiSelectorButton');},getSelectorMenu:function(qa){return m.scry(qa,'div.uiSelectorMenu')[0];},getValue:function(qa){var ra=ia(qa);if(!ra)return null;if(!la(qa))return ra.value;var sa=[],ta=ra.options;for(var ua=1,va=ta.length;ua<va;ua++)if(ta[ua].selected)sa.push(ta[ua].value);return sa;},isOptionSelected:function(qa){return r.isItemChecked(qa);},listen:function(qa,ra,sa){return this.subscribe(ra,function(ta,ua){if(ua.selector===qa)return sa(ua,ta);});},loadMenu:function(qa,ra){var sa=pa.getSelectorMenu(qa);if(!sa){var ta=pa.getSelectorButton(qa),ua=ta.getAttribute('ajaxify');if(ua){e(['AsyncRequest'],function(wa){var xa=new w(ua),ya=xa.getQueryData();xa.setQueryData({});var za=new wa(xa).setData(ya).setNectarModuleDataSafe(ta).setRelativeTo(ta);ra&&za.setFinallyHandler(function(){setTimeout(ra,0);});za.send();}.bind(this));var va=p('<div class="uiSelectorMenuWrapper uiToggleFlyout">'+'<div class="uiMenu uiSelectorMenu loading">'+'<ul class="uiMenuInner">'+'<li><span></span></li>'+'</ul>'+'</div>'+'</div>');m.appendContent(ta.parentNode,va);sa=pa.getSelectorMenu(qa);ta.removeAttribute('onmouseover');}}else ra&&ra();return sa;},setButtonLabel:function(qa,ra){var sa=pa.getSelectorButton(qa),ta=parseInt(sa.getAttribute('data-length'),10);ra=ra||sa.getAttribute('data-label')||'';i.setLabel(sa,ra);if(typeof ra==='string')if(ta&&ra.length>ta){sa.setAttribute('title',ra);}else sa.removeAttribute('title');},setButtonTooltip:function(qa,ra){var sa=pa.getSelectorButton(qa),ta=s.byTag(sa,'a');ta&&v.set(ta,ra||sa.getAttribute('data-tooltip')||'');},setEnabled:function(qa,ra){if(!ra&&ba&&fa(qa)===ba)pa.toggle(qa);i.setEnabled(pa.getSelectorButton(qa),ra);},setOptionEnabled:function(qa,ra){r.setItemEnabled(qa,ra);},setSelected:function(qa,ra,sa){sa=sa!==false;var ta=pa.getOption(qa,ra);if(!ta)return;var ua=pa.isOptionSelected(ta);if(sa!==ua){if(!la(qa)&&!ua){var va=pa.getSelectedOptions(qa)[0];va&&r.toggleItem(va);}r.toggleItem(ta);}pa.updateSelector(qa);},toggle:function(qa){u.toggle(m.scry(fa(qa),'div.wrap')[0]);},updateSelector:function(qa){var ra=pa.getOptions(qa),sa=pa.getSelectedOptions(qa),ta=ia(qa).options,ua=[],va=[];for(var wa=0,xa=ra.length;wa<xa;wa++){var ya=y(sa,ra[wa]);ta[wa+1].selected=ya;if(ya){var za=pa.getOptionText(ra[wa]);ua.push(za);va.push(ra[wa].getAttribute('data-tooltip')||za);}}ta[0].selected=!sa.length;var ab=k.hasClass(qa,'uiSelectorDynamicLabel'),bb=k.hasClass(qa,'uiSelectorDynamicTooltip');if(ab||bb){var cb='';if(la(qa)){var db=pa.getSelectorButton(qa);cb=db.getAttribute('data-delimiter')||', ';}ua=ua.join(cb);va=va.join(cb);ab&&pa.setButtonLabel(qa,ua);bb&&pa.setButtonTooltip(qa,va);}}});f.exports=pa;},null);
__d('EgoUnitSlideInsert',['Animation','CSS','DataStore','DOM','Ease','Event','Parent','TidyArbiterMixin','csx','cx','tidyEvent'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){if(c.__markCompiled)c.__markCompiled();var s='sliding',t="EgoSlider/End",u=babelHelpers['extends']({isSliding:function(v){return j.get(v,s);},runAfterSlide:function(v,w){var x=r(u.subscribe(t,function(y,z){if(z===v){x&&x.unsubscribe();w();}}));},registerSlide:function(v,w){m.listen(v,'click',function(x){var y=n.bySelector(x.getTarget(),"._5cl_");if(!y)return;var z=n.byClass(v,'ego_unit'),aa=0,ba=n.byClass(z,'ego_unit_container'),ca=k.scry(ba,'.ego_unit')[0];if(ca===z)if(z.nextSibling){z.nextSibling.style.paddingTop='0px';z.nextSibling.style.borderTop='0px';}i.addClass(z,"_5cl-");j.set(z,s,true);new h(z).to('height',0).to('padding-top',aa).to('padding-bottom',0).to('margin',0).from('opacity',1).to('opacity',0).ease(l.circOut).duration(300).checkpoint(1,function(){k.appendContent(ba,z);k.prependContent(z,w);j.remove(z,s);}).to('height',12).to('opacity',1).to('margin-bottom',10).duration(0).checkpoint(2,function(){u.inform(t,z);}).go();});}},o);f.exports=u;},null);
__d('NetEgo',['Animation','Arbiter','csx','CSS','DOM','EgoUnitSlideInsert','PageLikeConstants','Parent','URI','ge'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){if(c.__markCompiled)c.__markCompiled();var r={setup:function(s){i.subscribe([n.LIKED,'FriendRequest/sending'],function(t,u){if(s==u.profile_id&&u.origin=='hovercard'||s==u.uid){var v=q(document.body,'.ego_unit_container');if(v){var w=l.scry(v,'.ego_unit'),x=w.length;for(var y=0;y<x;y++){var z=w[y].getAttribute('data-ego-fbid');if(z==s){var aa=l.scry(w[y],'.ego_action a')[0];if(aa)aa.click();break;}}}}});},updateXids:function(s,t){if(s.length==0&&t.length==0)return;var u=function(ea){return function(fa){var ga=fa.getAttribute(ea);if(!ga)return false;var ha=new p(ga).getQueryData();return !!ha.xids;};},v=l.scry(document.body,'.ego_section a');v=v.filter(u('ajaxify'));if(v.length==0)return;var w=new p(v[0].getAttribute('ajaxify')),x=w.getQueryData();if(!x.xids)return;var y=null;try{y=JSON.parse(x.xids);}catch(z){return;}for(var aa=0;aa<t.length;++aa)y[t[aa]]=1;var ba=JSON.stringify(y),ca=function(ea,fa){w=new p(ea.getAttribute(fa));x=w.getQueryData();x.xids=ba;w.setQueryData(x);ea.setAttribute(fa,w.toString());};for(aa=0;aa<v.length;++aa)ca(v[aa],'ajaxify');var da=l.scry(document.body,'.ego_unit form');da=da.filter(u('action'));for(aa=0;aa<da.length;++aa)ca(da[aa],'action');},replaceUnit:function(s,t,u,v){r.replaceUnitCheckParent(s,t,u,v,'');},addUnitsWithSeeMore:function(s,t,u){if(!u)k.hide(s);var v=s.previousSibling;v&&t&&l.appendContent(v,t);},replaceUnitCheckParent:function(s,t,u,v,w){var x=o.byClass(s,'ego_unit_container');if(x&&m.isSliding(s)){var y=l.appendContent(x,t);y.forEach(k.hide);m.runAfterSlide(s,r._replaceUnitElement.bind(null,s,y,w));}else r._replaceUnit(s,t,u,v,w);},_replaceUnit:function(s,t,u,v,w){var x=l.insertAfter(s,t);x.forEach(k.hide);if(v!==undefined&&v!==null){setTimeout(function(){r._replaceUnitFadeout(s,x,u,w);},v);}else r._replaceUnitFadeout(s,x,u,w);},_replaceUnitFadeout:function(s,t,u,v){if(u){new h(s).from('opacity',1).to('opacity',0).duration(u).checkpoint(1,function(){r._replaceUnitElement(s,t,v);}).go();}else r._replaceUnitElement(s,t,v);},_replaceUnitElement:function(s,t,u){var v=k.hasClass(s,'ego_unit')?s.parentNode:null;if(v&&v.tagName==='LI')v=l.scry(s.parentNode,'^ul')[0];l.remove(s);if(t.length)t.forEach(k.show);i.inform('netego_replacedUnit',{serializedData:u,numUnitsRemained:v.childNodes.length});r.clearHeader();},clearHeader:function(){var s=l.scry(document.body,'.ego_column'),t=[];for(var u=0;u<s.length;++u)t=t.concat(l.scry(s[u],'.uiHeader'));for(u=0;u<t.length;++u){var v=t[u].nextSibling,w=l.find(v,"._2xq");if(!w)w=v;if(!w||w.childNodes.length===0){l.remove(t[u]);}else if(w.childNodes.length===1){var x=w.childNodes[0];if(k.hasClass(x,'ego_appended_units')&&x.childNodes.length===0)l.remove(t[u]);}}}};f.exports=r;},null);