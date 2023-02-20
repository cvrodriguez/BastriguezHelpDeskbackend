const { TOKEN_AUTH0 } = require("../constants");
const { Router } = require("express");
const axios = require('axios')
const router = new Router


const auth0ApiUrl = 'https://dev-3ugne2hhrxoqqfdi.us.auth0.com/api/v2';
const connection ="Username-Password-Authentication"
const headers= {"Accept-Encoding": "*", authorization: `Bearer ${TOKEN_AUTH0}`,'Content-Type': 'application/json' }

const options = {
    method: 'GET',
    url: `${auth0ApiUrl}/users`,
    params: { search_engine: 'v3' },
    headers: { "Accept-Encoding": "*", authorization: `Bearer ${TOKEN_AUTH0}` }
}


router.get('/', async (req, res, next) => {

    try {
        const response = await axios.request(options)
        res.json(response.data)
    } catch (error) {
        console.log(error)
        res.status(500)
    }

})

router.get('/:id', async (req, res, next) => {

    try {
        const id = req.params.id
        const loginData = {
            method: 'GET',
            url: `${auth0ApiUrl}/users/${id}`,
            headers: headers
        }

        const response = await axios.request(loginData)
        res.json(response.data)
        
    } catch (error) {
        console.log(error)
        res.status(500)
    }

})

router.post('/', async (req, res, next)=>{
    try {
    const {email,password, name, given_name, family_name, nickname } = req.body
    // console.log("request body", req.body)
   
    
    const body = {
        "email": email,
        // "user_metadata": {},
        // "blocked": false,
        // "email_verified": false,
        // "app_metadata": {},
        "given_name": given_name,
        "family_name": family_name,
        "name": name,
        "nickname": nickname,
        "picture": "https://secure.gravatar.com/avatar/15626c5e0c749cb912f9d1ad48dba440?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png",
        "connection": connection,
        "password": password,
        // "verify_email": false
      };

      console.log("body", body)


    const response = await axios.post(`${auth0ApiUrl}/users`, body, { headers})
    // console.log("post response", response)
    res.json(response.data)
    } catch (e){
        console.log(e.message)
        next(e)
    }
})

module.exports = router;