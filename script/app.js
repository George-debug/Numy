"use strict";
var square = new class {
    constructor() {
        this.empty = '<div class="empty"></div>';
        this.class = 'number';
        this.check = new class {
            line(p1, p2) {
                for (var i = p1 + 1; i < p2; i++)
                    if (table.matrix[i] != -1)
                        return 0;
                return 1;
            }
            column(p1, p2) {
                if ((p2 - p1) % 9 != 0)
                    return 0;
                for (var i = p1 + 9; i < p2; i += 9)
                    if (table.matrix[i] != -1)
                        return 0;
                return 1;
            }
            places(p1, p2) {
                if (table.matrix[p1] != table.matrix[p2] && table.matrix[p1] + table.matrix[p2] != 10)
                    return 0;
                if (p1 == p2)
                    return 0;
                if (p2 < p1) {
                    var aux = p1;
                    p1 = p2;
                    p2 = aux;
                }
                if (this.line(p1, p2))
                    return 1;
                if (this.column(p1, p2))
                    return 1;
                return 0;
            }
        };
        this.selected = -1;
    }
    handle(event) {
        let target = event.target;
        let targetId = Number(target.id);
        if (targetId == this.selected) {
            this.selected = -1;
            event.target.classList.remove("selected");
        }
        else if (this.selected == -1) {
            this.selected = targetId;
            event.target.classList.add("selected");
        }
        else {
            let selectedObject = document.getElementById(`${this.selected}`);
            selectedObject === null || selectedObject === void 0 ? void 0 : selectedObject.classList.remove("selected");
            if (this.check.places(this.selected, targetId)) {
                table.matrix[this.selected] = -1;
                table.matrix[targetId] = -1;
                table.remove1();
                if (!table.checkGameOver())
                    table.display();
            }
            this.selected = -1;
        }
    }
    create(_id, _num) {
        return (`<div onclick="square.handle(event)" id="${_id}" class="${this.class}" >${_num}</div>`);
    }
};
var table = new class {
    constructor() {
        this.level = 1;
        this.size = 18;
        //add: number = 9
        this.screen = document.getElementById('screen');
        this.win = document.getElementById('win');
        this.winMsg = ["Well done!", "Congratulations!", "You solved it!", "BIG BRAIN", "Smarty pants!", "Nice!", "It ain't much, but it's an honest work", "Good job!", "Well played!", "Well boys, we did it! Digits are no more"];
        this.generateWinMsg();
        this.matrix = this.generate();
        this.display();
    }
    shuffle(a) {
        let _size = a.length;
        for (var i = 0; i <= _size - 1; i++) {
            let newIndex = Math.floor(Math.random() * (_size - 1));
            let aux = a[i];
            a[i] = a[newIndex];
            a[newIndex] = aux;
        }
        return a;
    }
    generate() {
        let _size = (this.size % 2 == 0) ? this.size : this.size + 1;
        let numbers = [];
        for (var i = 0; i <= _size / 2 - 1; i++) {
            let number = Math.floor((Math.random() * 9) + 1);
            numbers[i * 2] = number;
            numbers[i * 2 + 1] = number;
        }
        numbers = this.shuffle(numbers);
        if (this.size % 2)
            numbers.pop();
        return numbers;
    }
    display() {
        var content = '';
        square.selected = -1;
        for (var i = 0; i < this.matrix.length; i++) {
            if (this.matrix[i] != -1)
                content += square.create(i, this.matrix[i]);
            else
                content += square.empty;
        }
        this.screen.innerHTML = content;
        //document.getElementById(10).classList.add('checked')
    }
    remove1CheckRow(p) {
        let rowStart = p - 4, rowEnd = p + 4;
        //console.log(rowStart, rowEnd)
        if (rowEnd >= this.matrix.length)
            return 0;
        for (let i = rowStart; i <= rowEnd; i++) {
            if (this.matrix[i] != -1)
                return 0;
        }
        this.matrix.splice(rowStart, 9);
        return 1;
    }
    remove1() {
        for (let i = 4; i <= table.matrix.length; i += 9)
            if (this.remove1CheckRow(i) == 1)
                i -= 9;
    }
    valid(p1, p2) {
        //console.log(`p1 ${p1}, p2 ${p2}`)
        if (p1 == p2)
            return 0;
        if (this.matrix[p1] + this.matrix[p2] == 10 || this.matrix[p1] == this.matrix[p2])
            return 1;
        //console.log(`not ok`)
        return 0;
    }
    generateWinMsg() {
        this.win.innerHTML = this.winMsg[Math.floor(Math.random() * this.winMsg.length)];
    }
    checkGameOver() {
        var _a, _b;
        if (this.matrix.length <= 9) {
            for (let i = 0; i < this.matrix.length; i++)
                if (this.matrix[i] != -1)
                    return 0;
            (_a = this.win) === null || _a === void 0 ? void 0 : _a.classList.remove('invisible');
            (_b = this.screen) === null || _b === void 0 ? void 0 : _b.classList.add('invisible');
            return 1;
        }
        else
            return 0;
    }
};
var buttons = new class {
    constructor() {
        this.add = new class {
            addNumbers() {
                let t = [], c = 0;
                for (let i = 0; i < table.matrix.length; i++) {
                    let aux = table.matrix[i];
                    if (aux != -1)
                        t[c++] = aux;
                }
                t = table.shuffle(t);
                let end = Math.floor(t.length / 2);
                t.splice(0, end);
                return t;
            }
            main() {
                //let t = this.addNumbers()
                table.matrix = table.matrix.concat(this.addNumbers());
                buttons.mix.counter++;
                buttons.mix.check(false);
                table.display();
            }
        };
        this.mix = new class {
            constructor() {
                this.counter = 0;
                this.mixButton = document.getElementById('mix');
                this.addButton = document.getElementById('add');
            }
            check(k) {
                var _a, _b, _c, _d;
                if (this.counter == 4) {
                    (_a = this.addButton) === null || _a === void 0 ? void 0 : _a.classList.add('invisible');
                    (_b = this.mixButton) === null || _b === void 0 ? void 0 : _b.classList.remove('invisible');
                }
                if (k) {
                    (_c = this.addButton) === null || _c === void 0 ? void 0 : _c.classList.remove('invisible');
                    (_d = this.mixButton) === null || _d === void 0 ? void 0 : _d.classList.add('invisible');
                }
            }
            main() {
                var _a, _b;
                //console.log('pressed')
                table.matrix = table.shuffle(table.matrix);
                (_a = this.addButton) === null || _a === void 0 ? void 0 : _a.classList.remove('invisible');
                (_b = this.mixButton) === null || _b === void 0 ? void 0 : _b.classList.add('invisible');
                this.counter = 0;
                table.remove1();
                table.display();
            }
        };
        this.check = new class {
            constructor() {
                this.check = new class {
                    place(place) {
                        let matchedPlace = this.row(place);
                        if (matchedPlace != -1) {
                            return matchedPlace;
                        }
                        matchedPlace = this.column(place);
                        if (matchedPlace != -1) {
                            return matchedPlace;
                        }
                        return -1;
                    }
                    row(place) {
                        //console.log('row function: place', place)
                        for (let i = place + 1; i < table.matrix.length; i++) {
                            //console.log(i, table.matrix[i])
                            if (table.valid(place, i)) {
                                //console.log('row function: i' , i)
                                return i;
                            }
                            else if (table.matrix[i] != -1)
                                return -1;
                        }
                        return -1;
                    }
                    column(place) {
                        for (let i = place + 9; i < table.matrix.length; i += 9) {
                            if (table.valid(i, place)) {
                                return i;
                            }
                            else if (table.matrix[i] != -1)
                                return -1;
                        }
                        return -1;
                    }
                };
            }
            hl(p1, p2) {
                var _a, _b;
                //console.log(p1, p2)
                (_a = document.getElementById(`${p1}`)) === null || _a === void 0 ? void 0 : _a.classList.add('hled');
                (_b = document.getElementById(`${p2}`)) === null || _b === void 0 ? void 0 : _b.classList.add('hled');
                setTimeout(() => {
                    var _a, _b;
                    (_a = document.getElementById(`${p1}`)) === null || _a === void 0 ? void 0 : _a.classList.remove('hled');
                    (_b = document.getElementById(`${p2}`)) === null || _b === void 0 ? void 0 : _b.classList.remove('hled');
                }, 1010);
            }
            main() {
                let matchedPlace, i;
                for (i = 0; i < table.matrix.length - 1; i++) {
                    if (table.matrix[i] == -1)
                        continue;
                    matchedPlace = this.check.place(i);
                    if (matchedPlace != -1) {
                        this.hl(i, matchedPlace);
                        break;
                    }
                }
            }
        };
        this.new = new class {
            main() {
                var _a;
                table.generateWinMsg();
                table.screen.classList.remove('invisible');
                (_a = table.win) === null || _a === void 0 ? void 0 : _a.classList.add('invisible');
                table.matrix = table.generate();
                buttons.mix.counter = 0;
                buttons.mix.check(true);
                table.display();
            }
        };
        this.level = new class {
            constructor() {
                this.levelSvg = document.getElementById('levelSvg');
                this.levelInput = document.getElementById('levelInput');
            }
            levelInputHandle(event) {
                var _a;
                if (event.key == "Enter" || event.key == " ") {
                    let value = Number(this.levelInput.value);
                    if (Math.floor(value) == value && value > 0 && value < 100) {
                        this.levelInput.value = value;
                        let base = 17 + value;
                        let add = Math.floor(base / 2);
                        if (base % 2 == 1 && add % 2 == 0)
                            add++;
                        table.level = value;
                        table.size = base;
                        //table.add = add
                        table.screen.classList.remove('invisible');
                        (_a = table.win) === null || _a === void 0 ? void 0 : _a.classList.add('invisible');
                        table.matrix = table.generate();
                        table.display();
                    }
                }
            }
            main() {
                var _a, _b;
                (_a = this.levelSvg) === null || _a === void 0 ? void 0 : _a.classList.add('invisible');
                (_b = this.levelInput) === null || _b === void 0 ? void 0 : _b.classList.remove('invisible');
            }
        };
    }
};
document.getElementById('add').onclick = () => {
    buttons.add.main();
};
document.getElementById('mix').onclick = () => {
    buttons.mix.main();
};
document.getElementById('check').onclick = () => {
    buttons.check.main();
};
document.getElementById('new').onclick = () => {
    buttons.new.main();
};
document.getElementById('level').onclick = () => {
    buttons.level.main();
};
