precision highp float;

attribute vec4 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
    gl_Position = position;
    gl_Position.w = 0.5;
    vUv = uv;
}