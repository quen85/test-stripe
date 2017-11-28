jQuery('input[type="checkbox"]').click(function(e){
    if(jQuery(this).is(':checked')){
        let amount = parseInt(jQuery('.amount').text());
        let newAmount = parseInt((jQuery(this).data('amount') + amount));
        jQuery('.amount').text( newAmount + ' €').attr('data-amount', newAmount);
        jQuery('input[type="hidden"]').val(newAmount);
    }
    else{
        let amount = parseInt(jQuery('.amount').text());
        let newAmount = parseInt((amount - jQuery(this).data('amount')));
        jQuery('.amount').text(newAmount + ' €').attr('data-amount', newAmount);
        jQuery('input[type="hidden"]').val(newAmount);
    }
});