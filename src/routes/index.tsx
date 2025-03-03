import { Hono } from "hono";
import { Layout } from "../layout.js";

const indexApp = new Hono();

indexApp.get('/',(c)=>{
  return c.html(
    <Layout title="Home">
      <h1>Hello World!</h1>
    </Layout>
  )
})

export default indexApp;