import { computed, toRefs } from 'vue';

export default function useClasses(props, context, dependencies) {
  const {
    classes: classes_,
    disabled,
    openDirection,
    showOptions,
  } = toRefs(props);

  // ============ DEPENDENCIES ============

  const isOpen = dependencies.isOpen;
  const isPointed = dependencies.isPointed;
  const isSelected = dependencies.isSelected;
  const isDisabled = dependencies.isDisabled;
  const isActive = dependencies.isActive;
  const canPointGroups = dependencies.canPointGroups;
  const resolving = dependencies.resolving;
  const fo = dependencies.fo;

  const classes = computed(() => ({
    container:
      'multiselect relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-BORDER rounded-lg bg-white body-1 outline-none',
    containerDisabled: 'is-disabled cursor-default bg-GREY-1',
    containerOpen: 'is-open',
    containerOpenTop: 'is-open-top',
    containerActive: 'is-active border-BLUE',
    wrapper:
      'multiselect-wrapper relative mx-auto w-full flex items-center justify-end box-border cursor-pointer outline-none px-4 py-2.5',
    labelClass: 'subtitle-4 text-BLACK-2',
    singleLabel:
      'multiselect-single-label flex items-center h-full max-w-full absolute left-0 top-0 pointer-events-none bg-transparent body-1 pl-3.5 pr-16 box-border rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
    singleLabelText: 'multiselect-single-label-text block truncate w-full',
    multipleLabel:
      'multiselect-multiple-label flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent body-1 pl-3.5 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
    search:
      'multiselect-search w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 text-base bg-white rounded-lg pl-3.5 rtl:pl-0 rtl:pr-3.5',
    tags: 'multiselect-tags flex-grow flex-shrink flex flex-wrap items-center mt-1 pl-2 rtl:pl-0 rtl:pr-2',
    tag: 'multiselect-tag bg-LIGHTBLUE-6 text-GREY-1 subtitle-5 border border-BORDER py-0.5 px-2 rounded-xl mr-1 mb-1 flex items-center truncate max-w-full rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
    tagDisabled: 'is-disabled',
    tagRemove: 'multiselect-tag-remove ml-1',
    tagRemoveIcon: 'multiselect-tag-remove-icon',
    tagsSearchWrapper:
      'multiselect-tags-search-wrapper inline-block relative w-full flex-grow flex-shrink h-full',
    tagsSearch:
      'multiselect-tags-search absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base w-full',
    tagsSearchCopy:
      'multiselect-tags-search-copy invisible whitespace-pre-wrap inline-block h-px',
    placeholder:
      'multiselect-placeholder flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent body-1 pl-3.5 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
    simpleMultiple:
      'text-BLACK-2 subtitle-5 py-0.5 px-2 rounded-xl mr-1 mb-1 flex items-center truncate max-w-full rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
    caret:
      'multiselect-caret bg-multiselect-caret w-6 h-6 ml-auto box-content relative z-10 opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0',
    caretOpen: 'is-open rotate-180 pointer-events-auto',
    clear:
      'multiselect-clear pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80 rtl:pr-0 rtl:pl-3.5',
    clearIcon:
      'multiselect-clear-icon bg-multiselect-remove bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block',
    spinner:
      'multiselect-spinner bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 animate-spin flex-shrink-0 flex-grow-0',
    inifinite: 'multiselect-inifite flex items-center justify-center w-full',
    inifiniteSpinner:
      'multiselect-inifite-spinner bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 animate-spin flex-shrink-0 flex-grow-0',
    dropdown:
      'multiselect-dropdown max-h-60 fixed transform border border-BORDER rounded-lg overflow-y-auto z-1001 bg-white flex flex-col py-3',
    dropdownTop: 'is-top -translate-y-full top-px bottom-auto',
    dropdownHidden: 'is-hidden hidden',
    options: 'multiselect-options flex flex-col p-0 m-0',
    optionsTop: 'is-top',
    group: 'multiselect-group',
    groupLabel:
      'multiselect-group-label flex text-sm box-border items-center justify-start text-left py-1 px-3 font-semibold bg-GREY-1 cursor-default leading-normal',
    groupLabelPointable: 'is-pointable cursor-pointer',
    groupLabelPointed: 'is-pointed bg-GREY-1 ',
    groupLabelSelected: 'is-selected bg-LIGHTBLUE-6 text-white',
    groupLabelDisabled: 'is-disabled bg-GREY-1 cursor-not-allowed',
    groupLabelSelectedPointed: 'is-selected is-pointed',
    groupLabelSelectedDisabled: 'is-selected is-disabled',
    groupOptions: 'multiselect-group-options',
    option:
      'multiselect-option flex items-center truncate justify-start box-border text-left cursor-pointer text-BLACK-2 subtitle-4 py-2 px-3 hover:bg-LIGHTBLUE-6 w-full',
    optionPointed: 'is-pointed bg-LIGHTBLUE-6',
    optionSelected: 'is-selected text-white bg-LIGHTBLUE-6',
    optionDisabled: 'is-disabled cursor-not-allowed',
    optionSelectedPointed:
      'is-selected is-pointed text-white bg-LIGHTBLUE-6 opacity-80',
    optionSelectedDisabled:
      'is-selected is-disabled cursor-not-allowed opacity-80 cursor-not-allowed',
    noOptions: 'multiselect-no-options py-2 px-3',
    noResults: 'multiselect-no-results py-2 px-3',
    fakeInput:
      'multiselect-fake-input bg-transparent absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none text-transparent',
    assist:
      'multiselect-assistive-text absolute -m-px w-px h-px overflow-hidden',
    spacer: 'multiselect-spacer h-9 py-px box-content',
    ...classes_.value,
  }));

  // ============== COMPUTED ==============

  const showDropdown = computed(() => {
    return !!(
      isOpen.value &&
      showOptions.value &&
      (!resolving.value || (resolving.value && fo.value.length))
    );
  });

  const classList = computed(() => {
    const c = classes.value;

    return {
      container: [c.container]
        .concat(disabled.value ? c.containerDisabled : [])
        .concat(
          showDropdown.value && openDirection.value === 'top'
            ? c.containerOpenTop
            : [],
        )
        .concat(
          showDropdown.value && openDirection.value !== 'top'
            ? c.containerOpen
            : [],
        )
        .concat(isActive.value ? c.containerActive : []),
      wrapper: c.wrapper,
      labelClass: c.labelClass,
      spacer: c.spacer,
      singleLabel: c.singleLabel,
      singleLabelText: c.singleLabelText,
      multipleLabel: c.multipleLabel,
      search: c.search,
      tags: c.tags,
      tag: [c.tag].concat(disabled.value ? c.tagDisabled : []),
      tagRemove: c.tagRemove,
      tagRemoveIcon: c.tagRemoveIcon,
      tagsSearchWrapper: c.tagsSearchWrapper,
      tagsSearch: c.tagsSearch,
      tagsSearchCopy: c.tagsSearchCopy,
      placeholder: c.placeholder,
      caret: [c.caret].concat(isOpen.value ? c.caretOpen : []),
      clear: c.clear,
      clearIcon: c.clearIcon,
      spinner: c.spinner,
      inifinite: c.inifinite,
      inifiniteSpinner: c.inifiniteSpinner,
      dropdown: [c.dropdown]
        .concat(openDirection.value === 'top' ? c.dropdownTop : [])
        .concat(
          !isOpen.value || !showOptions.value || !showDropdown.value
            ? c.dropdownHidden
            : [],
        ),
      options: [c.options].concat(
        openDirection.value === 'top' ? c.optionsTop : [],
      ),
      group: c.group,
      groupLabel: (g) => {
        let groupLabel = [c.groupLabel];

        if (isPointed(g)) {
          groupLabel.push(
            isSelected(g) ? c.groupLabelSelectedPointed : c.groupLabelPointed,
          );
        } else if (isSelected(g) && canPointGroups.value) {
          groupLabel.push(
            isDisabled(g) ? c.groupLabelSelectedDisabled : c.groupLabelSelected,
          );
        } else if (isDisabled(g)) {
          groupLabel.push(c.groupLabelDisabled);
        }

        if (canPointGroups.value) {
          groupLabel.push(c.groupLabelPointable);
        }

        return groupLabel;
      },
      groupOptions: c.groupOptions,
      option: (o, g) => {
        let option = [c.option];

        if (isPointed(o)) {
          option.push(
            isSelected(o) ? c.optionSelectedPointed : c.optionPointed,
          );
        } else if (isSelected(o)) {
          option.push(
            isDisabled(o) ? c.optionSelectedDisabled : c.optionSelected,
          );
        } else if (isDisabled(o) || (g && isDisabled(g))) {
          option.push(c.optionDisabled);
        }

        return option;
      },
      noOptions: c.noOptions,
      noResults: c.noResults,
      assist: c.assist,
      fakeInput: c.fakeInput,
      simpleMultiple: c.simpleMultiple,
    };
  });

  return {
    classList,
    showDropdown,
  };
}
