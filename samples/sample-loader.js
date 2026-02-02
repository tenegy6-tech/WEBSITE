// const fs = require('fs')

class SampleLoder{
    //  constructor() {
    //     this.navContainer = null;
    //     this.currentPage = this.getCurrentPage();
    // }
    isSample()
    {
        const path = window.location.pathname;
        if (path.includes('sample.html')) return true;
        return false
    }
    getSampleId(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const hasNumber = urlParams.has('number');
        if (!hasNumber) return -1
        const number = urlParams.get('number'); 
        return number
    }
    async loadSample(){
        if (!this.isSample()) return
        const number = this.getSampleId() 
        if (number == -1) return

        try {
            const filePath = './samples/sample' + number + 'txt';
            const text = await fs.readFile(filePath)   
            const response = await fetch('sample.html');
            const samHTML = await response.text();
            
            const paragraph = document.getElementById('paragraph');
            const textNode = document.createTextNode(text);
            paragraph.appendChild(textNode);
            tempDiv.innerHTML = navHTML;
            this.navContainer = tempDiv.firstElementChild;
            
            document.body.insertBefore(this.navContainer, document.body.firstChild);
            
            //this.setActiveState();
            
            console.log('sample loaded successfully');
        } catch (error) {
            console.error('Error loading sample:', error);
            // this.loadFallbackNavigation();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const samLoader = new SampleLoder();
    samLoader.loadSample();
});