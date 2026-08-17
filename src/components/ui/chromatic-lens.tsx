import React, { useRef, useEffect, useState, useCallback } from "react";
import type { CSSProperties } from "react";

// --- Helper Functions (Unchanged) ---
// ... (lerp, lerpVec2, createShader, createProgram, parseColor functions remain here) ...
// Helper Lerp function
function lerp(start: number, end: number, amount: number): number {
    const clampedAmount = Math.max(0, Math.min(1, amount));
    return start + (end - start) * clampedAmount;
}

// Helper Vec2 Lerp
function lerpVec2(
    start: { x: number; y: number },
    end: { x: number; y: number },
    amount: number
): { x: number; y: number } {
    const clampedAmount = Math.max(0, Math.min(1, amount));
    return {
        x: lerp(start.x, end.x, clampedAmount),
        y: lerp(start.y, end.y, clampedAmount),
    };
}

// Helper function to compile shaders
function createShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    }
    console.error("WebGL Shader Compile Error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
}

// Helper function to create shader program
function createProgram(
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
): WebGLProgram | null {
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return program;
    }
    console.error("WebGL Program Link Error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
}

// Helper function to parse color string
function parseColor(colorString: string): [number, number, number] {
    if (!colorString) return [0, 0, 0];
    if (colorString.startsWith("#")) {
        let hex = colorString.slice(1);
        if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
        if (hex.length === 6) {
            const bigint = parseInt(hex, 16);
            const r = ((bigint >> 16) & 255) / 255;
            const g = ((bigint >> 8) & 255) / 255;
            const b = (bigint & 255) / 255;
            return [r, g, b];
        }
    }
    const rgbaMatch = colorString.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1], 10) / 255;
        const g = parseInt(rgbaMatch[2], 10) / 255;
        const b = parseInt(rgbaMatch[3], 10) / 255;
        return [r, g, b];
    }
    console.warn("Could not parse color string:", colorString, "Defaulting to black.");
    return [0, 0, 0];
}


