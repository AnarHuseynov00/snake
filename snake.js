let currentPlayer;
let dieButton;
let anotherDieButton;
let dieButtonX = 560;
let dieButtonY = 400;
let begin;
let die = new Die();
let index = 0;
let playerCount;
function setup()
{
	getPlayerCount();
	begin = new Initializer();
	begin.submitPlayerCount(playerCount);
	createCanvas(begin.CANVAS_W, begin.CANVAS_H);
	background(0);
	begin.setTable();
	begin.randomGenerator();
	currentPlayer = begin.players[0];
	dieButton = createButton('roll dies');
	dieButton.position(dieButtonX, dieButtonY);
	dieButton.mousePressed(getDieValue);
	anotherDieButton = createButton('change player');
	anotherDieButton.position(dieButtonX, dieButtonY - 50);
	anotherDieButton.mousePressed(setCurrentPlayer);
}
function draw()
{
	background(0);
	drawTable();
	begin.drawSAL();
	buttonController(currentPlayer);
	movePlayers();
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
function movePlayers()
{
	for(var j = 0; j < playerCount; j++)
	{
		controlMove(begin.players[j]);
	}
}
function getPlayerCount()
{
	playerCount = prompt("player count should be submitted to procede the game \n player count could be between 1 and 4");
	while(isNaN(playerCount) || playerCount > 4 || playerCount < 1)
	{
		playerCount = prompt("player count should be submitted to procede the game \n player count could be between 1 and 4");
	}
}
function getDieValue()
{
	let dieV;
	if(currentPlayer.CX == currentPlayer.TX && currentPlayer.TY == currentPlayer.CY)
	{
		dieV = die.rollDies();
		currentPlayer.setRTGDV();
		currentPlayer.setSTZZ();
		/*if(currentPlayer.dragVal != 0)
		{
			currentPlayer.drag(5 - dragVal);
			currentPlayer.dragVal = 0;
		}*/

	}
	currentPlayer.setTargetByDieValue(dieV);
}
function setCurrentPlayer()
{
	index++;
	if(!begin.players[index % playerCount].finished)
	{
		currentPlayer = begin.players[index % playerCount];
	}
	else if(!begin.players[(++index) % playerCount].finished)
	{
		currentPlayer = begin.players[index % playerCount];	
	}
	else if(!begin.players[(++index) % playerCount].finished)
	{
		currentPlayer = begin.players[index % playerCount];	
	}
	else
	{
		index++;
	}
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
	if(a.currentX == a.targetX && a.targetY == a.currentY)
	{
		dieButton.removeAttribute('disabled');
		anotherDieButton.removeAttribute('disabled');
	}
	else
	{
		dieButton.attribute('disabled', '');
		anotherDieButton.attribute('disabled', '');
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
		let samePosPlayersCount = 0;
		for(var j = 0; j < playerCount; j++)
		{
			if(begin.players[j].currentX == a.currentX && begin.players[j].currentY == a.currentY && 
				a.R != begin.players[j].R && a.G != begin.players[j].G &&
				a.B != begin.players[j].B)
			{
				samePosPlayersCount++;
			}
		}
		console.log(samePosPlayersCount);
		/*if(samePosPlayersCount > 0)
		{
			samePosPlayersCount = 0;
			for(var j = 0; j < playerCount; j++)
			{
				if(begin.players[j].currentX == a.currentX && begin.players[j].currentY == a.currentY &&
					a.R != begin.players[j].R && a.G != begin.players[j].G &&
					a.B != begin.players[j].B)
				{
					if(begin.players[j].CX == a.CX && begin.players[j].CY == a.CY)
					{
						begin.players[j].drag(++samePosPlayersCount);
					}
				}
			}
		}*/
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
