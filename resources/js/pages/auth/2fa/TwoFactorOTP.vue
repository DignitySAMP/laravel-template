<template>
	<form @submit.prevent>
		<div class="flex flex-col items-center justify-center space-y-3 text-center">
			<div class="flex w-full items-center justify-center">
				<AppInputOTP
					id="otp"
					v-model="form.code"
					name="otp"
					:error="form.errors.code"
				/>
			</div>
		</div>
		<AppButton
			@click="submit"
			text="Continue"
			name="btn_otp"
			type="submit"
			class="mt-4 w-full"
			:disabled="form.processing"
		/>
	</form>
</template>
<script setup lang="ts">
import AppButton from '@/components/forms/AppButton.vue'
import AppInputOTP from '@/components/forms/AppInputOTP.vue'
import { store } from '@/routes/two-factor/login'
import { useForm } from '@inertiajs/vue3'

const form = useForm({
	code: '',
})

const submit = () => {
	if (form.processing) return
	form.submit(store(), {
		preserveScroll: true,
		onFinish: () => form.reset('code'),
	})
}
</script>
