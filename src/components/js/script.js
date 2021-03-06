const container = document.querySelector('.wrap');
const spiner = document.querySelector('.item');
const getButton = document.querySelector('.getButton');
const title = document.querySelector('h3');

VK.init({
    apiId: 8077206,
    status: true
});

const addPost = function (text, date) {
    const newPost = document.createElement('p');
    const postDate = document.createElement('span');
    
    postDate.textContent = new Date(date * 1000).toLocaleString("ru", {dateStyle: "medium", timeStyle: "short"});
    newPost.innerHTML = text;
    
    newPost.prepend(postDate);
    container.append(newPost);
}

const formatingText = function (text) {
    const regex = /\n/gi;
    return text.replace(regex, '<br>')
}


const getPosts = function(plusPosts = 0) {
    VK.Api.call('wall.get', {owner_id: -19853844, v:"5.81", count: 5, offset: [plusPosts]}, function(r) {
        title.textContent = "Последние записи сообщества Дневник.ру"
        
        if (r.response) {
            r.response.items.map(function(item) { 
                if (item.text != "") {
                    const formatText = formatingText(item.text);
                    addPost(formatText, item.date);
                }   
            });
        
            spiner.style.display = 'none';
            getButton.style.display = 'block';
        } else { 
            spiner.style.display = 'none';
            container.textContent = 'Извините, сервер недоступен';
        }    
    });  
}


const getStatus = function() {
    VK.Auth.getLoginStatus(function(e) {
        if (e.status === 'unknown') {
            title.textContent = "Авторизируйтесь, чтобы получить последние записи сообщества Дневник.ру"
            VK.UI.button('button');
            spiner.style.display = 'none';
            const buttonVK = document.querySelector('#button');
            buttonVK.addEventListener('click', function() {
                VK.Auth.login(function(data) {
                    if (data.status === "connected") {
                        spiner.style.display = "block";
                        buttonVK.style.display = "none";
                        getPosts();
                    } else if (data.status === "unknown") {
                        title.textContent = "Неудачная авторизация, попробуйте ещё раз";
                    } else if (data.status === "not_authorized") {
                        title.textContent = "Разрешите доступ к приложению";
                    } 
                })
            })
        } else {
            spiner.style.display = "block";
            getPosts();
        };
    });
}




getStatus();

getButton.addEventListener('click', function(e) {
    const count = container.querySelectorAll('p').length;
    spiner.style.display = "block";
    getPosts(count);
});










