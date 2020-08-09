import moment from 'moment';
import 'moment/locale/nl-be';
import {node, fetchAPI, Element} from 'cutleryjs';
import {sesam} from 'sesam-collapse';
import {LocalDB} from './utils'

const savedCoords = new LocalDB('savedCoords');

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
        console.log(savedCoords.getData());
        
        weather.getByCoords().then(response => {
            weather.display(response);
        })
    },
    
    getLocation() {        
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    // savedCoords.add(position);
                    resolve(position)
                    savedCoords.add({
                        coords: {
                            longitude: position.coords.longitude,
                            latitude: position.coords.latitude
                        }
                    });
                }, (err) => {
                    if (savedCoords.exist() != false && savedCoords.count() != 0) resolve(savedCoords.getData()[0])
                    else reject({error: 'time out'}) & console.error(err);
                },{
                    maximumAge: 60000, 
                    timeout: 1000, 
                    enableHighAccuracy:true
                });
            } else {
                reject({error: 'browser is too old'});
            }
        })
        
    },
    
    async getByCoords() {    
        const response = await weather.getLocation();
        console.log(response)
        if (!response.error) return await fetchAPI.json(`https://api.openweathermap.org/data/2.5/weather?lat=${response.coords.latitude}&lon=${response.coords.longitude}&appid=b4e6a074079d25dcf601b6981bbfde50&units=metric&lang=nl`)
    },
    
    compose(data) {
        const now = moment().local('nl-be');
        return `
            <div class="details__day">${now.format('dddd, D MMM')} </div>
            <div class="details__devider"> | </div>
            <div class="details__weather weather d-flex align-items-center align-content-center">
                ${weather.getCondition(data.weather[0].icon)} ${Math.ceil(data.main.temp)}°C in ${data.name}
            </div>
        `
    },
    
    display(data) {
        const $weather = node('[data-section="details"] .details');
        $weather.innerHTML = weather.compose(data);
    },
    
    cache() {
        // cache city
    },
    
    getCondition(code) {
        return {
            '01d': '<i class="bx bxs-sun"></i>',
            '02d': '<i class="bx bx-cloud"></i>',
            '03d': '<i class="bx bxs-cloud"></i>',
            '04d': '<i class="bx bxs-cloud"></i>',
            '09d': '<i class="bx bx-cloud-rain"></i>',
            '10d': '<i class="bx bx-cloud-rain"></i>',
            '11d': '<i class="bx bx-cloud-lightning"></i>',
            '13d': '<i class="bx bx-cloud-snow"></i>',
            '50d': '<i class="x bx-water"></i>',
            '01n': '<i class="bx bxs-sun"></i>',
            '02n': '<i class="bx bx-cloud"></i>',
            '03n': '<i class="bx bxs-cloud"></i>',
            '04n': '<i class="bx bxs-cloud"></i>',
            '09n': '<i class="bx bx-cloud-rain"></i>',
            '10n': '<i class="bx bx-cloud-rain"></i>',
            '11n': '<i class="bx bx-cloud-lightning"></i>',
            '13n': '<i class="bx bx-cloud-snow"></i>',
            '50n': '<i class="x bx-water"></i>',
            
        }[code];
    }
}

const search = {
    async do(formData) {        
        const $searchResults = node('[data-label="searchResults"]');   
             
        $searchResults.classList.remove('animate__fadeOutDown');
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
        console.log(resultsData);
        if (resultsData.items) search.display(resultsData, query);
        else search.error();  
        
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
                <div class="result__domain">
                    <span class="result__favicon"><img src="https://www.google.com/s2/favicons?sz=64&domain_url=${data.domain}"></span>
                    <span class="result__domain-name">${data.domain}</span>
                </div>
                <span class="result__title">${data.title}</span>
                <!-- <span class="result__snippet">${data.snippet}</span> -->
            </div>
        `);
        
        $item.append('[data-label="searchResults"] .flex-grid__wrapper')
    },
    
    async display(resultsData, query) {
        const $loader = node('[data-label="searchResults"] .spinner-border');

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
        if (data.pagemap.metatags[0]["og:image"]) return {
            src: data.pagemap.metatags[0]["og:image"],
            height: data.pagemap.metatags[0]["og:image:height"],
            width: data.pagemap.metatags[0]["og:image:width"]
        }
        return noResult
    },
    
    reset() {
        const $results = node('[data-label="searchResults"]');
        const $wrapper = node('[data-label="searchResults"] .search-results__wrapper');
        
        $results.classList.remove('animate__fadeInUp');
        $results.classList.add('animate__fadeOutDown');
        
        $wrapper.innerHTML = `
        <div class="spinner-border d-block mx-auto mb-4" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div class="flex-grid__wrapper">
        </div>
        `;
    },
    
    error() {
        const $wrapper = node('[data-label="searchResults"] .search-results__wrapper');
        
        $wrapper.outerHTML = `
            <img class="d-block mx-auto" src="https://memegenerator.net/img/instances/55452028/error-404-page-not-found.jpg" width="200px">
        `;
    }
}

const messenger = {
    getLast() {
        const url = `https://graph.facebook.com/v8.0/me/messages?access_token=EAAKr2eZBRbBsBAFOEQ8qJ0SrP0uYZBWZCoY44cQvjA3iZC3n1O0kNFj6WNjnee6v4LkzZA490ipj0g4FGUW5sDR32fEyYfkZBqZAD8bIM7FqZCzlt0Ex4MseWMlQRs2MqWaZA4Ku0SxPZCwAo54NZB3y7gcRGqzZC0nt1niyFxUppKLqbDgI5yDeRc0X7jepMnu8NRoZD`
        fetchAPI.json('')
        
    }
}

export {
    clock,
    weather,
    search
}