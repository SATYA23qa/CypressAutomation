
/*
1>cmd-node --version
cmd-npm --version
cmd- npm -i init (create package.json file)

2>   to install cypress 
cmd-  npm install cypress --save -Dev

to install mocha framework
afetr install node.js then  in cmd npm install --global mocha    ----run globally 

or
npm install mocha --save -dev in project directory
 
 
start cypress 
 cmd - npx cypress open
    or
    nodemodules/.bin/cypress open

*/

// arrow function
describe('suite name'), ()=>{

    it('test',()=>{
        expect(true).to.equal(true)
    })

}
//instead of arrow function  simply say function keyword both are correct
// every describe block can have multiple it blocks  evry it block is one test

describe('suite name'),function(){

    it('verify title',()=>{

        cy.visit("http://www.automationpractice.pl/index.php")

        cy.title().should('eq','orangeHrm')

    })

     
}

/*
Locators
1. Css locators (tag name is optional for cypress)
Tagid                 ->  #id
tagclass              ->  .class
tagAttribute          ->  tag[attribute ='value']
tag class attribute   ->  tag.class[attribute = 'value']

2.xpath
 
*/

describe('Css Locator',()=>{

    it("css locator",()=>{

        cy.visit("http://www.automationpractice.pl/index.php")
        cy.get("#search_query_top").type("T-shirts")  // tag  id is optional
        cy.get("[name='submit_search']").click()
        cy.get('.lighter').containes("T-Shirts")  // assertion

       // instead of id use class
       cy.get(".search_query_top").type("T-shirts")  //   class tag is optional

       cy.get("[name='search_query_top']").type("T-shirts") // attrubute tag
       cy.get("[name='submit_search']").click()     // attribute tag 
       cy.get('.lighter').containes("T-Shirts")  // assertion

    })
})

 // this is for cypress commands
///<reference types ="cypress" />   
/*

if we use xpath
  we have to intall cypress xpath plugin  (install with npm)
  cmd-npm install -D cypress-xpath
     then add entry in command.js(support file)      
    // this is for xpath commands
          ///<reference types ="cypress-xpath" /> 

thii is not enough we need to one more entry in the e2e.js (configuartion file ->in support file)
  
add entry

 reqauire(' cypress-xpath') 
      this applicable for all tests 
         then only xpath function will able to identify by cypress

*/
      

describe('xpathLocator' ,()=>{

    it('find no of products', ()=>{

        cy.visit("http://www.automationpractice.pl/index.php")

        cy.xpath("//ul[@id='homefeatured']/li").should('java length',7)
           // so this whole xpath spilt into two part one xpath followed by another xpath  and validation same
    })
       
    it('chained xpath',()=>{

        cy.visit("http://www.automationpractice.pl/index.php")
        cy.xpath(cy.xpath("//ul[@id='homefeatured']/li").xpath(".li").should('java length',7))
                        // this will pointing all products
    })
})

/*
 Assertions
 1.implicit assertions   -> these are built in assertion in cypress
   sholud 
   and
          1.eq
          2.include
          3.contains
          4exists
          5.have.length
          6.have.value
          etc

   2.explicit asserations
     expect -BDD
     assert -TDD

*/
// assertions 
describe('Assertions demo',()=>{

    it("implicit assertions",() =>{
         cy.visit("https://testautomationpractice.blogspot.com/")

        cy.url().should('include', 'orangeHrmlive.com') // ulr is inclide partial text
        cy.url().should('eq','url') // capture url should equal to which is open in the browser
        cy.url().should('contain' , 'orangeHrm') //conatin given text

       // instead sholud we can use and keyword

       cy.url().should('include','oragngehrmlive.com')
               .and('eq','https://testautomationpractice.blogspot.com/s')
               .and('contains','orangehrm')
               .and('notcontain','ranghrm')

       cy.title().should('inculde','orange')     
       //instead of  write multiple should we can write   and 
                 .and('eq',"orangehrm")
                 .and('contain',"Hrm")

        cy.get('.orangehrm_login_branding>img').should('be.visible') // visibility of element
        cy.get('.orangehrm_login_branding>img').should('exists') // element is exists on the page or not

        cy.xpath("//a").should('have.length',5) // number of links
        cy.get("input[placeholder='username']").type("admin") // provide value into inputbox
        cy.get("input[placeholder='username']").should('have.value', 'admin')

    })

    it('explicit asserstions',()=>{

        cy.get("input [placeholder= 'username']").type("admin")
    cy.get("input[placeholder='password']").type("admim123")
    cy.get("button[type='submit']").click()

    /*
      we need to write javascrip function becuase explicit assessments we connot dirctly use so we need to create our own customized function
      explicit asserstions are customized assertions they are not built-in assertions in cypress
    */
     let expName = "xyz";
        
     cy.get(" .oxd-userdropdown-name").then( (x) =>{

        let actName = x.text()   
        //  we are capturing the title of the particular element then we are comparing the actname and expName
        //BDD style 
        expect(actName).to.equal(expName) 
        expect(actName).to.not.equal(expName)
        // TDD style
        assert.equal(actName,expName)
        assert.notEqual(actName,expName)
     })
    })
})

