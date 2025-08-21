import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Child extends Vue {
  @Prop() name!: string;

  render() {
    return <div>{this.name}</div>;
  }
}
