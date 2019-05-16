import EventEmitter from 'wolfy87-eventemitter';
import { PictureData } from './../types/data.d';

export class DataModel extends EventEmitter {
	private readonly data: PictureData[];

	constructor(data: PictureData[]) {
		super();

		this.data = data;
		console.log(this.data);

		this.reset();
	}

	private reset() {}
}
