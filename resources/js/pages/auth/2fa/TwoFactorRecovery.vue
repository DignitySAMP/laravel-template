<template>
    <form @submit.prevent>
        <AppInput
            name="recovery_code"
            type="text"
            placeholder="Enter recovery code"
            :autofocus="showRecoveryInput"
            autocomplete="off"
            v-model="form.recovery_code"
            :error="form.errors.recovery_code"
            :required="true"
        />

        <AppButton 
            @click="submit" 
            name="btn-recovery-code" 
            type="submit" 
            class="mt-4 w-full" 
            :disabled="form.processing" 
            text="Continue"
        />
    </form>
</template>
<script setup lang="ts">
    import AppButton from '@/components/AppButton.vue';
    import AppInput from '@/components/AppInput.vue';
    import { store } from '@/routes/two-factor/login';
    import { useForm } from '@inertiajs/vue3';
    import { ref } from 'vue';

    const showRecoveryInput = ref<boolean>(false);

    const form = useForm({
        recovery_code: ''
    })

    const submit = () => {
        form.submit(store(), {
            preserveScroll: true,
            onFinish: () => form.reset('recovery_code'),
        });
    }
</script>