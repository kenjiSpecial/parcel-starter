import { Cube } from 'tubugl-3d-shape';

import { TRIANGLES, UNSIGNED_SHORT, CULL_FACE, DEPTH_TEST } from 'tubugl-constants';
import { Program, ArrayBuffer, IndexArrayBuffer, VAO } from 'tubugl-core';

const fragmentSrc = require('./shaders/shader.frag');
const vertexSrc = require('./shaders/shader.vert');

export class Fur extends Cube {
	constructor(
		gl,
		width = 100,
		height = 100,
		depth = 100,
		widthSegment = 1,
		heightSegment = 1,
		depthSegment = 1,
		params = { isDepthTest: true }
	) {
		super(gl, width, height, depth, widthSegment, heightSegment, depthSegment, params);
		this._time = 0;
		this._instanced = 30;
		this._layerThickness = 2;
		this._startColor = [0.0, 0.0, 0.0, 1.0];
		this._endColor = [1.0, 1.0, 1.0, 0.0];
	}

	render(camera, furTexture, alphaTexture) {
		this.update(camera, furTexture, alphaTexture).draw();
	}

	_makeProgram(params) {
		this._program = new Program(this._gl, vertexSrc, fragmentSrc);
	}

	draw() {
		let gl = this._gl;
		this._gl.disable(CULL_FACE);
		this._gl.enable(DEPTH_TEST);

		this._gl.enable(this._gl.BLEND);
		gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);

		this._gl.drawElementsInstanced(TRIANGLES, this._cnt, UNSIGNED_SHORT, 0, this._instanced);

		this._gl.disable(this._gl.BLEND);
		return this;
	}

	update(camera, furTexture, alphaTexture) {
		this._time += 1 / 60 / 4;
		this._updateModelMatrix();

		this._program.bind();

		this._updateAttributres(this._program);

		this._gl.uniformMatrix4fv(
			this._program.getUniforms('modelMatrix').location,
			false,
			this.modelMatrix
		);
		this._gl.uniformMatrix4fv(
			this._program.getUniforms('viewMatrix').location,
			false,
			camera.viewMatrix
		);
		this._gl.uniformMatrix4fv(
			this._program.getUniforms('projectionMatrix').location,
			false,
			camera.projectionMatrix
		);

		this._gl.uniform1f(
			this._program.getUniforms('layerThickness').location,
			this._layerThickness
		);

		this._gl.uniform1f(this._program.getUniforms('layersCount').location, this._instanced);
		this._gl.uniform1f(this._program.getUniforms('waveScale').location, 1);
		if (this._program.getUniforms('uTime'))
			this._gl.uniform1f(this._program.getUniforms('uTime').location, this._time);
		this._gl.uniform4f(
			this._program.getUniforms('colorStart').location,
			this._startColor[0],
			this._startColor[1],
			this._startColor[2],
			this._startColor[3]
		);
		this._gl.uniform4f(
			this._program.getUniforms('colorEnd').location,
			this._endColor[0],
			this._endColor[1],
			this._endColor[2],
			this._endColor[3]
		);

		this._program.setUniformTexture(furTexture, 'diffuseMap');
		furTexture.activeTexture().bind();

		this._program.setUniformTexture(alphaTexture, 'alphaMap');
		alphaTexture.activeTexture().bind();

		return this;
	}
}
