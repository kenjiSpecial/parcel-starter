import EventEmitter from 'wolfy87-eventemitter';
import { PictureData } from './../types/data.d';

export class DataModel extends EventEmitter {
	private data: PictureData[];

	constructor(data: PictureData[]) {
		super();

		this.data = data;

		this.reset();
	}

	private reset() {}
}
