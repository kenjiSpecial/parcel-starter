import { Cube } from 'tubugl-3d-shape';
import { Sphere } from 'tubugl-3d-shape/src/sphere';
import { mat4 } from 'gl-matrix';

export class CustomCube extends Cube {
	constructor(
		gl,
		params = { isDepthTest: true },
		width = 100,
		height = 100,
		depth = 100,
		widthSegment = 1,
		heightSegment = 1,
		depthSegment = 1
	) {
		super(gl, params, width, height, depth, widthSegment, heightSegment, depthSegment);
	}

	render(camera, directionalLight, color) {
		this.update(camera, directionalLight, color).draw();
	}

	update(camera, directionalLight, color) {
		super.update(camera);
		let _mat4 = mat4.create();
		mat4.invert(_mat4, this.modelMatrix);
		mat4.transpose(_mat4, _mat4);

		this._gl.uniformMatrix4fv(this._program.getUniforms('normalMatrix').location, false, _mat4);

		return this;
	}
}

export class CustomSphere extends Sphere {
	constructor(gl, params = {}, radius = 100, widthSegments = 10, heightSegments = 10) {
		super(gl, params, radius, widthSegments, heightSegments);
	}

	render(camera) {
		this.update(camera).draw();
	}

	update(camera) {
		super.update(camera);

		let _mat4 = mat4.create();
		mat4.invert(_mat4, this.modelMatrix);
		mat4.transpose(_mat4, _mat4);

		this._gl.uniformMatrix4fv(this._program.getUniforms('normalMatrix').location, false, _mat4);

		return this;
	}
}
