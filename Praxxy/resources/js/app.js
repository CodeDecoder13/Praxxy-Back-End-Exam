import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import 'preline';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });
        app.use(plugin)
           .use(ZiggyVue);
        
        // Initialize Preline
        app.mixin({
            mounted() {
                import('preline/dist/preline').then(module => {
                    module.default.init();
                });
            },
            updated() {
                import('preline/dist/preline').then(module => {
                    module.default.init();
                });
            }
        });

        return app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
