import { AppModel } from './../models/AppModel';
import { PictureData } from './../types/data.d';
import { JSON_LOAD_DONE, LOAD_DONE, LOAD_DONE_ALBUM_IMAGE, TRANSLATE_ALBUM } from './eventNames';

import EventEmitter from 'wolfy87-eventemitter';
import { dataJsonUrl, loadAssetsFirst, loadAssetsLater, textureList } from './assetsList';
import { TexturePools } from './TexturePools';

export class Loader extends EventEmitter {
	private static instance: Loader;
	public json: { data: PictureData[] } = { data: null, countries: null };
	public images: { [key: string]: HTMLImageElement } = {};

	private curLoadNum: number = 0;
	private toLoadNum: number = 0;
	private appModel: AppModel;

	private constructor() {
		super();

		this.onStartAlbumImagesAnimationHandler = this.onStartAlbumImagesAnimationHandler.bind(
			this
		);
	}

	public static GET_INSTANCE() {
		if (!Loader.instance) {
			Loader.instance = new Loader();
			// ... any one time initialization goes here ...
		}

		return Loader.instance;
	}

	public setAppModel(appModel: AppModel) {
		this.appModel = appModel;
		this.appModel.on(TRANSLATE_ALBUM, this.onStartAlbumImagesAnimationHandler);
	}

	public jsonLoadStart() {
		const texturePools = TexturePools.GET_INSTANCE();

		getAjaxJson(dataJsonUrl, (result: PictureData[]) => {
			this.json.data = result;

			this.jsonLoadDone();

			this.createAssetsList();

			this.loadassetsfirst();
		});

		// this.toLoadNum = this.toLoadNum + 1;

		// getAjaxJson(coutriesUrl, (result: GeoData) => {
		// 	this.json.countries = result;
		// 	this.curLoadNum = this.curLoadNum + 1;

		// 	if (this.curLoadNum === this.toLoadNum) {
		// 		this.loadDone();
		// 	}
		// });

		// for (const key in imageList) {
		// 	this.toLoadNum = this.toLoadNum + 1;
		// 	getImage(imageList[key], key, (id: string, result: HTMLImageElement) => {
		// 		this.images[id] = result;
		// 		texturePools.setImage(id, result);

		// 		this.curLoadNum = this.curLoadNum + 1;

		// 		if (this.curLoadNum === this.toLoadNum) {
		// 			this.loadDone();
		// 		}
		// 	});
		// }
	}

	private jsonLoadDone() {
		this.emit(JSON_LOAD_DONE);
	}

	private loadDone() {
		this.emit(LOAD_DONE);
	}

	private loadassetsfirst() {
		const texturePools = TexturePools.GET_INSTANCE();

		for (const key in loadAssetsFirst) {
			this.toLoadNum = this.toLoadNum + 1;
			getImage(loadAssetsFirst[key], key, (id: string, result: HTMLImageElement) => {
				this.images[id] = result;
				texturePools.setImage(id, result);
				this.curLoadNum = this.curLoadNum + 1;
				if (this.curLoadNum === this.toLoadNum) {
					this.loadDone();
				}
			});
		}
	}

	private onStartAlbumImagesAnimationHandler() {
		const texturePools = TexturePools.GET_INSTANCE();
		const assetsToLoad = this.appModel.loadingAlbums[this.appModel.page];

		// console.log(assetsToLoad);
		for (const key in assetsToLoad) {
			if (!assetsToLoad[key]) {
				const imageUrl = toLoadAssetsLater[key];
				getImage(imageUrl, key, (id: string, image: HTMLImageElement) => {
					this.appModel.loadingAlbums[this.appModel.page][id] = true;

					this.images[id] = image;
					texturePools.setImage(id, image);

					this.emit(LOAD_DONE_ALBUM_IMAGE, id);
				});
			}
		}
	}

	private createAssetsList() {
		const dir = './assets';
		for (const data of this.json.data) {
			const id = data.id;
			const imgUrl = `${dir}/${data.imgName}`;
			const tinyImgUrl = `${dir}/${data.tinyImgName}`; // data.tinyImgName;
			const imgId = id;
			const tinyImgId = `tiny${id}`;

			loadAssetsFirst[imgId] = tinyImgUrl;
			loadAssetsLater[tinyImgId] = imgUrl;
			textureList.push(imgId, tinyImgId);
		}
	}
}

export function getAjaxJson(url: string, callback: Function) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				const resp: string = xhr.responseText;
				const respJson = JSON.parse(resp);
				callback(respJson);
				// resolve(respJson);
			} else {
				// reject(xhr.status);
			}
		} else {
			// reject(xhr.status);
		}
	};

	xhr.send();
}

export function getImage(imageUrl: string, id: string, callback: Function) {
	const image: HTMLImageElement = new Image();
	image.onload = () => {
		callback(id, image);
	};
	image.onerror = () => {
		console.warn(`image(${imageUrl}) load err`);
	};

	image.src = imageUrl;
}

// /* global createImageBitmap */

function loadImageWithImageTag(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = '';
		img.src = src;
		img.onload = () => {
			resolve(img);
		};
		img.onerror = () => {
			reject(img);
		};
	});
}

function createWorker(f) {
	return new Worker(URL.createObjectURL(new Blob([`(${f})()`])));
}

const worker = createWorker(() => {
	self.addEventListener('message', e => {
		const src = e.data;
		fetch(src, { mode: 'cors' })
			.then(response => response.blob())
			.then(createImageBitmap)
			.then(bitmap => {
				self.postMessage({ src, bitmap }, [bitmap]);
			});
	});
});

function loadImageWithWorker(src) {
	return new Promise((resolve, reject) => {
		function handler(e) {
			if (e.data.src === src) {
				worker.removeEventListener('message', handler);
				if (e.data.error) {
					reject(e.data.error);
				}
				resolve(e.data.bitmap);
			}
		}
		worker.addEventListener('message', handler);
		worker.postMessage(src);
	});
}

// const loader = loadImageWithImageTag;
const loader = loadImageWithWorker;

// loader('https://i.imgur.com/NTBhJwl.jpg').then(img => {
// 	const ctx = document.querySelector('canvas').getContext('2d');
// 	ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
// });
