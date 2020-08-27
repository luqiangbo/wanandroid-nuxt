<template>
  <div>
    <common-header />
    <Nuxt />
    <common-footer />
  </div>
</template>
<script>
import commonFooter from './common-footer'
import commonHeader from './common-header'
export default {
  components: {
    commonFooter,
    commonHeader,
  },
}
</script>
<style></style>
