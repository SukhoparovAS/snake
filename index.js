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
                this.playPauseBtn.style.background = 'url("pause.svg")'
            } else {
                clearInterval(this.interval)
                this.interval = null
                this.playPauseBtn.style.background = 'url("play.svg")'
            }
        }

        if (this.interface)
            this.interface.remove()
        this.interface = this.createInterface()
    }



    createInterface() {
        const playPauseBtn = document.createElement('button')
        const counter = document.createElement('div')
        const interfaceParrent = document.createElement('div')
        this.counter = counter
        this.playPauseBtn = playPauseBtn

        counter.style.position = 'absolute'
        counter.style.top = '25px'
        counter.style.right = '20px'
        counter.style.fontSize = '20px'

        playPauseBtn.style.position = 'absolute'
        playPauseBtn.style.top = '5px'
        playPauseBtn.style.left = '20px'
        playPauseBtn.style.width = "50px"
        playPauseBtn.style.height = "50px"
        playPauseBtn.style.background = 'url("pause.svg")'
        playPauseBtn.style.border = 'none'
        playPauseBtn.addEventListener('click', this.playPause)






        const controlParrent = document.createElement('div')
        const controlBtnUp = document.createElement('button')
        const controlBtnDown = document.createElement('button')
        const controlBtnLeft = document.createElement('button')
        const controlBtnRight = document.createElement('button')
        const arrowBacgroundSrc = 'url("arrow.svg")'
        controlBtnUp.style.width = "50px"
        controlBtnUp.style.height = "50px"
        controlBtnUp.style.background = arrowBacgroundSrc
        controlBtnUp.style.display = 'block'
        controlBtnUp.style.border = 'none'

        controlBtnDown.style.width = "50px"
        controlBtnDown.style.height = "50px"
        controlBtnDown.style.background = arrowBacgroundSrc
        controlBtnDown.style.transform = 'rotate(180deg)'
        controlBtnDown.style.display = 'block'
        controlBtnDown.style.border = 'none'

        controlBtnLeft.style.width = "50px"
        controlBtnLeft.style.height = "50px"
        controlBtnLeft.style.background = arrowBacgroundSrc
        controlBtnLeft.style.transform = 'rotate(-90deg)'
        controlBtnLeft.style.border = 'none'
        controlBtnLeft.style.marginRight = '50px'


        controlBtnRight.style.width = "50px"
        controlBtnRight.style.height = "50px"
        controlBtnRight.style.background = arrowBacgroundSrc
        controlBtnRight.style.transform = 'rotate(90deg)'
        controlBtnRight.style.border = 'none'

        controlBtnUp.addEventListener('click', this.snake.changeDir.bind(this.snake, { code: "ArrowUp" }))
        controlBtnDown.addEventListener('click', this.snake.changeDir.bind(this.snake, { code: "ArrowDown" }))
        controlBtnLeft.addEventListener('click', this.snake.changeDir.bind(this.snake, { code: "ArrowLeft" }))
        controlBtnRight.addEventListener('click', this.snake.changeDir.bind(this.snake, { code: "ArrowRight" }))

        controlParrent.style.display = 'flex'
        controlParrent.style.flexDirection = 'column'
        controlParrent.style.alignItems = 'center'
        controlParrent.style.position = 'absolute'
        controlParrent.style.left = '50%'
        controlParrent.style.bottom = '50px'
        controlParrent.style.transform = 'translate(-50%)'
        controlParrent.style.opacity = '0.5'
        controlParrent.style.zIndex = 100


        this.setCount(0)


        const leftTightBtns = document.createElement('div')
        leftTightBtns.append(controlBtnLeft, controlBtnRight)
        if (isMobile.any()) {
            controlParrent.append(controlBtnUp, leftTightBtns, controlBtnDown)
        }
        interfaceParrent.append(playPauseBtn, counter, controlParrent)
        this.parent.prepend(interfaceParrent)
        return interfaceParrent
    }
}


isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};



let body = document.body
body.style.display = 'flex'
body.style.height = '100vh'
body.style.flexDirection = 'column'
body.style.justifyContent = 'center'
body.style.alignItems = 'center'
body.style.overflow = 'hidden'


const cellSize = Math.floor(document.documentElement.clientWidth / 15)
const width = Math.floor((document.documentElement.clientWidth - 25) / cellSize)
const height = Math.floor((document.documentElement.clientHeight - 100) / cellSize)

let field = new Field(width, height, cellSize, 100)

field.start()

