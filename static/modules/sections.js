import moment from 'moment';
import 'moment/locale/nl-be';
import {node, fetchAPI, Element} from 'cutleryjs';
import {sesam} from 'sesam-collapse';

const clock = {
    init() {
        clock.display();
        setInterval(clock.display, 2000)
    },
    
    settings() {
        return {
            
        }
    },    
    
    compose() {    
        const now = moment();    
        return `<span class="clock__hh">${now.format('HH')}</span><span class="clock__divider">:</span><span class="clock__mm">${now.format('mm')}</span><span class="clock__ss"></span>`;
    },
    
    display() {
        console.log('display')
        const $clock = node('[data-section="clock"] > .clock');
        $clock.innerHTML = clock.compose()
    }
}

const weather = {   
    async init() {
        console.log('initialized')
        const response = await weather.getByCoords()
        weather.display(response);
    },
    
    getLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                console.log('geolocatie werkt');
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position)
                });
            } else {
                reject({error: 'browser is too old'});
            }
        })
    },
    
    getByCoords() {        
        return weather.getLocation().then(async response => {
            // console.log(response);
            return await fetchAPI.json(`https://api.openweathermap.org/data/2.5/weather?lat=${response.coords.latitude}&lon=${response.coords.longitude}&appid=b4e6a074079d25dcf601b6981bbfde50&units=metric&lang=nl`)
        })
    },
    
    compose(data) {
        const now = moment().local('nl-be');
        
        return `
            <div class="details__day">${now.format('dddd, D MMM')} </div>
            <div class="details__devider"> | </div>
            <div class="details__weather weather d-flex align-items-center align-content-center">
                <i class='bx bxs-sun'></i> ${Math.ceil(data.main.temp)}°C
            </div>
        `
    },
    
    display(data) {
        const $weather = node('[data-section="details"] .details');
        
        $weather.innerHTML = weather.compose(data);
    },
    
    cache() {
        // cache city
    }
}

const search = {
    async do(formData) {
        const $searchResults = node('[data-section="search"] .search-results');   
             
        $searchResults.classList.add('animate__fadeInUp')
        
        sesam({
            target: 'searchCollapse',
            action: 'show',
            modal: {
                backdrop: true
            }
        })

        const query = formData.get('query');
        const resultsData =  await fetchAPI.json(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDfIB_kua_hd8VLeIzKGOoTWJQihAM9ouw&cx=009271218045259039608:9chrbhrnk50&q=${query}&num=4`);
        search.display(resultsData, query);
        
        
        // + more results button -> link to google
    },
    
    render(data) {
        const $item = new Element('a');
        
        $item.class(['result', 'flex-grid__item'])
        $item.attributes([
            ['href', data.href]
        ])
        
        $item.inner(`
            <div class="result__thumb">
                <img src="${data.thumb}">
            </div>
            <div class="d-flex flex-column">
                <span class="result__domain">${data.domain}</span>
                <span class="result__title">${data.title}</span>
                <!-- <span class="result__snippet">${data.snippet}</span> -->
            </div>
        `);
        
        $item.append('[data-section="search"] .search-results .flex-grid__wrapper')
    },
    
    async display(resultsData, query) {
        const $loader = node('[data-section="search"] .search-results .spinner-border');

        await resultsData.items.forEach((result, index) => {
            if (index == 0) $loader.remove();
            
            const resultData = {
                domain: result.displayLink,
                title: result.title,
                href: result.formattedUrl,
                snippet: result.snippet,
                thumb: search.detectThumbnail(result, query)[0].src
            }
            
            search.render(resultData);
        });
    },
    
    detectThumbnail(data, query) {
        const noResult = [{
            src: `https://source.unsplash.com/200x200/?${query}`,
            height: 200,
            width: 200
        }]
        
        if (!data.pagemap) return noResult
        if (data.pagemap.cse_thumbnail || data.pagemap.cse_image) return data.pagemap.cse_thumbnail || data.pagemap.cse_image
        return noResult
    }
}

export {
    clock,
    weather,
    search
}