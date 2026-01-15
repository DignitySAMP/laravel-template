<template>
	<div
		@click="model = !model"
		class="group relative w-10 cursor-pointer rounded-xl bg-white p-0.5 font-medium shadow-sm"
	>
		<div
			class="size-4 rounded-full p-1 transition-transform duration-300 ease-in-out"
			:class="{
				'translate-x-5 bg-black group-hover:bg-gray-700': model,
				'translate-x-0 bg-gray-300 group-hover:bg-gray-400': !model,
			}"
		/>
	</div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>()
</script>
