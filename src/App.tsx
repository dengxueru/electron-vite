import { Vue, Component, Prop } from "vue-property-decorator";
import Child from "./Child";

@Component({
  components: { Child },
})
export default class App extends Vue {
  title: string = "Hello World";

  renderPage() {
    return (
      <div
        onClick={() => {
          this.onClick();
        }}
      >
        render-page
      </div>
    );
  }

  onClick() {
    window.ipcRenderer.send("toMainProcess", { name: "insert" });
  }

  render() {
    return (
      <div>
        <Child name="我是子组件" />
        {this.title}
        {this.renderPage()}
      </div>
    );
  }
}
