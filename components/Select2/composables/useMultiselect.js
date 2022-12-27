import { ref, toRefs, computed, nextTick } from "vue";

export default function useMultiselect(props, context, dep) {
  const { searchable, disabled, clearOnBlur } = toRefs(props);

  // ============ DEPENDENCIES ============

  const input = dep.input;
  const open = dep.open;
  const close = dep.close;
  const clearSearch = dep.clearSearch;
  const isOpen = dep.isOpen;

  // ================ DATA ================

  const multiselect = ref(null);

  const optionContainer = ref(null);
  
  const wrapper = ref(null);

  const tags = ref(null);

  const isActive = ref(false);

  const mouseClicked = ref(false);
  
  // ============== COMPUTED ==============
  
  const tabindex = computed(() => {
    return searchable.value || disabled.value ? -1 : 0;
  });

  // =============== METHODS ==============

  const blur = () => {
    if (searchable.value) {
      input.value.blur();
    }

    wrapper.value.blur();
  };

  const focus = () => {
    if (searchable.value && !disabled.value) {
      input.value.focus();
    }
  };

  const activate = (shouldOpen = true) => {
    if (disabled.value) {
      return;
    }

    isActive.value = true;

    if (shouldOpen) {
      open();
    }
  };

  const deactivate = () => {
    isActive.value = false;

    setTimeout(() => {
      if (!isActive.value) {
        close();

        if (clearOnBlur.value) {
          clearSearch();
        }
      }
    }, 1);
  };

  const handleFocusIn = (e) => {
    if (
      (e.target.closest("[data-tags]") && e.target.nodeName !== "INPUT") ||
      e.target.closest("[data-clear]")
    ) {
      return;
    }

    activate(mouseClicked.value);
  };

  const handleFocusOut = (e, x) => {
    if (e.target.nodeName === "SPAN" || e.target.nodeName === "IMPUT") {
      return;
    }
    deactivate();
  };

  const handleCaretClick = () => {
    deactivate();
    blur();
  };

  /* istanbul ignore next */
  const handleMousedown = (e) => {
    mouseClicked.value = true;
    
    if (
      isOpen.value &&
      (e.target.isEqualNode(wrapper.value) || e.target.isEqualNode(tags.value))
    ) {
      setTimeout(() => {
        deactivate();
      }, 0);
    } else if (
      document.activeElement.isEqualNode(wrapper.value) &&
      !isOpen.value
    ) {
      activate();
    }

    setTimeout(() => {
      mouseClicked.value = false;
    }, 0);
  };

  return {
    multiselect,
    optionContainer,
    wrapper,
    tags,
    tabindex,
    isActive,
    mouseClicked,
    blur,
    focus,
    activate,
    deactivate,
    handleFocusIn,
    handleFocusOut,
    handleCaretClick,
    handleMousedown,
  };
}
