import { ref, getCurrentInstance, watch, toRefs } from "vue";
import { validate } from '../../FormItem/validations';

export default function useSearch(props, context, dep) {
  const { regex } = toRefs(props);
  
  const $this = getCurrentInstance().proxy;

  // ============ DEPENDENCIES ============

  const isOpen = dep.isOpen;
  const open = dep.open;
  const update = dep.update;
  const rules = props.rules;

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

    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text");
    const split_data = pastedData.split(/[\s,;\n\t]+/);
    const iv = dep.iv;
    const res = [];

    for (let data of split_data) {
      data = data.trim();
      let valid = true;

      if (rules.length) {
        valid = validate(rules, data);
      }
  
      res.push({
        isSuggest: true,
        email: data,
        name: data,
        valid,
      });
    }

    update([...iv.value, ...res]);
    clearSearch();
    e.preventDefault()
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
