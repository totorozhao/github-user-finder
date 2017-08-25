(function () {

    let data = {
        client_id: "96539f7c1a1c3181266d",
        client_secret: "c5a25756f05e882c49cbcbeabc7c8c40ff956e6f"
    };


    let username;
    let timer;
    $('.user-name').on('keyup', function () {
        clearTimeout(timer);

        if(username === $('.user-name').val()) return ;//与上一次结果对比，相同就不再请求

        username = $('.user-name').val();

        if (username.length === 0) {
            return clear();
        };

       let fetchUser,fetchRepos;
        timer = setTimeout(async function () {

            if(fetchUser) fetchUser.abort(); //如果有前一个请求，就将该请求终止
            if(fetchRepos) fetchRepos.abort();
            try {
                fetchUser = $.ajax({url: `https://api.github.com/users/${username}`,data});
                fetchRepos  = $.ajax({url: `https://api.github.com/users/${username}/repos`,data});
                let [user, repos] = await Promise.all([fetchUser,fetchRepos]);

                window.frames[0].postMessage(username,'*'); // 向frame传数据

                showProfile(user);
                showRepos(repos);
            } catch (e) {
                clear();
            }


        }, 300);

    });

    function clear() {
        $('.info').html('');
        $('.panel').html('');
    }

    function showProfile(user) {
        $('.info').html(` <div class="card"><div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                    <img src="${user.avatar_url}" alt="Image">
                </figure>
            </div>
            <div class="media-content">
                <p> <strong>${user.name}</strong>
                </p>
                <p class="subtitle is-6">intro: <small>${user.bio}</small></p>
            </div>
            <div class="info">
                <p>关注数:  <strong>${user.following}</strong></p>
                <p>粉丝数:  <strong>${user.followers}</strong></p>
                <p>仓库数:  <strong>${user.public_repos}</strong></p>
                <p>blog:  <strong><a href="${user.blog}" >${user.blog}</a></strong></p>
            </div>
        </div>
    </div>
    <footer class="card-footer">
        <a class="card-footer-item" href="${user.html_url}" target="_blank">Github主页 </a>
    </footer></div>`);
    };

    function showRepos(repos) {
        let html = `<p class="panel-heading repo">
        <i class="octicon octicon-list-unordered"></i> repositories
    </p>
    `
        repos.sort((a, b) => {
            return b.stargazers_count - a.stargazers_count
        });
        let list = repos.map(function (repo) {
            return `<a class="panel-block panel-repo" href="${repo.html_url}" target="_blank">
            <span class="panel-icon">
                <i class="octicon octicon-repo"></i>
            </span>
            <strong >${repo.name}</strong>
            <span class="star-count">${repo.stargazers_count}</span>
            <i class="octicon octicon-star"></i>
        </a>`
        }).join("");

        $('.panel').html(html + list);
    }

    $(".view-history").click(function(){
        event.preventDefault();
        $('#history').fadeToggle();
    })

})()