// --- Shaders (Unchanged) ---
// ... (vertexShaderSource and fragmentShaderSource remain here) ...
const vertexShaderSource = `
  attribute vec4 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = a_position;
    v_texCoord = a_texCoord;
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_mousePosition;
  uniform float u_aberrationStrength;
  uniform float u_radius;
  uniform float u_lensStrength;
  uniform bool u_usePixelSize;
  uniform vec2 u_lensPixelSize;
  uniform float u_time;
  uniform bool u_enableSwirl;
  uniform float u_swirlStrength;
  uniform bool u_enableWobble;
  uniform float u_wobbleStrength;
  uniform float u_wobbleSpeed;
  uniform float u_wobbleFrequency;
  uniform int u_distortionMode;
  uniform float u_fisheyeStrength;
  uniform bool u_enableTint;
  uniform vec3 u_tintColor;
  uniform float u_tintIntensity;
  uniform bool u_enableDrag;
  uniform vec2 u_dragOffset;
  uniform int u_aberrationMode;
  uniform float u_aberrationBlur;
  uniform bool u_lensOnly;
  varying vec2 v_texCoord;

  float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }
  float valueNoise(vec2 uv) { vec2 i = floor(uv); vec2 f = fract(uv); f = f * f * (3.0 - 2.0 * f); float bl = rand(i); float br = rand(i + vec2(1.0, 0.0)); float tl = rand(i + vec2(0.0, 1.0)); float tr = rand(i + vec2(1.0, 1.0)); return mix(mix(bl, br, f.x), mix(tl, tr, f.x), f.y); }
  vec2 rotate(vec2 v, float a) { float s = sin(a); float c = cos(a); mat2 m = mat2(c, -s, s, c); return m * v; }
  vec2 fisheyeDistortion(vec2 uv_center_diff, float strength) { float dist = max(length(uv_center_diff), 0.001); float max_strength_atan = atan(strength); if (max_strength_atan == 0.0) return vec2(0.0); float new_dist = atan(dist * strength) / max_strength_atan; return uv_center_diff * (1.0 - new_dist / dist); }

  void main() {
      vec2 st = v_texCoord;
      vec2 mouse = u_mousePosition;
      vec2 pixel_diff_orig = (st - mouse) * u_resolution;
      bool isInEffect = false;
      float distNorm = 0.0;
      vec2 pixelDir = vec2(0.0);
      if (u_usePixelSize) { vec2 lensSemiAxes = u_lensPixelSize / 2.0; if (lensSemiAxes.x > 0.0 && lensSemiAxes.y > 0.0) { vec2 norm_diff = pixel_diff_orig / lensSemiAxes; float dist_sq = dot(norm_diff, norm_diff); if (dist_sq < 1.0) { isInEffect = true; distNorm = sqrt(dist_sq); pixelDir = normalize(pixel_diff_orig + 1e-6); } }
      } else { float dist_pixels = length(pixel_diff_orig); float min_dim = min(u_resolution.x, u_resolution.y); float radius_pixels = u_radius * min_dim; if (dist_pixels < radius_pixels && radius_pixels > 0.0) { isInEffect = true; distNorm = clamp(dist_pixels / radius_pixels, 0.0, 1.0); pixelDir = normalize(pixel_diff_orig + 1e-6); } }

      vec4 finalColor;
      if (isInEffect) {
          vec2 effectUV = st;
          if (u_enableDrag) { effectUV += u_dragOffset; }
          vec2 uv_from_mouse = effectUV - mouse;
          vec2 distortionOffset = vec2(0.0);
          vec2 distortionPixelDir = pixelDir;
          if (u_distortionMode == 1) { distortionOffset = fisheyeDistortion(uv_from_mouse, u_fisheyeStrength); }
          else { float displacementFactor = pow(distNorm, 6.0); float effective_radius_pixels; if (u_usePixelSize) { effective_radius_pixels = min(u_lensPixelSize.x, u_lensPixelSize.y) / 2.0; } else { effective_radius_pixels = u_radius * min(u_resolution.x, u_resolution.y); } effective_radius_pixels = max(effective_radius_pixels, 1.0); float offsetMagnitudePixels = displacementFactor * u_lensStrength * effective_radius_pixels * 0.4; vec2 pixelOffset = pixelDir * offsetMagnitudePixels; distortionOffset = pixelOffset / u_resolution; distortionPixelDir = pixelDir; }
          effectUV -= distortionOffset;
          if (u_enableSwirl) { vec2 center_diff = effectUV - mouse; float swirlAngle = distNorm * u_swirlStrength * 5.0; vec2 rotated_diff = rotate(center_diff, swirlAngle); effectUV = mouse + rotated_diff; }
          if (u_enableWobble) { float noiseTime = u_time * u_wobbleSpeed; float noiseX = (valueNoise(effectUV * u_wobbleFrequency + vec2(noiseTime, 0.0)) - 0.5) * 2.0; float noiseY = (valueNoise(effectUV * u_wobbleFrequency + vec2(0.0, noiseTime)) - 0.5) * 2.0; vec2 wobbleOffset = vec2(noiseX, noiseY) * u_wobbleStrength * 0.01; effectUV += wobbleOffset; }
          vec2 finalSampleUV = clamp(effectUV, 0.0, 1.0);
          float aberrationFalloff = smoothstep(1.0, 0.85, distNorm);
          vec2 aberrationDir;
          if (u_aberrationMode == 1) { aberrationDir = normalize(pixel_diff_orig + 1e-6); } else { aberrationDir = distortionPixelDir; }
          float basePixelAberrationMag = u_aberrationStrength * aberrationFalloff * 1.5;
          vec2 baseUvAberrationOffset = (aberrationDir * basePixelAberrationMag) / u_resolution;
          float r, g, b;
          g = texture2D(u_texture, finalSampleUV).g;
          if (u_aberrationBlur > 0.5) { vec2 blurTapOffset = normalize(baseUvAberrationOffset) * (u_aberrationBlur / u_resolution.y) * 0.5; float r1 = texture2D(u_texture, clamp(finalSampleUV + baseUvAberrationOffset - blurTapOffset, 0.0, 1.0)).r; float r2 = texture2D(u_texture, clamp(finalSampleUV + baseUvAberrationOffset, 0.0, 1.0)).r; float r3 = texture2D(u_texture, clamp(finalSampleUV + baseUvAberrationOffset + blurTapOffset, 0.0, 1.0)).r; r = (r1 + r2 * 2.0 + r3) * 0.25; float b1 = texture2D(u_texture, clamp(finalSampleUV - baseUvAberrationOffset - blurTapOffset, 0.0, 1.0)).b; float b2 = texture2D(u_texture, clamp(finalSampleUV - baseUvAberrationOffset, 0.0, 1.0)).b; float b3 = texture2D(u_texture, clamp(finalSampleUV - baseUvAberrationOffset + blurTapOffset, 0.0, 1.0)).b; b = (b1 + b2 * 2.0 + b3) * 0.25;
          } else { r = texture2D(u_texture, clamp(finalSampleUV + baseUvAberrationOffset, 0.0, 1.0)).r; b = texture2D(u_texture, clamp(finalSampleUV - baseUvAberrationOffset, 0.0, 1.0)).b; }
          vec3 aberratedColor = vec3(r, g, b);
          if (u_enableTint) { aberratedColor = mix(aberratedColor, u_tintColor.rgb, u_tintIntensity); }
          finalColor = vec4(aberratedColor, 1.0);
      } else { finalColor = u_lensOnly ? vec4(0.0) : texture2D(u_texture, st); }
      gl_FragColor = finalColor;
  }
`;


