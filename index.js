class Snake {
    constructor(field) {
        this.length = 4;
        this.field = field;
        this.dir = 'ArrowDown'
        this.snake = this.createSnake();
        document.body.addEventListener('keydown', this.changeDir.bind(this))
    }

    createSnake() {
        let snake = []
        this.length = 3;
        this.count = 0;
        this.field.clear()
        this.field.creatApple()
        for (let i = 0; i < this.length; i++) {
            let snakeElement = this.createElement()
            snakeElement.style.left = `${this.field.cellSize * i}px`
            snakeElement.style.top = '0px'
            snake.push(snakeElement)
        }
        this.field.field.append(...snake)
        return snake
    }

    createElement() {
        let snakeElement = document.createElement('div');
        snakeElement.className = `snakeElement`;
        snakeElement.style.width = this.field.cellSize + 'px'
        snakeElement.style.height = this.field.cellSize + 'px'
        snakeElement.style.background = "green"
        snakeElement.style.position = 'absolute'
        snakeElement.style.border = '1px solid white'
        snakeElement.style.boxSizing = 'border-box'
        return snakeElement
    }

    snakeMove() {
        let snakeElement = this.createElement()
        switch (this.dir) {
            case 'ArrowDown':
                snakeElement.style.left = this.snake[0].style.left
                snakeElement.style.top = `${+this.snake[0].style.top.slice(0, -2) + (this.field.cellSize)}px`
                break
            case 'ArrowUp':
                snakeElement.style.left = this.snake[0].style.left
                snakeElement.style.top = `${+this.snake[0].style.top.slice(0, -2) - (this.field.cellSize)}px`
                break
            case 'ArrowRight':
                snakeElement.style.top = this.snake[0].style.top
                snakeElement.style.left = `${+this.snake[0].style.left.slice(0, -2) + (this.field.cellSize)}px`
                break
            case 'ArrowLeft':
                snakeElement.style.top = this.snake[0].style.top
                snakeElement.style.left = `${+this.snake[0].style.left.slice(0, -2) - (this.field.cellSize)}px`
                break
        }

        if (+this.snake[0].style.top.slice(0, -2) > +this.field.height * this.field.cellSize - (this.field.cellSize)) {
            snakeElement.style.top = '0px'
        }
        if (+this.snake[0].style.top.slice(0, -2) < 0) {
            snakeElement.style.top = `${+this.field.height * this.field.cellSize - (this.field.cellSize)}px`
        }
        if (+this.snake[0].style.left.slice(0, -2) > +this.field.width * this.field.cellSize - (this.field.cellSize)) {
            snakeElement.style.left = '0px'
        }
        if (+this.snake[0].style.left.slice(0, -2) < 0) {
            snakeElement.style.left = `${+this.field.width * this.field.cellSize - (this.field.cellSize)}px`
        }

        if (this.eatApple(snakeElement)) {
            this.field.creatApple()
            this.length++
            this.count++
            this.field.setCount(this.count)
        }
        if (this.checkFail(snakeElement)) {
            this.snake = this.createSnake()
            this.dir = 'ArrowDown'
            this.field.setCount(0)
        }
        else {
            this.field.field.append(snakeElement);
            this.snake.unshift(snakeElement)
            if (this.length == this.snake.length - 1) {
                this.snake[this.snake.length - 1].remove()
                this.snake.pop()
            }
        }
    }

    changeDir(key) {
        if (key.code == 'ArrowLeft' && this.dir != 'ArrowRight')
            this.dir = key.code
        if (key.code == 'ArrowRight' && this.dir != 'ArrowLeft')
            this.dir = key.code
        if (key.code == 'ArrowUp' && this.dir != 'ArrowDown')
            this.dir = key.code
        if (key.code == 'ArrowDown' && this.dir != 'ArrowUp')
            this.dir = key.code
    }

    checkFail(headElement) {
        return this.snake.map((snakeElement) => {
            return headElement.style.top == snakeElement.style.top && headElement.style.left == snakeElement.style.left
        }).includes(true)
    }

    eatApple(headElement) {
        return this.field.apple.style.top == headElement.style.top && this.field.apple.style.left == headElement.style.left
    }
}


class Apple {
    constructor(field) {
        if (field.field.querySelector('.apple'))
            field.field.querySelector('.apple').remove()
        let apple = document.createElement('div')
        apple.className = `apple`;
        apple.style.width = field.cellSize + 'px'
        apple.style.height = field.cellSize + 'px'
        apple.style.background = "red"
        apple.style.position = 'absolute'
        apple.style.top = this.generateCoors(field).y
        apple.style.left = this.generateCoors(field).x
        apple.style.boxSizing = 'border-box'
        apple.style.border = '1px solid white'
        field.field.append(apple)
        return apple
    }

    generateCoors(field) {
        return {
            x: `${field.cellSize * Math.floor(Math.random() * field.width)}px`,
            y: `${field.cellSize * Math.floor(Math.random() * field.height)}px`,
        }
    }
}


class Field {
    constructor(width, height, cellSize) {
        let field = document.createElement('div')
        field.innerHTML = ''
        field.style.position = 'relative'
        field.style.width = `${width * cellSize}px`
        field.style.height = `${height * cellSize}px`
        field.style.border = '1px solid red'
        field.className = 'field'
        field.style.overflow = 'hidden'
        let counter = document.createElement('h1')
        this.field = field
        this.width = width
        this.height = height
        this.cellSize = cellSize
        this.counter = counter
        this.setCount(0)
        document.body.append(this.counter)
        document.body.append(this.field)
    }

    setCount(count) {
        this.counter.textContent = `Счёт: ${count}`
    }

    clear = function () {
        this.field.innerHTML = ''
    }
    creatApple = function () {
        this.apple = new Apple(field)
    }
}
let body = document.body
body.style.display = 'flex'
body.style.height = '100vh'
body.style.flexDirection = 'column'
body.style.justifyContent = 'center'
body.style.alignItems = 'center'
body.style.overflow = 'hidden'

let field = new Field(20, 20, 31)
console.log(field);
let snake = new Snake(field)
setInterval(() => { snake.snakeMove() }, 200)
