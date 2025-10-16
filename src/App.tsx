import { Vue, Component, Prop } from "vue-property-decorator";
import Child from "./Child";
import wf from './wfc/client/wfc.js'



@Component({
  components: { Child },
})
export default class App extends Vue {
  title: string = "Hello World";

  mounted() {
    wf.init()
  }
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
