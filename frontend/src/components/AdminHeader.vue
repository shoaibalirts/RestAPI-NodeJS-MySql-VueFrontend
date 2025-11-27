<template>
  <header>
    <p>{{ $route.meta.Desc }}</p>
    <h1>{{ $route.meta.adminHeaderTitle }}</h1>
  </header>
</template>

<script>
export default {
  name: "TheHeaderAdmin",
};
</script>

<style scoped>
header {
  height: 200px;
  background: #dd2f2f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: white;
  width: 100vw;
  border-bottom-left-radius: 58px;
  border-bottom-right-radius: 58px;

  box-shadow: inset 8px -40px 15px rgba(0, 0, 0, 0.25);
}
</style>
