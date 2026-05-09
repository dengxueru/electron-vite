
import { Vue, Component } from "vue-property-decorator";

import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

import "./index.css";

@Component
export default class App extends Vue {
  videoEl: HTMLVideoElement | null = null;

  canvasEl: HTMLCanvasElement | null = null;

  ctx: CanvasRenderingContext2D | null = null;

  faceLandmarker: FaceLandmarker | null = null;

  async mounted() {
    this.videoEl = document.getElementById(
      "video"
    ) as HTMLVideoElement;

    this.canvasEl = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;

    this.ctx = this.canvasEl.getContext("2d");

    await this.init();
  }

  async init() {
    if (!this.videoEl || !this.canvasEl) return;

    // 摄像头
    const stream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
      });

    this.videoEl.srcObject = stream;

    await this.videoEl.play();

    // 初始化 canvas
    this.canvasEl.width = this.videoEl.videoWidth;

    this.canvasEl.height = this.videoEl.videoHeight;

    // mediapipe wasm
    const vision =
      await FilesetResolver.forVisionTasks(
        "./wasm"
      );

    // 创建 FaceLandmarker
    this.faceLandmarker =
      await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "./face_landmarker.task",
          },

          runningMode: "VIDEO",

          numFaces: 1,

          outputFaceBlendshapes: true,

          outputFacialTransformationMatrixes:
            true,
        }
      );

    this.detect();
  }

  /**
   * 获取 blendshape 分数
   */
  getBlendshapeScore(
    result: any,
    name: string
  ) {
    const categories =
      result.faceBlendshapes?.[0]?.categories ||
      [];

    const item = categories.find(
      (v: any) => v.categoryName === name
    );

    return item?.score || 0;
  }

  /**
   * 检测眨眼
   */
  checkBlink(result: any) {
    const left = this.getBlendshapeScore(
      result,
      "eyeBlinkLeft"
    );

    const right = this.getBlendshapeScore(
      result,
      "eyeBlinkRight"
    );

    console.log("眨眼分数:", left, right);

    if (left > 0.5 && right > 0.5) {
      console.log("检测到眨眼");

      return true;
    }

    return false;
  }

  /**
   * 检测张嘴
   */
  checkMouthOpen(result: any) {
    const jawOpen = this.getBlendshapeScore(
      result,
      "jawOpen"
    );

    console.log("张嘴分数:", jawOpen);

    if (jawOpen > 0.5) {
      console.log("检测到张嘴");

      return true;
    }

    return false;
  }

  detect() {
    if (
      !this.videoEl ||
      !this.canvasEl ||
      !this.ctx ||
      !this.faceLandmarker
    ) {
      return;
    }

    // 清空画布
    this.ctx.clearRect(
      0,
      0,
      this.canvasEl.width,
      this.canvasEl.height
    );

    // 镜像绘制视频
    this.ctx.save();

    this.ctx.scale(-1, 1);

    this.ctx.drawImage(
      this.videoEl,
      -this.canvasEl.width,
      0,
      this.canvasEl.width,
      this.canvasEl.height
    );

    this.ctx.restore();

    // 检测
    const result =
      this.faceLandmarker.detectForVideo(
        this.videoEl,
        performance.now()
      );

    // 检测到人脸
    if (result.faceLandmarks.length > 0) {
      console.log("检测到人脸");

      // ======================
      // 眨眼
      // ======================

      const isBlink =
        this.checkBlink(result);

      if (isBlink) {
        console.log("用户正在眨眼");
      }

      // ======================
      // 张嘴
      // ======================

      const isMouthOpen =
        this.checkMouthOpen(result);

      if (isMouthOpen) {
        console.log("用户正在张嘴");
      }

      // ======================
      // 点头 / 摇头
      // ======================

      const matrix =
        result
          .facialTransformationMatrixes?.[0];

      if (matrix) {
        const data = matrix.data;

        // yaw
        const yaw =
          (Math.atan2(data[8], data[10]) *
            180) /
          Math.PI;

        // pitch
        const pitch =
          (Math.atan2(
            -data[9],
            Math.sqrt(
              data[8] * data[8] +
                data[10] * data[10]
            )
          ) *
            180) /
          Math.PI;

        console.log("yaw:", yaw);

        console.log("pitch:", pitch);

        // 左右摇头
        if (yaw > 15) {
          console.log("向右");
        }

        if (yaw < -15) {
          console.log("向左");
        }

        // 上下点头
        if (pitch > 10) {
          console.log("低头");
        }

        if (pitch < -10) {
          console.log("抬头");
        }
      }

      // ======================
      // 绘制关键点
      // ======================

      result.faceLandmarks[0].forEach(
        (point) => {
          if (
            !this.canvasEl ||
            !this.ctx
          )
            return;

          this.ctx.beginPath();

          this.ctx.arc(
            (1 - point.x) *
              this.canvasEl.width,
            point.y *
              this.canvasEl.height,
            1,
            0,
            2 * Math.PI
          );

          this.ctx.fillStyle = "red";

          this.ctx.fill();
        }
      );
    } else {
      console.log("no face detected");
    }

    requestAnimationFrame(() =>
      this.detect()
    );
  }

  beforeDestroy() {
    const stream =
      this.videoEl?.srcObject as MediaStream;

    stream
      ?.getTracks()
      .forEach((track) => {
        track.stop();
      });
  }

  render() {
    return (
      <div class="page">
        <video
          id="video"
          autoplay={true}
          playsinline={true}
          muted={true}
        ></video>

        <canvas
          id="canvas"
          style="width: 640px;"
        ></canvas>
      </div>
    );
  }
}

