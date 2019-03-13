import { mat4 } from 'gl-matrix';

export interface BufferObject {
	buffer: WebGLBuffer;
	location: number;
}

export interface IndexObject {
	cnt: number;
	buffer: WebGLBuffer;
}

export interface MatrixObject {
	model: mat4;
	mv: mat4;
	mvp: mat4;
}
