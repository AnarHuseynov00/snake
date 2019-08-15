let currentPlayer;
let dieButton;
let anotherDieButton;
let dieButtonX = 600;
let dieButtonY = 400;
let begin;
let surpise;
let die = new Die();
let index = -1;
let playerCount;
function setup()
{
	getPlayerCount();
	begin = new Initializer();
	surpise = new Box(begin);
	begin.submitPlayerCount(playerCount);
	createCanvas(begin.CANVAS_W, begin.CANVAS_H);
	background(175, 175, 255);
	begin.setTable();
	begin.randomGenerator();
	surpise.generator();
	currentPlayer = begin.players[0];
	dieButton = createButton('roll dies');
	dieButton.position(dieButtonX, dieButtonY);
	dieButton.mousePressed(getDieValue);
	var col = color(250, 20, 20, 50);
	dieButton.style('background-color', col);
}
function draw()
{
	background(175, 175, 255);
	drawTable();
	begin.drawSAL();
	surpise.display();
	buttonController(currentPlayer);
	displayPlayers();
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
	var speed1 = (c - a) / 100;
	var speed2 = (d - b) / 100;
	let degree = 0;    
	for(var e = 0; e < 100; e++)
	{
		circle(circleX, circleY, 10);
		degree = degree + special;
		circleX = circleX + speed1 + mul*Math.sin(degree);
		circleY = circleY + speed2;
	}
}
function movePlayers()
{
	
	controlMove(currentPlayer);

}
function displayPlayers()
{
	for(var j = 0; j < playerCount; j++)
	{
		begin.players[j].display();
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
	setCurrentPlayer();
	if(currentPlayer.currentX == currentPlayer.targetX && currentPlayer.targetY == currentPlayer.currentY)
	{
		dieV = die.rollDies();
		currentPlayer.setRTGDV();
		//currentPlayer.setSTZZ();
		if(currentPlayer.dragVal != 0)
		{
			currentPlayer.drag(5 - currentPlayer.dragVal);
			currentPlayer.dragVal = 0;
		}

	}
	currentPlayer.setTargetByDieValue(dieV);
}
function setCurrentPlayer()
{
	let now = index;
	let curr = index % playerCount;
	++index;
	while(begin.players[index % playerCount].targetX == 0 && begin.players[index % playerCount].targetY == 9 && index < now + 4)
	{
		++index;
	}
	currentPlayer = begin.players[index % playerCount];
	if(curr == index % playerCount && playerCount != 1)
	{
		currentPlayer.targetY = 9;
		currentPlayer.targetX = 0;
		currentPlayer.currentX = 0;
		currentPlayer.currentY = 9;
		currentPlayer.TX = begin.leftEmptyW + begin.cellW / 2;
		currentPlayer.CX = begin.leftEmptyW + begin.cellW / 2;
		currentPlayer.TY = begin.cellH / 2;
		currentPlayer.CY = begin.cellH / 2;
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
				//fill(begin.tableR[x*begin.tableCol + y], begin.tableG[x*begin.tableCol + y], begin.tableB[x*begin.tableCol + y]);
				fill(255, 255, 255);
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
	}
	else
	{
		dieButton.attribute('disabled', '');
	}
}
function controlMove(a)
{
	if(a.currentX == a.targetX
		&& a.currentY == a.targetY)
	{
		a.moveType = 1;
		if(a.CX == surpise.boxX && a.CY == surpise.boxY)
		{
			surpise.generateNewSpecial();
			if(surpise.specialVal == 0)
			{
				currentPlayer.setRTGDV();
				currentPlayer.setSTZZ();
				currentPlayer.setTargetByDieValue(5);
			}
			else if(surpise.specialVal == 1)
			{
				currentPlayer.setRTGDV();
				currentPlayer.setSTZZ();
				currentPlayer.setTargetByDieValue(-5);
			}
			else if(surpise.specialVal == 2)
			{
				//currentPlayer.setRTGDV();
				currentPlayer.setSTZZ();
				var s = surpise.findClosestSnake();
				var x1 = s - Math.floor(s / begin.tableCol) * begin.tableCol;
				var y1 = Math.floor(s / begin.tableCol);
				a.targetX = x1;
				a.targetY = y1;
				a.TX = begin.leftEmptyW + begin.cellW/2 + x1 * begin.cellW;
				a.TY = begin.tableRow * begin.cellH - begin.cellH/2 - y1*begin.cellH;
				a.moveType = 3;				
			}
			else if(surpise.specialVal == 3)
			{
				//currentPlayer.setRTGDV();
				currentPlayer.setSTZZ();
				var s = surpise.findClosestLadder();
				var x1 = s - Math.floor(s / begin.tableCol) * begin.tableCol;
				var y1 = Math.floor(s / begin.tableCol);
				a.targetX = x1;
				a.targetY = y1;
				a.TX = begin.leftEmptyW + begin.cellW/2 + x1 * begin.cellW;
				a.TY = begin.tableRow * begin.cellH - begin.cellH/2 - y1*begin.cellH;
				a.moveType = 3;				
			}
		}
		for(var i = 0; i < begin.snakeCount; i++)
		{
			if(a.CX == begin.snakeHeadX[i] 
				&& a.CY == begin.snakeHeadY[i])
			{
				a.setSTZZ();
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
				a.setSTZZ();
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
		if(samePosPlayersCount > 0)
		{
			for(var j = 0; j < playerCount; j++)
			{
				if(begin.players[j].currentX == a.currentX && begin.players[j].currentY == a.currentY &&
					a.R != begin.players[j].R && a.G != begin.players[j].G &&
					a.B != begin.players[j].B)
				{
					if(begin.players[j].CX == a.CX && begin.players[j].CY == a.CY)
					{
						begin.players[j].drag(j + 1);
					}
				}
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
