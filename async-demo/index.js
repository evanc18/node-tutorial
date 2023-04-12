
// Example of promise stacking
console.log('Before');
getUser(1)
  .then(user => getRepos(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => displayCommits(commits))
  .catch(err => console.log('Error', err.message))
console.log('After');

//Example of async/await
async function displayCommits(){
    try{
        const user = await getUser(1);
        const repos = await getRepos(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log('Error', err.message);
    }
}

function getRepos(user){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000);
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit'])
        }, 2000);
    })
}

function displayCommits(commits) {
    console.log(commits)
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from db...');
            resolve({ id: id, gitHubUsername: 'evan' });
        }, 2000);
    });
    

//return 1;
}



//We need callback, promise, or await