describe('UI elements',()=>{
    it("checking radi butttons",()=>{
        cy.visit("https://testautomationpractice.blogspot.com/")
        cy.get("input#male").sholud('be.visible')
        cy.get("input#female").sholud('be.visible')
        //selecting radio buttons
        cy.get("input#male").check().should('be.checked') // select male
        cy.get("input#male").should('not.be.checked') // not select female

        cy.get("input#female").check().should('be.checked') // select male
        cy.get("input#male").should('not.be.checked') // not select female
    })

    it("checking check boxes",()=>{
        //visibility of the element
        cy.visit("https://testautomationpractice.blogspot.com/")
        cy.get("input#monday").sholud("be.visible")
        cy.get("input#monday").check().sholud("be.checked") // selecting
        cy.get("input#monday").uncheck().sholud("not.be.checked") //  not selecting
        cy.get("input.form-check-input[type='checkbox']").check().sholud("be.checked") // selecting all check boxes
        cy.get("input.form-check-input[type='checkbox']").first().check().sholud("be.checked") // selecting first check boxe
        cy.get("input.form-check-inpust[type='checkbox']").last().check().sholud("be.checked") // selecting last check boxes

    })
}) 
//Handle drop down
describe("handle dropdown",()=>{
    it("dropdown with select",()=>{
        cy.visit("https://www.zoho.com/commerce/free-demo.html?src=homepage")
        cy.get('#zcf-address-country').select('Italy')
        .select('Italy')
            .should('have.value','Italy') 
        
    })
    it("dropdown without select",()=>{
        cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/")
        cy.get('#select2-billing-country-container').click() //click dropdown
        cy.get('#select2-search_field').type('italy').type('{enter}') //type value in input box inside the drop dowm then pass enter key
        cy.get('#select2-billing-country-container') // selecting text value of element
            .should('have.text','italy')
        
    })

    it("Auto suggest dropdown ",()=>{
        cy.visit("https://www.wikipedia.org/")
        cy.get('#searchinput').type('delhi') // type text
       
        cy.get('.suugestion-title').contains('delhi university').click()
        
    })

    it("Dynamic  dropdown ",()=>{
        cy.visit("https://www.google.com/")
        cy.get("input[name='q']").type('cypress automation tutorial') // in search fild type cypress automation

        cy.get('div.wM6W7ds>pan').should('have.length',13)

        cy.wait(3000)                   // represents (element , index , array of list) anohter way of selecting option from drop down
        cy.get('div.wM6W7d>span').each(($ele , index ,$list)=>{

            if($ele.text()==='cypress Automation tool'){ 
                cy.wrap($ele).click()                      // this is basically jquery function
            }
        })
       // same text is displayed or not verify
       cy.get("input[name='q']").sholud('have.value', 'cypress Automation tutorial')
       
    })
})
// handle alerts
describe(" Handle Alerts",()=>{

/* 1.JavaSCript alert: it will have some text and an 'ok' button
   2.Javascript confirm alert: it will have some text with 'ok' and concel button
   3. javasricpt prompt alert it will have some text with a text box for user input along with 'ok' button
   4.authentication alert

*/
it("alert",()=>{

    cy.visit("https://the-internet.herokuapp.com/javascript_alerts")
    cy,get("button[onlick='jsAlert()']").click()

    cy.on('window:alert',(t)=>{
     // we are validating text which is present in the alert window
        expect(t).to.contains('im a JS alert');

    })
       // after closing alert window we are validating this text  
      // get this element and sholud have succussfully clicked msg present
    cy.get("#result").should('have.text', 'you successfully clicked  an alert')
}) 

it("js confirm alert",()=>{

    cy.visit("https://the-internet.herokuapp.com/javascript_alerts")
    cy,get("button[onlick='jsConfirm()']").click()

    cy.on('window:cinfirm',(t)=>{
     // we are validating text which is present in the alert window
        expect(t).to.contains('im a JS confirm ');

    cy.on('window:confirm',()=>false); // cypress closes alert window using cancel

    })
       // cypress automatically closed alert window by using ok button-default
    cy.get("#result").should('have.text', 'you cliked: Ok')

    cy.get("#result").should('have.text', 'you cliked: cancel')
})


//

it("js prompt alert",()=>{

    cy.visit("https://the-internet.herokuapp.com/javascript_alerts")
    
    cy.window().then((win)=>{
        cy.stub(win,'prompt').returns('welcome');

    })
    cy.get("button[onclick='jsPrompt()]").click();
     
   // cypress automatically close prompt alert- it will use ok button-by default window by using ok button-default 
   cy.on('window:confirm',()=>false);
    cy.get("#result").should('have.text', 'you entered: welcome');
})

//  4.authentication alert
it("authentication alert",()=>{

    cy.visit("https://the-internet.herokuapp.com/basic_auth",{ auth:
                                                                   {
                                                                            username :"satya",
                                                                            password :"satya123"
                                                                          } 
                                                             });
          cy.get("div[class='example'] p").should('have.contains',"congratulation")                                                   
    
    
})
})
// Iframes
describe("Iframes",()=>{

    it("approch-1",()=>{
        cy.visit("https://the-internet.herokuapp.com/iframe")
     

        const iframe =cy.get("#mce_0_ifr")     //inside the iframe  contains document this document sraping this element we need to get that
                  .its('0.contentaDocument.body') // dig into the  document access
                  .should('be.visible')   // visible or not
                  .then(cy.wrap);  // this will be wrap the frsme

              iframe.clear().type("welcome {cmd+a}"); // ifrsme .clear() by default inside text clear the text
              cy.get("[aria-label-label='bold']").click   

    })

    it("approch-2- by using custom command",()=>{
        cy.visit("https://the-internet.herokuapp.com/iframe");
     
        cy.getIframe('#mce_0_ifr').clear().type("welcome {cmd+a}");    
              cy.get("[aria-label-label='bold']").click   

    })

    
    it('approch-3- by using cypress-iframe plugin',()=>{
        cy.visit("https://the-internet.herokuapp.com/iframe");
     
        cy.frameloaded('#mce_0_ifr')  // this frameload() load the frame
        
        cy.iframe('#mce_0_ifr').clear().type("welcome {cmd+a}") // interact frame

              cy.get("[aria-label-label='bold']").click   

    })
})
// handle tab  windows
describe('Handle tabs',()=>{
    it("approch-1",()=>{
        cy.visit("https://the-internet.herokuapp.com/windows")
       // after getting the element we are removing target element so that target element will open same browser window
        cy.get('.example>a').invoke('removeattr','target').click()   // clicking on link which will open new tap
       
        cy.url().should('include','https://the-internet.herokuapp.com/windows/new'); //verify new tap window

        cy,wait(3000)

        cy.go('back'); // go back to parent window
         
    })
    it("approch-2 by jquery function",()=>{
        cy.visit("https://the-internet.herokuapp.com/windows");
       // after getting the element we are removing target element so that target element will open same browser window
        cy.get('.example>a').then((e)=>{

            let url=e.prop('href');
            cy.visit(url); 
        })  
       
        cy.url().should('include','https://the-internet.herokuapp.com/windows/new'); //verify new tap window

        cy,wait(3000)

        cy.go('back'); // go back to parent window
         
    })

})
//WEB table and Pagination
describe('WEB table and Pagination',()=>{
    beforeEach('login',()=>{
cy.visit("");
cy.get("#input-username").type("demo");
cy.get("#input-password").type("demo");
cy.get("button[type='submit']").click();

cy.get(".btn-close").click();

cy.get("#menu-customer>a").click() // customer main menu

cy.get("#menu-customer>ul>li:first_child").click()//customer child tap

    })
    it('check number of rows and columns',()=>{
      cy.get("#table[class='table table-bordered table-hover']>tbody>tr").should('have.length','10');
      cy.get("#table[class='table table-bordered table-hover']>thead>tr>td").should('have.length','7');
    })
 it('check cell data from specific row & column',()=>{
    cy.get("#table[class='table table-bordered table-hover']>tbody>tr:nth-ChannelSplitterNode(5)>td:nth-ChannelSplitterNode(3)").contains("rs@yopmail.com");
 })  
 
 it('Read all the rows & columns data in the first page',()=>{
    cy.get("table[class='table table-bordered table-hover']>tbody>tr")
        .each( ($row ,index, $rows)=>{
            cy.wrap($row).within(()=>{
                cy.get("td").each(($col,index,$cols)=>{
                    cy.log($col.text());
                })
            })
        })    
 })

 it('pagination',()=>{
    // find total number of page
  /*  let totalpages;
    cy.get(".col-sm-6,text-end").then((e)=>{
        let mytext = e.text();// showing 1 to 10 of 5581(559 pages)
        totalpages =mytext.substring(mytext.indexOf("(")+1,mytext.indexOf("pages")-1)
        cy.log("total number of pages in a table  "+totalpages);
    })*/

    let totlpages =5;
    for(let p=1;p<=totalpages;p++){
        if(totalpages>1){
            cy.log("Active page is ==="+p);
            cy.get("ul[class='pagination']>li:nth-child("+p+")").click();
                            cy.wait(3000)
            cy.get("table[class='table table-bordered table-hover']>tbody>tr")
               .each( ($row,index, $rows)=>{

                cy.wrap($row).within(()=>{
                    cy.get('td:nth-child(3)').then((e)=>{
                        cy.log(e.text());
                    })

                })

               })
        }
    }
 })
})
//mouse operation
describe('mouse operations',()=>{

    it('mousehover',()=>{
   cy.visit("https://demo.opencart.com/")

   cy.get("body>main:nth-child(3)>div:nth-child(1)>nav:nth-child(1)>div:nth-child(3)>ul:nth-child(1)>li:nth-child(2>a:nth-child(1)")
   .should('not.be.visible');
   cy.get('.nav> :nth-child(1)> .dropdown-toggle').trigger('mouseover').click();

   cy.get("body>main:nth-child(3)>div:nth-child(1)>nav:nth-child(1)>div:nth-child(3)>ul:nth-child(1)>li:nth-child(2>a:nth-child(1)")
   .should('be.visible');
    })

     it('right Click',()=>{
         cy.visit("https://swisnl.github.io/jQuery-contextMenu/demo.html")
       // appraroch1
         cy.get('.context-menu-one.btn.btn-neutral').trigger('contextmenu');
         cy.get('.context-menu-icon-copy.span').should('be.visible');

         //appraoch2
         cy.get('.context-menu-one.btn.btn-neutral').rightclick();
         cy.get('.context-menu-icon-copy.span').should('be.visible');


    })
    it('double click',()=>{
        cy.visit("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_ondblclick");
        cy.frameLoaded('#iframeResult'); //load the frame  import 'cypress-iframe'
        //appraoch1 trigger()
        cy.iframe('#iframeResult').find("button[ondbclick='myFunction()']").trigger('dblclick')
        cy.iframe('#iframeResult').find('#field2').sholud('have.value','Hello world')

        //approach2  dblclick() method
        cy.iframe('#iframeResult').find("button[ondbclick='myFunction()']").dblclick()
        cy.iframe('#iframeResult').find('#field2').sholud('have.value','Hello world')



    })
    // package we need to install by suing npm install --save -Dev @4tw/cypress-drag-drop
    //also specify this     >>>>require( @4tw/cypress-drag-drop )<<<<<< on top of the sricpt
    it('drag and drop using plugin',()=>{
        cy.visit("http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html")

        cy.get('box6').should('be.visible')
        cy.get('#box106').should('be.visible')

        cy.get('#box6').drag('#106',{force :true})

    })
    it('scroll the page',()=>{
        cy.visit("https://www.countries-ofthe-world.com/flags-of-the-world.html")
        
        cy.get('nth:child(1) >tbody>:nth-child(86)> :nth-child(1)>img').scrollIntoView({duration: 200})
        cy.get('nth:child(1) >tbody>:nth-child(86)> :nth-child(1)>img').should('be.visible')

        cy.get('nth:child(1) >tbody>:nth-child(4)> :nth-child(1)>img').scrollIntoView({duration: 200})
        cy.get('nth:child(1) >tbody>:nth-child(4)> :nth-child(1)>img').should('be.visible')

        cy.get('#footer').scrollIntoView();npm install --save-dev cypress-file-upload

    })
})

