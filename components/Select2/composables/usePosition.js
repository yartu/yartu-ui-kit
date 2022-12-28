import { watch, toRefs } from 'vue';
import { onClickOutside } from '@vueuse/core';

export default function useDropdown(props, context, dep) {
  const { disabled, top, left } = toRefs(props);

  // ================ DATA ================

  const isOpen = dep.isOpen;
  const isActive = dep.isActive;
  const deactivate = dep.deactivate;
  const multiselect = dep.multiselect;
  const optionContainer = dep.optionContainer;
  const iv = dep.iv;

  const target = dep.multiselect;

  onClickOutside(
    target,
    () => {
      deactivate();
    },
    { ignore: [optionContainer] },
  );

  const calculatePosition = () => {
    // improve this @aziz
    let dropdownContainer = multiselect.value.getBoundingClientRect();

    if (props.top) {
      optionContainer.value.style.top = dropdownContainer.top - 12 + 'px';
    } else {
      optionContainer.value.style.top =
        dropdownContainer.top + dropdownContainer.height + 12 + 'px';
    }
    if (props.left)
      optionContainer.value.style.left = dropdownContainer.right + 'px';
    else {
      optionContainer.value.style.left = dropdownContainer.left + 'px';
    }
    optionContainer.value.style.minWidth =
      dropdownContainer.right - dropdownContainer.left + 'px';
    optionContainer.value.style.maxWidth =
      dropdownContainer.right - dropdownContainer.left + 'px';

    if (window.innerHeight - dropdownContainer.bottom < 224) {
      setTimeout(() => {
        optionContainer.value.classList.add('force-to-top');
      }, 50);
    }
  };

  watch(
    () => isOpen.value || isActive.value,
    () => {
      setTimeout(() => {
        calculatePosition();
      }, 1);
    },
  );

  watch(
    () => iv.value,
    () => {
      setTimeout(() => {
        calculatePosition();
      }, 1);
    },
    { deep: true },
  );
  // =============== METHODS ==============

  return {
    calculatePosition,
  };
}
