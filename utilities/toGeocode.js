const opencage = require('opencage-api-client');

const toGeocode = async location => {
    return await opencage.geocode({ q: location, key: process.env.OCD_API_KEY })
        .then(res => { return JSON.stringify(res) })
        .then(data => {
            const d = JSON.parse(data)
            if (d.status.code == 200) {
                if (d.results.length > 0) {
                    return {
                        lat: d.results[0].geometry.lat,
                        lng: d.results[0].geometry.lng,
                        formattedLocation: d.results[0].formatted
                    }
                }
            } else if (d.status.code == 402) {
                console.log('hit free-trial daily limit');
                console.log('become a customer: https://opencagedata.com/pricing');
            } else {
                console.log('error', d.status.message);
            }
        })
        .catch(error => {
            console.log('error', error.message);
        });
}

module.exports = toGeocode;