import supertest from "supertest"
import {app} from "../server"
describe('blogs', () =>{
    describe('Getting all blogs', () =>{
        describe("given the blog blogs exists",() =>{
            it('should return 200', async () =>{
                const productId = 'gahgdyeuuyyutebf'
                supertest(app).get('/blogs').expect(200)
            })
        })
    })
})