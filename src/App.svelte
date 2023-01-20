<script lang="ts">
    import Router from 'svelte-spa-router';
    import Home from './Home.svelte';
    import Redirect from './Redirect.svelte';

    const routes = {
        '/': Home,
        '*': Redirect,
    };
</script>

<Router {routes} />
