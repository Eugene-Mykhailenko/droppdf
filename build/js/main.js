

$(document).ready(function () {
	$(document).on("submit", "form#callback__form", function() {
		if(!validation($(this).attr("id"))) {
			//
		}
		return false;
	});

	$( "form#callback__form .show__text__btn" ).mousedown(function() {
		console.log('text');
		$("form#callback__form input.js__password").attr("type", "text");
	});
	$( "form#callback__form .show__text__btn" ).mouseup(function() {
		console.log('password');
		$("form#callback__form input.js__password").attr("type", "password");
	});

});



function validation (formId) {
    if($('form#'+ formId +' .js__field__success')[0] ) $('form#'+ formId +' .js__field__success').remove();
    $('form#'+ formId +' .js__field__error').remove();
    $('form#'+ formId +' .js__form__control').removeClass('js__input__error');
    var hasError = false;
    $('form#'+ formId +' .js__required__field').each(function() {
        if(jQuery.trim($(this).val()) == ''){
            $(this).parent().append('<div class="js__field__error">is empty </div>');
			$(this).addClass('js__input__error').css('border','1px solid red');
            hasError = true;
        } else {
            if($(this).hasClass('js__email')) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if(!emailReg.test(jQuery.trim($(this).val()))){
                    $(this).parent().append('<div class="js__field__error">Please enter a valid email address.</div>');
					$(this).addClass('js__input__error').css('border','1px solid red');
                    hasError = true;
                }
            } else if($(this).hasClass('js__password')) {
				var passReg = /^[A-Za-z]\w{7,14}$/;
				if(!passReg.test(jQuery.trim($(this).val()))){
					$(this).parent().append('<div class="js__field__error">Error: Check a password between 7 to 16 characters which contain only characters, numeric digits and underscore and first character must be a letter.</div>');
					$(this).addClass('js__input__error').css('border','1px solid red');
					hasError = true;
				}
			}
        }
    });

    return hasError;
}


(function($, window){
	var anyTheme = window.anyTheme || {};

	anyTheme.DataActions = function(){
		var dataToogleClass = function () {
			var $elements = $('[data-toogle="class"]')

			$elements.click(function () {
				var $this = $(this),
					toogleClass = $this.data('class'),
					$target = $($this.data('target')),
					targetClass = $this.data('target-class') || $target.data('class') || 'active';

				$this.toggleClass(toogleClass);
				$target.toggleClass(targetClass);
			});

			return $elements;
		}


		return {
			dataToogleClass: dataToogleClass(),
		}
	}

	$(document).ready(function(){
		new anyTheme.DataActions;
	});

})(jQuery, window);