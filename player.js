let special1 = Math.PI / 25;
let degree1 = 0;
let speed1 = 0;
let speed2 = 0;
let counter = 0;
class Player
{
	constructor()
	{
		this.currentX = 0;
		this.currentY = 0;
		this.targetX = 0;
		this.targetY = 0;
		this.CX = 75;
		this.TX = 75;
		this.CY = 475;
		this.TY = 475;
		this.direction = 1;
		this.moveDirection = 1;
		this.readyToGetDieValue = false;
		this.startToZiqZaq = true;
		this.moveType = 1;
	}
	setTarget(a, b)
	{
		this.targetX = a;
		this.targetY = b;
	}
	setSTZZ()
	{
		this.startToZiqZaq = true;
	}
	setRTGDV()
	{
		this.readyToGetDieValue = 1;
	}
	setTargetByDieValue(a)
	{
		if((this.currentY % 2 == 0))
			this.direction = 1
		else
			this.direction = -1
		if(this.readyToGetDieValue)
		{
			if(a * this.direction + this.currentX < 10 && 
				a * this.direction + this.currentX >= 0)
			{
				this.targetX = a * this.direction + this.currentX;
			}
			else if(a * this.direction + this.currentX < 0)
			{
				if(this.targetY + 1 < 10)
				{
					this.targetY += 1;
					this.targetX = -1 - a * this.direction - this.currentX;
				}
				else
				{
					this.targetY = 9
					this.targetX = 0;
				}
			}
			else if(a * this.direction + this.currentX > 9)
			{
				this.targetY += 1;
				this.targetX = 19 - a * this.direction - this.currentX;
			}
			this.TX = 75 + 50 * this.targetX;
			this.TY = 475 - 50 * this.targetY;
		}
		this.readyToGetDieValue = false;
	}
	
	display()
	{
		fill(0, 0, 255);
		circle(this.CX, this.CY, 20);
	}

	drawNormalMotion()
	{

		if(this.currentY % 2 == 0)
			this.moveDirection = 1
		else
			this.moveDirection = -1
		if(this.currentY == this.targetY && 
			this.currentX != this.targetX)
		{
			if(this.TX != this.CX)
			{
				this.CX = this.CX + 10 * this.moveDirection;
 			}
 			else
 			{
 				this.currentX = this.targetX;
 			}

		}
		if(this.currentY != this.targetY)
		{
			if(this.currentX != 0 && this.currentX != 9)
			{
				if(this.CX != 75 && this.CX != 525)
				{
					this.CX = this.CX + 10 * this.moveDirection;
				}
				else
				{
					this.currentX = (this.CX - 75) / 50;
				}
			}
			if(this.currentX == 0)
			{
				if(this.CY != this.TY)
				{
					this.CY = this.CY - 10;
				}
				else
				{
					this.currentY = this.targetY
				}
			}
			if(this.currentX == 9)
			{
				if(this.CY != this.TY)
				{
					this.CY = this.CY - 10;
				}
				else
				{
					this.currentY = this.targetY
				}
			}

		}
	} 
	ziqZaqMove()
	{

		var multiplier;
		if(this.moveType == 2)
			multiplier = 2;
		else
			multiplier = 0;
		if(this.startToZiqZaq)
		{
			speed1 = (this.TX - this.CX) / 200;
			speed2 = (this.TY - this.CY) / 200;
		}
		if(this.currentY != this.targetY)
		{	
			if(Math.round(this.CY) != this.TY)
			{
				this.CY = this.CY + speed2;
				this.CX = this.CX + speed1 + multiplier * Math.sin(degree1);
			}
			else
			{
				this.currentY = this.targetY;
				this.CY = this.TY;
				this.currentX = this.targetX;
				this.CX = this.TX;
				this.moveType = 1;
			}
			degree1 = degree1 + special1;
		}
		this.startToZiqZaq = false;
	}
}
