export function sortItemsByDateDesc(itemA: any, itemB: any) {
    const dateA = new Date(itemA.pubDate || itemA.data?.pubDate || 0).getTime();
    const dateB = new Date(itemB.pubDate || itemB.data?.pubDate || 0).getTime();
    return dateB - dateA;
}

export function createSlugFromTitle(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export function getAllTags(posts: any[]) {
    const tags: string[] = [...new Set(posts.flatMap((post) => post.tags || post.data?.tags || []).filter(Boolean))];
    return tags
        .map((tag) => {
            return {
                name: tag,
                id: createSlugFromTitle(tag)
            };
        })
        .filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
        });
}

export function getPostsByTag(posts: any[], tagId: string) {
    const filteredPosts: any[] = posts.filter((post) => (post.tags || post.data?.tags || []).map((tag: string) => createSlugFromTitle(tag)).includes(tagId));
    return filteredPosts;
}

export const withBase = (path: string) => {
    const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${cleanPath}`;
};