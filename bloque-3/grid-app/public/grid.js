(function (global){

var Grid = function(columns, rows) {
    columns = columns || 20;
    rows    = rows || 20;

    var COLOR = {
        EMPTY : '#FFFFFF'
    }

    var self = {};

    self.matrix = [];

    self.initMatrix = function (matrix) {
        var array;

        if(matrix){
            self.matrix = matrix;
            return;
        }

        for(var r = 0; r < rows; r++) {
            array = []
            for(var c = 0; c < columns; c++) {
                array.push(COLOR.EMPTY)
            }
            self.matrix.push(array);
        }        
    }

    //For node
    self.toJSON = function () {
        return self.matrix;
    }

    //For the browser
    self.toHTML = function () {      
        self.element = $('<table class="grid"></table>');

        for(var r = 0; r < rows; r++) {
            var row = $('<tr></tr>');
            for(var c = 0; c < columns; c++) {
                var cell = $('<td></td>');

                cell.attr('x', c);
                cell.attr('y', r);
                cell.css('background', self.matrix[c][r]);

                cell.click(function (e) {
                    console.log($(this).attr('x'), $(this).attr('y'));

                    //Notify code goes here;
                    client.publish('/messages', {
                        x: $(this).attr('x'),
                        y: $(this).attr('y'),
                        color : $('input').val()                    
                    });

                    $(this).css('background', $('input').val() );
                });

                row.append(cell);
            }
            self.element.append(row);
        }
    }

    self.render = function(where) {
        self.toHTML();

        where.append(self.element);
    };



    return self;
};


global.Grid = Grid;

}(typeof window  === 'undefined' ? exports : window));
