<script lang="ts" setup>
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
    <OpenAI></OpenAI>
  </NuxtLayout>
</template>

<style lang="scss">
@import url('normalize.css');

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

:root {
  font-family: 'Roboto';
}
</style>
