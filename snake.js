let circleX = 10;
let circleY = 10;
let tableRow = 10;
let tableCol = 10;
let cellW = 50;
let cellH = 50;
let table = new Array(tableCol * tableRow);
let tableR = new Array(tableRow * tableCol);
let tableG = new Array(tableCol * tableRow);
let tableB = new Array(tableRow * tableCol);
let special = Math.PI/25;
let degree = 0;
let circle1 = 25;
let circle2 = 25;
const snakeCount = 5; 
const ladderCount = 3;
let snakeHeadX = new Array(snakeCount);
let snakeHeadY = new Array(snakeCount);
let snakeTailX = new Array(snakeCount);
let snakeTailY = new Array(snakeCount);
let ladderHeadX = new Array(ladderCount);
let ladderHeadY = new Array(ladderCount);
let ladderTailX = new Array(ladderCount);
let ladderTailY = new Array(ladderCount);
let g = 0;
let dieValue = 0;
let first = new Player();
let dieButton;
let playerCountInput;
let playerCountSubmitButton;
let players;
let currentPlayer = first;
function setup() {
	createCanvas(750, 500);
	background(0);
	dieButton = createButton('roll dies');
	dieButton.position(560, 400);
	dieButton.mousePressed(getDieValue);
	/*playerCountInput = createInput();
	playerCountInput.position(560, 300);
	playerCountSubmitButton = createButton('submit');
	playerCountSubmitButton.position(560, 350);
	playerCountSubmitButton.mousePressed(submitPlayerCount);*/
	setTable();
	randomGenerator();
}
function draw()
{
	background(0);
	drawTable();
	drawSAL();
	buttonController(first);
	//showActiveness(first);
	controlMove(first);
	drawDie(dieValue);
}
function setTable()
{
	for(var i = 0; i < tableCol * tableRow; i++)
	{
		tableR[i] = random(256);
		tableG[i] = random(256);
		tableB[i] = random(256);
	}
	for(var i = 0; i < tableCol * tableRow; i++)
	{
		table[i] = true;
	}
}
function drawSAL()
{
	for(var i = 0; i < snakeCount; i++)
	{
		fill(i * 50 , 0 , (5-i)*50);
		drawZiqZaq(snakeHeadX[i], snakeHeadY[i], snakeTailX[i],snakeTailY[i], true);	
	}
	for(var i = 0; i < ladderCount; i++)
	{
		fill(i * 50 , 0 , (5-i)*50);
		drawZiqZaq(ladderHeadX[i], ladderHeadY[i], ladderTailX[i],ladderTailY[i], false);	
	}
}
function submitPlayerCount()
{
	let playerCount = playerCountInput.value();
	players = new Array(playerCount);
	for(var k = 0; k < playerCount; k++)
	{
		players[k] = new Player();
	}

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
		//console.log("button active");
		//console.log(first.TX);
		//console.log(first.CX);
		dieValue = rollDies();
		console.log('d val ' + dieValue);
		first.setRTGDV();
		first.setSTZZ();
	}
	first.setTargetByDieValue(dieValue);
}
function drawTable()
{
	for(var x = 0; x < tableRow; x++)
	{
		for(var y = 0; y < tableCol; y++)
		{
			if(table[x*tableCol + y])
			{
				fill(tableR[x*tableCol + y], tableG[x*tableCol + y], tableB[x*tableCol + y]);
				rect(50 + y * cellW, x * cellH, cellW - 1, cellH - 1,5);
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
function showActiveness(a)
{
	console.log(a.CX);
	console.log(a.TX);
	console.log(a.CY);
	console.log(a.TY);
	console.log("-------------");
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
		for(var i = 0; i < snakeCount; i++)
		{
			if(a.CX == snakeHeadX[i] 
				&& a.CY == snakeHeadY[i])
			{
				a.targetX = (snakeTailX[i] - 75) / 50;
				a.targetY = (475 - snakeTailY[i]) / 50;
				a.TX = snakeTailX[i];
				a.TY = snakeTailY[i];
				a.moveType = 2;
			}
		}
		for(var i = 0; i < ladderCount; i++)
		{
			if(a.CX == ladderHeadX[i] 
				&& a.CY == ladderHeadY[i])
			{
				a.targetX =  (ladderTailX[i] - 75) / 50;
				a.targetY = (475 - ladderTailY[i]) / 50;
				a.TX = ladderTailX[i];
				a.TY = ladderTailY[i];
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
	/*console.log("----------------------------------------------");
	console.log(a.currentX);
	console.log(a.targetX);
	console.log(a.currentY);
	console.log(a.targetY);
	console.log(a.moveDirection);*/
}
function randomGenerator()
{
	var snakeCor = new Array(snakeCount * 2);
	var ladderCor = new Array(ladderCount * 2);
	for(var i = 0; i < snakeCor.length; i = i + 2)
	{
		var value1 = 0;
		var value2 = 0;
		let notValidV1 = true;
		let notValidV2 = true;
		while(notValidV1)
		{
			value1 = Math.floor(random(100))
			if(value1 > 9 && value1 != 90)
			{
				notValidV1 = false;
			}
			if(!notValidV1)
			{
				for(var k = 0; k < i; k++)
				{
					if(value1 == snakeCor[k])
					{
						notValidV1 = true;
					}
				}
			}
		}
		snakeCor[i] = value1;
		while(notValidV2)
		{
			value2 = Math.floor(random(100));
			if(value2 < Math.floor(value1 / 10) * 10)
			{
				notValidV2 = false;
			}
			if(!notValidV2)
			{
				for(var k = 0; k < i; k++)
				{
					if(value2 == snakeCor[k])
					{
						notValidV2 = true;
					}
				}
			}
		}
		snakeCor[i+1] = value2;
	}
	for(var i = 0; i < ladderCor.length; i = i + 2)
	{
		var value1 = 0;
		var value2 = 0;
		let notValidV1 = true;
		let notValidV2 = true;
		while(notValidV1)
		{
			value1 = Math.floor(random(100))
			if(value1 < 90 && value1 != 0)
			{
				notValidV1 = false;
			}
			if(!notValidV1)
			{
				for(var k = 0; k < snakeCor.length; k++)
				{
					if(value1 == snakeCor[k])
					{
						notValidV1 = true;
					}
				}
				for(var k = 0; k < i; k++)
				{
					if(value1 == ladderCor[k])
					{
						notValidV1 = true;
					}
				}
			}
		}
		ladderCor[i] = value1;
		while(notValidV2)
		{
			value2 = Math.floor(random(100));
			if(value2 >= Math.floor(value1 / 10) * 10 + 10)
			{
				notValidV2 = false;
			}
			if(!notValidV2)
			{
				for(var k = 0; k < snakeCor.length; k++)
				{
					if(value2 == snakeCor[k])
					{
						notValidV2 = true;
					}
				}
				for(var k = 0; k < i; k++)
				{
					if(value2 == ladderCor[k])
					{
						notValidV2 = true;
					}
				}
			}
		}
		ladderCor[i+1] = value2;
	}
	for(var k = 0; k < snakeCount; k++)
	{
		snakeHeadX[k] = snakeCor[2*k] - Math.floor(snakeCor[2*k] / 10) * 10;
		snakeHeadY[k] = Math.floor(snakeCor[2*k] / 10);
		snakeTailX[k] = snakeCor[2*k+1] - Math.floor(snakeCor[2*k+1] / 10) * 10;
		snakeTailY[k] = Math.floor(snakeCor[2*k+1] / 10);
	}
	for(var k = 0; k < ladderCount; k++)
	{
		ladderHeadX[k] = ladderCor[2*k] - Math.floor(ladderCor[2*k] / 10) * 10;
		ladderHeadY[k] = Math.floor(ladderCor[2*k] / 10);
		ladderTailX[k] = ladderCor[2*k+1] - Math.floor(ladderCor[2*k+1] / 10) * 10;
		ladderTailY[k] = Math.floor(ladderCor[2*k+1] / 10);
	}
	for(var k = 0; k < snakeCount; k++)
	{
		snakeHeadX[k] = 75 + snakeHeadX[k] * 50;
		snakeHeadY[k] = 475 - snakeHeadY[k] * 50;
		snakeTailX[k] = 75 + snakeTailX[k] * 50;
		snakeTailY[k] = 475 - snakeTailY[k] * 50;
	}
	for(var k = 0; k < ladderCount; k++)
	{
		ladderHeadX[k] = 75 + ladderHeadX[k] * 50;
		ladderHeadY[k] = 475 - ladderHeadY[k] * 50;
		ladderTailX[k] = 75 + ladderTailX[k] * 50;
		ladderTailY[k] = 475 - ladderTailY[k] * 50;
	}
}
