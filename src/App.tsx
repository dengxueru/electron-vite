import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class YourComponent extends Vue {
  title: string = "Hello World";

  renderPage() {
    return <div>你</div>;
  }

  render() {
    return (
      <div>
        {this.title}
        {this.renderPage()}
      </div>
    );
  }
}
