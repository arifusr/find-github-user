import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

interface GithubUsersResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GithubUser[];
    status: string
    message: string
}
export type GithubUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
    score: number;
};
export const UseGetUsers = () => {
    const perPage = 10

    const [query, setQuery] = useState("");

    const { data, error, isLoading, fetchNextPage } = useInfiniteQuery<GithubUsersResponse>({
        queryKey: ["users", query],
        queryFn: async ({pageParam, queryKey}) => {
            const [_, query] = queryKey
            if (query == "") {
                return {
                    total_count: 0,
                    incomplete_results: false,
                    items: [],
                    status: "",
                }
            }
            const token = localStorage.getItem('token')
            let response
            if(token){
                response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=${perPage}&page=${pageParam}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            }else{
                response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=${perPage}&page=${pageParam}`)
            }
             
            const resp = await response.json();
            return resp
        },
        initialPageParam: 0,
        getNextPageParam: (response: GithubUsersResponse, _: GithubUsersResponse[], lastPageParam) => {
            const nextPage = lastPageParam as number  + 1
            return nextPage <= response.total_count / perPage ? nextPage : undefined;
        }
    });

    const handleQueryChange = (newQuery: string) => {
        console.log(newQuery)
        setQuery(newQuery); // Update the query state with the newQuery
        fetchNextPage()
    };

    const handleNextPage = () => {
        fetchNextPage();
    };

    return { data, error, isLoading, handleQueryChange, handleNextPage };
};