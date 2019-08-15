class Box
{
	constructor(a)
	{
		this.specialVal = 0;
		this.boxX = 0;
		this.boxY = 0;
		this.initializer = a;
		this.boxTableCor = 0;
	}
	generateNewSpecial()
	{
		this.specialVal = Math.floor(random(4));
		console.log(this.specialVal);
	}
	generator()
	{
		let tableCor;
		let notValid = true;
		while(notValid)
		{
			notValid = false;
			tableCor = Math.floor(random(98) + 1);
			console.log(this.initializer.corArray[1]);
			console.log(this.initializer.corArray[2]);
			for(var k = 0; k < (this.initializer.corArray).length; k++)
			{
				if(tableCor == this.initializer.corArray[k])
				{
					notValid = true;
				}
			}
		}
		this.boxTableCor = tableCor;
		var x = tableCor - Math.floor(tableCor / this.initializer.tableCol) * this.initializer.tableCol;
		var y = Math.floor(tableCor / this.initializer.tableCol);
		this.boxX = this.initializer.leftEmptyW + this.initializer.cellW/2 + x * this.initializer.cellW;
		this.boxY = this.initializer.tableRow * this.initializer.cellH - this.initializer.cellH/2 - y*this.initializer.cellH;
	}
	display()
	{
		fill(10, 200, 10);
		rect(this.boxX - 20, this.boxY - 20, 40, 40);
	}
	findClosestSnake()
	{
		var willBeReturned;
		if(this.initializer.snakeCount > 0)
		{
			willBeReturned = this.initializer.snakeHeadTableCor[0];
			for(var k = 0; k < this.initializer.snakeCount; k++)
			{
				if(Math.abs(this.convertFromType1ToType2(this.initializer.snakeHeadTableCor[k]) - this.convertFromType1ToType2(this.boxTableCor)) 
					< Math.abs(this.convertFromType1ToType2(willBeReturned) - this.convertFromType1ToType2(this.boxTableCor)))
				{
					willBeReturned = this.initializer.snakeHeadTableCor[k];
				}
			}
		}
		return willBeReturned;
	}
	findClosestLadder()
	{
		var willBeReturned;
		if(this.initializer.ladderCount > 0)
		{
			willBeReturned = this.initializer.ladderHeadTableCor[0];
			for(var k = 0; k < this.initializer.ladderCount; k++)
			{
				if(Math.abs(this.convertFromType1ToType2(this.initializer.ladderHeadTableCor[k]) - this.convertFromType1ToType2(this.boxTableCor)) 
					< Math.abs(this.convertFromType1ToType2(willBeReturned) - this.convertFromType1ToType2(this.boxTableCor)))
				{
					willBeReturned = this.initializer.ladderHeadTableCor[k];
				}
			}
		}
		return willBeReturned;
	}
	convertFromType1ToType2(a)
	{
		if(Math.floor(a/10) % 2 == 0)
		{
			return a;
		}
		else
		{
			return Math.floor(a/10) * 10 + (9 - (a - (Math.floor(a/10) * 10)));
		}
	}
}