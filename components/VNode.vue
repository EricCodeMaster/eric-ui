<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // eslint-disable-next-line
    vnode: [Array, String, Object, Number],
  },
  render(h) {
    if (typeof this.vnode === "object") {
      return this.vnode;
    }
    return h("div", this.vnode);
  },
});
</script>