// --- Component Definition ---

// Props Interface (Unchanged)
interface Props {
    image: { src: string };
    aberrationStrength: number;
    aberrationMode: "linear" | "radial";
    aberrationBlur: number;
    lensStrength: number;
    distortionMode: "edge_pinch" | "fisheye";
    fisheyeStrength: number;
    radius: number;
    usePixelSize: boolean;
    lensWidthPixels: number;
    lensHeightPixels: number;
    followSmoothness: number;
    cursorStyle: string;
    enableSwirl: boolean;
    swirlStrength: number;
    enableWobble: boolean;
    wobbleStrength: number;
    wobbleSpeed: number;
    wobbleFrequency: number;
    enableTint: boolean;
    tintColor: string;
    tintIntensity: number;
    enableDrag: boolean;
    dragStrength: number;
    dragDecay: number;
    style?: CSSProperties;
    width: number | string;
    height: number | string;
    lensOnly: boolean;
}

const defaultLensProps: Omit<Props, "image" | "style"> = {
    aberrationStrength: 0.5,
    aberrationMode: "linear",
    aberrationBlur: 0,
    radius: 0.25,
    usePixelSize: false,
    lensWidthPixels: 150,
    lensHeightPixels: 150,
    lensStrength: 1.4,
    followSmoothness: 8,
    cursorStyle: "crosshair",
    width: "100%",
    height: "100%",
    enableSwirl: false,
    swirlStrength: 0.5,
    enableWobble: true,
    wobbleStrength: 0.6,
    wobbleSpeed: 3,
    wobbleFrequency: 6,
    distortionMode: "edge_pinch",
    fisheyeStrength: 4,
    enableTint: false,
    tintColor: "#0071E3",
    tintIntensity: 0.18,
    enableDrag: false,
    dragStrength: 1,
    dragDecay: 0.95,
    lensOnly: false,
};

export type ChromaticLensProps = Partial<Omit<Props, "image">> & {
    image: { src: string };
};

