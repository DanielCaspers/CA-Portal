const git = require('git-rev-sync');
const { writeFileSync } = require('fs');

const gitInfo = {
    commit: git.short(),
    branch: git.branch(),
    date: git.date(),
    message: JSON.stringify(git.message()) // stringify message to avoid newline and escaping issues
};

console.log('Git Commit Info:', gitInfo);

updateConfigFileWithGitMetadata('git-version.ts', gitInfo);

function updateConfigFileWithGitMetadata(configFilePath, gitInfo) {
    const template =
`
export const gitInfo = {
    commit: '${gitInfo.commit}',
    branch: '${gitInfo.branch}',
    date: '${gitInfo.date}',
    message: '${gitInfo.message}'
};`;

    writeFileSync(configFilePath, template);
}
