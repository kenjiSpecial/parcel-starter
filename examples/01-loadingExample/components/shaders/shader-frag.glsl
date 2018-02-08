precision mediump float;

varying vec3 vNormal;

void main(){
    vec3 normal = normalize(vNormal);
    gl_FragColor = vec4(normal/2. + vec3(0.5), 1.0);
}