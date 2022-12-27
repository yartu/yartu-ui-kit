import { ref, getCurrentInstance, watch, toRefs } from "vue";

export default function useSearch(props, context, dep) {
  const { regex } = toRefs(props);
  
  const $this = getCurrentInstance().proxy;

  // ============ DEPENDENCIES ============

  const isOpen = dep.isOpen;
  const open = dep.open;

  // ================ DATA ================
  
  const search = ref(null);

  const input = ref(null);

  // =============== METHODS ==============

  const clearSearch = () => {
    search.value = "";  
  };

  const handleSearchInput = (e) => {
    search.value = e.target.value;
  };

  const handleKeypress = (e) => {
    if (regex && regex.value) {
      let regexp = regex.value;

      if (typeof regexp === "string") {
        regexp = new RegExp(regexp);
      }

      if (!e.key.match(regexp)) {
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e) => {

    // TODO : @akucuk
    let clipboardData = e.clipboardData || window.clipboardData;
    let pastedData = clipboardData.getData("Text");
    console.log('PASTE', e, pastedData);

    let split_data = pastedData.split(/[\s,;\n\t]+/);
    let regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    let mail_regex = RegExp(regex);
    let res = [];

    console.log('split_data', split_data);

    // for (let data of split_data) {
    //   data = data.trim();
    // }

    context.emit("paste", e, $this);
  };

  // ============== WATCHERS ==============

  watch(search, (val) => {
    if (!isOpen.value && val) {
      open();
    }

    context.emit("search-change", val, $this);
  });

  return {
    search,
    input,
    clearSearch,
    handleSearchInput,
    handleKeypress,
    handlePaste,
  };
}
