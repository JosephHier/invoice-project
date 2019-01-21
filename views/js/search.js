$(function() {
  $('#search').click(function() {
    $('tbody').children().remove();
    $.ajax({
      type: 'GET',
      url: '/v1/invoices/' + $('#query').val()
    }).done(function(res) {
      res.forEach(function(invoice) {
        $('tbody').append(rowify(invoice));
      });
    }).fail(function(err) {
      console.log(err);
    });
  });
});

function rowify(invoice) {
  return "<tr>"
    + "<th>" + invoice.id + "</th>"
    + "<th>" + invoice.invoice_number + "</th>"
    + "<th>" + invoice.po_number + "</th>"
    + "<th>" + formatDate(invoice.due_date) + "</th>"
    + "<th>" + invoice.amount_cents + "</th>"
    + "<th>" + formatDate(invoice.created_at) + "</th>"
    + "</tr>"
}

function formatDate(dateStr) {
  return dateStr.substring(0, 10);
}
