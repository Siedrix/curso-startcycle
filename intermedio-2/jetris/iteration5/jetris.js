$(function() {

    var Colors = {
        BLANK : '#eeeeee',
        T     : '#2255aa'
    };

    var Grid = function(columns, rows) {
        var self = {};

        self.element = $('<table class="grid"></table>');

        for(var r = 0; r < rows; r++) {
            var row = $('<tr></tr>');
            for(var c = 0; c < columns; c++) {
                row.append($('<td></td>'));
            }
            self.element.append(row);
        }

        self.getColorAt = function(x, y) {
            return self.element.find('tr:eq(' + y + ') td:eq(' + x + ')').css('background-color');
        };

        self.setColorAt = function(x, y, color) {
            self.element.find('tr:eq(' + y + ') td:eq(' + x + ')').css('background-color', color);
        };

        self.render = function(where) {
            where.append(self.element);
        };

        return self;
    };

    var Block = function(grid, initialX, initialY) {
        var self = {};

        self.grid = grid;
        self.moveTo = function(x, y) {
            grid.setColorAt(self.x+1, self.y,   Colors.BLANK);
            grid.setColorAt(self.x,   self.y+1, Colors.BLANK);
            grid.setColorAt(self.x+1, self.y+1, Colors.BLANK);
            grid.setColorAt(self.x+2, self.y+1, Colors.BLANK);

            self.x = x;
            self.y = y;

            grid.setColorAt(x+1, y,   Colors.T);
            grid.setColorAt(x,   y+1, Colors.T);
            grid.setColorAt(x+1, y+1, Colors.T);
            grid.setColorAt(x+2, y+1, Colors.T);
        };

        self.moveTo(initialX, initialY);

        self.tick = function() {
            self.moveTo(self.x, self.y + 1);
        };

        return self;
    };

    var grid = new Grid(10, 20);
    var block = new Block(grid, 3, 0);

    block.tick();

    grid.render($('#game'));

    describe("Piece falling down after a tick", function() {
        it("should be one row down", function() {
            expect(rgbToHex(grid.getColorAt(4, 0))).toBe(Colors.BLANK);
            expect(rgbToHex(grid.getColorAt(3, 1))).toBe(Colors.BLANK);
            expect(rgbToHex(grid.getColorAt(4, 1))).toBe(Colors.T);
            expect(rgbToHex(grid.getColorAt(5, 1))).toBe(Colors.BLANK);
            expect(rgbToHex(grid.getColorAt(3, 2))).toBe(Colors.T);
            expect(rgbToHex(grid.getColorAt(4, 2))).toBe(Colors.T);
            expect(rgbToHex(grid.getColorAt(5, 2))).toBe(Colors.T);
        })
    });

});