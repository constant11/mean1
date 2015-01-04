jQuery(document).ready(function() {
    jQuery('#contact_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            givenname: {
                validators: {
                    notEmpty: {
                        message: 'The Given Name is required'
                    }
                }
            }
        }
    });
});