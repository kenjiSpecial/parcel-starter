import Bowser from 'bowser';

export const ENV = Bowser.parse(window.navigator.userAgent);
export const IS_MOBILE = ENV.platform.type === 'mobile' ? true : false;
export const IS_TABLET =
	ENV.platform.type === 'tablet' ||
	(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
		? true
		: false;

export const IS_DEVICE = IS_MOBILE || IS_TABLET ? true : false;
export const IS_DESKTOP = ENV.platform.type === 'desktop' ? true : false;
export const PIXEL_RATIO = IS_DESKTOP ? 1 : IS_TABLET ? 1 : window.devicePixelRatio > 1 ? 1.5 : 1;