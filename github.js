const BASE_URL = "https://api.github.com";

async function fetchJSON(url) {
  const response = await fetch(url);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  return response.json();
}

async function doesUserExist(username) {
  const data = await fetchJSON(`${BASE_URL}/users/${username}`);
  return data !== null;
}

async function getUserFollowerCount(username) {
  const data = await fetchJSON(`${BASE_URL}/users/${username}`);
  if (data === null) throw new Error(`User not found: ${username}`);
  return data.followers;
}

async function doesRepoExist(owner, repo) {
  const data = await fetchJSON(`${BASE_URL}/repos/${owner}/${repo}`);
  return data !== null;
}

async function isRepoPublic(owner, repo) {
  const data = await fetchJSON(`${BASE_URL}/repos/${owner}/${repo}`);
  if (data === null) throw new Error(`Repo not found: ${owner}/${repo}`);
  return data.private === false;
}

module.exports = { doesUserExist, getUserFollowerCount, doesRepoExist, isRepoPublic };
