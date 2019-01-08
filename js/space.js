
function setUp(){
    let $$ = function(id) { return document.getElementById(id); };
    let randomColour = () => Math.floor(Math.random()*13777215).toString(16);

    let elCanvas = $$('space');
    let ctx = elCanvas.getContext('2d');

    function Star(_size, _xRate,_yRate, _growh, _colour, _staringX, _startingY){
        this.size = _size;
        this.xRate = _xRate;
        this.yRate = _yRate;
        this.growth = _growh;
        this.colour = _colour;
        this.xPos = _staringX;
        this.yPos= _startingY
    }

    function newStar(i){
        stars[i] = new Star (
            Math.random()*Math.random(), // starting size of the star
            (Math.random()-.5)*90, // rate of x
            (Math.random()-.5)*90, // rate of y
            Math.random()/2, // growth rate
            `#${randomColour()}`, // star colour
            400, // starting x position
            200); // starting y position
    }

    function moveCircle(){
        ctx.clearRect(0, 0, 800, 400);
        for (let i=0; i<200; i++) {
            if (stars[i].xPos >= 800 || stars[i].yPos >= 400 || stars[i].xPos <= 0 || stars[i].yPos <= 0)
                newStar(i);
            if (stars[i].size >= 10){
                stars[i].xRate *=5;
                stars[i].yRate *=5
            }

            ctx.fillStyle = stars[i].colour;
            ctx.strokeStyle = stars[i].colour;
            ctx.lineWidth = 0;
            ctx.beginPath();
            ctx.arc(stars[i].xPos, stars[i].yPos, stars[i].size, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
            stars[i].xPos += stars[i].xRate;
            stars[i].yPos += stars[i].yRate;
            stars[i].size += stars[i].growth;
        }
    }

    function doIt(){
        stars = [];
        for (let i=0; i<200; i++){
            newStar(i);
        }
        setInterval(moveCircle, 50);
    }
    let stars;
    doIt();
}

window.onload = () => {
    // console.log("loaded and ready");
    setUp();
};