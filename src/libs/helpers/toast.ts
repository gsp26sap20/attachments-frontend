import { useAppStore, type ToastPlacement } from '@/stores/app-store';

function toast(text: string, options?: { placement?: ToastPlacement; duration?: number }) {
  useAppStore.getState().showToast(text, options);
}

export { toast };
