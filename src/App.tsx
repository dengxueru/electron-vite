import * as THREE from "three";
import { Vue, Component } from "vue-property-decorator";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

@Component
export default class App extends Vue {
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private controls: OrbitControls | null = null;
  private model: THREE.Object3D | null = null;
  private frameId = 0;
  private frameCount = 0;
  private readonly loader = new GLTFLoader();
  private readonly onResize = () => this.resize();

  status = "初始化中";
  detail = "";
  ready = false;

  mounted() {
    this.$nextTick(() => {
      if (this.initScene()) {
        this.loadUrl("/models/ABeautifulGame.glb");
      }
    });
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    window.cancelAnimationFrame(this.frameId);
    this.controls?.dispose();
    this.disposeModel();
    this.renderer?.dispose();
  }

  private initScene() {
    const host = this.$refs.viewer as HTMLDivElement | undefined;
    if (!host) {
      this.status = "找不到 viewer 容器";
      return false;
    }

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      this.status = "WebGL 不可用，无法渲染 GLB";
      this.detail = "模型已能读取，但当前运行环境没有可用 WebGL context";
      return false;
    }

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdde7f3);

    this.camera = new THREE.PerspectiveCamera(55, 1, 0.01, 2000);
    this.camera.position.set(3, 2, 4);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.className = "viewer-canvas";
    host.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x738299, 1.5));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(4, 6, 5);
    this.scene.add(sun);

    const grid = new THREE.GridHelper(8, 16, 0x334155, 0x94a3b8);
    const axes = new THREE.AxesHelper(1.4);
    this.scene.add(grid, axes);

    this.ready = true;
    this.status = "WebGL 初始化成功";
    this.resize();
    window.addEventListener("resize", this.onResize);
    this.renderFrame();
    this.animate();
    return true;
  }

  private animate = () => {
    this.frameId = window.requestAnimationFrame(this.animate);
    this.controls?.update();
    this.renderFrame();
  };

  private renderFrame() {
    if (!this.renderer || !this.scene || !this.camera) {
      return;
    }
    this.renderer.render(this.scene, this.camera);
    this.frameCount += 1;
  }

  private rendererStats() {
    const canvas = this.renderer?.domElement;
    if (!canvas) {
      return "canvas=none";
    }
    return `canvas=${canvas.width}x${canvas.height}, css=${canvas.clientWidth}x${canvas.clientHeight}, frames=${this.frameCount}`;
  }

  private resize() {
    const host = this.$refs.viewer as HTMLDivElement | undefined;
    if (!host || !this.renderer || !this.camera) {
      return;
    }
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private disposeModel() {
    if (!this.scene || !this.model) {
      return;
    }
    this.scene.remove(this.model);
    this.model.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      mesh.geometry?.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => material.dispose());
      } else {
        mesh.material?.dispose();
      }
    });
    this.model = null;
  }

  private showModel(object: THREE.Object3D, source: string) {
    if (!this.scene || !this.camera || !this.controls) {
      return;
    }

    this.disposeModel();
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);

    const radius = Math.max(size.length() / 2, 0.5);
    this.camera.position.set(radius * 1.8, radius * 1.2, radius * 1.8);
    this.camera.near = Math.max(0.01, radius / 100);
    this.camera.far = Math.max(1000, radius * 100);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    let meshCount = 0;
    object.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) {
        return;
      }
      meshCount += 1;
      mesh.frustumCulled = false;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.filter(Boolean).forEach((material) => {
        material.side = THREE.DoubleSide;
        material.needsUpdate = true;
      });
    });

    this.model = object;
    this.scene.add(object);
    this.resize();
    this.renderFrame();
    this.status = `模型加载成功：${source}`;
    this.detail = `mesh=${meshCount}, bbox=${size.x.toFixed(3)} x ${size.y.toFixed(3)} x ${size.z.toFixed(3)}, ${this.rendererStats()}`;
  }

  private loadUrl(url: string) {
    if (!this.ready) {
      return;
    }
    this.status = `正在加载 ${url}`;
    this.loader.load(
      url,
      (gltf) => this.showModel(gltf.scene, url),
      undefined,
      (error) => {
        const message = error instanceof Error ? error.message : String(error);
        this.status = "模型加载失败";
        this.detail = message;
      }
    );
  }

  private openLocalFile() {
    (this.$refs.fileInput as HTMLInputElement | undefined)?.click();
  }

  private onLocalFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    this.status = `正在读取 ${file.name}`;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      if (!(data instanceof ArrayBuffer)) {
        this.status = "文件读取失败";
        return;
      }
      this.loader.parse(
        data,
        "",
        (gltf) => this.showModel(gltf.scene, file.name),
        (error) => {
          const message = error instanceof Error ? error.message : String(error);
          this.status = "本地模型解析失败";
          this.detail = message;
        }
      );
    };
    reader.readAsArrayBuffer(file);
  }

  render() {
    return (
      <div class="app">
        <div class="toolbar">
          <button disabled={!this.ready} onClick={() => this.loadUrl("/ABeautifulGame.glb")}>
            加载默认 GLB
          </button>
          <button disabled={!this.ready} onClick={() => this.openLocalFile()}>
            打开本地 GLB
          </button>
          <span class="status">{this.status}</span>
          <span class="status">{this.detail}</span>
          <input
            ref="fileInput"
            class="hidden-input"
            type="file"
            accept=".glb"
            onChange={(event: Event) => this.onLocalFileSelected(event)}
          />
        </div>
        <div ref="viewer" class="viewer" />
      </div>
    );
  }
}
