var Grid = function(columns, rows) {
    columns = columns || 20;
    rows    = rows || 20;
    var self = {};

    self.element = $('<table class="grid"></table>');

    for(var r = 0; r < rows; r++) {
        var row = $('<tr></tr>');
        for(var c = 0; c < columns; c++) {
            var cell = $('<td></td>');

            cell.attr('x', c);
            cell.attr('y', r);

            cell.click(function (e) {
                console.log($(this).attr('x'), $(this).attr('y'));

                //Notify code goes here;

                $(this).css('background', $('input').val() );
            });

            row.append(cell);
        }
        self.element.append(row);
    }

    self.render = function(where) {
        where.append(self.element);
    };

    return self;
};