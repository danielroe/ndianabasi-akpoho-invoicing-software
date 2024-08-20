import { emitter } from '../boot/EventBus';

declare module 'vue' {
  interface ComponentCustomProperties {
    $event: typeof emitter;
  }
}
