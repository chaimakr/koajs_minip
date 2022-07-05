const Koa = require('koa');
const KoaRouter = require ('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');


const app = new Koa();
const router = new KoaRouter(); 

// local data ( instead of db )
const things = ["get familliar with Hive tech requirements",
   " analyse the existing codebase of Hive Project ",
   " don't forget about the Onboarding checklist "   
]

//json prettier middleware
app.use(json());
//BodyParser middleware
app.use(bodyParser());

// starter example
//app.use( async ctx => ctx.body = 'hello world');

render(app, {
    root :  path.join(__dirname, 'views'),
    layout : 'layout',
    viewExt : 'html',
    cache : false,
    debug : false
})

// index routers
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);


// display list of things
async function index(ctx ){
    await ctx.render('index', {
        title : 'Things I need to do this week',
        things : things
    });
}
// show add page
async function showAdd(ctx){
    await ctx.render('add');
}

// add thing
async function add(ctx){
    const body = ctx.request.body;
    things.push(body.thing)
    ctx.redirect('/');
}

router.get('/test', (ctx => ctx.body = "hello test"))

//Router Middleware 
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('server started..'))