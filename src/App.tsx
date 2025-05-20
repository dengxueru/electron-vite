import { defineComponent } from "vue";
import { MainProcessChannel, MainProcessEventName } from "../types/electron";

export default defineComponent({
  setup() {
    const insert = () => {
      window.ipcRenderer.send(MainProcessChannel.TO_MAIN, {
        name: MainProcessEventName.REALM_CAR_INSERT,
        data: {
          carlist: [
            {
              make: "baoma",
              model: "530",
              miles: 100000,
            },
            {
              make: "benchi",
              model: "glb",
              miles: 100,
            },
            {
              make: "nissan",
              model: "abc",
              miles: 300,
            },
            {
              make: "aodi",
              model: "a4",
              miles: 600,
            },
          ],
        },
      });
    };
    const query = () => {
      window.ipcRenderer.send(MainProcessChannel.TO_MAIN, {
        name: MainProcessEventName.REALM_CAR_QUERY,
      });
    };
    const deleteFn = () => {
      window.ipcRenderer.send(MainProcessChannel.TO_MAIN, {
        name: MainProcessEventName.REALM_CAR_DELETE,
      });
    };
    const update = () => {
      window.ipcRenderer.send(MainProcessChannel.TO_MAIN, {
        name: MainProcessEventName.REALM_CAR_UPDATE,
      });
    };

    return () => (
      <div class="app">
        <div onClick={insert}>插入数据</div>
        <div onClick={query}>查询数据</div>
        <div onClick={deleteFn}>删除数据</div>
        <div onClick={update}>更新数据</div>
      </div>
    );
  },
});
