import { useQuery } from '@tanstack/react-query';

export type GithubRepoResponse = {
    id: number;
    name: string;
    html_url: string;
    stargazers_count: number;
    watchers_count: number;
    description: string;
}
export const UseGetUsersRepo = (login: string) => {
    const { data, error, isLoading, refetch } = useQuery<GithubRepoResponse[]>({
        enabled: false,
        queryKey: ["repo", { login }],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            let response
            if(token){
                response = await fetch(`https://api.github.com/users/${login}/repos`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }else{
                response = await fetch(`https://api.github.com/users/${login}/repos`);
            }
            return response.json();
        },
    });
    return { data, error, isLoading, refetch }
}