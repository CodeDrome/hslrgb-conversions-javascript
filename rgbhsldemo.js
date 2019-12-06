RGBtoHSLtoRGB = function()
{
	const Jimp = require("jimp");
	const RGBHSL = require('./rgbhsl.js');

	Jimp.read("./canterbury.jpg", function (err, photo)
	{
		if (err)
		{
			throw err;
		}
		else
		{
 			let clone = photo.clone();

 			let hue;
 			let saturation;
 			let lightness;
 			let rgb;

 			for(let i = 0, l = photo.bitmap.data.length; i < l; i+= 4)
 			{
 				hue = RGBHSL.CalculateHue(photo.bitmap.data[i], photo.bitmap.data[i+1], photo.bitmap.data[i+2]);
				saturation = RGBHSL.CalculateSaturation(photo.bitmap.data[i], photo.bitmap.data[i+1], photo.bitmap.data[i+2]);
				lightness  = RGBHSL.CalculateLightness(photo.bitmap.data[i], photo.bitmap.data[i+1], photo.bitmap.data[i+2]);
 				rgb = RGBHSL.CalculateRGBfromHSL(hue, saturation, lightness);

 				clone.bitmap.data[i] = rgb.R;
 				clone.bitmap.data[i+1] = rgb.G;
 				clone.bitmap.data[i+2] = rgb.B;
 				clone.bitmap.data[i+3] = photo.bitmap.data[i+3];
 			}

			clone.write("canterbury_copy.jpg");
		}
	});
}


RGBtoHSLtoRGB();
