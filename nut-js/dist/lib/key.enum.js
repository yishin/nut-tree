"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = void 0;
/**
 * The {@link Key} enum represents keys of a standard 105 key US layout keyboard
 */
var Key;
(function (Key) {
    Key[Key["Space"] = 0] = "Space";
    Key[Key["Escape"] = 1] = "Escape";
    Key[Key["Tab"] = 2] = "Tab";
    Key[Key["LeftAlt"] = 3] = "LeftAlt";
    Key[Key["LeftControl"] = 4] = "LeftControl";
    Key[Key["RightAlt"] = 5] = "RightAlt";
    Key[Key["RightControl"] = 6] = "RightControl";
    Key[Key["LeftShift"] = 7] = "LeftShift";
    Key[Key["LeftSuper"] = 8] = "LeftSuper";
    Key[Key["RightShift"] = 9] = "RightShift";
    Key[Key["RightSuper"] = 10] = "RightSuper";
    Key[Key["F1"] = 11] = "F1";
    Key[Key["F2"] = 12] = "F2";
    Key[Key["F3"] = 13] = "F3";
    Key[Key["F4"] = 14] = "F4";
    Key[Key["F5"] = 15] = "F5";
    Key[Key["F6"] = 16] = "F6";
    Key[Key["F7"] = 17] = "F7";
    Key[Key["F8"] = 18] = "F8";
    Key[Key["F9"] = 19] = "F9";
    Key[Key["F10"] = 20] = "F10";
    Key[Key["F11"] = 21] = "F11";
    Key[Key["F12"] = 22] = "F12";
    Key[Key["F13"] = 23] = "F13";
    Key[Key["F14"] = 24] = "F14";
    Key[Key["F15"] = 25] = "F15";
    Key[Key["F16"] = 26] = "F16";
    Key[Key["F17"] = 27] = "F17";
    Key[Key["F18"] = 28] = "F18";
    Key[Key["F19"] = 29] = "F19";
    Key[Key["F20"] = 30] = "F20";
    Key[Key["F21"] = 31] = "F21";
    Key[Key["F22"] = 32] = "F22";
    Key[Key["F23"] = 33] = "F23";
    Key[Key["F24"] = 34] = "F24";
    Key[Key["Num0"] = 35] = "Num0";
    Key[Key["Num1"] = 36] = "Num1";
    Key[Key["Num2"] = 37] = "Num2";
    Key[Key["Num3"] = 38] = "Num3";
    Key[Key["Num4"] = 39] = "Num4";
    Key[Key["Num5"] = 40] = "Num5";
    Key[Key["Num6"] = 41] = "Num6";
    Key[Key["Num7"] = 42] = "Num7";
    Key[Key["Num8"] = 43] = "Num8";
    Key[Key["Num9"] = 44] = "Num9";
    Key[Key["A"] = 45] = "A";
    Key[Key["B"] = 46] = "B";
    Key[Key["C"] = 47] = "C";
    Key[Key["D"] = 48] = "D";
    Key[Key["E"] = 49] = "E";
    Key[Key["F"] = 50] = "F";
    Key[Key["G"] = 51] = "G";
    Key[Key["H"] = 52] = "H";
    Key[Key["I"] = 53] = "I";
    Key[Key["J"] = 54] = "J";
    Key[Key["K"] = 55] = "K";
    Key[Key["L"] = 56] = "L";
    Key[Key["M"] = 57] = "M";
    Key[Key["N"] = 58] = "N";
    Key[Key["O"] = 59] = "O";
    Key[Key["P"] = 60] = "P";
    Key[Key["Q"] = 61] = "Q";
    Key[Key["R"] = 62] = "R";
    Key[Key["S"] = 63] = "S";
    Key[Key["T"] = 64] = "T";
    Key[Key["U"] = 65] = "U";
    Key[Key["V"] = 66] = "V";
    Key[Key["W"] = 67] = "W";
    Key[Key["X"] = 68] = "X";
    Key[Key["Y"] = 69] = "Y";
    Key[Key["Z"] = 70] = "Z";
    Key[Key["Grave"] = 71] = "Grave";
    Key[Key["Minus"] = 72] = "Minus";
    Key[Key["Equal"] = 73] = "Equal";
    Key[Key["Backspace"] = 74] = "Backspace";
    Key[Key["LeftBracket"] = 75] = "LeftBracket";
    Key[Key["RightBracket"] = 76] = "RightBracket";
    Key[Key["Backslash"] = 77] = "Backslash";
    Key[Key["Semicolon"] = 78] = "Semicolon";
    Key[Key["Quote"] = 79] = "Quote";
    Key[Key["Return"] = 80] = "Return";
    Key[Key["Comma"] = 81] = "Comma";
    Key[Key["Period"] = 82] = "Period";
    Key[Key["Slash"] = 83] = "Slash";
    Key[Key["Left"] = 84] = "Left";
    Key[Key["Up"] = 85] = "Up";
    Key[Key["Right"] = 86] = "Right";
    Key[Key["Down"] = 87] = "Down";
    Key[Key["Print"] = 88] = "Print";
    Key[Key["Pause"] = 89] = "Pause";
    Key[Key["Insert"] = 90] = "Insert";
    Key[Key["Delete"] = 91] = "Delete";
    Key[Key["Home"] = 92] = "Home";
    Key[Key["End"] = 93] = "End";
    Key[Key["PageUp"] = 94] = "PageUp";
    Key[Key["PageDown"] = 95] = "PageDown";
    Key[Key["Add"] = 96] = "Add";
    Key[Key["Subtract"] = 97] = "Subtract";
    Key[Key["Multiply"] = 98] = "Multiply";
    Key[Key["Divide"] = 99] = "Divide";
    Key[Key["Decimal"] = 100] = "Decimal";
    Key[Key["Enter"] = 101] = "Enter";
    Key[Key["NumPad0"] = 102] = "NumPad0";
    Key[Key["NumPad1"] = 103] = "NumPad1";
    Key[Key["NumPad2"] = 104] = "NumPad2";
    Key[Key["NumPad3"] = 105] = "NumPad3";
    Key[Key["NumPad4"] = 106] = "NumPad4";
    Key[Key["NumPad5"] = 107] = "NumPad5";
    Key[Key["NumPad6"] = 108] = "NumPad6";
    Key[Key["NumPad7"] = 109] = "NumPad7";
    Key[Key["NumPad8"] = 110] = "NumPad8";
    Key[Key["NumPad9"] = 111] = "NumPad9";
    Key[Key["CapsLock"] = 112] = "CapsLock";
    Key[Key["ScrollLock"] = 113] = "ScrollLock";
    Key[Key["NumLock"] = 114] = "NumLock";
    Key[Key["AudioMute"] = 115] = "AudioMute";
    Key[Key["AudioVolDown"] = 116] = "AudioVolDown";
    Key[Key["AudioVolUp"] = 117] = "AudioVolUp";
    Key[Key["AudioPlay"] = 118] = "AudioPlay";
    Key[Key["AudioStop"] = 119] = "AudioStop";
    Key[Key["AudioPause"] = 120] = "AudioPause";
    Key[Key["AudioPrev"] = 121] = "AudioPrev";
    Key[Key["AudioNext"] = 122] = "AudioNext";
    Key[Key["AudioRewind"] = 123] = "AudioRewind";
    Key[Key["AudioForward"] = 124] = "AudioForward";
    Key[Key["AudioRepeat"] = 125] = "AudioRepeat";
    Key[Key["AudioRandom"] = 126] = "AudioRandom";
})(Key = exports.Key || (exports.Key = {}));
//# sourceMappingURL=key.enum.js.map