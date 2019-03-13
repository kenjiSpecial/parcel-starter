import EventEmitter from 'wolfy87-eventemitter';

export class AppModel extends EventEmitter {
	constructor() {
		super();

		this.reset();
	}

	private reset() {
		console.log('reset');
	}
}
