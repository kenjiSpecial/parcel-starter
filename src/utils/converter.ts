export function mercatorConverter(lat: number, lng: number) {
	const zoom = 1;
	const sin = Math.sin((lat * Math.PI) / 180);
	const pow = Math.pow(2, zoom);

	const x = ((lng + 180) / 360) * 256 * pow;
	const y = -(0.5 - Math.log((sin + 1) / (-sin + 1)) / (Math.PI * 4)) * 256 * pow;

	// pow = Math.pow(2, zoom);
	return { x, y };
}
