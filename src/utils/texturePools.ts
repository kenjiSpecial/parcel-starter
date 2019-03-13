import { createImageTexture } from 'dan-shari-gl';
import EventEmitter from 'wolfy87-eventemitter';

export class TexturePools extends EventEmitter {
	private static instance: TexturePools;
	public textures: { [key: string]: WebGLTexture } = {};
	private gl: WebGLRenderingContext;
	private constructor() {
		super();
	}

	public static GET_INSTANCE() {
		if (!TexturePools.instance) {
			TexturePools.instance = new TexturePools();
			// ... any one time initialization goes here ...
		}

		return TexturePools.instance;
	}

	public static GET_TEXTURE(name: string) {
		return TexturePools.instance.textures[name];
	}

	public setGL(gl: WebGLRenderingContext) {
		this.gl = gl;
	}

	public setImage(name: string, element: HTMLImageElement | HTMLCanvasElement) {
		const texture = createImageTexture(this.gl, element);
		this.textures[name] = texture;
	}
}
