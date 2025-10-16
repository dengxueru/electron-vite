import { Vue, Component, Prop } from "vue-property-decorator";
import Child from "./Child";
import electron from 'electron'
import { join } from "path";

@Component({
  components: { Child },
})
export default class App extends Vue {
  title: string = "Hello World";

  mounted() {
    const data = join(__dirname, 'index.html')
    console.log(data)
    console.log(electron)
    console.log("mounted");
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
    require('electron').shell.openExternal('https://www.baidu.com')
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
