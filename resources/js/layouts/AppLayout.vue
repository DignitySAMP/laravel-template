<script setup lang="ts">
	import { dashboard, logout } from '@/routes';
	import { edit } from '@/routes/profile';
	import { Link } from '@inertiajs/vue3';
</script>

<template>
	<div class="min-h-screen flex flex-col">
		<nav class="bg-white border-b">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16 items-center">
					<div class="text-xl font-semibold">YourApp</div>
					<div class="flex gap-4 items-center">
						<Link :href="dashboard().url" class="text-gray-600 hover:text-gray-900 transition duration-300">
							Dashboard
						</Link>
						<Link :href="edit().url" class="text-gray-600 hover:text-gray-900 transition duration-300">
							Profile
						</Link>

						<Link :href="logout().url" method="post" class="text-gray-600 hover:text-gray-900">Logout</Link>
					</div>
				</div>
			</div>
		</nav>

 		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full h-full grow">

			<slot />
		</div>
	</div>
</template>