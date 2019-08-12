class Die
{
	constructor()
	{
		this.dieValue = 0;
	}
	rollDies()
	{
		this.dieValue = Math.floor(random(6) + 1);
		return this.dieValue
	}
	drawDie()
	{
		if(this.dieValue == 1)
		{
			fill(255, 255, 255);
			rect(600, 450, 50, 50, 5);
			fill(0, 0, 0);
			circle(625, 475, 10);
		}
		if(this.dieValue == 2)
		{
			fill(255, 255, 255);
			rect(600, 450, 50, 50, 5);
			fill(0, 0, 0);
			circle(615, 475, 10);
			circle(635, 475, 10);
		}
		if(this.dieValue == 3)
		{
			fill(255, 255, 255);
			rect(600, 450, 50, 50, 5);
			fill(0, 0, 0);
			circle(610, 460, 10);
			circle(625, 475, 10);
			circle(640, 490, 10);
		}
		if(this.dieValue == 4)
		{
			fill(255, 255, 255);
			rect(600, 450, 50, 50, 5);
			fill(0, 0, 0);
			circle(615, 465, 10);
			circle(635, 465, 10);
			circle(635, 485, 10);
			circle(615, 485, 10);
		}
		if(this.dieValue == 5)
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
		if(this.dieValue == 6)
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
}