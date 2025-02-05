describe("Http Request",()=>{
    it("get method",()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts/1')
          .its('status')
           .should('equal',200);

    })

    it("Post method",()=>{   // method and url put them curly brace ()
        cy.request({ method:'POST'  ,
                     url    : "https://jsonplaceholder.typicode.com/posts/ " ,
                     body :{
                        title : "test passs",
                        body : "this is post call",
                        userid :1
                     } 
                  })
                  .its('status')
                    .should('equal',201)
    })

    it("Put method",()=>{
        cy.request({ method:'Put'  ,                                                      // type of request
                     url    : " https://jsonplaceholder.typicode.com/posts/1" ,            // url
                     body :{                                                                // body
                        title : "test pass-updated",
                        body : "this is put call",
                        userid :,
                        id:1
                     } 
                  })
                  .its('status')
                    .should('equal',201)
    })

    it("Delete method",()=>{

        cy.request({ method:'Delete'  ,
                     url    : "https://jsonplaceholder.typicode.com/posts/1 " ,      
                  })
                  .its('status')     
                    .should('equal',200)
    })


})
// different ways to create post request

describe("API testing ",()=>{

    it("approach1--Hard coded json Object1",()=>{
        const requestBody ={   // this is basically json object
            tname ="mike",
            temail ="john1234@gmail.com",
            tlocation = "paris"

        }

        cy.request({      // post request
            method :'post',
            ulr :'http://restapi.adequateshop.com/api/Tourist',
            body :requestBody

        }).then((Response)=>{
            expect(Response.status).to.eq(201)
            expect(Response.body.tname).to.eq("mike")
            expect(Response.body.temail).to.eq("mike@gmail.com")
            expect(Response.body.tlocation).to.eq("paris")
        })
    })
//approach2 dynamically generating Json Object

it("approach2 dynamically generating Json Object",()=>{

    const requestBody ={
        tname =Math.random().toString(5).substring(2),
        temail =Math.random().toString(5).substring(2)+"@gmail.com",
        tlocation =paris
    }
    cy.request({      // post request
        method :'post',
        ulr :'url',
        body :requestBody

    }).then((Response)=>{     // here we are validating the data of the particular property
        expect(Response.status).to.eq(201)
        expect(Response.body.tname).to.eq(requestBody.tname)
        expect(Response.body.temail).to.eq(requestBody.temail)
        expect(Response.body.tlocation).to.eq(requestBody.tlocation)
    })
})

//approach-3 fixture concept
/*instead of writting the body here we will get this data from the fixture file (folder) cypress itself by default touriest.json (file)
  touriest.json(file) {
  tname :"john",
  temail:john123@gmail.com
  tlocation :"london"}
*/
it("Approach -using fixture",()=>{
                //storing into data(Data)
    cy.fixture('touriest').then( (Data)  =>{
     const requestBody = data;  //assign data variable into request body

     cy.request({      // passing request
        method :'post',
        ulr :'url',
        body :requestBody

    }).then((Response)=>{
      // assertions
        expect(Response.status).to.eq(201)
        expect(Response.body.tname).to.eq(requestBody.tname)
        expect(Response.body.temail).to.eq(requestBody.temail)
        expect(Response.body.tlocation).to.eq(requestBody.tlocation)
      // here we are validating property availability along with the data
      // property in the response 
        expect(Response.body.tname).has.property('tname',requestBody.tname)
        expect(Response.body.temail).to.have.property('temail',requestBody.temail)
        expect(Response.body.tlocation ).to.have.property('tlocation',requestBody.tlocation)
    })
    })

})
})

describe("passing  query parameter",()=>{

   // const queryparam ={page :2 }  another way
    cy.request({
        method :"get",
        url : "https://reqres.in/api/users ",
        qs :{page :2}  // request query parameter
       // qs:queryparam 
    }).then((response)=>{
        expect(Response.status).to.eq(200)
        //or
        expect(Response.status).equal(200)

        expect(Response.body.data).has.length(6)
        expect(Response.body.data[0]).have.property('id',7)
        expect(Response.body.data[0]).have.property('firstname',micheal)
    })
})

/* how we can pass headers and cookies
sometime we have pass the token right if we want to validate the api request we need a token
 pass cookies headers along with the token
 to create a token we have to first send a post request 
 so i have created one http request for post - it will generated the token but every time this email should be deffirent
 particular  access token we have to use array as a barrier token to run by taking the help of this access token
 bearer token -specified

*/
describe("api",()=>{
  let authToken=null;
    before("creating access token",()=>{
    
     cy.request({
         method :"post",
         url : 'https://simple-books-api.glitch.me/api-clients',
         headers :{
            'Content-Type':'application/json'
         },
         body:{
            bookId:1,
            CustomerNmae :"xyzer"
         }
     }).then((response)=>{
         authToken =response.body.accessToken;
     })
    })

  //  let authToken=null;
 before("creating new  order",()=>{
    
 cy.request({
     method :"post",
     url : 'https://simple-books-api.glitch.me/orders/',
     headers :{
        'Content-Type':'application/json',
        'autherization':'  bearer'+authToken
     },
     body:{
        clientName:'Abc',       
        ClientEmail : Math.random().toString(5).substring(2)+"@gmail.com"
     }
 }).then((response)=>{
    expect(Response.status).to.eq(201)
    expect(response.body.created).to.eq(true);
 })
 })

 it("fectching the  order",()=>{
    
 cy.request({
     method :"post",
     url : 'https://simple-books-api.glitch.me/orders/',
     headers :{
        'Content-Type':'application/json',
        'autherization':'  bearer'+authToken
     },
     cookies:{
        'cookieName' : 'mycookie'
     },
     body:{
        clientName:'Abc',       
        ClientEmail : Math.random().toString(5).substring(2)+"@gmail.com"
     }
 }).then((response)=>{
    expect(Response.status).to.eq(200)
    expect(response.body).has.length(1);
 })
})
})