//file upload   import on top of script  import 'cypress-file-upload
describe('file upload',()=>{
 it('single file upload',()=>{
   cy.visit("https://the-internet.herokuapp.com/upload")
   cy.get('#file-upload').attachFile('test1.pdf')
   cy.get('#file-submit').click();
   cy.get("div[class='example'h3").should('have.text','File Uploaded!');


 })

 it('file Upload-Rename',()=>{
    cy.visit("https://the-internet.herokuapp.com/upload")
    cy.get('#file-upload').attachFile({filePath:'test1.pd',fileName:'myfile.pdf'})
    cy.get('#file-submit').click();
    cy.get("div[class='example'h3").should('have.text','File Uploaded!');
    
 
  })

  it('file Upload-drag and drop',()=>{
    cy.visit("https://the-internet.herokuapp.com/upload")
    cy.get('#drag-drop-upload').attachFile("test1.pd",{subjectType:"drag-n-drop"});

    cy.get('#file-submit').click();
    cy.get('#drag-drop-upload>.dz-preview>.dz-details > .dz-filename>span');
    .contains("test1.pdf");
 
  })

  it('multiple file Upload',()=>{
    cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php")
    cy.get('#filesToUpload').attachFile(["test1.pd","myfile.pdf"]);
   
    cy.get(':nth-child(6) > strong').sholud('coontains.text','Files you selected')
    
 
  })

  it(' file Upload-Shadow dom',()=>{
    cy.visit("https://www.htmlelements.com/demos/fileupload/shadow-dom/")

    cy.get('.smart-browse-input',{inludeShadowDom:true}).attachFile("test1.pd");
   
    cy.get('.smart-item-name',{includeShadowDom:true}).contains('test1.pdf');
    
 
  })
 
})
// custom commands
describe('Custom commands',()=>{
    it('handling link',()=>{
        cy.visit("")
        //dirctly > withoutusing custom command
        cy.get("div[class='item-grid'] div:nath-child(2) div:nth-child(1) div:nth-child(2) div:nth-child9)")
    
        cy.clicklink("Aplle Macbook pro13-inch")
    cy.get('.smart-item-name',{includeShadowDom:true}).contains('test1.pdf');
    })
it("login command",()=>{
    cy.visit("")
    cy.clicklink("login in");
    cy.loginapp("testing@gamil.com","test123");
    cy.get('.ico-account').sholiud('have.text','my account');
})

})
// capture screen shot & videos
describe("Scrennshot & videos",()=>{
    it('screenshot videos',()=>{
        cy.visit("https://demo.opencart .com/")
        cy.sreenshot("homepage");
        cy.get("img[title='your store']").screenshot("logo");
    })
})
 