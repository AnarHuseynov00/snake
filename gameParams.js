class Initializer
{
	constructor(playerCount)
	{
		this.tableRow = 10;
		this.tableCol = 10;
		this.cellW = 50;
		this.cellH = 50;
		this.table = new Array(this.tableCol * this.tableRow);
		this.tableR = new Array(this.tableRow * this.tableCol);
		this.tableG = new Array(this.tableCol * this.tableRow);
		this.tableB = new Array(this.tableRow * this.tableCol);
		this.snakeCount = 5; 
		this.ladderCount = 3;
		this.snakeHeadX = new Array(this.snakeCount);
		this.snakeHeadY = new Array(this.snakeCount);
		this.snakeTailX = new Array(this.snakeCount);
		this.snakeTailY = new Array(this.snakeCount);
		this.ladderHeadX = new Array(this.ladderCount);
		this.ladderHeadY = new Array(this.ladderCount);
		this.ladderTailX = new Array(this.ladderCount);
		this.ladderTailY = new Array(this.ladderCount);
		this.CANVAS_W = 750;
		this.CANVAS_H = 500;
		this.leftEmptyW = 50;
		this.players = new Array(playerCount);
		for(var k = 0; k < playerCount; k++)
		{
			this.players[k] = new Player();
		}
	}
	setTable()
	{
		for(var i = 0; i < this.tableCol * this.tableRow; i++)
		{
			this.tableR[i] = random(256);
			this.tableG[i] = random(256);
			this.tableB[i] = random(256);
		}
		for(var i = 0; i < this.tableCol * this.tableRow; i++)
		{
			this.table[i] = true;
		}
	}
	randomGenerator()
	{
		var snakeCor = new Array(this.snakeCount * 2);
		var ladderCor = new Array(this.ladderCount * 2);
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
		for(var k = 0; k < this.snakeCount; k++)
		{
			this.snakeHeadX[k] = snakeCor[2*k] - Math.floor(snakeCor[2*k] / 10) * 10;
			this.snakeHeadY[k] = Math.floor(snakeCor[2*k] / 10);
			this.snakeTailX[k] = snakeCor[2*k+1] - Math.floor(snakeCor[2*k+1] / 10) * 10;
			this.snakeTailY[k] = Math.floor(snakeCor[2*k+1] / 10);
		}
		for(var k = 0; k < this.ladderCount; k++)
		{
			this.ladderHeadX[k] = ladderCor[2*k] - Math.floor(ladderCor[2*k] / 10) * 10;
			this.ladderHeadY[k] = Math.floor(ladderCor[2*k] / 10);
			this.ladderTailX[k] = ladderCor[2*k+1] - Math.floor(ladderCor[2*k+1] / 10) * 10;
			this.ladderTailY[k] = Math.floor(ladderCor[2*k+1] / 10);
		}
		for(var k = 0; k < this.snakeCount; k++)
		{
			this.snakeHeadX[k] = this.leftEmptyW + this.cellW/2 + this.snakeHeadX[k] * this.cellW;
			this.snakeHeadY[k] = 475 - this.snakeHeadY[k] * this.cellH;
			this.snakeTailX[k] = this.leftEmptyW + this.cellW/2 + this.snakeTailX[k] * this.cellW;
			this.snakeTailY[k] = 475 - this.snakeTailY[k] * this.cellH;
		}
		for(var k = 0; k < this.ladderCount; k++)
		{
			this.ladderHeadX[k] = this.leftEmptyW + this.cellW/2 + this.ladderHeadX[k] * this.cellW;
			this.ladderHeadY[k] = 475 - this.ladderHeadY[k] * this.cellH;
			this.ladderTailX[k] = this.leftEmptyW + this.cellW/2 + this.ladderTailX[k] * this.cellW;
			this.ladderTailY[k] = 475 - this.ladderTailY[k] * this.cellH;
		}
	}
}