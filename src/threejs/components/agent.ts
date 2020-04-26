import { BufferGeometry, CircleGeometry, Material, Mesh, MeshBasicMaterial, Object3D } from 'three';

export class Agent extends Object3D {
	constructor(geometry: BufferGeometry) {
		super();
		const material = new MeshBasicMaterial({ color: '#2DA7FF' });
		const peopleMesh = new Mesh(geometry, material);

		const circleGeometry = new CircleGeometry(0.5, 32);
		const shadowMat = new MeshBasicMaterial({ color: '#999999' });
        const shadowMesh = new Mesh(circleGeometry, shadowMat);
        shadowMesh.rotation.x =  -Math.PI/2;

		this.add(peopleMesh);
		this.add(shadowMesh);
	}
}
