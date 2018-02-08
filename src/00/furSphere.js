import { Sphere } from 'tubugl-3d-shape/src/sphere';

import { TRIANGLES, UNSIGNED_SHORT, CULL_FACE, DEPTH_TEST } from 'tubugl-constants';
import { Program, VAO } from 'tubugl-core';

const fragmentSrc = require('./shaders/shader-frag.glsl');
const vertexSrc = require('./shaders/shader-vert.glsl');

const baseFragmentSrc = require('./shaders/base-shader-frag.glsl');
const baseVertSrc = require('./shaders/base-shader-vert.glsl');

export class FurSphere extends Sphere {
	constructor(
		gl,
		params = { isDepthTest: true },
		radius = 200,
		widthSegments = 20,
		heightSegments = 20
	) {
		super(gl, params, radius, widthSegments, heightSegments);
		this._time = 0;
		this._instanced = 50;
		this._layerThickness = 2;
		this._startColor = [0, 0, 0, 0.6];
		this._endColor = [1.0, 1.0, 1.0, 0.0];
	}

	render(camera, furTexture, alphaTexture) {
		this._updateModelMatrix();

		// this.updateBase(camera).drawBase();
		this.update(camera, furTexture, alphaTexture).draw();
	}

	_makeBuffers() {
		super._makeBuffers();

		this._mainVao = new VAO(this._gl);
		this._mainVao.bind();

		console.log(this._indexBuffer);
	}

	_makeProgram() {
		this._baseProgram = new Program(this._gl, baseVertSrc, baseFragmentSrc);
		this._program = new Program(this._gl, vertexSrc, fragmentSrc);
	}

	draw() {
		let gl = this._gl;
		this._gl.enable(CULL_FACE);
		this._gl.enable(DEPTH_TEST);

		this._gl.enable(this._gl.BLEND);
		gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);
		// gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // too dim
		// gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // too bright
		// gl.blend(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);

		this._gl.drawElementsInstanced(TRIANGLES, this._cnt, UNSIGNED_SHORT, 0, this._instanced);

		this._gl.disable(this._gl.BLEND);
		return this;
	}

	updateBase(camera) {
		this._baseProgram.bind();

		this._vao.bind();

		this._gl.uniformMatrix4fv(
			this._baseProgram.getUniforms('modelMatrix').location,
			false,
			this.modelMatrix
		);
		this._gl.uniformMatrix4fv(
			this._baseProgram.getUniforms('viewMatrix').location,
			false,
			camera.viewMatrix
		);
		this._gl.uniformMatrix4fv(
			this._baseProgram.getUniforms('projectionMatrix').location,
			false,
			camera.projectionMatrix
		);

		return this;
	}

	drawBase() {
		let gl = this._gl;
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);

		this._gl.disable(this._gl.BLEND);
		gl.drawElements(TRIANGLES, this._cnt, UNSIGNED_SHORT, 0);
	}

	update(camera, furTexture) {
		this._time += 1 / 60;

		this._program.bind();

		this._updateAttributes(this._program);

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
		this._gl.uniform1f(this._program.getUniforms('waveScale').location, 5);
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

		// this._program.setUniformTexture(alphaTexture, 'alphaMap');
		// alphaTexture.activeTexture().bind();

		return this;
	}
}
