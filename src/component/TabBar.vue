<template>
  <div>
    <router-link
      ref="tag"
      v-for="(item, index) in tabList"
      :to="{ path: item.url }"
      :key="index"
      v-autoClick
      class="tag-nav-item"
    >
      &nbsp;
      {{ item.name }}
      &nbsp;
      <span
        v-if="item.name !== '首页'"
        @click.prevent.stop="closeTheTag(item, index)"
        ><i class="el-icon-close"></i
      ></span>
    </router-link>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "self-tab-bar",
  data() {
    return {};
  },
  directives: {
    autoClick: {
      inserted(el, bingding) {
          el.click();
      },
    },
  },
  methods: {
    closeTheTag(item, index) {
      this.tabList.splice(index, 1);
    },
  },
  computed: mapState({
    tabList: "tabList",
  }),
};
</script>

<style  scoped>
#mybar {
  width: 100%;
  display: inline;
}
.tag-nav-item {
  text-decoration: none;
  width: auto;
  max-width: 103px;
  line-height: 2.5rem;
  border-radius: 0px 0px 8px 8px;
  float: left;
  color: #ffff;
  margin-top: 14px;
  text-align: center;
  margin-left: 3px;
}
.tag-nav-item:visited {
  background-color: #ffff;
  z-index: 5;
}
.router-link-active {
  background-color: #ffff;
  border-radius: 8px 8px 0 0;
  color: #000;
  margin-left: 3px;
}
</style>
