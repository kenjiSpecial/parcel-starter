precision highp float;

uniform sampler2D uTexture;
uniform float uTime;

varying vec3 vNormal;
varying vec2 vUv;
void main(){
    vec4 color = texture2D(uTexture, fract(vUv - vec2(uTime *  0.1, 0.0)));
    gl_FragColor = color;
}