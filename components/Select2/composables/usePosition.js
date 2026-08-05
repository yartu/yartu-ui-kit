import { watch, toRefs, onScopeDispose } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { followAnchor } from '../../../utils/anchorPosition';

export default function useDropdown(props, context, dep) {
  const { disabled, openDirection, left } = toRefs(props);

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
    if (!multiselect.value || !optionContainer.value) return;

    const anchor = multiselect.value.getBoundingClientRect();
    const style = optionContainer.value.style;

    if (openDirection.value === 'top') {
      style.top = anchor.top - 12 + 'px';
    } else {
      style.top = anchor.bottom + 12 + 'px';
    }
    style.left = anchor.left + 'px';
    style.minWidth = anchor.width + 'px';
    style.maxWidth = anchor.width + 'px';

    optionContainer.value.classList?.toggle(
      'force-to-top',
      window.innerHeight - anchor.bottom < 224,
    );
  };

  watch(
    () => isActive.value,
    () => {
      setTimeout(() => {
        calculatePosition();
      }, 0);
    },
  );

  let stopFollowing = null;

  const followWhileOpen = (open) => {
    if (open && !stopFollowing) {
      stopFollowing = followAnchor(calculatePosition);
    } else if (!open && stopFollowing) {
      stopFollowing();
      stopFollowing = null;
    }
  };

  watch(
    () => isOpen.value,
    (open) => {
      followWhileOpen(open);
      setTimeout(() => {
        calculatePosition();
      }, 0);
    },
  );

  onScopeDispose(() => {
    followWhileOpen(false);
  });

  watch(
    () => iv.value,
    () => {
      setTimeout(() => {
        calculatePosition();
      }, 0);
    },
    { deep: true },
  );
  // =============== METHODS ==============

  return {
    calculatePosition,
  };
}
