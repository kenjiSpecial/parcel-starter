attribute vec4 a_position;
uniform float uTheta;

void main() {
    gl_Position = a_position + vec4(0.0 * cos(uTheta), 0.0 * sin(uTheta), 0.0, 0.0);
}