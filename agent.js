export default class Agent {
    constructor(x, y, state) {
        this.x = x
        this.y = y
        this.state = state
        this.maxX = state[0].length - 1
        this.maxY = state.length - 1
        this.point = this.state[this.y][this.x]
        this.mode = 'testing'
        this.totalTrains = 0
        this.trainsDone = 0
        /*
        '0|3', '2|4', '3|4', '4|2', '4|0','1|1'
        */
        this.storedReds = []
    }

    #draw() {
        let htmlDivs = `<div class="container"><h1 class="training-h3">Model is Training ${this.trainsDone}/${this.totalTrains}</h1>`
        this.state.map((a, y) => {
            htmlDivs += '<div class="row">'
            a.map((point, x) => {
                htmlDivs += `<div class="inner-div div-${point}">${(x == this.x && y == this.y) ? '<div id="Agent"></div>' : ''}</div>`
            })
            htmlDivs += '</div>'
        })
        htmlDivs += '</div>'

        document.querySelector('#app').innerHTML = htmlDivs
    }

    #getPosStr(x, y) {
        return `${x}|${y}`
    }

    train(n) {
        this.mode = 'training'
        this.totalTrains = n
        this.trainsDone = 0
        for (let i = 0; i < n; i++) {
            this.trainsDone = i + 1
            this.run()
        }
    }

    run() {
        while (true) {
            this.moveRandom()
            if (this.point == 2 || this.point == -1) {
                if (this.point == -1) {
                    this.storedReds.push(this.#getPosStr(this.x, this.y))
                }
                break
            }
        }
    }

    moveRandom() {
        const chances = [
            { value: this.x > 0, f: this.moveLeft },
            { value: this.x < this.maxX, f: this.moveRight },
            { value: this.y > 0, f: this.moveUp },
            { value: this.y < this.maxY, f: this.moveDown }
        ]
        const trues = chances.filter((a) => { return a.value })
        trues[(Math.floor(Math.random() * trues.length))].f.apply(this)
    }

    moveLeft() {
        if (this.x > 0) {
            if (this.storedReds.includes(this.#getPosStr(this.x - 1, this.y))) {
                return false
            }
            this.x--
            this.point = this.state[this.y][this.x]
            this.#draw()
            return true
        } else {
            return false
        }
    }

    moveRight() {
        if (this.x < this.maxX) {
            if (this.storedReds.includes(this.#getPosStr(this.x + 1, this.y))) {
                return false
            }
            this.x++
            this.point = this.state[this.y][this.x]
            this.#draw()
            return true
        } else {
            return false
        }
    }

    moveUp() {
        if (this.y > 0) {
            if (this.storedReds.includes(this.#getPosStr(this.x, this.y - 1))) {
                return false
            }
            this.y--
            this.point = this.state[this.y][this.x]
            this.#draw()
            return true
        }
        return false
    }

    moveDown() {
        if (this.y < this.maxY) {
            if (this.storedReds.includes(this.#getPosStr(this.x, this.y + 1))) {
                return false
            }
            this.y++
            this.point = this.state[this.y][this.x]
            this.#draw()
            return true
        }
        return false
    }

}