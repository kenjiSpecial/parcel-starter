// Type definitions for dat.GUI 0.7.2
// Project: https://github.com/dataarts/dat.gui
// Definitions by: Satoru Kimura <https://github.com/gyohk>, ZongJing Lu <https://github.com/sonic3d>, Richard Roylance <https://github.com/rroylance>, Nahuel Scotti <https://github.com/singuerinc>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'dat.gui' {
	export interface GUIParams {
		/**
		 * Handles GUI's element placement for you.
		 * @default true
		 */
		autoPlace?: boolean;
		/**
		 * If true, starts closed.
		 * @default false
		 */
		closed?: boolean;
		/**
		 * If true, close/open button shows on top of the GUI.
		 * @default false
		 */
		closeOnTop?: boolean;
		/**
		 * If true, GUI is closed by the "h" keypress.
		 * @default false
		 */
		hideable?: boolean;
		/**
		 * JSON object representing the saved state of this GUI.
		 */
		load?: any;
		/**
		 * The name of this GUI.
		 */
		name?: string;
		/**
		 * The identifier for a set of saved values.
		 */
		preset?: string;
		/**
		 * The width of GUI element.
		 */
		width?: number;
	}

	export class GUI {

		public __controllers: GUIController[];
		public __folders: GUI[];
		public domElement: HTMLElement;

		// gui properties in dat/gui/GUI.js
		public readonly parent: GUI;
		public readonly scrollable: boolean;
		public readonly autoPlace: boolean;
		public preset: string;
		public width: number;
		public name: string;
		public closed: boolean;
		public readonly load: Object;
		public useLocalStorage: boolean;
		constructor(option?: GUIParams);

		public add(
			target: Object,
			propName: string,
			min?: number,
			max?: number,
			step?: number
		): GUIController;
		public add(target: Object, propName: string, status: boolean): GUIController;
		public add(target: Object, propName: string, items: string[]): GUIController;
		public add(target: Object, propName: string, items: number[]): GUIController;
		public add(target: Object, propName: string, items: Object): GUIController;

		public addColor(target: Object, propName: string): GUIController;

		public remove(controller: GUIController): void;
		public destroy(): void;

		public addFolder(propName: string): GUI;
		public removeFolder(subFolder: GUI): void;

		public open(): void;
		public close(): void;

		public remember(target: Object, ...additionalTargets: Object[]): void;
		public getRoot(): GUI;

		public getSaveObject(): Object;
		public save(): void;
		public saveAs(presetName: string): void;
		public revert(gui: GUI): void;

		public listen(controller: GUIController): void;
		public updateDisplay(): void;
	}

	export class GUIController {

		// Controller
		public onChange: (value?: any) => GUIController;
		public onFinishChange: (value?: any) => GUIController;
		public destroy(): void;

		public setValue(value: any): GUIController;
		public getValue(): any;
		public updateDisplay(): GUIController;
		public isModified(): boolean;

		// NumberController
		public min(n: number): GUIController;
		public max(n: number): GUIController;
		public step(n: number): GUIController;

		// FunctionController
		public fire(): GUIController;

		// augmentController in dat/gui/GUI.js
		public options(option: any): GUIController;
		public name(s: string): GUIController;
		public listen(): GUIController;
		public remove(): GUIController;
	}
}
