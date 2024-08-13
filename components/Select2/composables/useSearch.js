import { ref, getCurrentInstance, watch, toRefs } from "vue";
import { validate } from '../../FormItem/validations';
import useOptions from './useOptions';

export default function useSearch(props, context, dep) {
  const { regex, acceptPaste, hideSelected } = toRefs(props);

  const $this = getCurrentInstance().proxy;
  const options = useOptions(props, context, dep);


  
  // ============ DEPENDENCIES ============

  const isOpen = dep.isOpen;
  const open = dep.open;
  const update = dep.update;
  const rules = props.rules;
  const close = dep.close;
  const select = options.select;
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
      // dont add if already added into modelValue
      if (!iv.value.find((e) => e.email === data)) {
        res.push({
          isSuggest: true,
          email: data,
          name: data,
          valid,
        });
      }
    }

    if (acceptPaste.value) {
      update([...iv.value, ...res]);

      if (hideSelected.value && res.length > 0) {
        res.forEach((e) => { if (e.valid === true) select(e) });
        close();
      }
    }

    clearSearch();
    if (res.length > 0) {
      context.emit("paste", res, $this);
    } else {
      close();
    }
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
