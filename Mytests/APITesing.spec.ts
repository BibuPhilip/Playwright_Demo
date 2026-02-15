import{test, expect} from '@playwright/test';

test('API Get Request 1',async({request}) =>{
    const response = await request.get('https://www.bigbasket.com/ui-svc/v1/category-tree',
                        {headers: {
                            Cookie: '_bb_locSrc=default; x-channel=web; _bb_aid=MjkxMzA4NDUzMA==; _bb_cid=1; _bb_vid=ODgzODI5Mjc1ODY4MDAxMjYy; _bb_nhid=7427; _bb_dsid=7427; _bb_dsevid=7427; _bb_bhid=; _bb_loid=; csrftoken=j5Ny6GInK1MFH6u3joooK75ZOLlU7UNRPZXO8J1jBKlsJuAsJTaO8twz939h8Lab; isintegratedsa=true; jentrycontextid=10; xentrycontextid=10; xentrycontext=bbnow; _bb_bb2.0=1; is_global=1; _bb_addressinfo=; _bb_pin_code=; _is_bb1.0_supported=0; is_integrated_sa=1; bb2_enabled=true; _gcl_au=1.1.1191069054.1756747533; jarvis-id=d1e287fe-bc92-46f5-9f6a-ddb8a7dd923f; adb=0; _fbp=fb.1.1756747533405.392766776547692142; bigbasket.com=92073c90-b8c8-4fd6-95b9-b83d92e13a69; ufi=1; _bb_sa_ids=19224; _is_tobacco_enabled=1; _bb_cda_sa_info=djIuY2RhX3NhLjEwLjE5MjI0; _ga=GA1.1.1575216049.1756747533; bm_lso=1D9256DCB61A406B494B795318024F256B61E05BB166552BFEA983187C952B2B~YAAQsEI5FylQ8P2YAQAAND+lBgSzXE6NaYGIVAjRtBOMpesweqzaqZ7b51oECsftaKi6C3xqJ6s2d8SEriYE7fa24LLnT6PvZ86vTuU+jzy4YH1x/fTUnvkobCA/5yKTJJEgtFqAGxpjm8Qx1pGAj32GTpyesKOcdf+QefL0oTMDgdaZ0MSbQ3ymqFDxZuHmR9DXaNco6httRhrEqiJjVVpZ/8nHTys9R3R6AplccTWnyuKjWbc+vrxB8jyqqJ/8eGTDT3YBVIzdA6BfCnyqEW56MVBMTvvxVFrF0mdpfUXmZHyK3r6MvssnfB+h42G7BKRnYkFCtvhL/FfnYDYuzfqsX8199/gFDhUr2LKSNZJtAVBIOLYfOuQ4GoEJmo7zmbDrh8vPmqWrLFaO+TGXWXMtarWsUJmjh+bd6WKyosK0pocfZhuG9XmVJsm+fol+fXWQjADxrQq0BwTNAoaxc7dcPwxx3QtsYWi+YMB9ae4g/KbXIQefihM=^1756753120206; _ga_FRRYG5VKHX=GS2.1.s1756782634$o3$g0$t1756782634$j60$l0$h0; csurftoken=9FJ4-g.ODgzODI5Mjc1ODY4MDAxMjYy.1757476565078.ZxzHs6LYOYuDhfoPoIAzFllqDXkn+0TwNyWHFlvuVhw=; bm_ss=ab8e18ef4e; bm_s=YAAQqkI5Fw6IiOGYAQAA2DLEMQQ7Z/+cZOm0Ch/YVxEQHwAloHLmVaOz3rGbZcL5xwBUrNYomWoRFJGDEUxbRM3gT2/L3XwZaNsFqzCyKvb5+6AveRWjJm+tN2icmyfNzhDbB10InQXK/w4e2K2LNw4jTlx0OkivZ+2Fh7niOX7UBoeMuVL/hm1zI6E/5p4AcPLjgP7XqMU8ismObsr09JuE3GXckggKB6/dk/2IjrIuvpcVAOn0GKsz8sSUBojCvFTY3FgKV97tay/QrVtlfO3f+Yurlr9zlfDHLe3x8Qrtm/8uBxCBAg/L1NNRVKZ4DfeOTDqcqZvY8/+onUr/YIC1T5EJ8uD1J7b5kJBx+Pdh/ZEwjb5eQteF2MoTJpczMdRGZJfcRjMc5EMJyOOnlwlMSJLgZ9Y5HgzzUSOKIP2Rdz2BJ866mWQ3c8gjRe13W5uatYotJn6msc/nCbA56wsuiy3xtNwI5qXn0uPLLoJWgo/acy790qddYuwO9UGIBTuD/zDmsgR5MeTCoWUTq1WGqXgh3KCyV6QxX8V1fkU8vO+XJEjv90krShcfIiaDT3rmlUsWjDJU9f8ns0LmfHfGEKdTrH8=; bm_so=293D79F94A55165A4B55B7C189D8A1A771961905F58053DFE03D4204A29A160C~YAAQqkI5Fw+IiOGYAQAA2DLEMQQqKuIE1J2HBWJjW4D/QiN8Y6GlVWJ3fcsg3esO/xHQFwq1RssG9AnQln80CDzDkcpJ9q+E3FtrZEU92ZkxVrJH6K5OLv1o2kdKBfzlEgYZbg3LGrwmxIFpnnqk/0kstTLhX8euyyvplSLU3hX55RblyYPAUli+/jP6TK2ScUr7pSMh+DWGUdB6Lj9v69o8ogNSl/0EHIhNlm8qEMDQVJCNuSoYP+GuQ6XocQnr4YTvPQDKhuaItNpRc+Y5vzKcLWB2kqbpK2Puk/Z16nCdhGZWTvBA84tQtMye7xPabqTdx4XZybjz10xb+/Zcxms//fQES5TnHvoHabD6rMFycIRFFG4bUs30ctvwLAzeqzSIgvLBTHcyWitVQmRQyNQwl7RszeupFHDlcWTkj80U06zX0YiXF/fCcNaXywvC4TMXtbo2l7hUwgJbcgfq4KjTr/OkH/PUimoqm+RynQjdtByW9NFCwA=='
                        }}
    );
    const responseObject = await response.json();
    console.log(responseObject);

})

