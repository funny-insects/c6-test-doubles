const githubUtils = require('./github.js');
jest.mock('./github.js')

test('fetchJSON returns JSON object from GH API', async () => {
    const mockResponse = {'login': 'username'};
    githubUtils.fetchJSON.mockResolvedValue(mockResponse);
    const userExists = await githubUtils.doesUserExist('username');
    expect(userExists == true);
});
