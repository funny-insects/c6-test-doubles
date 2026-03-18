const githubUtils = require('./github.js');


test('doesUserExist returns true when user exists', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 200, ok: true, json: () => Promise.resolve({ login: 'username' }) });
    const userExists = await githubUtils.doesUserExist('username');
    expect(userExists).toBe(true);
});

test('getUserFollowerCount returns follower count', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 200, ok: true, json: () => Promise.resolve({ followers: 10 }) });
    const followerCount = await githubUtils.getUserFollowerCount('username');
    expect(followerCount).toBe(10);
});

test('getUserFollowerCount returns user not found', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 404, ok: false });
    await expect(githubUtils.getUserFollowerCount('nonexistent')).rejects.toThrow('User not found: nonexistent');
});

test('Does repo exist returns true when repo exists', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 200, ok: true, json: () => Promise.resolve({ name: 'repo' }) });
    const repoExists = await githubUtils.doesRepoExist('owner', 'repo');
    expect(repoExists).toBe(true);
});

test('isRepoPublic returns true when repo is public', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 200, ok: true, json: () => Promise.resolve({ private: false }) });
    const isPublic = await githubUtils.isRepoPublic('owner', 'repo');
    expect(isPublic).toBe(true);
});

test('isRepoPublic returns repo not found', async () => {
    global.fetch = jest.fn().mockResolvedValue({ status: 404, ok: false });
    await expect(githubUtils.isRepoPublic('owner', 'nonexistent')).rejects.toThrow('Repo not found: owner/nonexistent');
});