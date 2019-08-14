let currentPlayer;
let dieButton;
let anotherDieButton;
let dieButtonX = 560;
let dieButtonY = 400;
let begin;
let die = new Die();
let index = -1;
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
	var col = color(25, 23, 200, 50);
	dieButton.style('background-color', col);
}
function draw()
{
	background(0);
	drawTable();
	begin.drawSAL();
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
		currentPlayer.setSTZZ();
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
	index++;
	if(!begin.players[index % playerCount].finished)
	{
		currentPlayer = begin.players[index % playerCount];
		console.log(1);
	}
	else if(!begin.players[(++index) % playerCount].finished)
	{
		currentPlayer = begin.players[index % playerCount];
		console.log(2);	
	}
	else if(!begin.players[(++index) % playerCount].finished)
	{
		currentPlayer = begin.players[index % playerCount];	
	}
	else
	{
		index++;
	}
	text('current player is ' + (index % playerCount), 560, 100);
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
		//anotherDieButton.removeAttribute('disabled');
	}
	else
	{
		dieButton.attribute('disabled', '');
		//anotherDieButton.attribute('disabled', '');
	}
}
function controlMove(a)
{
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
