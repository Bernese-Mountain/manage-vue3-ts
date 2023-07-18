<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelShow: Boolean
})

const emit = defineEmits(['update:modelShow'])
const { HelpOutlineIcon, CloseIcon } = icon.ionicons5
const modelShowRef = ref(false)

watch(() => props.modelShow, (newValue) => {
  modelShowRef.value = newValue
})

const closeHandle = () => {
  emit('update:modelShow', false)
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
