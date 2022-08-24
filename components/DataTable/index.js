import DataTable from "./DataTable.vue";

const _DataTable = {
  install(Vue) {
    Vue.component(DataTable.name, DataTable);
  }
};

export default _DataTable;

export { DataTable };
