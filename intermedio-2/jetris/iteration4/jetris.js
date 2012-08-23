$(function() {

    var Block = function(initialX, initialY) {
        var self = {};

        self.moveTo = function(x, y) {
            self.x = x;
            self.y = y;
            $('.grid tr:eq(' + y + ') td:eq(' + (x+1) + ')').css('background-color', '#2255aa');
            $('.grid tr:eq(' + (y+1) + ') td:eq(' + x + ')').css('background-color', '#2255aa');
            $('.grid tr:eq(' + (y+1) + ') td:eq(' + (x+1) + ')').css('background-color', '#2255aa');
            $('.grid tr:eq(' + (y+1) + ') td:eq(' + (x+2) + ')').css('background-color', '#2255aa');
        };

        self.moveTo(initialX, initialY);

        self.tick = function() {
            self.moveTo(self.x, self.y + 1);
        };

        return self;
    };

    var block = new Block(3, 0);
    block.tick();

    describe("Piece falling down after a tick", function() {
        it("should be one row down", function() {
            expect(rgbToHex($('.grid tr:eq(1) td:eq(4)').css('background-color'))).toBe('#2255aa');
            expect(rgbToHex($('.grid tr:eq(2) td:eq(3)').css('background-color'))).toBe('#2255aa');
            expect(rgbToHex($('.grid tr:eq(2) td:eq(4)').css('background-color'))).toBe('#2255aa');
            expect(rgbToHex($('.grid tr:eq(2) td:eq(5)').css('background-color'))).toBe('#2255aa');
        })
    });

});