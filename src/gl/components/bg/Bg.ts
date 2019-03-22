import {
	bindBuffer,
	Camera,
	createBufferWithLocation,
	createIndex,
	createProgram,
	createSimplePlane,
	getSphere,
	getUniformLocations
} from 'dan-shari-gl';
import { mat4 } from 'gl-matrix';
import { BufferObject, IndexObject } from '../../../types/mesh';
import fragmentShaderSrc from './shaders/shader.frag.glsl';
import vertexShaderSrc from './shaders/shader.vert.glsl';

export class Bg {
	private readonly gl: WebGLRenderingContext;
	private readonly program: WebGLProgram;
	private readonly buffers: {
		position: BufferObject;
		uv: BufferObject;
		index: IndexObject;
	};
	private readonly uniforms: { uTime: WebGLUniformLocation };
	private readonly matrix: { model: mat4; mv: mat4; mvp: mat4 };
	private time: number = 0;

	constructor(gl: WebGLRenderingContext) {
		this.gl = gl;
		this.program = createProgram(gl, vertexShaderSrc, fragmentShaderSrc);
		const { vertices, uvs, indices } = createSimplePlane();

		this.buffers = {
			position: createBufferWithLocation(
				gl,
				this.program,
				new Float32Array(vertices),
				'position'
			),
			uv: createBufferWithLocation(gl, this.program, new Float32Array(uvs), 'uv'),
			index: createIndex(gl, new Uint16Array(indices))
		};

		this.matrix = {
			model: mat4.create(),
			mv: mat4.create(),
			mvp: mat4.create()
		};

		this.uniforms = getUniformLocations(gl, this.program, ['uTime']) as {
			uTime: WebGLUniformLocation;
		};
	}

	public update(camera: Camera) {
		const { model, mv, mvp } = this.matrix;
		mat4.multiply(mv, camera.viewMatrix, model);
		mat4.multiply(mvp, camera.projectionMatrix, mv);
	}

	public render() {
		const { position, uv, index } = this.buffers;
		// const { uMVPMatrix } = this.uniforms;
		// const { mvp } = this.matrix;
		this.time += 1 / 60;

		this.gl.useProgram(this.program);
		bindBuffer(this.gl, position.buffer, position.location, 3);
		bindBuffer(this.gl, uv.buffer, uv.location, 2);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, index.buffer);
		this.gl.uniform1f(this.uniforms.uTime, this.time);

		this.gl.drawElements(this.gl.TRIANGLES, index.cnt, this.gl.UNSIGNED_SHORT, 0);
	}
}
