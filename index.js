class Snake {
    constructor(cellSize, fieldWidth, fieldHeight) {
        this.dir = 'ArrowDown'
        this.cellSize = cellSize
        this.fieldWidth = fieldWidth * cellSize
        this.fieldHeight = fieldHeight * cellSize
        this.snake = this.createSnake();
    }

    createSnake() {
        let snake = []
        this.length = 3;
        for (let i = 0; i < this.length; i++) {
            let snakeElement = this.createElement()
            snakeElement.style.left = 0
            snakeElement.style.top = `${this.cellSize * this.length - this.cellSize * i}px`
            snake.push(snakeElement)
        }
        return snake
    }

    createElement() {
        let snakeElement = document.createElement('div');
        snakeElement.className = `snakeElement`;
        snakeElement.style.width = this.cellSize + 'px'
        snakeElement.style.height = this.cellSize + 'px'
        snakeElement.style.background = "green"
        snakeElement.style.position = 'absolute'
        snakeElement.style.border = '3px solid white'
        snakeElement.style.boxSizing = 'border-box'
        return snakeElement
    }

    snakeMove() {
        let snakeElement = this.createElement()
        const headElement = {
            top: +this.snake[0].style.top.slice(0, -2),
            left: +this.snake[0].style.left.slice(0, -2)
        }
        switch (this.dir) {
            case 'ArrowDown':
                snakeElement.style.left = headElement.left + 'px'
                snakeElement.style.top = `${headElement.top + (this.cellSize)}px`
                snakeElement.style.transform = "rotate(0deg)"
                break
            case 'ArrowUp':
                snakeElement.style.left = headElement.left + 'px'
                snakeElement.style.top = `${headElement.top - (this.cellSize)}px`
                snakeElement.style.transform = "rotate(180deg)"
                break
            case 'ArrowRight':
                snakeElement.style.top = headElement.top + 'px'
                snakeElement.style.left = `${headElement.left + (this.cellSize)}px`
                snakeElement.style.transform = "rotate(-90deg)"
                break
            case 'ArrowLeft':
                snakeElement.style.top = headElement.top + 'px'
                snakeElement.style.left = `${headElement.left - (this.cellSize)}px`
                snakeElement.style.transform = "rotate(90deg)"
                break
        }

        if (headElement.top > this.fieldHeight - this.cellSize) {
            snakeElement.style.top = '0px'
        }
        if (headElement.top < 0) {
            snakeElement.style.top = `${this.fieldHeight - this.cellSize}px`
        }
        if (headElement.left > this.fieldWidth - this.cellSize) {
            snakeElement.style.left = '0px'
        }
        if (headElement.left < 0) {
            snakeElement.style.left = `${this.fieldWidth - this.cellSize}px`
        }

        this.snake[0].style.background = 'green'
        this.snake[0].style.border = '3px solid white'

        this.snake.unshift(snakeElement)
        if (this.length == this.snake.length - 1) {
            this.snake[this.snake.length - 1].remove()
            this.snake.pop()
        }
        this.snake = this.snake.map((el, id) => {
            if (id === 0) {
                el.style.background = 'url("head.svg")'
                el.style.backgroundPosition = 'center'
                el.style.backgroundRepeat = 'no-repeat'
                el.style.border = 'none'
                return el
            }
            return el
        })
        this.directionChanged = false
    }

    elementRotation(direction, previousDir) {
        let rotaryElement = this.snake[0]
        if (previousDir === 'ArrowUp' && direction === 'ArrowLeft')
            rotaryElement.style.borderBottomLeftRadius = '50%'
        if (previousDir === 'ArrowDown' && direction === 'ArrowLeft')
            rotaryElement.style.borderBottomRightRadius = '50%'
        if (previousDir === 'ArrowLeft' && direction === 'ArrowUp')
            rotaryElement.style.borderBottomRightRadius = '50%'
        if (previousDir === 'ArrowLeft' && direction === 'ArrowDown')
            rotaryElement.style.borderBottomLeftRadius = '50%'
        if (previousDir === 'ArrowRight' && direction === 'ArrowUp')
            rotaryElement.style.borderBottomLeftRadius = '50%'
        if (previousDir === 'ArrowRight' && direction === 'ArrowDown')
            rotaryElement.style.borderBottomRightRadius = '50%'
        if (previousDir === 'ArrowUp' && direction === 'ArrowRight')
            rotaryElement.style.borderBottomRightRadius = '50%'
        if (previousDir === 'ArrowDown' && direction === 'ArrowRight')
            rotaryElement.style.borderBottomLeftRadius = '50%'
    }

    changeDir(key) {
        let previousDir = this.dir
        if (!this.directionChanged && key.code != this.dir) {
            if (key.code == 'ArrowLeft' && this.dir != 'ArrowRight') {
                this.dir = key.code
                this.elementRotation(key.code, previousDir)
                this.directionChanged = true
            }
            if (key.code == 'ArrowRight' && this.dir != 'ArrowLeft') {
                this.dir = key.code
                this.elementRotation(key.code, previousDir)
                this.directionChanged = true
            }

            if (key.code == 'ArrowUp' && this.dir != 'ArrowDown') {
                this.dir = key.code
                this.elementRotation(key.code, previousDir)
                this.directionChanged = true
            }

            if (key.code == 'ArrowDown' && this.dir != 'ArrowUp') {
                this.dir = key.code
                this.elementRotation(key.code, previousDir)
                this.directionChanged = true
            }
        }

    }
}


