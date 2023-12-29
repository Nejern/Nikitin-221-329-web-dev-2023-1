function createAuthorElement(record) {
    const user = record.user || { 'name': { 'first': '', 'last': '' } };
    const authorElement = document.createElement('div');
    authorElement.classList.add('author-name');
    authorElement.innerHTML = user.name.first + ' ' + user.name.last;
    return authorElement;
}

function createUpvotesElement(record) {
    const upvotesElement = document.createElement('div');
    upvotesElement.classList.add('upvotes');
    upvotesElement.innerHTML = record.upvotes;
    return upvotesElement;
}

function createFooterElement(record) {
    const footerElement = document.createElement('div');
    footerElement.classList.add('item-footer');
    footerElement.append(createAuthorElement(record));
    footerElement.append(createUpvotesElement(record));
    return footerElement;
}

function createContentElement(record) {
    const contentElement = document.createElement('div');
    contentElement.classList.add('item-content');
    contentElement.innerHTML = record.text;
    return contentElement;
}

function createListItemElement(record) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('facts-list-item');
    itemElement.append(createContentElement(record));
    itemElement.append(createFooterElement(record));
    return itemElement;
}

function renderRecords(records) {
    const factsList = document.querySelector('.facts-list');
    factsList.innerHTML = '';
    for (let i = 0; i < records.length; i++) {
        factsList.append(createListItemElement(records[i]));
    }
}

function setPaginationInfo(info) {
    document.querySelector('.total-count').innerHTML = info.total_count;
    const start = info.total_count &&
        (info.current_page - 1) * info.per_page + 1;
    document.querySelector('.current-interval-start').innerHTML = start;
    const end = Math.min(info.total_count, start + info.per_page - 1);
    document.querySelector('.current-interval-end').innerHTML = end;
}

function createPageBtn(page, classes = []) {
    const btn = document.createElement('button');
    classes.push('btn');
    for (cls of classes) {
        btn.classList.add(cls);
    }
    btn.dataset.page = page;
    btn.innerHTML = page;
    return btn;
}

function renderPaginationElement(info) {
    let btn;
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    btn = createPageBtn(1, ['first-page-btn']);
    btn.innerHTML = 'Первая страница';
    if (info.current_page == 1) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('pages-btns');
    paginationContainer.append(buttonsContainer);

    const start = Math.max(info.current_page - 2, 1);
    const end = Math.min(info.current_page + 2, info.total_pages);
    for (let i = start; i <= end; i++) {
        btn = createPageBtn(i, i == info.current_page ? ['active'] : []);
        buttonsContainer.append(btn);
    }

    btn = createPageBtn(info.total_pages, ['last-page-btn']);
    btn.innerHTML = 'Последняя страница';
    if (info.current_page == info.total_pages) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);
}

function downloadData(page = 1) {
    const factsList = document.querySelector('.facts-list');
    const url = new URL(factsList.dataset.url);
    const perPage = document.querySelector('.per-page-btn').value;
    const q = document.querySelector('.search-field').value;
    url.searchParams.append('page', page);
    url.searchParams.append('per-page', perPage);
    url.searchParams.append('q', q);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRecords(this.response.records);
        setPaginationInfo(this.response['_pagination']);
        renderPaginationElement(this.response['_pagination']);
    };
    xhr.send();
}

function perPageBtnHandler(_event) {
    downloadData(1);
}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        downloadData(event.target.dataset.page);
        window.scrollTo(0, 0);
    }
}

function searchBtnHandler() {
    const searchField = document.querySelector('.search-field');
    const searchQuery = searchField.value.trim();
    const factsList = document.querySelector('.facts-list');
    const url = new URL(factsList.dataset.url);
    const perPage = document.querySelector('.per-page-btn').value;
    url.searchParams.append('page', 1);
    url.searchParams.append('per-page', perPage);
    url.searchParams.append('q', searchQuery);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRecords(this.response.records);
        setPaginationInfo(this.response['_pagination']);
        renderPaginationElement(this.response['_pagination']);
    };
    xhr.send();
}

function showAutocompleteSuggestions(suggestions) {
    const autocompleteDropdown = document.querySelector(
        '.autocomplete-dropdown',
    );
    autocompleteDropdown.innerHTML = '';

    suggestions.forEach((suggestion) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('autocomplete-item');
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', () => {
            document.querySelector('.search-field').value = suggestion;
            autocompleteDropdown.innerHTML = '';
        });
        autocompleteDropdown.appendChild(suggestionItem);
    });

    autocompleteDropdown.style.display = 'block';
}

function autocomplete(query) {
    const acUrl =
        'http://cat-facts-api.std-900.ist.mospolytech.ru/autocomplete?q=' +
        query;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', acUrl);
    xhr.responseType = 'json';
    xhr.onload = function () {
        const suggestions = this.response;
        showAutocompleteSuggestions(suggestions);
    };
    xhr.send();
}

function autocompleteHandler() {
    const searchField = document.querySelector('.search-field');

    const query = searchField.value.trim();
    if (query !== '') {
        autocomplete(query);
    } else {
        document.querySelector('.autocomplete-dropdown').style.display = 'none';
    }
}

window.onload = function () {
    downloadData();
    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('.per-page-btn').onchange = perPageBtnHandler;

    document.querySelector('.search-btn').onclick = searchBtnHandler;
    document.querySelector('.search-field').addEventListener(
        'input',
        autocompleteHandler,
    );
};
