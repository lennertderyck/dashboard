import {clock, weather, search} from './static/modules/sections';
import {eventCallback, getFormData, node} from 'cutleryjs';
import {sesamCollapse, sesam} from 'sesam-collapse';

const app = {
    init() {
        sesamCollapse.initialize();
        app.listeners();
        
        // sections
        clock.init();
        weather.init();
    },
    
    reload() {
        
    },
    
    listeners() {
        document.addEventListener('click', (event) => {
            eventCallback('[data-label="sesamBackdrop"]', () => {
                sesam({
                    target: 'searchCollapse',
                    action: 'hide',
                    modal: {
                        backdrop: false
                    }
                }, search.reset)
            }, false)
        })
        
        document.addEventListener('submit', (event) => {
            event.preventDefault();
            
            eventCallback('[data-form="searchEngine"]', (target) => {
                const formData = getFormData(target);
                search.do(formData);
                
                const $moreResults = node('[data-label="moreResults"]')
                $moreResults.href = `https://google.be/search?q=${formData.get('query')}`
            }, false)
        })
    }
}

app.init();