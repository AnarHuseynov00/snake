let circleX = 10;
let circleY = 10;
const special = Math.PI/25;
let degree = 0;
let dieValue = 0;
let first = new Player();
let dieButton;
let playerCountInput;
let playerCountSubmitButton;
let players;
let currentPlayer = first;
let dieButtonX = 560;
let dieButtonY = 400;
let pCountInputX = 560;
let pCountInputY = 350;
let pCountSubmitX = 560;
let pCountSubmitY = 375;
let begin = new Initializer();
function setup() {
	createCanvas(begin.CANVAS_W, begin.CANVAS_H);
	background(0);
	dieButton = createButton('roll dies');
	dieButton.position(dieButtonX, dieButtonY);
	dieButton.mousePressed(getDieValue);
	playerCountInput = createInput();
	playerCountInput.position(pCountInputX, pCountInputY);
	playerCountSubmitButton = createButton('submit');
	playerCountSubmitButton.position(pCountSubmitX, pCountSubmitY);
	//playerCountSubmitButton.mousePressed(submitPlayerCount);
	begin.setTable();
	begin.randomGenerator();
}
function draw()
{
	background(0);
	drawTable();
	drawSAL();
	buttonController(first);
	controlMove(first);
	drawDie(dieValue);
}

function drawSAL()
{
	for(var i = 0; i < begin.snakeCount; i++)
	{
		fill(100 , 0 , 255);
		drawZiqZaq(begin.snakeHeadX[i], begin.snakeHeadY[i], begin.snakeTailX[i],begin.snakeTailY[i], true);	
	}
	for(var i = 0; i < begin.ladderCount; i++)
	{
		fill(200 , 40 , 40);
		drawZiqZaq(begin.ladderHeadX[i], begin.ladderHeadY[i], begin.ladderTailX[i],begin.ladderTailY[i], false);	
	}
}
/*function submitPlayerCount()
{
	let playerCount = playerCountInput.value();
	players = new Array(playerCount);
	for(var k = 0; k < playerCount; k++)
	{
		bbegin.players[k] = new Player();
	}

}*/
function drawZiqZaq(a, b, c, d, e)
{
	var mul;
	if(e)
		mul = 2;
	else
		mul = 0;
	circleX = a;
	circleY = b;
	var speed1 = (c - a) / 200;
	var speed2 = (d - b) / 200;
	let degree = 0;    
	for(var e = 0; e < 200; e++)
	{
		circle(circleX, circleY, 10);
		degree = degree + special;
		circleX = circleX + speed1 + mul*Math.sin(degree);
		circleY = circleY + speed2;
	}
}
function getDieValue()
{
	if(first.CX == first.TX && first.TY == first.CY)
	{
		dieValue = rollDies();
		console.log('d val ' + dieValue);
		first.setRTGDV();
		first.setSTZZ();
	}
	first.setTargetByDieValue(dieValue);
}
function drawTable()
{
	for(var x = 0; x < begin.tableRow; x++)
	{
		for(var y = 0; y < begin.tableCol; y++)
		{
			if(begin.table[x*begin.tableCol + y])
			{
				fill(begin.tableR[x*begin.tableCol + y], begin.tableG[x*begin.tableCol + y], begin.tableB[x*begin.tableCol + y]);
				rect(begin.leftEmptyW + y * begin.cellW, x * begin.cellH, begin.cellW - 1, begin.cellH - 1,5);
			}
		}
	}
}
function drawDie(a)
{
	if(a == 1)
	{
		fill(255, 255, 255);
		rect(600, 450, 50, 50, 5);
		fill(0, 0, 0);
		circle(625, 475, 10);
	}
	if(a == 2)
	{
		fill(255, 255, 255);
		rect(600, 450, 50, 50, 5);
		fill(0, 0, 0);
		circle(615, 475, 10);
		circle(635, 475, 10);
	}
	if(a == 3)
	{
		fill(255, 255, 255);
		rect(600, 450, 50, 50, 5);
		fill(0, 0, 0);
		circle(610, 460, 10);
		circle(625, 475, 10);
		circle(640, 490, 10);
	}
	if(a == 4)
	{
		fill(255, 255, 255);
		rect(600, 450, 50, 50, 5);
		fill(0, 0, 0);
		circle(615, 465, 10);
		circle(635, 465, 10);
		circle(635, 485, 10);
		circle(615, 485, 10);
	}
	if(a == 5)
	{
		fill(255, 255, 255);
		rect(600, 450, 50, 50, 5);
		fill(0, 0, 0);
		circle(610, 460, 10);
		circle(640, 460, 10);
		circle(640, 490, 10);
		circle(610, 490, 10);
		circle(625, 475, 10);
	}
	if(a == 6)
	{
		fill(255, 255, 255);
		rect(600, 450, 50, 50, 5);
		fill(0, 0, 0);
		circle(610, 465, 10);
		circle(640, 465, 10);
		circle(640, 485, 10);
		circle(610, 485, 10);
		circle(625, 465, 10);
		circle(625, 485, 10);
	}
}
function rollDies()
{
	return Math.floor(random(6) + 1);
}
function buttonController(a)
{
	if(first.CX == first.TX && first.TY == first.CY)
	{
		dieButton.removeAttribute('disabled');
	}
	else
	{
		dieButton.attribute('disabled', '');
	}
}
function controlMove(a)
{
	a.display();
	if(a.currentX == a.targetX
		&& a.currentY == a.targetY)
	{
		a.moveType = 1;
		for(var i = 0; i < begin.snakeCount; i++)
		{
			if(a.CX == begin.snakeHeadX[i] 
				&& a.CY == begin.snakeHeadY[i])
			{
				a.targetX = (begin.snakeTailX[i] - begin.leftEmptyW - begin.cellW/2) / begin.cellW;
				a.targetY = (475 - begin.snakeTailY[i]) / begin.cellH;
				a.TX = begin.snakeTailX[i];
				a.TY = begin.snakeTailY[i];
				a.moveType = 2;
			}
		}
		for(var i = 0; i < begin.ladderCount; i++)
		{
			if(a.CX == begin.ladderHeadX[i] 
				&& a.CY == begin.ladderHeadY[i])
			{
				a.targetX =  (begin.ladderTailX[i] - begin.leftEmptyW - begin.cellW/2) / begin.cellW;
				a.targetY = (475 - begin.ladderTailY[i]) / begin.cellH;
				a.TX = begin.ladderTailX[i];
				a.TY = begin.ladderTailY[i];
				a.moveType = 3;
			}
		}
	}
	else
	{
		if(a.moveType == 1)
		{
			a.drawNormalMotion();
		}
		else
		{
			a.ziqZaqMove();
		}

	}
}
