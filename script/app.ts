var square = new class{
    selected: number
    empty: string = '<div class="empty"></div>'

    class: string = 'number'
    
    constructor(){
        this.selected = -1
    }

    handle(event: any){
        let target: HTMLElement = event.target
        let targetId = Number(target.id)

        if(targetId == this.selected){
            this.selected = -1
            event.target.classList.remove("selected")
        }
        else if(this.selected == -1){
            this.selected = targetId
            event.target.classList.add("selected")
        }
        else{
            let selectedObject = document.getElementById(`${this.selected}`)
            selectedObject?.classList.remove("selected")
            if(this.check.places(this.selected, targetId)){
                table.matrix[this.selected] = -1
                table.matrix[targetId] = -1
                table.remove1()
                if(!table.checkGameOver()) table.display()
            }
            this.selected = -1
        }
        
    }

    create(_id: number, _num: number){
        return(`<div onclick="square.handle(event)" id="${_id}" class="${this.class}" >${_num}</div>`)
    }

    check = new class{
        line(p1: number, p2: number){
            for(var i = p1 + 1 ; i < p2 ; i++)
            if(table.matrix[i] != -1) return 0
    
            return 1
        }

        column(p1: number, p2: number){
            if((p2 - p1) % 9 != 0) return 0
        
            for(var i = p1 + 9 ; i < p2 ; i+=9)
                if(table.matrix[i] != -1) return 0;
                
            return 1
        }

        places(p1: number, p2: number){
            if(table.matrix[p1] != table.matrix[p2] && table.matrix[p1] + table.matrix[p2] != 10) return 0

            if(p1 == p2) return 0

            if(p2 < p1){
                var aux = p1
                p1 = p2
                p2 = aux
            }

            if(this.line(p1, p2)) return 1
        
            if(this.column(p1, p2)) return 1

            return 0
        }
    }
}

var table = new class{
    matrix: Array<number>

    level: number = 1
    size: number = 18
    //add: number = 9
    screen: HTMLElement = document.getElementById('screen')!

    constructor(){
        this.generateWinMsg()
        this.matrix = this.generate()
        this.display()
    }

    shuffle(a: Array<number>){
        let _size = a.length
        for(var i = 0 ; i <= _size - 1 ; i++){
            let newIndex = Math.floor(Math.random() * (_size - 1))
            let aux:number = a[i]
            a[i] = a[newIndex]
            a[newIndex] = aux
        }
        return a
    }

    generate(){
        let _size = (this.size % 2 == 0) ? this.size : this.size + 1
        let numbers: Array<number> = []
        
        for(var i = 0 ; i <= _size / 2 - 1 ; i++){
            let number = Math.floor((Math.random() * 9) + 1)
            numbers[i*2] = number
            numbers[i*2+1] = number
        }
    
        numbers = this.shuffle(numbers)
        if(this.size % 2) numbers.pop()
        return numbers
    }

    display(){
        var content = ''
        square.selected = -1
        for(var i: number = 0 ; i < this.matrix.length ; i++){
            if(this.matrix[i]!=-1)
            content += square.create(i, this.matrix[i])

            else
            content += square.empty
        }
        this.screen.innerHTML = content
        //document.getElementById(10).classList.add('checked')
    }

    remove1CheckRow(p: number){
        let rowStart = p - 4, rowEnd = p + 4
        //console.log(rowStart, rowEnd)
        if(rowEnd >= this.matrix.length) return 0

        for(let  i = rowStart ; i <= rowEnd ; i++){
            if(this.matrix[i] != -1) return 0
        }
        this.matrix.splice(rowStart, 9)
        return 1
    }

    remove1(){
        for(let i = 4 ; i <= table.matrix.length ; i+=9)
            if(this.remove1CheckRow(i) == 1) i-=9
    }

    valid(p1: number, p2: number) {
        //console.log(`p1 ${p1}, p2 ${p2}`)
        if (p1 == p2)
            return 0;
        if (this.matrix[p1] + this.matrix[p2] == 10 || this.matrix[p1] == this.matrix[p2])
            return 1;
        //console.log(`not ok`)
        return 0;
    }
    win = document.getElementById('win')

    winMsg = ["Well done!", "Congratulations!", "You solved it!", "BIG BRAIN", "Smarty pants!", "Nice!", "It ain't much, but it's an honest work" ,"Good job!", "Well played!", "Well boys, we did it! Digits are no more"]

    generateWinMsg(){
        this.win!.innerHTML =  this.winMsg[Math.floor(Math.random() * this.winMsg.length)]
    }

    checkGameOver(){
        if(this.matrix.length <= 9){
            for(let i = 0 ; i < this.matrix.length ; i++)
                if(this.matrix[i] != -1) return 0
            this.win?.classList.remove('invisible')
            this.screen?.classList.add('invisible')
            return 1
        }
        else return 0
    }

}

