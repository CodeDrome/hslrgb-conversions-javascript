exports.CalculateLightness = function(R, G, B)
{
	let Max = 0.0
	let Min = 0.0

	let fR = R / 255.0;
	let fG = G / 255.0;
	let fB = B / 255.0;

	if(fR >= fG && fR >= fB)
		Max = fR;
	else if(fG >= fB && fG >= fR)
		Max = fG;
	else if(fB >= fG && fB >= fR)
		Max = fB;

	if(fR <= fG && fR <= fB)
		Min = fR;
	else if(fG <= fB && fG <= fR)
		Min = fG;
	else if(fB <= fG && fB <= fR)
		Min = fB;

	let Lightness = (Min + Max) / 2.0;

	return Lightness;
}


exports.CalculateSaturation = function(R, G, B)
{
	let Max = 0.0;
	let Min = 0.0;

	let fR = R / 255.0;
	let fG = G / 255.0;
	let fB = B / 255.0;

	if(fR >= fG && fR >= fB)
		Max = fR;
	else if(fG >= fB && fG >= fR)
		Max = fG;
	else if(fB >= fG && fB >= fR)
		Max = fB;

	if(fR <= fG && fR <= fB)
		Min = fR;
	else if(fG <= fB && fG <= fR)
		Min = fG;
	else if(fB <= fG && fB <= fR)
		Min = fB;

	let Lightness = exports.CalculateLightness(R, G, B);

	let Saturation;

	if(Max == Min)
	{
		Saturation = -1.0;
	}
	else
	{
		if(Lightness < 0.5)
		{
			Saturation = (Max - Min) / (Max + Min);
		}
		else
		{
			Saturation = (Max - Min) / (2.0 - Max - Min);
		}
	}

	return Saturation;
}


exports.CalculateHue = function(R, G, B)
{
	let Max = 0.0;
	let Min = 0.0;

	let fR = R / 255.0;
	let fG = G / 255.0;
	let fB = B / 255.0;

	if(fR >= fG && fR >= fB)
		Max = fR;
	else if(fG >= fB && fG >= fR)
		Max = fG;
	else if(fB >= fG && fB >= fR)
		Max = fB;

	if(fR <= fG && fR <= fB)
		Min = fR;
	else if(fG <= fB && fG <= fR)
		Min = fG;
	else if(fB <= fG && fB <= fR)
		Min = fB;

	let Hue;

	if(Max == Min)
	{
		Hue = -1.0;
	}
	else
	{
		if(Max == fR)
		{
			Hue = (fG - fB) / (Max - Min);
		}
		else if(Max == fG)
		{
			Hue = 2.0 + (fB - fR) / (Max - Min);
		}
		else if(Max == fB)
		{
			Hue = 4.0 + (fR - fG) / (Max - Min);
		}

		Hue *= 60.0;

		if(Hue < 0.0)
		{
			Hue += 360.0;
		}
	}

	return Hue;
}


exports.CalculateRGBfromHSL = function(H, S, L)
{
	let colour = { R: 0, G: 0, B: 0 };

	if(H == -1.0 && S == -1.0)
	{
		colour.R = L * 255.0;
		colour.G = L * 255.0;
		colour.B = L * 255.0;
	}
	else
	{
		let temporary_1;

		if(L < 0.5)
			temporary_1 = L * (1.0 + S);
		else
			temporary_1 = L + S - L * S;

		let temporary_2;

		temporary_2 = 2.0 * L - temporary_1;

		let hue = H / 360.0;

		let temporary_R = hue + 0.333;
		let temporary_G = hue;
		let temporary_B = hue - 0.333;

		if(temporary_R < 0.0)
			temporary_R += 1.0;
		if(temporary_R > 1.0)
			temporary_R -= 1.0;

		if(temporary_G < 0.0)
			temporary_G += 1.0;
		if(temporary_G > 1.0)
			temporary_G -= 1.0;

		if(temporary_B < 0.0)
			temporary_B += 1.0;
		if(temporary_B > 1.0)
			temporary_B -= 1.0;

		// RED
		if((6.0 * temporary_R) < 1.0)
		{
			colour.R = (temporary_2 + (temporary_1 - temporary_2) * 6.0 * temporary_R) * 255.0;
		}
		else if((2.0 * temporary_R) < 1.0)
		{
			colour.R = temporary_1 * 255.0;
		}
		else if((3.0 * temporary_R) < 2.0)
		{
			colour.R = (temporary_2 + (temporary_1 - temporary_2) * (0.666 - temporary_R) * 6.0) * 255.0;
		}
		else
		{
			colour.R = temporary_2 * 255.0;
		}

		// GREEN
		if((6.0 * temporary_G) < 1.0)
		{
			colour.G = (temporary_2 + (temporary_1 - temporary_2) * 6.0 * temporary_G) * 255.0;
		}
		else if((2.0 * temporary_G) < 1.0)
		{
			colour.G = temporary_1 * 255.0;
		}
		else if((3.0 * temporary_G) < 2.0)
		{
			colour.G = (temporary_2 + (temporary_1 - temporary_2) * (0.666 - temporary_G) * 6.0) * 255.0;
		}
		else
		{
			colour.G = temporary_2 * 255.0;
		}

		// BLUE
		if((6.0 * temporary_B) < 1.0)
		{
			colour.B = (temporary_2 + (temporary_1 - temporary_2) * 6.0 * temporary_B) * 255.0;
		}
		else if((2.0 * temporary_B) < 1.0)
		{
			colour.B = temporary_1 * 255.0;
		}
		else if((3.0 * temporary_B) < 2.0)
		{
			colour.B = (temporary_2 + (temporary_1 - temporary_2) * (0.666 - temporary_B) * 6.0) * 255.0;
		}
		else
		{
			colour.B = temporary_2 * 255.0;
		}
	}

	colour.R = Math.round(Math.abs(colour.R));
	colour.G = Math.round(Math.abs(colour.G));
	colour.B = Math.round(Math.abs(colour.B));

	return colour;
}
