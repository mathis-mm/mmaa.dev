
export interface GithubActivity {
  type: 'push' | 'other';
  repoName: string;
  message: string;
  url: string;
  date: string;
  branch: string;
}

export const fetchLatestActivity = async (username: string): Promise<GithubActivity | null> => {
  try {
    // STRAT 1
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?t=${Date.now()}`);
    
    if (eventsRes.ok) {
        const events = await eventsRes.json();
        
        for (const event of events) {
            const repoName = event.repo.name;
            const date = new Date(event.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            if (event.type === 'PushEvent') {
                const branch = event.payload.ref?.replace('refs/heads/', '') || 'main';
                const commits = event.payload.commits;
                
                if (Array.isArray(commits) && commits.length > 0) {
                    const latestCommit = commits[commits.length - 1];
                    return {
                        type: 'push',
                        repoName,
                        message: latestCommit.message,
                        url: `https://github.com/${repoName}/commit/${latestCommit.sha}`,
                        date,
                        branch
                    };
                } 
                else if (event.payload.head) {
                    try {
                        const commitRes = await fetch(`https://api.github.com/repos/${repoName}/commits/${event.payload.head}`);
                        if (commitRes.ok) {
                            const commitData = await commitRes.json();
                            return {
                                type: 'push',
                                repoName,
                                message: commitData.commit.message,
                                url: commitData.html_url,
                                date,
                                branch
                            };
                        }
                    } catch (e) {
                        console.warn("Failed to fetch specific commit details, skipping event.");
                    }
                }
            }
        }
    }
    
    // STRAT2
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=1&t=${Date.now()}`);
    if (!reposRes.ok) return null;
    
    const repos = await reposRes.json();
    if (!repos || repos.length === 0) return null;
    
    const latestRepo = repos[0];
    const fullRepoName = latestRepo.full_name;
    
    const commitsRes = await fetch(`https://api.github.com/repos/${fullRepoName}/commits?per_page=1&t=${Date.now()}`);
    if (!commitsRes.ok) return null;
    
    const commits = await commitsRes.json();
    if (!commits || commits.length === 0) return null;
    
    const latestCommit = commits[0];
    
    return {
        type: 'push',
        repoName: fullRepoName,
        message: latestCommit.commit.message,
        url: latestCommit.html_url,
        date: new Date(latestCommit.commit.author.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        branch: latestRepo.default_branch
    };

  } catch (err) {
    console.warn("GitHub fetch error:", err);
    return null;
  }
};
