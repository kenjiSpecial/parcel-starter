import {
	createProgram,
	getSphere,
	createBufferWithLocation,
	createIndex,
	getUniformLocations,
	bindBuffer
	// mat4
} from 'dan-shari-gl';

import { mat4 } from 'dan-shari-gl/src/math';

import vertexShaderSrc from './shaders/shader-vert.glsl';
import fragmentShaderSrc from './shaders/shader-frag.glsl';

export class Sphere {
	/**
	 *
	 * @param {WebGLRenderingContext} gl
	 *
	 */
	constructor(gl) {
		this.gl = gl;
		this.program = createProgram(gl, vertexShaderSrc, fragmentShaderSrc);
		const { vertices, normals, indices } = getSphere(5, 32, 32);

		this.buffers = {
			position: createBufferWithLocation(
				gl,
				this.program,
				new Float32Array(vertices),
				'position'
			),
			normal: createBufferWithLocation(gl, this.program, new Float32Array(normals), 'normal'),
			index: createIndex(gl, new Uint16Array(indices))
		};

		this.matrix = {
			model: mat4.create(),
			mv: mat4.create(),
			mvp: mat4.create()
		};

		this.uniforms = getUniformLocations(gl, this.program, ['uMVPMatrix']);
	}

	render(camera) {
		const { gl, buffers, uniforms } = this;
		const { position, normal, index } = buffers;
		const { uMVPMatrix } = uniforms;

		let { model, mv, mvp } = this.matrix;
		mat4.multiply(mv, camera.viewMatrix, model);
		mat4.multiply(mvp, camera.projectionMatrix, mv);

		gl.useProgram(this.program);
		bindBuffer(gl, position.buffer, position.location, 3);
		bindBuffer(gl, normal.buffer, normal.location, 3);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index.buffer);
		gl.uniformMatrix4fv(uMVPMatrix, false, mvp);

		gl.drawElements(gl.TRIANGLES, index.cnt, gl.UNSIGNED_SHORT, 0);
	}
}
