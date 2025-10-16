import { Vue, Component, Prop } from "vue-property-decorator";
import Child from "./Child";
import wfc from '@/wfc/client/wfc.js';

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
    wfc.init()
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
