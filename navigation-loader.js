class NavigationLoader {
    constructor() {
        this.navContainer = null;
        this.currentPage = this.getCurrentPage();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('razdel.html')) return 'razdel';
        if (path.includes('structure.html')) return 'structure';
        if (path.includes('obrazcy.html')) return 'obrazcy';
        if (path.includes('books.html')) return 'books';
        if (path.includes('criteria.html')) return 'criteria';
        return 'index';
    }

    async loadNavigation() {
        try {
            const response = await fetch('navigation.html');
            const navHTML = await response.text();
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = navHTML;
            this.navContainer = tempDiv.firstElementChild;
            
            document.body.insertBefore(this.navContainer, document.body.firstChild);
            
            this.setActiveState();
            
            console.log('Navigation loaded successfully');
        } catch (error) {
            console.error('Error loading navigation:', error);
            this.loadFallbackNavigation();
        }
    }

    setActiveState() {
        const links = this.navContainer.querySelectorAll('.nav__link');
        links.forEach(link => {
            if (link.getAttribute('data-page') === this.currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    loadFallbackNavigation() {
        const fallbackNav = `
            <nav class="nav">
                <div class="nav__header">
                    <h1 class="nav__title">TwoeSochinenie.ru</h1>
                    <p class="nav__subtitle">Навигатор</p>
                </div>
                
                <div class="nav__menu">
                    <ul class="nav__list">
                        <li class="nav__item">
                            <a href="index.html" class="nav__link ${this.currentPage === 'index' ? 'active' : ''}">
                                <span class="nav__link-icon">🏠</span>
                                Главная
                            </a>
                        </li>
                        <li class="nav__item">
                            <a href="structure.html" class="nav__link ${this.currentPage === 'structure' ? 'active' : ''}">
                                <span class="nav__link-icon">📑</span>
                                Структура
                            </a>
                        </li>
                        <li class="nav__item">
                            <a href="criteria.html" class="nav__link ${this.currentPage === 'criteria' ? 'active' : ''}">
                                <span class="nav__link-icon">📊</span>
                                Критерии
                            </a>
                        </li>
                        <li class="nav__item">
                            <a href="obrazcy.html" class="nav__link ${this.currentPage === 'obrazcy' ? 'active' : ''}">
                                <span class="nav__link-icon">📝</span>
                                Образцы
                            </a>
                        </li>

                        <li class="nav__item">
                            <a href="books.html" class="nav__link ${this.currentPage === 'books' ? 'active' : ''}">
                                <span class="nav__link-icon">📖</span>
                                Список литературы
                            </a>
                        </li>
                        <li class="nav__item">
                            <a href="razdel.html" class="nav__link ${this.currentPage === 'razdel' ? 'active' : ''}">
                                <span class="nav__link-icon">📚</span>
                                Разделы
                            </a>
                        </li>
                    </ul>
                </div>
                        
                <div class="nav__footer">
                    <a href="about.html" class="nav__footer-link">О сайте</a>
                </div>
            </nav>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', fallbackNav);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navLoader = new NavigationLoader();
    navLoader.loadNavigation();
});