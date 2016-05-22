import {Injectable} from "@angular/core";
import {Rgba, Hsla, Hsva} from "./classes";

@Injectable()
export class ColorPickerService {
    constructor() {
    }

    hsla2hsva(hsla:Hsla):Hsva {
        var h = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1), l = Math.min(hsla.l, 1), a = Math.min(hsla.a, 1);
        if (l === 0) {
            return {h: h, s: 0, v: 0, a: a};
        } else {
            var v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return {h: h, s: 2 * (v - l) / v, v: v, a: a};
        }
    }

    hsva2hsla(hsva:Hsva):Hsla {
        var h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a)
        } else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a)
        } else {
            var l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a)
        }
    }

    rgbaToHsva(rgba:Rgba):Hsva {
        let r:number = Math.min(rgba.r, 1), g:number = Math.min(rgba.g, 1), b:number = Math.min(rgba.b, 1),
            a:number = Math.min(rgba.a, 1);
        let max:number = Math.max(r, g, b), min:number = Math.min(r, g, b);
        let h:number, s:number, v:number = max;

        let d:number = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return new Hsva(h, s, v, a)
    }

    hsvaToRgba(hsva:Hsva):Rgba {
        let h:number = hsva.h, s:number = hsva.s, v:number = hsva.v, a:number = hsva.a;
        let r:number, g:number, b:number;

        let i:number = Math.floor(h * 6);
        let f:number = h * 6 - i;
        let p:number = v * (1 - s);
        let q:number = v * (1 - f * s);
        let t:number = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }

        return new Rgba(r, g, b, a)
    }

    stringToHsva(colorString:string):Hsva {
        let stringParsers = [
            {
                re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult:any) {
                    return new Rgba(parseInt(execResult[2]) / 255,
                        parseInt(execResult[3]) / 255,
                        parseInt(execResult[4]) / 255,
                        isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult:any) {
                    return new Hsla(parseInt(execResult[2]) / 360,
                        parseInt(execResult[3]) / 100,
                        parseInt(execResult[4]) / 100,
                        isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult:any) {
                    return new Rgba(parseInt(execResult[1], 16) / 255,
                        parseInt(execResult[2], 16) / 255,
                        parseInt(execResult[3], 16) / 255,
                        1);
                }
            },
            {
                re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
                parse: function (execResult:any) {
                    return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255,
                        parseInt(execResult[2] + execResult[2], 16) / 255,
                        parseInt(execResult[3] + execResult[3], 16) / 255,
                        1);
                }
            }
        ];
        colorString = colorString.toLowerCase();
        let hsva:Hsva = null;
        for (var key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                var parser = stringParsers[key];
                var match = parser.re.exec(colorString), color = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = this.rgbaToHsva(color);
                    } else if (color instanceof Hsla) {
                        hsva = this.hsla2hsva(color);
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    }

    outputFormat(hsva:Hsva, outputFormat:string):string {
        if (hsva.a < 1) {
            switch (outputFormat) {
                case 'hsla':
                    let hsla = this.hsva2hsla(hsva);
                    let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%,' + hslaText.a + ')';
                default:
                    let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + Math.round(rgba.a * 100) / 100 + ')';
            }
        } else {
            switch (outputFormat) {
                case 'hsla':
                    let hsla = this.hsva2hsla(hsva);
                    let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgba':
                    let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                default:
                    return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)));
            }
        }
    }

    hexText(rgba:Rgba):string {
        let hexText = '#' + ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16).substr(1);
        if (hexText[1] === hexText[2] && hexText[3] === hexText[4] && hexText[5] === hexText[6]) {
            hexText = '#' + hexText[1] + hexText[3] + hexText[5];
        }
        return hexText;
    }

    denormalizeRGBA(rgba:Rgba):Rgba {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    }
}
