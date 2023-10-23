!function(t){"use strict";function e(e){return e.is('[type="checkbox"]')?e.prop("checked"):e.is('[type="radio"]')?!!t('[name="'+e.attr("name")+'"]:not(:disabled):checked').length:e.is("select[multiple]")?+e.val()?e.val():null:e.val()}var a=function(r,i){this.options=i,this.validators=t.extend({},a.VALIDATORS,i.custom),this.$element=t(r),this.$btn=t('button[type="submit"], input[type="submit"]').filter('[form="'+this.$element.attr("id")+'"]').add(this.$element.find('input[type="submit"], button[type="submit"]')),this.update(),this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator",t.proxy(this.onInput,this)),this.$element.on("submit.bs.validator",t.proxy(this.onSubmit,this)),this.$element.on("reset.bs.validator",t.proxy(this.reset,this)),this.$element.find("[data-match]").each((function(){var a=t(this),r=a.data("match");t(r).on("input.bs.validator",(function(t){e(a)&&a.trigger("input.bs.validator")}))})),this.$inputs.filter((function(){return e(t(this))&&!t(this).closest(".has-error").length})).trigger("focusout"),this.$element.attr("novalidate",!0),this.toggleSubmit()};function r(e){return this.each((function(){var r=t(this),i=t.extend({},a.DEFAULTS,r.data(),"object"==typeof e&&e),o=r.data("bs.validator");(o||"destroy"!=e)&&(o||r.data("bs.validator",o=new a(this,i)),"string"==typeof e&&o[e]())}))}a.VERSION="0.11.7",a.INPUT_SELECTOR=':input:not([type="hidden"], [type="submit"], [type="reset"], button):not(:disabled)',a.FOCUS_OFFSET=20,a.DEFAULTS={delay:500,html:!1,disable:!0,focus:!0,custom:{},errors:{match:"Does not match",minlength:"Not long enough"},feedback:{success:"glyphicon-ok",error:"glyphicon-remove"}},a.VALIDATORS={native:function(t){var e=t[0];if(e.checkValidity)return!e.checkValidity()&&!e.validity.valid&&(e.validationMessage||"error!")},match:function(e){var r=e.data("match");return e.val()!==t(r).val()&&a.DEFAULTS.errors.match},minlength:function(t){var e=t.data("minlength");return t.val().length<e&&a.DEFAULTS.errors.minlength}},a.prototype.update=function(){return this.$inputs=this.$element.find(a.INPUT_SELECTOR).add(this.$element.find('[data-validate="true"]')).not(this.$element.find('[data-validate="false"]')),this.toggleSubmit(),this},a.prototype.onInput=function(e){var a=this,r=t(e.target),i="focusout"!==e.type;this.$inputs.is(r)&&this.validateInput(r,i).done((function(){a.toggleSubmit()}))},a.prototype.validateInput=function(a,r){e(a);var i=a.data("bs.validator.errors");a.is('[type="radio"]')&&(a=this.$element.find('input[name="'+a.attr("name")+'"]'));var o=t.Event("validate.bs.validator",{relatedTarget:a[0]});if(this.$element.trigger(o),!o.isDefaultPrevented()){var s=this;return this.runValidators(a).done((function(e){a.data("bs.validator.errors",e),e.length?r?s.defer(a,s.showErrors):s.showErrors(a):s.clearErrors(a),i&&e.toString()===i.toString()||(o=e.length?t.Event("invalid.bs.validator",{relatedTarget:a[0],detail:e}):t.Event("valid.bs.validator",{relatedTarget:a[0],detail:i}),s.$element.trigger(o)),s.toggleSubmit(),s.$element.trigger(t.Event("validated.bs.validator",{relatedTarget:a[0]}))}))}},a.prototype.runValidators=function(a){var r=[],i=t.Deferred();function o(t){return function(t){return a.data(t+"-error")}(t)||((e=a[0].validity).typeMismatch?a.data("type-error"):e.patternMismatch?a.data("pattern-error"):e.stepMismatch?a.data("step-error"):e.rangeOverflow?a.data("max-error"):e.rangeUnderflow?a.data("min-error"):e.valueMissing?a.data("required-error"):null)||a.data("error");var e}return a.data("bs.validator.deferred")&&a.data("bs.validator.deferred").reject(),a.data("bs.validator.deferred",i),t.each(this.validators,t.proxy((function(t,i){var s=null;(e(a)||a.attr("required"))&&(a.data(t)||"native"==t)&&(s=i.call(this,a))&&(s=o(t)||s,!~r.indexOf(s)&&r.push(s))}),this)),!r.length&&e(a)&&a.data("remote")?this.defer(a,(function(){var s={};s[a.attr("name")]=e(a),t.get(a.data("remote"),s).fail((function(t,e,a){r.push(o("remote")||a)})).always((function(){i.resolve(r)}))})):i.resolve(r),i.promise()},a.prototype.validate=function(){var e=this;return t.when(this.$inputs.map((function(a){return e.validateInput(t(this),!1)}))).then((function(){e.toggleSubmit(),e.focusError()})),this},a.prototype.focusError=function(){if(this.options.focus){var e=this.$element.find(".has-error:first :input");0!==e.length&&(t("html, body").animate({scrollTop:e.offset().top-a.FOCUS_OFFSET},250),e.focus())}},a.prototype.showErrors=function(e){var a=this.options.html?"html":"text",r=e.data("bs.validator.errors"),i=e.closest(".option-item, .form-item"),o=i.find(".help-block.with-errors"),s=i.find(".form-control-feedback");r.length&&(r=t("<ul/>").addClass("list-unstyled").append(t.map(r,(function(e){return t("<li/>")[a](e)}))),void 0===o.data("bs.validator.originalContent")&&o.data("bs.validator.originalContent",o.html()),o.empty().append(r),i.addClass("has-error has-danger"),i.hasClass("has-feedback")&&s.removeClass(this.options.feedback.success)&&s.addClass(this.options.feedback.error)&&i.removeClass("has-success"))},a.prototype.clearErrors=function(t){var a=t.closest(".field_large"),r=a.find(".help-block.with-errors"),i=a.find(".form-control-feedback");r.html(r.data("bs.validator.originalContent")),a.removeClass("has-error has-danger has-success"),a.hasClass("has-feedback")&&i.removeClass(this.options.feedback.error)&&i.removeClass(this.options.feedback.success)&&e(t)&&i.addClass(this.options.feedback.success)&&a.addClass("has-success")},a.prototype.hasErrors=function(){return!!this.$inputs.filter((function(){return!!(t(this).data("bs.validator.errors")||[]).length})).length},a.prototype.isIncomplete=function(){return!!this.$inputs.filter("[required]").filter((function(){var a=e(t(this));return!("string"==typeof a?t.trim(a):a)})).length},a.prototype.onSubmit=function(t){this.validate(),(this.isIncomplete()||this.hasErrors())&&t.preventDefault()},a.prototype.toggleSubmit=function(){this.options.disable&&this.$btn.toggleClass("disabled",this.isIncomplete()||this.hasErrors())},a.prototype.defer=function(e,a){if(a=t.proxy(a,this,e),!this.options.delay)return a();window.clearTimeout(e.data("bs.validator.timeout")),e.data("bs.validator.timeout",window.setTimeout(a,this.options.delay))},a.prototype.reset=function(){return this.$element.find(".form-control-feedback").removeClass(this.options.feedback.error).removeClass(this.options.feedback.success),this.$inputs.removeData(["bs.validator.errors","bs.validator.deferred"]).each((function(){var e=t(this),a=e.data("bs.validator.timeout");window.clearTimeout(a)&&e.removeData("bs.validator.timeout")})),this.$element.find(".help-block.with-errors").each((function(){var e=t(this),a=e.data("bs.validator.originalContent");e.removeData("bs.validator.originalContent").html(a)})),this.$btn.removeClass("disabled"),this.$element.find(".has-error, .has-danger, .has-success").removeClass("has-error has-danger has-success"),this},a.prototype.destroy=function(){return this.reset(),this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"),this.$inputs.off(".bs.validator"),this.options=null,this.validators=null,this.$element=null,this.$btn=null,this.$inputs=null,this};var i=t.fn.validator;t.fn.validator=r,t.fn.validator.Constructor=a,t.fn.validator.noConflict=function(){return t.fn.validator=i,this},t(window).on("load",(function(){t('form[data-toggle="validator"]').each((function(){var e=t(this);r.call(e,e.data())}))}))}(jQuery);