var buttons = new class{

    add = new class{

        addNumbers(){
            let t: Array<number> = [], c = 0
            for(let i = 0 ; i < table.matrix.length ; i++){
                let aux = table.matrix[i]
                if(aux != -1) t[c++] = aux
            }
            t = table.shuffle(t)
            let end = Math.floor(t.length/2)
            t.splice(0, end)
            return t
        }

        main(){
            //let t = this.addNumbers()
            table.matrix = table.matrix.concat(this.addNumbers())
            buttons.mix.counter++
            buttons.mix.check(false)
            table.display()
        }

    }

    mix = new class{
        counter: number = 0

        mixButton = document.getElementById('mix')
        addButton = document.getElementById('add')

        check(k: boolean){
            if(this.counter == 4){
                this.addButton?.classList.add('invisible')
                this.mixButton?.classList.remove('invisible')
            }

            if(k){
                this.addButton?.classList.remove('invisible')
                this.mixButton?.classList.add('invisible')
            }
        }

        main(){
            //console.log('pressed')
            table.matrix = table.shuffle(table.matrix)
            this.addButton?.classList.remove('invisible')
            this.mixButton?.classList.add('invisible')
            this.counter = 0
            table.remove1()
            table.display()
        }
    }

    check = new class{

        hl(p1: number, p2: number){
            //console.log(p1, p2)
            document.getElementById(`${p1}`)?.classList.add('hled')
            document.getElementById(`${p2}`)?.classList.add('hled')
            
            setTimeout(() => {
                document.getElementById(`${p1}`)?.classList.remove('hled')
                document.getElementById(`${p2}`)?.classList.remove('hled')
            }, 1010);
            
        }

        check = new class{

            place(place: number){
                let matchedPlace = this.row(place)
                if(matchedPlace != -1){
                    return matchedPlace
                }
                    
                matchedPlace = this.column(place)
                if(matchedPlace != -1){
                    return matchedPlace
                }
                return -1
            }

            row(place: number){
                //console.log('row function: place', place)
                for(let i = place + 1 ; i < table.matrix.length ; i++){
                    //console.log(i, table.matrix[i])
                    if(table.valid(place, i)){
                        //console.log('row function: i' , i)
                        return i
                    }else if(table.matrix[i] != -1) return -1
                }
                return -1
            }

            column(place: number){
                for(let i = place + 9 ; i < table.matrix.length ; i+=9){
                    if(table.valid(i, place)){
                        return i
                    }else if(table.matrix[i] != -1) return -1
                }
                return -1
            }
        }

        main(){
            let matchedPlace: number, i: number
            for(i = 0 ; i < table.matrix.length - 1 ; i++){
                if(table.matrix[i] == -1) continue
                matchedPlace = this.check.place(i)
                if(matchedPlace != -1){
                    this.hl(i, matchedPlace)
                    break
                }
            }
        }
    }

    new = new class{
        main(){
            table.generateWinMsg()
            table.screen.classList.remove('invisible')
            table.win?.classList.add('invisible')
            table.matrix = table.generate()
            buttons.mix.counter = 0
            buttons.mix.check(true)
            table.display()
        }
    }

    level = new class{
        
        levelSvg = document.getElementById('levelSvg')
        levelInput: any = document.getElementById('levelInput')

        
        levelInputHandle(event: any){
            if(event.key == "Enter" || event.key == " "){
                let value = Number(this.levelInput.value)

                if(Math.floor(value) == value && value > 0 && value < 100){
                    this.levelInput.value = value

                    let base = 17 + value
                    let add = Math.floor(base/2)
                    
                    if(base % 2 == 1 && add % 2 == 0) add++

                    table.level = value
                    table.size = base
                    //table.add = add
                    table.screen.classList.remove('invisible')
                    table.win?.classList.add('invisible')
                    
                    table.matrix = table.generate()
                    table.display()
                }
                
            }
        }

        main(){
            this.levelSvg?.classList.add('invisible')
            this.levelInput?.classList.remove('invisible')
        }
    }
}

document.getElementById('add')!.onclick = () => {
    buttons.add.main()
}

document.getElementById('mix')!.onclick = () => {
    buttons.mix.main()
}

document.getElementById('check')!.onclick = () => {
    buttons.check.main()
}

document.getElementById('new')!.onclick = () => {
    buttons.new.main()
}

document.getElementById('level')!.onclick = () =>{
    buttons.level.main()
}