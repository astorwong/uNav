/*!CK:1033939986!*//*1456170327,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["uTYso"]); }

__d("XReactFeedComposerXPromptDismissController",["XController"],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports=c("XController").create("\/prompts\/dismiss\/",{user_action:{type:"Enum",enumType:1},prompt_id:{type:"String"},prompt_type:{type:"String"},prompt_tracking_string:{type:"String"},prompt_state:{type:"String"}});},null);
__d('ReactComposerPromptsLoggingStore',['ReactComposerActionTypes','ReactComposerStoreBase','ReactComposerTaggerStore','ReactComposerTaggerType','ReactComposerFeedXMinutiaeBootloadStore','AsyncRequest','XReactFeedComposerXPromptDismissController','PromptsInteractionsEventNames'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p,q;if(c.__markCompiled)c.__markCompiled();p=babelHelpers.inherits(r,i);q=p&&p.prototype;function r(){'use strict';var s;q.constructor.call(this,function(){return {};},function(t){s&&s.handler(t);});s=this;}r.prototype.handler=function(s){'use strict';switch(s.type){case h.POST_STARTED:this.$ReactComposerPromptsLoggingStore1(s);break;default:}};r.prototype.$ReactComposerPromptsLoggingStore1=function(s){'use strict';var t=l.getMinutiaeData();if(!t)return;if(this.$ReactComposerPromptsLoggingStore2(s)){this.$ReactComposerPromptsLoggingStore3(o.POST_WITHOUT_PROMPT);}else this.$ReactComposerPromptsLoggingStore3(o.POST_PROMPT);};r.prototype.$ReactComposerPromptsLoggingStore2=function(s){'use strict';return this.$ReactComposerPromptsLoggingStore4(s)||this.$ReactComposerPromptsLoggingStore5(s);};r.prototype.$ReactComposerPromptsLoggingStore4=function(s){'use strict';var t=this.validateAction(s,'composerID'),u=j.getTaggerData(t,k.ACTIVITY),v=l.getMinutiaeData()[k.ACTIVITY];if(!v||!v.action||!v.object)return false;if(!u||!u.action||!u.object)return true;return u.action.getUniqueID()!==v.action.getUniqueID()||u.object.getUniqueID()!==v.object.getUniqueID();};r.prototype.$ReactComposerPromptsLoggingStore5=function(s){'use strict';var t=this.validateAction(s,'composerID'),u=j.getTaggerData(t,k.LOCATION),v=l.getMinutiaeData()[k.LOCATION];if(!v||!v.place)return false;if(!u||!u.place)return true;return u.place.getUniqueID()!==v.place.getUniqueID();};r.prototype.$ReactComposerPromptsLoggingStore3=function(event){'use strict';var s=l.getPromptData();if(!s)return;new m().setURI(n.getURIBuilder().getURI()).setData({user_action:event,prompt_id:s.promptID,prompt_type:s.promptType,prompt_tracking_string:s.trackingString}).send();};f.exports=new r();},null);
__d('ReactComposerStatusPrompt.react',['ReactComposerContextMixin','ReactComposerPrefillStore','DOMContainer.react','React','ReactComposerPromptsLoggingStore'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();c('ReactComposerPromptsLoggingStore');var l=k.createClass({displayName:'ReactComposerStatusPrompt',mixins:[h],getDefaultProps:function(){return {hidePrompt:false};},render:function(){var m=i.getAndEraseField(this.context.composerID,'prompt');if(this.props.hidePrompt||!m)return null;return (k.createElement(j,null,m));}});f.exports=l;},null);