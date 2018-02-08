attribute vec4 position;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
// = inverse transpose of modelViewMatrix
uniform mat4 normalMatrix;

varying vec3 vNormal;

void main(){
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * position;
    vNormal =  mat3(normalMatrix) * normal;
}