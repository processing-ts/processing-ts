
class Extensions{

    public static init() {

        // Animation

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;


        // Math

        Math.TAU = Math.PI * 2;


        // String

        String.prototype.format = function () {
            var s = arguments[0];
            for (var i = 0; i < arguments.length - 1; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                s = s.replace(reg, arguments[i + 1]);
            }

            return s;
        };

        String.prototype.startsWith = function (str) { return this.indexOf(str) == 0; };
        String.prototype.trim = function () { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };
        String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); };
        String.prototype.rtrim = function () { return this.replace(/\s+$/, ''); };
        String.prototype.fulltrim = function () { return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' '); };
        String.prototype.toFileName = function () { return this.replace(/[^a-z0-9]/gi, '_').toLowerCase(); };


        // Array

        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (searchElement: any, fromIndex?: number) {
                var i = (fromIndex || 0);
                var j = this.length;

                for (i; i < j; i++) {
                    if (this[i] === searchElement) {
                        return i;
                    }
                }
                return -1;
            };
        }

        Array.prototype.clone = function () {
            return this.slice(0);
        };

        if (!Array.prototype.last) {
            Array.prototype.last = function () {
                return this[this.length - 1];
            };
        };
    }
}

export = Extensions;