describe('parsing json reponse',()=>{

    it("parsing simple json response",()=>{
        cy.request({
               method :'get',
               url :"https://fakestoreapi.com/products"
        }).then(()=>{
            expect(Response.status).to.eq(200)
            expect(Response.body[0].id).to.equal(1)
            expect(Response.body[0].title).to.equal("fjallraven -Foldsack No. 1 Backpack, fits 15 Laptops")
            expect(Response.body[0].price).to.equal(109.95)  
            expect(Response.body[0].rating.rate).to.equal(3.9)  

            expect(Response.status).to.eq(200)
            expect(Response.body[19].id).to.equal(1)
            expect(Response.body[19].title).to.equal("DONvouy Womens T Shirt Casual Cotton shop")
            expect(Response.body[19].price).to.equal(12.99)  
            expect(Response.body[19].rating.rate).to.equal(3.6)  
// json objects are presenr inside the josn array  and sometime json objects are contains another json object
// JsonPathFinder
        })
    })

    it("parsing complex json response",()=>{
        let totalprice =0;
        
        cy.request({
            method :'get',
            url :"https://fakestoreapi.com/products",
            qs :{limit:3}
     }).then((response)=>{
         expect(Response.status).to.eq(200)

         response.body.forEach(element=>{
         totalprice =   totalprice+element.price;
         });
        expect(totalprice ).to.equal(899.23);  // limit 5
        expect(totalprice ).to.equal(188.24);  //if  linit 3

     })
    })
})

describe("validate JSON Schema",()=>{
   // json to Json schema tools are available in online ----transform.tools 
   // install ajv library   
   //npm install ajv  - cmd/terminal
   // once we get ajv  we need to create a instance for that 

   const ajv = require('ajv') // importing required library
   const avj = new ajv()  // create a instance  of this avj
                    // later we will use when your validating the response against schema
    it("schema validation against  response",()=>{
        cy.request({
            method :'Get',
            url :"https://fakestoreapi.com/products",

        }).then(()=>{
            const schema ={
                "$schema":"https://json-schema.org/draft-07/schema#",
                    "$id": "http://json-schema.org/draft-07/schema#",
                    "title": "Core schema meta-schema",
                    "definitions": {
                        "schemaArray": {
                            "type": "array",
                            "minItems": 1,
                            "items": { "$ref": "#" }
                        },
                        "nonNegativeInteger": {
                            "type": "integer",
                            "minimum": 0
                        },
                        "nonNegativeIntegerDefault0": {
                            "allOf": [
                                { "$ref": "#/definitions/nonNegativeInteger" },
                                { "default": 0 }
                            ]
                        },
                        "simpleTypes": {
                            "enum": [
                                "array",
                                "boolean",
                                "integer",
                                "null",
                                "number",
                                "object",
                                "string"
                            ]
                        },
                        "stringArray": {
                            "type": "array",
                            "items": { "type": "string" },
                            "uniqueItems": true,
                            "default": []
                        }
                    },
                    "type": ["object", "boolean"],
                    "properties": {
                        "$id": {
                            "type": "string",
                            "format": "uri-reference"
                        },
                        "$schema": {
                            "type": "string",
                            "format": "uri"
                        },
                        "$ref": {
                            "type": "string",
                            "format": "uri-reference"
                        },
                        "$comment": {
                            "type": "string"
                        },
                        "title": {
                            "type": "string"
                        },
                        "description": {
                            "type": "string"
                        },
                        "default": true,
                        "readOnly": {
                            "type": "boolean",
                            "default": false
                        },
                        "writeOnly": {
                            "type": "boolean",
                            "default": false
                        },
                        "examples": {
                            "type": "array",
                            "items": true
                        },
                        "multipleOf": {
                            "type": "number",
                            "exclusiveMinimum": 0
                        },
                        "maximum": {
                            "type": "number"
                        },
                        "exclusiveMaximum": {
                            "type": "number"
                        },
                        "minimum": {
                            "type": "number"
                        },
                        "exclusiveMinimum": {
                            "type": "number"
                        },
                        "maxLength": { "$ref": "#/definitions/nonNegativeInteger" },
                        "minLength": { "$ref": "#/definitions/nonNegativeIntegerDefault0" },
                        "pattern": {
                            "type": "string",
                            "format": "regex"
                        },
                        "additionalItems": { "$ref": "#" },
                        "items": {
                            "anyOf": [
                                { "$ref": "#" },
                                { "$ref": "#/definitions/schemaArray" }
                            ],
                            "default": true
                        },
                        "maxItems": { "$ref": "#/definitions/nonNegativeInteger" },
                        "minItems": { "$ref": "#/definitions/nonNegativeIntegerDefault0" },
                        "uniqueItems": {
                            "type": "boolean",
                            "default": false
                        },
                        "contains": { "$ref": "#" },
                        "maxProperties": { "$ref": "#/definitions/nonNegativeInteger" },
                        "minProperties": { "$ref": "#/definitions/nonNegativeIntegerDefault0" },
                        "required": { "$ref": "#/definitions/stringArray" },
                        "additionalProperties": { "$ref": "#" },
                        "definitions": {
                            "type": "object",
                            "additionalProperties": { "$ref": "#" },
                            "default": {}
                        },
                        "properties": {
                            "type": "object",
                            "additionalProperties": { "$ref": "#" },
                            "default": {}
                        },
                        "patternProperties": {
                            "type": "object",
                            "additionalProperties": { "$ref": "#" },
                            "propertyNames": { "format": "regex" },
                            "default": {}
                        },
                        "dependencies": {
                            "type": "object",
                            "additionalProperties": {
                                "anyOf": [
                                    { "$ref": "#" },
                                    { "$ref": "#/definitions/stringArray" }
                                ]
                            }
                        },
                        "propertyNames": { "$ref": "#" },
                        "const": true,
                        "enum": {
                            "type": "array",
                            "items": true,
                            "minItems": 1,
                            "uniqueItems": true
                        },
                        "type": {
                            "anyOf": [
                                { "$ref": "#/definitions/simpleTypes" },
                                {
                                    "type": "array",
                                    "items": { "$ref": "#/definitions/simpleTypes" },
                                    "minItems": 1,
                                    "uniqueItems": true
                                }
                            ]
                        },
                        "format": { "type": "string" },
                        "contentMediaType": { "type": "string" },
                        "contentEncoding": { "type": "string" },
                        "if": { "$ref": "#" },
                        "then": { "$ref": "#" },
                        "else": { "$ref": "#" },
                        "allOf": { "$ref": "#/definitions/schemaArray" },
                        "anyOf": { "$ref": "#/definitions/schemaArray" },
                        "oneOf": { "$ref": "#/definitions/schemaArray" },
                        "not": { "$ref": "#" }
                    },
                    "default": true
                
            }// end schema 
         const validate =   avj.compile(schema)
       const isvalid=  validate(response.body)
       expect(isvalid).to.be.true;
        })
    })
})
/*
install xml2js library
npm install xml2js
*/
const xml2js =require('xml2js');

