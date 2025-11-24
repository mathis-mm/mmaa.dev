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
    // Add timestamp to prevent caching issues
    const res = await fetch(`https://api.github.com/users/${username}/events/public?t=${Date.now()}`);
    if (!res.ok) throw new Error('Failed to fetch github events');
    const events = await res.json();
    
    for (const event of events) {
        const repoName = event.repo.name;
        const date = new Date(event.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        // Handle PushEvent
        if (event.type === 'PushEvent') {
            const commits = event.payload.commits;
            const branch = event.payload.ref?.replace('refs/heads/', '') || 'main';
            
            if (Array.isArray(commits) && commits.length > 0) {
                // The API lists commits in the push. The last one is the most recent 'head' of that push.
                const latestCommit = commits[commits.length - 1];
                return {
                    type: 'push',
                    repoName,
                    message: latestCommit.message || "No commit message provided",
                    url: `https://github.com/${repoName}/commit/${latestCommit.sha}`,
                    date,
                    branch
                };
            } else {
                // Fallback
                return {
                    type: 'push',
                    repoName,
                    message: `Updated branch ${branch}`,
                    url: `https://github.com/${repoName}/tree/${branch}`,
                    date,
                    branch
                };
            }
        }

        // Handle CreateEvent (Repositories)
        if (event.type === 'CreateEvent' && event.payload.ref_type === 'repository') {
             return {
                type: 'other',
                repoName,
                message: 'Created a new repository',
                url: `https://github.com/${repoName}`,
                date,
                branch: event.payload.master_branch || 'main'
             };
        }
        
        // Handle PullRequestEvent
        if (event.type === 'PullRequestEvent' && event.payload.action === 'opened') {
             return {
                type: 'other',
                repoName,
                message: `Opened PR: ${event.payload.pull_request.title}`,
                url: event.payload.pull_request.html_url,
                date,
                branch: 'PR'
             };
        }
    }
    
    return null;
  } catch (err) {
    console.warn("GitHub fetch error:", err);
    return null;
  }
};
