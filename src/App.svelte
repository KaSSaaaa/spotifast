<script lang="ts">
    import Router from 'svelte-spa-router';
    import Home from './Home.svelte';
    import Redirect from './Redirect.svelte';
    import { setContainer } from './lib/svelte-inversify';
    import { createContainer } from './lib/Container';

    setContainer(createContainer());

    const routes = {
        '/': Home,
        '*': Redirect,
    };
</script>

<Router {routes} />