const parser =new xml2js.Parser({ explicitArray :false});

describe("xml parsing",()=>{
  const xmlpayload =" ";

  let petid=null;
    before("creating pet",()=>{
        cy.request({
            method :'POST',
            url :"https://petstore.swagger.io/v2/pet",
            body : xmlpayload,
            headers :{'contentType :"apllication/xml',
                     'accept' :'application/xml'    }  
           
        }).then((response)=>{
            expect(response.status).to.eq(200);
            parser.parseString(response.body,(err,result)=>{
                petid=result.pet.id;
            })

        })
    })

    before("fetching pet data-parsing xl response",()=>{
        cy.request({
            method :'GET',
            url :"https://petstore.swagger.io/v2/pet/"+petid,
            body : xmlpayload,
            headers :{ 'accept' :'application/xml'    }  
                    
           
        }).then((response)=>{
            expect(response.status).to.eq(200);
            parser.parseString(response.body,(err,result)=>{
                expect(result.pet.id).equal(petid)
                expect(result.pet.name).equal(jimmy
            })

        })
    })
})
describe("Api Authentication",()=>{
    it('Basic authenticaation',()=>{

        cy.request({  
                     method:'GET',
                     url: '',
                     auth :{
                        user :'postman',
                        pass : 'postman'
                     }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })

    it('digest authenticaation',()=>{

        cy.request({  
                     method:'GET',
                     url: '',
                     auth :{
                        user :'postman',
                        pass : 'postman',
                        method :digest
                     }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })

    const token ='jdgfbrldmdnsbas9933ns'
    it('bearer token authenticaation',()=>{

        cy.request({  
                     method:'GET',
                     url: '',
                     qs :{
                        q=dehli
                        appid:'ccdciamwdixnxawdke'  // API key and value
                        
                        
                     }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            
        })
    })
})

/* 1) Get the OAuth2 access token
post: http://github.com/login/oauth/access_token
query params
client_id
client_secret
code

2)  send GET request by using access token
http://api.github.com/users/repos
Auth :accessToken
*/
describe("Oauth2",()=>{
    const accessToken="";
    it("get oath2 access token",()=>{
        cy.request({
            method:'POST',
            url:'',
            qs:{
                client_id :'dsewcposdwbnaskdxh',
                client_secret:'dcdshcnakxhanndxsd',
                code:'ehdyadnwksxhiashxs'
            }
        })
    })
})