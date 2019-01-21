$(function() {
  $('#submit').click(function() {
    $.ajax({
      url: '/v1/invoices',
      type: 'POST',
      data: {
        invoice_number: $('#invoice-number').val(),
        po_number: $('#po-number').val(),
        due_date: $('#due-date').val(),
        amount_cents: $('#amount-cents').val()
      }
    }).done(function(res) {
      $('.form-control').val('');
      alert('Invoice Created');
    }).fail(function(err) {
      alert("Error!");
      console.log(err);
    });
  });
});
