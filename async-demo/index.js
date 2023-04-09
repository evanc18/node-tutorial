
// Example of async. The setTimeout is async and the 'after' will show up before it
console.log('Before');
getUser(1, getRepos);
console.log('After');

function getRepos(user){
    getRepos(user.gitHubUsername, getCommits);
}

function getCommits(repo) {
    getCommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log(commits)
}

function getUser(id, callback) {
    setTimeout(() => {
    console.log('Reading a user from db...');
    callback({ id: id, gitHubUsername: 'evan' });
}, 2000);

//return 1;
}



//We need callback, promise, or await
