precision mediump float;

void main() {
    float colorR = gl_FrontFacing ? 1.0 : 0.0;
    float colorG = gl_FrontFacing ? 0.0 : 1.0;

    gl_FragColor = vec4(colorR, colorG, 0.0, 1.0);
}  