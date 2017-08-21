(function () {

    let data = {
        client_id: '',
        client_secret: ''
    };

    let username;
    $('.user-name').on('keyup', function () {
        username = $('.user-name').val();
        if (username.length === 0) return;


        $.ajax({
                url: `https://api.github.com/users/${username}`,
                data
            })
            .then(function (user) {
                showProfile(user);
            })

        $.ajax({
                url: `https://api.github.com/users/${username}/repos`,
                data
            })
            .then(function (repos) {
                showRepos(repos);
            })



    });

    function showProfile(user) {
        $('.card').html(` <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                    <img src="${user.avatar_url}" alt="Image">
                </figure>
            </div>
            <div class="media-content">
                <p> <strong>${user.name}</strong>
                </p>
                <p class="subtitle is-6">自我介绍: <small>${user.bio}</small></p>
            </div>
            <div class="info">
                <p>关注数:<strong>${user.following}</strong></p>
                <p>粉丝数:<strong>${user.followers}</strong></p>
                <p>仓库数:<strong>${user.public_repos}</strong></p>
                <p>blog:<strong>${user.blog}</strong></p>
            </div>
        </div>
    </div>
    <footer class="card-footer">
        <a class="card-footer-item" href="${user.html_url}" target="_blank">Github主页 </a>
    </footer>`);
    };

    function showRepos(repos) {
        let html = `<p class="panel-heading repo">
        <i class="octicon octicon-list-unordered"></i> repositories
    </p>
    `
        let list = repos.map(function (repo) {
            return `<a class="panel-block panel-repo" href="${repos.html_url}" target="_blank">
            <span class="panel-icon">
                <i class="octicon octicon-repo"></i>
            </span>
            <strong >${repos.name}</strong>
            <span class="star-count">${repos.stargazers_count}</span>
            <i class="octicon octicon-star"></i>
        </a>`
        }).join("");

        $('.repos').html(html + list);
    }

})()