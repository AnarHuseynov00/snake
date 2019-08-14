let special1 = Math.PI / 25;
let degree1 = 0;
let speed1 = 0;
let speed2 = 0;
let counter = 0;
let playerBallDiameter = 20;
class Player
{
	constructor()
	{
		this.currentX = 3;
		this.currentY = 0;
		this.targetX = 3;
		this.targetY = 0;
		this.CX = 75 + 50 * this.currentX;
		this.CY = 475 - 50 * this.currentY;	
		this.TX = 75 + 50 * this.targetX;
		this.TY = 475 - 50 * this.targetY;	
		this.direction = 1;
		this.moveDirection = 1;
		this.readyToGetDieValue = false;
		this.startToZiqZaq = true;
		this.moveType = 1;
		this.R = random(256);
		this.G = random(256);
		this.B = random(256);
		this.dragVal = 0;
		this.lastSetVal = 0;
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
	drag(a)
	{
		if(a == 1)
		{
			this.CX -= 15;
			this.CY -= 15;
		}
		else if(a == 2)
		{
			this.CX -= 15;
			this.CY += 15;
		}
		else if(a == 3)
		{
			this.CX += 15;
			this.CY -= 15;
		}
		else if(a == 4)
		{
			this.CX += 15;
			this.CY += 15;
		}
		this.dragVal = a;	
	}
	setTargetByDieValue(a)
	{
		if(a >= 0)
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
		else
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
					if(this.targetY > 0)
					{
						this.targetY -= 1;
						this.targetX = -1 - a * this.direction - this.currentX;
					}
					else
					{
						this.targetY = 0;
						this.targetX = 0;
					}
				}
				else if(a * this.direction + this.currentX > 9)
				{
					this.targetY -= 1;
					this.targetX = 19 - a * this.direction - this.currentX;
				}
				this.TX = 75 + 50 * this.targetX;
				this.TY = 475 - 50 * this.targetY;	
			}
			this.readyToGetDieValue = false;	
		}
		this.lastSetVal = a;
	}
	display()
	{
		fill(this.R, this.G, this.B);
		circle(this.CX, this.CY, playerBallDiameter);
	}

	drawNormalMotion()
	{
		if(this.lastSetVal >= 0)
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
		else
		{
			if(this.currentY % 2 == 0)
				this.moveDirection = -1
			else
				this.moveDirection = 1
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
						this.CY = this.CY + 10;
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
						this.CY = this.CY + 10;
					}
					else
					{
						this.currentY = this.targetY
					}
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
			speed1 = (this.TX - this.CX) / 100;
			speed2 = (this.TY - this.CY) / 100;
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
