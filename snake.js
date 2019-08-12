let first = new Player();
let dieButton;
let playerCountInput;
let playerCountSubmitButton;
let currentPlayer = first;
let dieButtonX = 560;
let dieButtonY = 400;
let pCountInputX = 560;
let pCountInputY = 350;
let pCountSubmitX = 560;
let pCountSubmitY = 375;
let begin = new Initializer();
let die = new Die();

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
	begin.drawSAL();
	buttonController(first);
	controlMove(first);
	console.log(die.dieValue);
	die.drawDie();
}
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
		dieV = die.rollDies();
		console.log('d val ' + dieV);
		first.setRTGDV();
		first.setSTZZ();
	}
	first.setTargetByDieValue(dieV);
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
