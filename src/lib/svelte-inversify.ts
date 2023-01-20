import type { interfaces } from 'inversify/lib/interfaces/interfaces';
import { Container } from 'inversify';
import { getContext, setContext } from 'svelte';

export function getContainer() {
    return getContext<Container>(Container);
}

export function setContainer(container: Container) {
    setContext(Container, container);
}

export function getInjection<T>(key: interfaces.ServiceIdentifier<T>) {
    return getContainer().get<T>(key);
}

export function getAllInjection<T>(key: interfaces.ServiceIdentifier<T>) {
    return getContainer().getAll(key);
}

export function getOptionalInjection<T>(
    key: interfaces.ServiceIdentifier<T>,
    resolveDefault: (container: Container) => T | undefined = () => undefined
) {
    const container = getContainer();
    return container.isBound(key) ? container.get<T>(key) : resolveDefault(container);
}
