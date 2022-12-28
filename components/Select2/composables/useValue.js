import { computed, toRefs, ref } from 'vue'

export default function useValue (props, context)
{
  const { value, modelValue, mode, valueProp } = toRefs(props)

  // internalValue
  const iv = ref(mode.value !== 'single' ? [] : {})

  // externalValue
  const ev = modelValue && modelValue.value !== undefined ? modelValue : value

  const plainValue = computed(() => {
    return mode.value === 'single' ? iv.value[valueProp.value] : iv.value.map(v=>v[valueProp.value])
  })

  const textValue = computed(() => {
    return mode.value !== 'single' ? iv.value.map(v=>v[valueProp.value]).join(',') : iv.value[valueProp.value]
  })

  return {
    iv,
    internalValue: iv,
    ev,
    externalValue: ev,
    textValue,
    plainValue,
  }
}