test('API Get Request 2', async({request}) =>{
    const response2 = await request.get('https://reqres.in/api/users?page=2');
    expect (response2.status()).toBe(200);
    const responseJson = await response2.json();
    const responseText = await response2.text();
    console.log(responseJson);
    console.log('=======================================');
    console.log(responseText);
    expect(responseText).toContain('sand dollar');
    expect(responseJson.support.text).toBe('Tired of writing endless social media content? Let Content Caddy generate it for you.');
    expect(responseJson.data[2].name).toBe('blue iris');
})

test('API Get Request 3', async({request}) => {
    const response3 = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0',
        {headers:{
            Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNDIyMH0sImlhdCI6MTc1NzYzNjYwNywiZXhwIjoxNzYyODIwNjA3fQ.QXQ0jPV6FKHcNsI3jwnnu6zPGolQUNxmJhz8mHjZUio'
        }}
    );
    const responseText = await response3.text();
    await expect(responseText).toContain('Bondar Academy');
    const responseJson = await response3.json();
    console.log(responseJson);
})

test('API POST Request 1',async({page,request}) =>{
    const response3 = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
        headers:
        {
            Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNDIyMH0sImlhdCI6MTc1NzYzNjYwNywiZXhwIjoxNzYyODIwNjA3fQ.QXQ0jPV6FKHcNsI3jwnnu6zPGolQUNxmJhz8mHjZUio'
        },
        
        data:
        {
            "article":{"title":"My Test Article 1","description":"This is me testing POST Request 1","body":"This is me testing POST Request by creating a new article. I will then retrieve the request headers and create a POST call to replicate the same through my own ways","tagList":[]}
        }
    })
    const responseJson = await response3.json();
    const responseText = await response3.text();
    console.log(responseJson);
    console.log('=======================================');
    console.log(responseText);
    await expect(responseText).toContain('Test');

    await page.setExtraHTTPHeaders(
        {
            Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNDIyMH0sImlhdCI6MTc1NzYzNjYwNywiZXhwIjoxNzYyODIwNjA3fQ.QXQ0jPV6FKHcNsI3jwnnu6zPGolQUNxmJhz8mHjZUio'
        }
    )
    await page.goto('https://conduit.bondaracademy.com/');

    await expect(page.locator('app-article-list>app-article-preview:first-of-type>div>a>h1')).toContainText('My Test Article 1');

    await page.getByText('My Test Article 1').click();

    const responseDelete = await request.delete('https://conduit-api.bondaracademy.com/api/articles/My-Test-Article-1-34220',
        {
            headers:
            {
                Authorization: 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNDIyMH0sImlhdCI6MTc1NzY0NzYwOCwiZXhwIjoxNzYyODMxNjA4fQ.IJt_EYoNXwuYBApq9UzaJZk5lMdantSBKo67SuthZdo'
            }
        }
    )

    console.log(await responseDelete.status());
})

test('Testing API POST feature', async ({ request }) => {
    const newUser = { name: 'Shebin', job: 'Lead Techie' };

    const response3 = await request.post('https://reqres.in/api/users', {
        data: newUser,
        headers: {
            'x-api-key': 'reqres-free-v1'
        }
    });

    expect (response3.status()).toBe(201);
    const responseJson = await response3.json();
    console.log(responseJson);
    expect(responseJson.name).toBe(newUser.name);
    expect(responseJson.job).toBe(newUser.job);
})

test('Testing API PUT feature', async ({ request }) => {
    const newUser = { name: 'Shebin', job: 'Lead Techie' };

    const response4 = await request.put('https://reqres.in/api/users/2', {
        data: newUser,
        headers: {
            'x-api-key': 'reqres-free-v1'
        }
    });

    expect (response4.status()).toBe(200);
    const responseJson = await response4.json();
    console.log(responseJson);
    expect(responseJson.name).toBe(newUser.name);
    expect(responseJson.job).toBe(newUser.job);
})

test('Testing API DELETE feature', async({request})=>{

    const response5 = await request.delete('https://reqres.in/api/users/2',{
        headers: {
            'x-api-key': 'reqres-free-v1'
        }

    });
    expect (response5.status()).toBe(204);
})