class Apple {
    constructor(size, fieldWidth, fieldHeight) {
        this.size = size
        this.fieldHeight = fieldHeight
        this.fieldWidth = fieldWidth
        let apple = document.createElement('div')
        apple.className = `apple`;
        apple.style.width = this.size + 'px'
        apple.style.height = this.size + 'px'
        apple.style.background = "red"
        apple.style.position = 'absolute'
        apple.style.top = this.generateCoors().y
        apple.style.left = this.generateCoors().x
        apple.style.boxSizing = 'border-box'
        apple.style.background = 'url("apple.svg")'
        this.apple = apple
    }

    generateCoors() {
        return {
            x: `${this.size * Math.floor(Math.random() * this.fieldWidth)}px`,
            y: `${this.size * Math.floor(Math.random() * this.fieldHeight)}px`,
        }
    }

    remove() {
        this.apple.remove()
    }
}


class Field {
    constructor(width, height, cellSize, stepTime = 150, parent = document.body) {
        let field = document.createElement('div')
        field.innerHTML = ''
        field.style.position = 'relative'
        field.style.width = `${width * cellSize}px`
        field.style.height = `${height * cellSize}px`
        field.style.border = '1px solid red'
        field.className = 'field'
        field.style.overflow = 'hidden'
        this.field = field
        this.width = width
        this.height = height
        this.cellSize = cellSize
        this.stepTime = stepTime
        this.parent = parent
        parent.append(this.field)

    }

    setCount(count) {
        this.counter.textContent = `Счёт: ${count}`
    }

    clear = function () {
        this.field.innerHTML = ''
    }
    creatApple = function () {
        this.apple = new Apple(this.cellSize, this.width, this.height)
        this.field.append(this.apple.apple)
        this.snake.snake.forEach(element => {
            if (this.apple.apple.style.top === element.style.top && this.apple.apple.style.left === element.style.left) {
                this.apple.remove()
                this.creatApple()
            }

        });
    }
    gameLoop() {
        this.snake.snakeMove()
        this.field.append(this.snake.snake[0])
        if (this.checkFail()) {
            clearInterval(this.interval)
            this.start()
        }
        if (this.eatApple()) {
            this.apple.remove()
            this.creatApple()
            this.snake.length++
            this.count++
            this.setCount(this.count)
        }

    }
    checkFail() {
        return this.snake.snake.map((snakeElement) => {
            const headElement = this.snake.snake[0]
            if (headElement !== snakeElement)
                return headElement.style.top == snakeElement.style.top && headElement.style.left == snakeElement.style.left
        }).includes(true)
    }
    eatApple() {
        const headElement = this.snake.snake[0]
        return this.apple.apple.style.top == headElement.style.top && this.apple.apple.style.left == headElement.style.left
    }
    start() {
        this.clear()
        this.count = 0
        this.snake = new Snake(this.cellSize, this.width, this.height)
        this.field.append(...this.snake.snake)
        this.creatApple()
        this.interval = setInterval(() => { this.gameLoop() }, this.stepTime)
        document.body.addEventListener('keydown', this.snake.changeDir.bind(this.snake))

        this.playPause = () => {
            if (!this.interval) {
                this.interval = setInterval(() => { this.gameLoop() }, this.stepTime)
                this.PlayPauseBtn.style.background = 'url("pause.svg")'
            } else {
                clearInterval(this.interval)
                this.interval = null
                this.PlayPauseBtn.style.background = 'url("play.svg")'
            }

        }
        if (this.interface)
            this.interface.remove()
        this.interface = this.createInterface()
    }

    createInterface() {
        const interfaceParrent = document.createElement('div')
        const PlayPauseBtn = document.createElement('button')
        const counter = document.createElement('h1')
        this.counter = counter
        this.PlayPauseBtn = PlayPauseBtn

        PlayPauseBtn.style.width = "50px"
        PlayPauseBtn.style.height = "50px"
        PlayPauseBtn.style.background = 'url("pause.svg")'
        PlayPauseBtn.style.border = 'none'
        PlayPauseBtn.addEventListener('click', this.playPause)

        interfaceParrent.style.display = 'flex'
        interfaceParrent.style.alignItems = "center"
        interfaceParrent.append(PlayPauseBtn, counter)

        this.parent.prepend(interfaceParrent)
        this.setCount(0)
        return interfaceParrent
    }
}
let body = document.body
body.style.display = 'flex'
body.style.height = '100vh'
body.style.flexDirection = 'column'
body.style.justifyContent = 'center'
body.style.alignItems = 'center'
body.style.overflow = 'hidden'

const cellSize = 20
const width = Math.floor(document.documentElement.clientWidth / cellSize)
const height = Math.floor((document.documentElement.clientHeight - 100) / cellSize)

let field = new Field(width, height, cellSize, 100)

field.start()

