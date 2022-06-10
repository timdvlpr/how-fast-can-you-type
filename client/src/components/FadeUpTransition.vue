<template>
  <Transition name="fade-up">
    <slot></slot>
  </Transition>
</template>

<style>
.fade-up-enter-active {
  transition: all 0.25s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(2rem);
}
</style>
