<template>
  <div class="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <header class="w-full bg-white dark:bg-gray-800 shadow-md h-auto flex-shrink-0">
      <div class="container mx-auto px-4 h-full flex items-center justify-between">
        <slot name="header" />
      </div>
    </header>

    <main class="flex-grow flex flex-col md:flex-row overflow-hidden">
      <aside
        class="w-full md:w-1/4 lg:w-1/5 xl:w-1/6 bg-white dark:bg-gray-800 p-4 overflow-y-auto flex-shrink-0 border-r border-gray-200 dark:border-gray-700"
      >
        <slot name="left" />
      </aside>

      <div class="flex-grow p-6 overflow-y-auto">
        <slot name="center" />
      </div>

      <aside
        class="w-full md:w-1/4 lg:w-1/5 xl:w-1/6 bg-white dark:bg-gray-800 p-4 overflow-y-auto flex-shrink-0 border-l border-gray-200 dark:border-gray-700"
      >
        <slot name="right" />
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