export function ChromaticLensEffect(raw: ChromaticLensProps) {
    const props = { ...defaultLensProps, ...raw };
     const {
        image, aberrationStrength, aberrationMode, aberrationBlur, radius, usePixelSize,
        lensWidthPixels, lensHeightPixels, lensStrength, followSmoothness, cursorStyle,
        enableSwirl, swirlStrength, enableWobble, wobbleStrength, wobbleSpeed,
        wobbleFrequency, distortionMode, fisheyeStrength, enableTint, tintColor,
        tintIntensity, enableDrag, dragStrength, dragDecay, style, width, height, lensOnly,
    } = props;

    // --- Refs, State, Hooks, Callbacks (Keep all internal logic) ---
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);
    const textureRef = useRef<WebGLTexture | null>(null);
    const positionBufferRef = useRef<WebGLBuffer | null>(null);
    const texCoordBufferRef = useRef<WebGLBuffer | null>(null);
    const animationFrameRef = useRef<number>(0);
    const lastFrameTimeRef = useRef<number>(0);
    const timeRef = useRef<number>(0);
    const targetMousePositionRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
    const animatedMousePositionRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
    const mouseInsideRef = useRef<boolean>(false);
    const isAnimatingRef = useRef<boolean>(true);
    const isDraggingRef = useRef<boolean>(false);
    const dragStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const dragCurrentPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [observedSize, setObservedSize] = useState({ width: 0, height: 0 });
    const [canvasPhysicalSize, setCanvasPhysicalSize] = useState({ width: 0, height: 0 });

    // WebGL Initialization useEffect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl", { antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: "default" });
        if (!gl) { console.error("WebGL not supported"); return; }
        glRef.current = gl;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;
        const program = createProgram(gl, vertexShader, fragmentShader);
        if (!program) return;
        programRef.current = program;
        positionBufferRef.current = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferRef.current);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
        texCoordBufferRef.current = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBufferRef.current);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
        textureRef.current = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        const locations = {
            positionLocation: gl.getAttribLocation(program, "a_position"),
            texCoordLocation: gl.getAttribLocation(program, "a_texCoord"),
            resolutionLocation: gl.getUniformLocation(program, "u_resolution"),
            mousePositionLocation: gl.getUniformLocation(program, "u_mousePosition"),
            aberrationStrengthLocation: gl.getUniformLocation(program, "u_aberrationStrength"),
            radiusLocation: gl.getUniformLocation(program, "u_radius"),
            lensStrengthLocation: gl.getUniformLocation(program, "u_lensStrength"),
            textureLocation: gl.getUniformLocation(program, "u_texture"),
            usePixelSizeLocation: gl.getUniformLocation(program, "u_usePixelSize"),
            lensPixelSizeLocation: gl.getUniformLocation(program, "u_lensPixelSize"),
            timeLocation: gl.getUniformLocation(program, "u_time"),
            enableSwirlLocation: gl.getUniformLocation(program, "u_enableSwirl"),
            swirlStrengthLocation: gl.getUniformLocation(program, "u_swirlStrength"),
            enableWobbleLocation: gl.getUniformLocation(program, "u_enableWobble"),
            wobbleStrengthLocation: gl.getUniformLocation(program, "u_wobbleStrength"),
            wobbleSpeedLocation: gl.getUniformLocation(program, "u_wobbleSpeed"),
            wobbleFrequencyLocation: gl.getUniformLocation(program, "u_wobbleFrequency"),
            distortionModeLocation: gl.getUniformLocation(program, "u_distortionMode"),
            fisheyeStrengthLocation: gl.getUniformLocation(program, "u_fisheyeStrength"),
            enableTintLocation: gl.getUniformLocation(program, "u_enableTint"),
            tintColorLocation: gl.getUniformLocation(program, "u_tintColor"),
            tintIntensityLocation: gl.getUniformLocation(program, "u_tintIntensity"),
            enableDragLocation: gl.getUniformLocation(program, "u_enableDrag"),
            dragOffsetLocation: gl.getUniformLocation(program, "u_dragOffset"),
            aberrationModeLocation: gl.getUniformLocation(program, "u_aberrationMode"),
            aberrationBlurLocation: gl.getUniformLocation(program, "u_aberrationBlur"),
            lensOnlyLocation: gl.getUniformLocation(program, "u_lensOnly"),
        };
        (program as any).locations = locations;
        gl.useProgram(program);
        gl.uniform1i(locations.textureLocation, 0);
    }, []);

    // Image Loading useEffect
    useEffect(() => {
        const gl = glRef.current; const texture = textureRef.current;
        if (!gl || !texture || !image?.src) {
            setIsImageLoaded(false);
            if (gl && texture) { gl.bindTexture(gl.TEXTURE_2D, texture); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0])); } return;
        }
        setIsImageLoaded(false); const img = new Image();
        if (/^https?:/i.test(image.src)) img.crossOrigin = "anonymous";
        img.onload = () => {
            if (!gl || !texture) return;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            setIsImageLoaded(true); targetMousePositionRef.current = { x: 0.5, y: 0.5 }; animatedMousePositionRef.current = { x: 0.5, y: 0.5 }; mouseInsideRef.current = false; isAnimatingRef.current = true; dragOffsetRef.current = { x: 0, y: 0 };
        };
        img.onerror = (e) => { console.error("Error loading image:", e); setIsImageLoaded(false); if (gl && texture) { gl.bindTexture(gl.TEXTURE_2D, texture); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0])); } };
        img.src = image.src;
    }, [image?.src]);

    // Container Size Observation useEffect
    useEffect(() => {
        const element = containerRef.current; if (!element) return;
        const applySize = (width: number, height: number) => {
            if (width < 1 || height < 1) return;
            setObservedSize((prevSize) => {
                if (prevSize.width !== width || prevSize.height !== height) {
                    return { width, height };
                }
                return prevSize;
            });
        };
        const measure = () => {
            const rect = element.getBoundingClientRect();
            applySize(rect.width, rect.height);
        };
        measure();
        const observerCallback = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (width >= 1 && height >= 1) applySize(width, height);
                else measure();
            }
        };
        const resizeObserver = new ResizeObserver(observerCallback);
        resizeObserver.observe(element);
        window.addEventListener("resize", measure);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);

    // Canvas Resizing useEffect
    useEffect(() => {
        const canvas = canvasRef.current; const gl = glRef.current; if (!canvas || !gl || observedSize.width === 0 || observedSize.height === 0) { return; }
        const dpr = window.devicePixelRatio || 1; const targetWidth = Math.round(observedSize.width * dpr); const targetHeight = Math.round(observedSize.height * dpr);
        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
        setCanvasPhysicalSize({ width: gl.drawingBufferWidth, height: gl.drawingBufferHeight });
    }, [observedSize]);

    // Animation Loop Callback
    const renderLoopCallback = useCallback((currentTime: number) => {
        const gl = glRef.current; const program = programRef.current; const locations = (program as any)?.locations; const texture = textureRef.current; const posBuffer = positionBufferRef.current; const texBuffer = texCoordBufferRef.current; const canvas = canvasRef.current;
        if (!gl || !program || !locations || !texture || !posBuffer || !texBuffer || !canvas || !isImageLoaded || canvasPhysicalSize.width === 0) { if (isAnimatingRef.current) { animationFrameRef.current = requestAnimationFrame(renderLoopCallback); } else { animationFrameRef.current = 0; } return; }
        const deltaTime = Math.min(0.05, (currentTime - lastFrameTimeRef.current) / 1000.0); lastFrameTimeRef.current = currentTime; timeRef.current += deltaTime;
        const needsLerp = Math.abs(animatedMousePositionRef.current.x - targetMousePositionRef.current.x) > 0.0001 || Math.abs(animatedMousePositionRef.current.y - targetMousePositionRef.current.y) > 0.0001;
        if (needsLerp && followSmoothness > 0) { const lerpAmount = 1.0 - Math.exp(-deltaTime * followSmoothness); animatedMousePositionRef.current = lerpVec2(animatedMousePositionRef.current, targetMousePositionRef.current, lerpAmount); if (Math.abs(animatedMousePositionRef.current.x - targetMousePositionRef.current.x) < 0.0001 && Math.abs(animatedMousePositionRef.current.y - targetMousePositionRef.current.y) < 0.0001) { animatedMousePositionRef.current = targetMousePositionRef.current; } } else { animatedMousePositionRef.current = targetMousePositionRef.current; }
        if (enableDrag) { if (isDraggingRef.current) { let deltaX = dragCurrentPosRef.current.x - dragStartPosRef.current.x; let deltaY = dragCurrentPosRef.current.y - dragStartPosRef.current.y; dragOffsetRef.current.x += deltaX * dragStrength * 0.1; dragOffsetRef.current.y += deltaY * dragStrength * 0.1; dragStartPosRef.current = { ...dragCurrentPosRef.current }; } else { const decayFactor = Math.pow(Math.max(0, Math.min(1, dragDecay)), deltaTime * 60.0); dragOffsetRef.current.x *= decayFactor; dragOffsetRef.current.y *= decayFactor; if (Math.abs(dragOffsetRef.current.x) < 0.0001) dragOffsetRef.current.x = 0; if (Math.abs(dragOffsetRef.current.y) < 0.0001) dragOffsetRef.current.y = 0; } } else { dragOffsetRef.current = { x: 0, y: 0 }; }
        gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer); gl.enableVertexAttribArray(locations.positionLocation); gl.vertexAttribPointer(locations.positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer); gl.enableVertexAttribArray(locations.texCoordLocation); gl.vertexAttribPointer(locations.texCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texture);
        const dpr = window.devicePixelRatio || 1;
        const activeRadius = mouseInsideRef.current ? radius : 0;
        const activeStrength = mouseInsideRef.current ? lensStrength : 0;
        const activePixelW = mouseInsideRef.current ? lensWidthPixels * dpr : 0;
        const activePixelH = mouseInsideRef.current ? lensHeightPixels * dpr : 0;
        gl.uniform2f(locations.resolutionLocation, canvas.width, canvas.height); gl.uniform2f(locations.mousePositionLocation, animatedMousePositionRef.current.x, 1.0 - animatedMousePositionRef.current.y); gl.uniform1f(locations.aberrationStrengthLocation, aberrationStrength); gl.uniform1f(locations.radiusLocation, activeRadius); gl.uniform1f(locations.lensStrengthLocation, activeStrength); gl.uniform1i(locations.textureLocation, 0); gl.uniform1i(locations.usePixelSizeLocation, usePixelSize ? 1 : 0); gl.uniform2f(locations.lensPixelSizeLocation, activePixelW, activePixelH); gl.uniform1f(locations.timeLocation, timeRef.current); gl.uniform1i(locations.enableSwirlLocation, enableSwirl ? 1 : 0); gl.uniform1f(locations.swirlStrengthLocation, swirlStrength); gl.uniform1i(locations.enableWobbleLocation, enableWobble ? 1 : 0); gl.uniform1f(locations.wobbleStrengthLocation, wobbleStrength); gl.uniform1f(locations.wobbleSpeedLocation, wobbleSpeed); gl.uniform1f(locations.wobbleFrequencyLocation, wobbleFrequency); gl.uniform1i(locations.distortionModeLocation, distortionMode === "fisheye" ? 1 : 0); gl.uniform1f(locations.fisheyeStrengthLocation, fisheyeStrength); gl.uniform1i(locations.enableTintLocation, enableTint ? 1 : 0); const colorVec = parseColor(tintColor); gl.uniform3f(locations.tintColorLocation, colorVec[0], colorVec[1], colorVec[2]); gl.uniform1f(locations.tintIntensityLocation, tintIntensity); gl.uniform1i(locations.enableDragLocation, enableDrag ? 1 : 0); gl.uniform2f(locations.dragOffsetLocation, dragOffsetRef.current.x, dragOffsetRef.current.y);         gl.uniform1i(locations.aberrationModeLocation, aberrationMode === "radial" ? 1 : 0); gl.uniform1f(locations.aberrationBlurLocation, aberrationBlur * dpr); gl.uniform1i(locations.lensOnlyLocation, lensOnly ? 1 : 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        const needsWobble = enableWobble && wobbleStrength > 0; const needsDragDecay = enableDrag && (dragOffsetRef.current.x !== 0 || dragOffsetRef.current.y !== 0); const keepAnimating = mouseInsideRef.current || needsLerp || needsWobble || needsDragDecay;
        if (keepAnimating) { isAnimatingRef.current = true; animationFrameRef.current = requestAnimationFrame(renderLoopCallback); } else { isAnimatingRef.current = false; animationFrameRef.current = 0; }
    }, [isImageLoaded, aberrationStrength, radius, lensStrength, followSmoothness, usePixelSize, lensWidthPixels, lensHeightPixels, canvasPhysicalSize, enableSwirl, swirlStrength, enableWobble, wobbleStrength, wobbleSpeed, wobbleFrequency, distortionMode, fisheyeStrength, enableTint, tintColor, tintIntensity, enableDrag, dragStrength, dragDecay, aberrationMode, aberrationBlur, lensOnly]);

    // Ensure Animation Starts/Restarts Callback
    const ensureAnimating = useCallback(() => {
        const needsWobble = enableWobble && wobbleStrength > 0; const needsDragDecay = enableDrag && (dragOffsetRef.current.x !== 0 || dragOffsetRef.current.y !== 0);
        if (!isAnimatingRef.current && glRef.current && isImageLoaded && (mouseInsideRef.current || needsWobble || needsDragDecay)) { isAnimatingRef.current = true; lastFrameTimeRef.current = performance.now(); if (!animationFrameRef.current) { animationFrameRef.current = requestAnimationFrame(renderLoopCallback); } }
    }, [renderLoopCallback, isImageLoaded, enableWobble, wobbleStrength, enableDrag]);

    // Mouse Event Handlers
    const getUVFromEvent = (event: React.MouseEvent<HTMLDivElement>): { x: number; y: number } => { const canvas = canvasRef.current; if (!canvas) return { x: 0, y: 0 }; const rect = canvas.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height; return { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) }; };
    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => { if (!enableDrag) return; isDraggingRef.current = true; const currentUV = getUVFromEvent(event); dragStartPosRef.current = currentUV; dragCurrentPosRef.current = currentUV; ensureAnimating(); }, [enableDrag, ensureAnimating]);
    const handleMouseUp = useCallback(() => { if (!enableDrag || !isDraggingRef.current) return; isDraggingRef.current = false; ensureAnimating(); }, [enableDrag, ensureAnimating]);
    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => { const currentUV = getUVFromEvent(event); targetMousePositionRef.current = currentUV; if (enableDrag && isDraggingRef.current) { dragCurrentPosRef.current = currentUV; } mouseInsideRef.current = true; ensureAnimating(); }, [enableDrag, ensureAnimating]);
    const handleMouseLeave = useCallback(() => { mouseInsideRef.current = false; targetMousePositionRef.current = { x: 0.5, y: 0.5 }; if (isDraggingRef.current) { isDraggingRef.current = false; } ensureAnimating(); }, [ensureAnimating]);

    // Animation Loop Start/Cleanup useEffect
    useEffect(() => {
        if (isImageLoaded && glRef.current && programRef.current && canvasPhysicalSize.width > 0) { ensureAnimating(); }
        return () => { isAnimatingRef.current = false; if (animationFrameRef.current) { cancelAnimationFrame(animationFrameRef.current); } animationFrameRef.current = 0; };
    }, [isImageLoaded, ensureAnimating, canvasPhysicalSize]);

    // --- Component Rendering ---
    return (
        <div
            ref={containerRef}
            style={{ ...style, width: width, height: height, cursor: cursorStyle, overflow: "hidden", position: style?.position ?? "relative" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <canvas
                ref={canvasRef}
                style={{ display: "block", width: "100%", height: "100%", opacity: isImageLoaded ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
            />
            {!isImageLoaded && image?.src && !lensOnly && (
                 <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', background: 'rgba(255,255,255,0.1)', fontSize: '12px', pointerEvents: 'none' }}>Loading...</div>
             )}
        </div>
    );
}

export { ChromaticLensEffect as ChromaticLens };