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
        this.length = 4;
        this.field.clear()
        this.field.creatApple()
        for (let i = 0; i < this.length; i++) {
            let snakeElement = this.createElement()
            snakeElement.style.left = `${31 * i}px`
            snakeElement.style.top = '0px'
            snake.push(snakeElement)
        }
        this.field.append(...snake)
        return snake
    }

    createElement() {
        let snakeElement = document.createElement('div');
        snakeElement.className = `snakeElement`;
        snakeElement.style.width = "30px"
        snakeElement.style.height = "30px"
        snakeElement.style.background = "green"
        snakeElement.style.position = 'absolute'
        return snakeElement
    }

    snakeMove() {
        let snakeElement = this.createElement()
        switch (this.dir) {
            case 'ArrowDown':
                snakeElement.style.left = this.snake[0].style.left
                snakeElement.style.top = `${+this.snake[0].style.top.slice(0, -2) + 31}px`
                break
            case 'ArrowUp':
                snakeElement.style.left = this.snake[0].style.left
                snakeElement.style.top = `${+this.snake[0].style.top.slice(0, -2) - 31}px`
                break
            case 'ArrowRight':
                snakeElement.style.top = this.snake[0].style.top
                snakeElement.style.left = `${+this.snake[0].style.left.slice(0, -2) + 31}px`
                break
            case 'ArrowLeft':
                snakeElement.style.top = this.snake[0].style.top
                snakeElement.style.left = `${+this.snake[0].style.left.slice(0, -2) - 31}px`
                break
        }

        if (+this.snake[0].style.top.slice(0, -2) > +this.field.style.height.slice(0, -2) - 32) {
            snakeElement.style.top = '0px'
        }
        if (+this.snake[0].style.top.slice(0, -2) < 0) {
            snakeElement.style.top = `${+this.field.style.height.slice(0, -2) - 32}px`
        }
        if (+this.snake[0].style.left.slice(0, -2) > +this.field.style.width.slice(0, -2) - 32) {
            snakeElement.style.left = '0px'
        }
        if (+this.snake[0].style.left.slice(0, -2) < 0) {
            snakeElement.style.left = `${+this.field.style.width.slice(0, -2) - 32}px`
        }

        if (this.eatApple(snakeElement)) {
            this.field.creatApple()
            this.length++
        }
        if (this.checkFail(snakeElement)) {
            this.snake = this.createSnake()
            this.dir = 'ArrowDown'
        }
        else {
            this.field.append(snakeElement);
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
        if (field.querySelector('.apple'))
            field.querySelector('.apple').remove()
        let apple = document.createElement('div')
        apple.className = `apple`;
        apple.style.width = "30px"
        apple.style.height = "30px"
        apple.style.background = "red"
        apple.style.position = 'absolute'
        apple.style.top = this.generateCoors(field).y
        apple.style.left = this.generateCoors(field).x
        field.append(apple)
        return apple
    }

    generateCoors(field) {
        return {
            x: `${31 * Math.floor(Math.random() * field.width)}px`,
            y: `${31 * Math.floor(Math.random() * field.height)}px`,
        }
    }
}




class Field {
    constructor(width, height) {
        let field = document.createElement('div')
        field.width = width
        field.height = height
        field.innerHTML = ''
        field.style.position = 'relative'
        field.style.width = `${width * 31 + 1}px`
        field.style.height = `${height * 31 + 1}px`
        field.style.border = '1px solid red'
        field.style.margin = 'auto'
        field.className = 'field'
        field.style.overflow = 'hidden'
        document.body.append(field)
        field.clear = function () {
            this.innerHTML = ''
        }
        field.creatApple = function () {
            field.apple = new Apple(field)
        }
        return field
    }
}



let field = new Field(20, 20)
let snake = new Snake(field)

setInterval(() => { snake.snakeMove() }, 200)
