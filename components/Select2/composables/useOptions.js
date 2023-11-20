import { ref, toRefs, computed, watch, getCurrentInstance } from 'vue'
import normalize from './../utils/normalize'
import isObject from './../utils/isObject'
import isNullish from './../utils/isNullish'
import arraysEqual from './../utils/arraysEqual'

export default function useOptions (props, context, dep)
{
  const {
    options, mode, trackBy: trackBy_, limit, hideSelected, createTag, createOption: createOption_, label,
    appendNewTag, appendNewOption: appendNewOption_, multipleLabel, object, loading, delay, resolveOnLoad,
    minChars, filterResults, clearOnSearch, clearOnSelect, valueProp, resolveFunction,
    canDeselect, max, strict, closeOnSelect, groups: groupped, reverse, infinite,
    groupOptions, groupHideEmpty, groupSelect, onCreate, customHandlerProps, customOptionClickHandler, disabledProp, searchStart,
  } = toRefs(props)

  const $this = getCurrentInstance().proxy

  // ============ DEPENDENCIES ============

  const iv = dep.iv
  const ev = dep.ev
  const search = dep.search
  const clearSearch = dep.clearSearch
  const update = dep.update
  const pointer = dep.pointer
  const clearPointer = dep.clearPointer
  const focus = dep.focus
  const deactivate = dep.deactivate
  const close = dep.close
  const isOpen = dep.isOpen;
  const isActive = dep.isActive;

  // ================ DATA ================

  // no export
  // appendedOptions
  const ap = ref([])

  // no export
  // resolvedOptions
  const ro = ref([])

  const resolving = ref(false)

  // no export
  const searchWatcher = ref(null)

  const offset = ref(infinite.value && limit.value === -1 ? 10 : limit.value)

  // ============== COMPUTED ==============

  // no export
  const createOption = computed(() => {
    return createTag.value || createOption_.value || false
  })

  // no export
  const appendNewOption = computed(() => {
    if (appendNewTag.value !== undefined) {
      return appendNewTag.value
    } else if (appendNewOption_.value !== undefined) {
      return appendNewOption_.value
    }

    return true
  })

  // no export
  // extendedOptions
  const eo = computed(() => {
    if (groupped.value) {
      let groups = ro.value || /* istanbul ignore next */ []

      let eo = []

      groups.forEach((group) => {
        optionsToArray(group[groupOptions.value]).forEach((option) => {
          eo.push(Object.assign({}, option, group[disabledProp.value] ? { [disabledProp.value]: true } : {}))
        })
      })

      return eo
    } else {
      let eo = optionsToArray(ro.value || /* istanbul ignore next */ [])

      if (ap.value.length) {
        eo = eo.concat(ap.value)
      }

      return eo
    }
  })

  const fg = computed(() => {
    if (!groupped.value) {
      return []
    }

    return filterGroups((ro.value || /* istanbul ignore next */ []).map((group, index) => {
      const arrayOptions = optionsToArray(group[groupOptions.value])

      return {
        ...group,
        index,
        group: true,
        [groupOptions.value]: filterOptions(arrayOptions, false).map(o => Object.assign({}, o, group[disabledProp.value] ? { [disabledProp.value]: true } : {})),
        __VISIBLE__: filterOptions(arrayOptions).map(o => Object.assign({}, o, group[disabledProp.value] ? { [disabledProp.value]: true } : {})),
      }
      // Difference between __VISIBLE__ and {groupOptions}: visible does not contain selected options when hideSelected=true
    }))
  })

  // preFilteredOptions
  const pfo = computed(() => {
    let options = eo.value

    if (reverse.value) {
      options = options.reverse()
    }

    if (createdOption.value.length) {
      options = createdOption.value.concat(options)
    }

    return filterOptions(options)
  })

  // filteredOptions
  const fo = computed(() => {
    let options = pfo.value

    if (offset.value > 0) {
      options = options.slice(0, offset.value)
    }

    return options
  })

  const hasSelected = computed(() => {
    switch (mode.value) {
      case 'single':
        return !isNullish(iv.value[valueProp.value])

      case 'multiple':
      case 'tags':
        return !isNullish(iv.value) && iv.value.length > 0
    }
  })

  const activeListed = computed(() => {
    if (isOpen.value) {
      return { items: ev?.value || [], more: -1 };
    } else {
      if (ev.value?.filter) {
        const selected = ev.value?.filter((i, index) => index < 4);
        const more = ev.value.length - selected.length;
        return { items: selected, more };
      }
      return { items: [], more: -1 };
    }
  });

  const multipleLabelText = computed(() => {

    if (multipleLabel !== undefined && multipleLabel.value !== undefined) {
      return multipleLabel.value(iv.value, $this);
    }

    if (iv.value && iv.value.length > 1) {
      return `${iv.value.length} options selected`;
    }

    return `1 option selected`;

  })

  const noOptions = computed(() => {
    return !eo.value.length && !resolving.value && !createdOption.value.length
  })


  const noResults = computed(() => {
    return eo.value.length > 0 && fo.value.length == 0 && ((search.value && groupped.value) || !groupped.value)
  })

  // no export
  const createdOption = computed(() => {
    if (createOption.value === false || !search.value) {
      return []
    }

    return getOptionByTrackBy(search.value) !== -1 ? [] : [{
      [valueProp.value]: search.value,
      [label.value]: search.value,
      [trackBy.value]: search.value,
      isSuggest: true,
    }]
  })

  const trackBy = computed(() => {
    return trackBy_.value || label.value
  })

  // no export
  const nullValue = computed(() => {
    switch (mode.value) {
      case 'single':
        return null

      case 'multiple':
      case 'tags':
        return []
    }
  })

  const busy = computed(() => {
    return loading.value || resolving.value
  })

  // =============== METHODS ==============

  /**
   * @param {array|object|string|number} option
   */
  const select = (option) => {
    if (typeof option !== 'object') {
      option = getOption(option)
    }

    switch (mode.value) {
      case 'single':
        update(option)
        break

      case 'multiple':
      case 'tags':
        update((iv.value).concat(option))
        break
    }

    context.emit('select', finalValue(option), option, $this)
  }

  const deselect = (option) => {
    if (typeof option !== 'object') {
      option = getOption(option)
    }

    switch (mode.value) {
      case 'single':
        clear()
        break

      case 'tags':
      case 'multiple':
        update(Array.isArray(option)
            ? iv.value.filter(v => option.map(o => o[valueProp.value]).indexOf(v[valueProp.value]) === -1)
            : iv.value.filter(v => v[valueProp.value] != option[valueProp.value]))
        break
    }

    context.emit('deselect', finalValue(option), option, $this)
  }

  // no export
  const finalValue = (option) => {
    return object.value ? option : option[valueProp.value]
  }

  const remove = (option) => {
    deselect(option)
  }

  const handleTagRemove = (option, e) => {
    if (e.button !== 0) {
      e.preventDefault()
      return
    }

    remove(option)
  }

  const clear = () => {
    context.emit('clear', $this)
    update(nullValue.value)
  }

  const isSelected = (option) => {
    if (option.group !== undefined) {
      return mode.value === 'single' ? false : areAllSelected(option[groupOptions.value]) && option[groupOptions.value].length
    }

    switch (mode.value) {
      case 'single':
        return !isNullish(iv.value) && iv.value[valueProp.value] == option[valueProp.value]

      case 'tags':
      case 'multiple':
        return !isNullish(iv.value) && iv.value.map(o => o[valueProp.value]).indexOf(option[valueProp.value]) !== -1
    }
  }

  const isDisabled = (option) => {
    return option[disabledProp.value] === true
  }

  const isCustomHandler = (option) => {
    return customHandlerProps.value.filter((f) => !!option[f]).length > 0
  }

  const isMax = () => {
    if (max === undefined || max.value === -1 || (!hasSelected.value && max.value > 0)) {
      return false
    }

    return iv.value.length >= max.value
  }

  const handleOptionClick = (option) => {

    if (isDisabled(option)) {
      return
    }

    if (isCustomHandler(option)) {
      customOptionClickHandler.value(option);
      if (clearOnSelect.value) {
        clearSearch()
      }

      if (closeOnSelect.value) {
        clearPointer()
        close()
      }
      return
    }

    if (onCreate && onCreate.value && !isSelected(option) && option.isSuggest) {
      option = { ...option }
      delete option.isSuggest

      option = onCreate.value(option, $this)

      if (option instanceof Promise) {
        resolving.value = true
        option.then((result) => {
          resolving.value = false
          handleOptionSelect(result)
        })

        return
      }
    }

    handleOptionSelect(option)
  }

  const handleOptionSelect = (option) => {
    if (option.isSuggest) {
      option = { ...option }
      delete option.isSuggest
    }

    switch (mode.value) {
      case 'single':
        if (option && isSelected(option)) {
          if (canDeselect.value) {
            deselect(option)
          }
          return
        }

        if (option) {
          handleOptionAppend(option)
        }

        /* istanbul ignore else */
        if (clearOnSelect.value) {
          clearSearch()
        }

        if (closeOnSelect.value) {
          clearPointer()
          close()
        }

        if (option) {
          select(option)
        }
        break

      case 'multiple':
        if (option && isSelected(option)) {
          deselect(option)
          return
        }

        if (isMax()) {
          context.emit('max', $this)
          return
        }

        if (option) {
          handleOptionAppend(option)
          select(option)
        }

        if (clearOnSelect.value) {
          clearSearch()
        }

        if (hideSelected.value) {
          clearPointer()
        }

        if (closeOnSelect.value) {
          close()
        }
        break

      case 'tags':
        if (option && isSelected(option)) {
          deselect(option)
          return
        }

        if (isMax()) {
          context.emit('max', $this)
          return
        }

        if (option) {
          handleOptionAppend(option)
        }

        if (clearOnSelect.value) {
          clearSearch()
        }

        if (option) {
          select(option)
        }

        if (hideSelected.value) {
          clearPointer()
        }

        if (closeOnSelect.value) {
          close()
        }
        break
    }

    if (!closeOnSelect.value) {
      focus()
    }
  }

  const handleGroupClick = (group) => {
    if (isDisabled(group) || mode.value === 'single' || !groupSelect.value) {
      return
    }

    switch (mode.value) {
      case 'multiple':
      case 'tags':
        if (areAllEnabledSelected(group[groupOptions.value])) {
          deselect(group[groupOptions.value])
        } else {
          select(group[groupOptions.value]
              .filter(o => iv.value.map(v => v[valueProp.value]).indexOf(o[valueProp.value]) === -1)
              .filter(o => !o[disabledProp.value])
              .filter((o, k) => iv.value.length + 1 + k <= max.value || max.value === -1)
          )
        }
        break
    }

    if (closeOnSelect.value) {
      deactivate()
    }
  }

  const handleOptionAppend = (option) => {
    if (getOption(option[valueProp.value]) === undefined && createOption.value) {
      context.emit('tag', option[valueProp.value], $this)
      context.emit('option', option[valueProp.value], $this)

      if (appendNewOption.value) {
        appendOption(option)
      }

      clearSearch()
    }
  }

  const selectAll = () => {
    if (mode.value === 'single') {
      return
    }

    select(fo.value)
  }

  // no export
  const areAllEnabledSelected = (options) => {
    return options.find(o => !isSelected(o) && !o[disabledProp.value]) === undefined
  }

  // no export
  const areAllSelected = (options) => {
    return options.find(o => !isSelected(o)) === undefined
  }

  const getOption = (val) => {
    return eo.value[eo.value.map(o => String(o[valueProp.value])).indexOf(String(val))]
  }

  // no export
  const getOptionByTrackBy = (val, norm = true) => {
    return eo.value.map(o => parseInt(o[trackBy.value]) == o[trackBy.value] ? parseInt(o[trackBy.value]) : o[trackBy.value]).indexOf(
        parseInt(val) == val ? parseInt(val) : val
    )
  }

  // no export
  const shouldHideOption = (option) => {
    return ['tags', 'multiple'].indexOf(mode.value) !== -1 && hideSelected.value && isSelected(option)
  }

  // no export
  const appendOption = (option) => {
    ap.value.push(option)
  }

  // no export
  const filterGroups = (groups) => {
    // If the search has value we need to filter among 
    // the ones that are visible to the user to avoid
    // displaying groups which technically have options
    // based on search but that option is already selected.
    return groupHideEmpty.value
        ? groups.filter(g => search.value
            ? g.__VISIBLE__.length
            : g[groupOptions.value].length
        )
        : groups.filter(g => search.value ? g.__VISIBLE__.length : true)
  }

  // no export
  const filterOptions = (options, excludeHideSelected = true) => {
    let fo = options

    if (search.value && filterResults.value) {
      fo = fo.filter((option) => {
        return searchStart.value
            ? normalize(option[trackBy.value], strict.value).startsWith(normalize(search.value, strict.value))
            : normalize(option[trackBy.value], strict.value).indexOf(normalize(search.value, strict.value)) !== -1
      })
    }

    if (hideSelected.value && excludeHideSelected) {
      fo = fo.filter((option) => !shouldHideOption(option))
    }

    return fo
  }

  // no export
  const optionsToArray = (options) => {
    let uo = options

    // Transforming an object to an array of objects
    if (isObject(uo)) {
      uo = Object.keys(uo).map((key) => {
        let val = uo[key]

        return { [valueProp.value]: key, [trackBy.value]: val, [label.value]: val}
      })
    }

    // Transforming an plain arrays to an array of objects
    uo = uo.map((val) => {
      return typeof val === 'object' ? val : { [valueProp.value]: val, [trackBy.value]: val, [label.value]: val}
    })

    return uo
  }

  // no export
  const initInternalValue = () => {
    if (!isNullish(ev.value)) {
      iv.value = makeInternal(ev.value)
    }
  }

  const resolveOptions = (callback) => {
    resolving.value = true

    return new Promise((resolve, reject) => {
      options.value(search.value, $this).then((response) => {
        ro.value = response || []

        if (typeof callback == 'function') {
          if (resolveFunction.value) {
            const items = resolveFunction.value(response);
            callback(items);
          } else {
            callback(response)
          }
        }

        resolving.value = false
      }).catch((e) => {
        console.error(e)

        ro.value = []

        resolving.value = false
      }).finally(() => {
        resolve()
      })
    })
  }

  // no export
  const refreshLabels = () => {
    if (!hasSelected.value) {
      return
    }

    if (mode.value === 'single') {
      let option = getOption(iv.value[valueProp.value])

      /* istanbul ignore else */
      if (option !== undefined) {
        let newLabel = option[label.value]

        iv.value[label.value] = newLabel

        if (object.value) {
          ev.value[label.value] = newLabel
        }
      }
    } else {
      iv.value.forEach((val, i) => {
        let option = getOption(iv.value[i][valueProp.value])

        /* istanbul ignore else */
        if (option !== undefined) {
          let newLabel = option[label.value]

          iv.value[i][label.value] = newLabel

          if (object.value && ev.value) {
            ev.value[i][label.value] = newLabel
          } else {
            console.error('yartu-ui-kit: ev.value is not acceptable. something might be broken.');
          }
        }
      })
    }
  }

  const refreshOptions = (callback) => {
    resolveOptions(callback)
  }

  // no export
  const makeInternal = (val) => {
    if (isNullish(val)) {
      return mode.value === 'single' ? {} : []
    }

    if (object.value) {
      return val
    }

    // If external should be plain transform
    // value object to plain values
    return mode.value === 'single' ? getOption(val) || {} : val.filter(v => !! getOption(v)).map(v => getOption(v))
  }

  // no export
  const initSearchWatcher = () => {
    searchWatcher.value = watch(search, (query) => {
      if (query.length < minChars.value || (!query && minChars.value !== 0)) {
        return
      }

      resolving.value = true

      if (clearOnSearch.value) {
        ro.value = []
      }
      setTimeout(() => {
        if (query != search.value) {
          return
        }

        options.value(search.value, $this).then((response) => {
          if (query == search.value || !search.value) {
            ro.value = response
            pointer.value = fo.value.filter(o => o[disabledProp.value] !== true)[0] || null
            resolving.value = false
          }
        }).catch( /* istanbul ignore next */ (e) => {
          console.error(e)
        })
      }, delay.value)

    }, { flush: 'sync' })
  }

  // ================ HOOKS ===============

  if (mode.value !== 'single' && !isNullish(ev.value) && !Array.isArray(ev.value)) {
    throw new Error(`v-model must be an array when using "${mode.value}" mode`)
  }

  if (options && typeof options.value == 'function') {
    if (resolveOnLoad.value) {
      resolveOptions(initInternalValue)
    } else if (object.value == true) {
      initInternalValue()
    }
  }
  else {
    ro.value = options.value

    initInternalValue()
  }

  // ============== WATCHERS ==============

  if (delay.value > -1) {
    initSearchWatcher()
  }

  watch(delay, (value, old) => {
    /* istanbul ignore else */
    if (searchWatcher.value) {
      searchWatcher.value()
    }

    if (value >= 0) {
      initSearchWatcher()
    }
  })

  watch(ev, (newValue) => {
    if (isNullish(newValue)) {
      update(makeInternal(newValue), false)
      return
    }

    switch (mode.value) {
      case 'single':
        if (object.value ? newValue[valueProp.value] != iv.value[valueProp.value] : newValue != iv.value[valueProp.value]) {
          update(makeInternal(newValue), false)
        }
        break

      case 'multiple':
      case 'tags':
        if (!arraysEqual(object.value ? newValue.map(o => o[valueProp.value]) : newValue, iv.value.map(o => o[valueProp.value]))) {
          update(makeInternal(newValue), false)
        }
        break
    }
  }, { deep: true })

  watch(options, (n, o) => {
    if (typeof props.options === 'function') {
      if (resolveOnLoad.value && (!o || (n && n.toString() !== o.toString()))) {
        resolveOptions()
      }
    } else {
      ro.value = props.options

      if (!Object.keys(iv.value).length) {
        initInternalValue()
      }

      refreshLabels()
    }
  })

  watch(label, refreshLabels)

  return {
    pfo,
    fo,
    filteredOptions: fo,
    hasSelected,
    multipleLabelText,
    eo,
    extendedOptions: eo,
    fg,
    filteredGroups: fg,
    noOptions,
    noResults,
    resolving,
    busy,
    offset,
    activeListed,
    select,
    deselect,
    remove,
    selectAll,
    clear,
    isSelected,
    isDisabled,
    isMax,
    getOption,
    handleOptionClick,
    handleGroupClick,
    handleTagRemove,
    refreshOptions,
    resolveOptions,
    refreshLabels,
  }
}