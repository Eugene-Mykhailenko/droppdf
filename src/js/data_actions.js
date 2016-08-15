(function($, window){
    var anyTheme = window.anyTheme || {};

    anyTheme.DataActions = function(){
        var dataToogleClass = function () {
            var $elements = $('[data-toogle="class"]')

            $elements.click(function () {
                var $this = $(this),
                    toogleClass = $this.data('class') || 'active',
                    $target = $($this.data('target')),
                    targetClass = $this.data('target-class') || $target.data('class');

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
