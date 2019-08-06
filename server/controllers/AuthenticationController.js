const cors = require('cors');
const request = require('request');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');

const AuthenticationController = {

authenticate(req, res, next) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    const clientSecret = '9S1EMrv9RU0tBZxQ'
    const clientId = '86w7mio7m9wk2e'
    const redirectUri = 'http://localhost:3000/linkedin/callback'
    const stateKey = 'linkedin_auth_state';
    var code = req.query.code || null;
    // console.log(code);
    var state = req.query.state || null;
    console.log('cookies: ', req.cookies)
    const storedState = req.cookies ? req.cookies[stateKey] : null;


    if (state === null || state !== storedState) {
        // console.log('what is happening')
        res.redirect('/#' +
        querystring.stringify({
            error: 'state_mismatch'
        }));
    } else {
        // console.log('state is not null')
        res.clearCookie(stateKey);
        var authOptions = {
        url: 'https://www.linkedin.com/oauth/v2/accessToken?',
        form: {
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic' + code
        },
        json: true
        };
        console.log('authURL set')

        request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('post request running');
            var access_token = body.access_token,
                refresh_token = body.refresh_token;
            
            //set cookie with access token
            res.cookie("access_token", access_token)
    
            // use the access token to access the LinkedIn API --ALL USER INFO
            let url = "https://api.linkedin.com/v2/me";
            let bearer = 'Bearer ' + access_token;
            fetch(url, {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                    }
            }).then(response =>response.json())
            .then(data=>{
            let firstName = data.firstName.localized.en_US;
            let lastName = data.lastName.localized.en_US;
            let country = data.lastName.preferredLocale.country;
            let language = data.lastName.preferredLocale.language;
            let id = data.id;
         //   res.cookie("userId", id);
    
            res.locals.doc = { firstName, lastName, country, language, id } ;
            console.log(res.locals)
            console.log('------------- API fetch request')
            console.log(data)
                // res.json(data.businesses);
                // console.log(data.businesses[0])

            // use the access token to access the LinkedIn API --IMAGE
            let imageFetchURL = "https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))";
            // let bearer = 'Bearer ' + access_token;
            fetch(imageFetchURL, {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    }
            }).then(response =>response.json())
            .then(data=>{
            // console.log(data)
            let imageURL = data.profilePicture["displayImage~"].elements[0].identifiers[0].identifier;
            console.log('------------- API fetch request')
            console.log(imageURL)
            res.locals.doc.imageURL = imageURL;

res.cookie("userId", res.locals.doc.id);
            return next();
            }).catch(err=>{
                console.log("Error fetching user information from LinkedIn", err)
            })})
    
            // we can also pass the token to the browser to make requests from there
            // res.redirect('/#' +
            // querystring.stringify({
            //     access_token: access_token,
            //     refresh_token: refresh_token
            // }));
            // return next();

        } else {
            res.redirect('/#' +
            querystring.stringify({
                error: 'invalid_token'
            }));
        }
        });
    }
}
}    

module.exports = AuthenticationController;