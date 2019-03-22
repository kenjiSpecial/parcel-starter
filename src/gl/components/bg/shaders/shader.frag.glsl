precision highp float;

uniform float uTime;

varying vec2 vUv;
void main(){
    vec3 col = mix(vec3(0.8), vec3(1.0), cos( distance(vUv, vec2(0.5)) * 10. -uTime ) * 0.5 + 0.5 );
    gl_FragColor = vec4(col, 1.0);
}