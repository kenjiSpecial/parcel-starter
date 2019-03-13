export class Debug {
	private dom: HTMLElement;
	private startTime: number;
	private _isShow: boolean;
	constructor(parent: HTMLElement) {
        this._isShow = true;
		this.dom = document.createElement('div');
		this.dom.classList.add('debug__time-cal');
		this.dom.textContent = 'loading...';

		parent.appendChild(this.dom);
	}

	public calStart() {
		this.startTime = new Date().getTime();
	}

	public calEnd() {
		const endTime: number = new Date().getTime();
		const duration: number = endTime - this.startTime;
		this.dom.textContent = `initialized: ${duration / 1000}s`;
	}

	private show() {
		this.dom.style.display = 'block';
	}

	private hide() {
		this.dom.style.display = 'none';
	}

	get isShow(): boolean {
		return this._isShow;
	}

	set isShow(value: boolean) {
		if (value) {
			this.show();
		} else {
			this.hide();
		}

		this._isShow = value;
	}
}
