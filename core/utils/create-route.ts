interface Options {
    path: string;
    pathParams?: Record<string, string>;
    searchParams?: Record<any, any>;
}

export function createRoute(opts: Options): string {
    const paramsEntries = Object.entries(opts.pathParams ?? {});
    const routeWithMergedParams: string = paramsEntries.reduce(
        (route, item) => {
            return route.replace(`:${item[0]}`, item[1]);
        },
        opts.path,
    );
    const filteredSearchParamEntries = Object.entries(
        opts.searchParams || {},
    ).filter(([_, value]) => !!value);
    const queryParamStr: string = new URLSearchParams(
        Object.fromEntries(filteredSearchParamEntries),
    ).toString();
    return `${routeWithMergedParams}?${queryParamStr}`.replace(/[?]$/, '');
}
