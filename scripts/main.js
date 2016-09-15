var player;
var food;

var cont;
var cells;
var fps = 8;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

function addBlock(){
    let elem = document.createElement('span');
    cont.appendChild(elem);
}
function addFood(){
    let x = Math.round(Math.random()*9);
    let y = Math.round(Math.random()*9);
    food = new Block(x, y,  "food")
    food.paint();
}

class Block{
    constructor(x, y, clase, next){
        this.x = x;
        this.y = y;
        this.clase = clase;
        this.next = next;
    }
    erase(){
        cells[this.x+this.y*10].classList.remove(this.clase);
    }
    move(){
    }
    paint(){
        cells[this.x+this.y*10].classList.add(this.clase);
    }
}

class Snake{
    constructor(x, y, clase){
        this.head = new Block(x, y, "snake", null);
        this.tail = new Block(x, y, "snake", this.head);
        this.head.next = this.tail;
        this.direccion = 0;
        this.eaten = false;
        this.head.paint();
        this.tail.paint();
    }
    update(){
        !this.eaten?this.tail.erase():this.eaten=false;
        switch(this.direccion){
            case 0:
                if(this.head.x+1>9){
                    this.tail.x=0
                }else{
                    this.tail.x = this.head.x+1;
                }
                this.tail.y = this.head.y;
                break;
            case 1:
                if(this.head.y-1<0){
                    this.tail.y=9
                }else{
                    this.tail.y = this.head.y-1;
                }
                this.tail.x = this.head.x;
                break;
            case 2:
                if(this.head.x-1<0){
                    this.tail.x=9
                }else{
                    this.tail.x = this.head.x-1;
                }
                this.tail.y = this.head.y;
                break;
            case 3:
                if(this.head.y+1>9){
                    this.tail.y=0
                }else{
                    this.tail.y = this.head.y+1;
                }
                this.tail.x = this.head.x;
                break;
        }
        let classes = cells[this.tail.x+this.tail.y*10].classList;
        if(classes.contains("snake")){
            alert('GAME OVER');
            for(let i=0; i < cells.length; i++){
                cells[i].classList.remove("snake");
            }
            player = new Snake(2, 2, "snake");
        }else{
            this.tail.paint();
            this.head = this.tail;
            this.tail = this.tail.next;
        }
        if(classes.contains("food")){
            this.eaten=true;
            player.add();
            food.erase();
            addFood();
        }
    }
    add(){
        let blo = new Block(this.tail.x,this.tail.y,"snake",this.tail);
        this.tail = blo;
        this.head.next = blo;
    }
}

function init(){
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37 && player.direccion != 0) {
            player.direccion = 2;
        }
        else if(event.keyCode == 38 && player.direccion != 3) {
            player.direccion = 1
        }
        else if(event.keyCode == 39 && player.direccion != 2) {
            player.direccion = 0
        }
        else if(event.keyCode == 40 && player.direccion != 1) {
            player.direccion = 3
        }
    }, true);
    addFood();

    player = new Snake(2, 2, "snake");
}

function gameLoop(){
    requestAnimationFrame(gameLoop);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        player.update();

        then = now - (delta % interval);
    }
}

window.onload = function(){
    cont = document.getElementsByTagName('main')[0];
    for(let i = 0; i < 100; i++){
        addBlock();
    }
    cells = document.getElementsByTagName('span');
    init();
    gameLoop();
}
