<template>
	<div class="space-y-6">
		<AppPageTitle
			title="Delete account"
			description="Delete your account and all of its resources"
			:small="true"
		/>
		<div
			class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10"
		>
			<div class="relative space-y-0.5 text-red-600 dark:text-red-100">
				<p class="font-medium">Warning</p>
				<p class="text-sm">Please proceed with caution, this cannot be undone.</p>
			</div>

			<AppButton
				@click="showDeleteModal = true"
				name="btn_show_delete"
				text="Delete Account"
				data-test="delete-user-button"
				theme="danger"
			/>

			<AppModal
				:show="showDeleteModal"
				@close="showDeleteModal = false"
				width="w-full max-w-[calc(100%-2rem)] sm:max-w-lg space-y-4"
			>
				<h2 class="text-lg font-bold">Are you sure you want to delete your account?</h2>
				<p class="text-sm text-gray-600">
					Once your account is deleted, all of its resources and data will also be
					permanently deleted. Please enter your password to confirm you would like to
					permanently delete your account.
				</p>

				<div>
					<AppInput
						name="password"
						type="password"
						placeholder="Password"
						:autofocus="true"
						autocomplete="new-password"
						:error="form.errors.password"
						v-model="form.password"
						:required="true"
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<AppButton
						name="btn_cancel_delete_account"
						text="Cancel"
						type="submit"
						@click="cancelDelete()"
						theme="secondary"
					/>

					<AppButton
						data-test="confirm-delete-user-button"
						name="btn_delete_account"
						text="Delete Account"
						type="submit"
						@click="submit"
						theme="danger"
					/>
				</div>
			</AppModal>
		</div>
	</div>
</template>
<script setup lang="ts">
import { destroy } from '@/actions/App/Http/Controllers/Settings/ProfileController'
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

import AppButton from '@/components/forms/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/AppModal.vue'
import AppPageTitle from '@/components/layout/AppPageTitle.vue'

const showDeleteModal = ref<boolean>(false)

const form = useForm({
	password: '',
})

const submit = () => {
	if (form.processing) return
	form.submit(destroy(), {
		preserveScroll: true,
		onFinish: () => form.reset('password'),
		onSuccess: () => (showDeleteModal.value = false),
	})
}

const cancelDelete = () => {
	showDeleteModal.value = false
	form.reset()
}
</script>
