var s3From={init:function(){this.initForms()},initForms:function(parent,callback,from_response){var self=this;parent||(parent=document),$(parent)[0]!==document&&$(parent).is("[data-api-url][data-api-type=form]")||(parent=$(parent).find("[data-api-url][data-api-type=form]")),callback||(callback="function"==typeof parent.data("callback")?parent.data("callback"):eval(parent.data("callback"))),$(parent).each((function(){var $container=$(this),$form=$container.is("form")?$container:$container.find("form");function res(response){if(response.result.success&&response.result.redirect_url)document.location=response.result.redirect_url;else if(response.result&&response.result.html){var uploaders_inits="",scripts=response.result.html.match(/<script[^>]*>[^<]*newSWFU[^<]*<\/script>/gm);if(scripts)for(var i=0;i<scripts.length;i++)uploaders_inits+=scripts[i].replace(/<script[^>]*>([^<]+)<\/script>/,"$1");var $replacement=$(response.result.html.replace(/[\r\n]/g,"").replace(/<script[^>]*>.*?<\/script>/g,""));$($replacement).is("[data-api-url][data-api-type=form]")||($replacement=$($replacement).find("[data-api-url][data-api-type=form]")),$container.replaceWith($replacement),$container=$replacement;var $captcha=$container.find("input[name=_cn]");$captcha.length&&$.getScript("http://captcha.oml.ru/static/captcha.js?2",(function(){var a=$container.find("[id^=s3_captcha_cn]");mgCaptcha.draw("/my/s3/captcha/get.php",a.length?a.get(0):null)}));var $uploads=$container.find('input[type="hidden"][id^="hidUploadField"]');function inituploaders(){uploaders_inits&&eval(uploaders_inits)}$uploads.length&&("function"!=typeof window.newSWFU?$.getScript("/shared/s3/plupload/plupload.all.pack.js",(function(){inituploaders()})):inituploaders()),self.initForms($container,callback,!0),$(".type-calendar_interval").each((function(){var a=$(this).find(".datepicker-interval-result").val(),t=a.substr(3,10),e=a.substr(-10);$(this).find(".input-from").val(t),a.substr().length>20&&$(this).find(".input-to").val(e),a.substr().length<20&&$(this).find(".input-to").val("")})),formDatePicker.init(),"function"==typeof callback&&callback()}}$(".type-calendar_interval").each((function(){var a=$(this),t=a.find(".calendar-from"),e=a.find(".calendar-to"),n=t.find("input");""!=n.val()&&e.removeClass("disabled"),n.on("change",(function(){e.removeClass("disabled")}))})),$container.data("s3form_inited")||($form.length?$form.submit((function(){return $.post($container.data("api-url"),$form.serialize(),res),!1})):from_response||$.getJSON($container.data("api-url"),null,res),$container.data("s3form_inited",!0))}))}},s3PopupForm={init:function(){this.initPopupForms()},initPopupForms:function(parent,callback){parent||(parent=document),$(parent)[0]!==document&&$(parent).is("[data-api-url][data-api-type=popup-form]")||(parent=$(parent).find("[data-api-url][data-api-type=popup-form]")),parent.data("api-url")&&(parent=parent.filter((function(){return!$(this).data("s3form_inited")})),callback||(callback="function"==typeof parent.data("callback")?parent.data("callback"):eval(parent.data("callback"))),parent.data("s3form_inited",!0).click((function(a){var t=$(this);return myo.show?myo.show({html:'<div data-api-url="'+t.data("api-url")+'" data-api-type="form"></div>',clas:$(this).data("wr-class"),afterOpen:function(){var a=this;a.loadDiv.show(),s3From.initForms(a.bodyDiv.find(">div.tpl-anketa[data-api-type]"),(function(){a.loadDiv.hide(),"function"==typeof callback&&callback()}))}}):myo.open&&myo.open({html:'<div data-api-url="'+t.data("api-url")+'" data-api-type="form"></div>',clas:$(this).data("wr-class"),afterOpen:function(){var a=this;a.loadDiv.show(),s3From.initForms(a.bodyDiv.find(">div.tpl-anketa[data-api-type]"),(function(){a.loadDiv.hide(),"function"==typeof callback&&callback()}))}}),a.preventDefault(),!1})))}},formDatePicker={init:function(){this.setDatePicker()},setDatePicker:function(){$.datepicker.regional.ru={closeText:"Закрыть",prevText:"<Пред",nextText:"След>",currentText:"Сегодня",monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthNamesTitle:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],dayNames:["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],dayNamesShort:["вск","пнд","втр","срд","чтв","птн","сбт"],dayNamesMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],weekHeader:"Нед",dateFormat:"dd.mm.yy",firstDay:1,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},$.datepicker.setDefaults($.datepicker.regional.ru),$(".datepickerInit").each((function(a,t){$(this).datepicker({minDate:0,changeMonth:!1,numberOfMonths:1})})),$(".type-calendar_interval").each((function(a,t){var e=$(this).find(".input-from"),n=$(this).find(".input-to"),i=$(this).find(".datepicker-interval-result");function r(){""!=e.val()&&i.val("от "+e.val()+" до "+n.val())}e.datepicker({minDate:0,changeMonth:!1,numberOfMonths:1,onClose:function(a){n.datepicker("option","minDate",a),r()}}),n.datepicker({defaultDate:"+1w",minDate:0,changeMonth:!1,numberOfMonths:1,onClose:function(a){e.datepicker("option","maxDate",a),r()}})}))}};$((function(){s3PopupForm.init(),s3From.init()})),window.addEventListener("load",(function(){formDatePicker.init()}));